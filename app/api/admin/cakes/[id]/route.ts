import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { cakeInputSchema } from "@/lib/validation/cake";
import { ImageOptimizationError, optimizeImageUrlForStorage } from "@/lib/image";

function isDuplicateSlugError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("p2002") ||
    normalized.includes("unique constraint") ||
    normalized.includes("duplicate key value") ||
    normalized.includes("cake_slug_key")
  );
}

function getErrorText(error: unknown) {
  if (error instanceof Error) {
    const cause = "cause" in error ? String((error as { cause?: unknown }).cause ?? "") : "";
    return `${error.message} ${cause}`.trim();
  }
  if (typeof error === "string") {
    return error;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error ?? "");
  }
}

function parseUniqueConflict(message: string) {
  const keyMatch = message.match(/Key \(([^)]+)\)=\(([^)]+)\)/i);
  if (keyMatch) {
    return { field: keyMatch[1], value: keyMatch[2] };
  }

  if (message.toLowerCase().includes("cake_slug_key")) {
    return { field: "slug", value: null as string | null };
  }

  return { field: null as string | null, value: null as string | null };
}

async function requireStaff() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(getSessionCookieName())?.value);
  return session?.role === "staff";
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const cakeId = Number(id);
  if (!Number.isFinite(cakeId)) {
    return NextResponse.json({ error: "Invalid cake id" }, { status: 400 });
  }

  try {
    const existingCake = await prisma.cake.findUnique({ where: { id: cakeId }, select: { slug: true, category_id: true } });
    const body = await request.json();
    const parsed = cakeInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid cake payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const optimizedImageUrl = await optimizeImageUrlForStorage(data.imageUrl);

    const cake = await prisma.cake.update({
      where: { id: cakeId },
      data: {
        category_id: data.categoryId,
        name: data.name,
        name_cn: data.nameCn,
        slug: data.slug,
        description: data.description,
        description_cn: data.descriptionCn,
        ingredients: data.ingredients,
        image_url: optimizedImageUrl,
        lead_time_days: data.leadTimeDays,
        active: data.active,
        featured: data.featured,
      },
    });

    await prisma.cakeSize.deleteMany({ where: { cake_id: cakeId } });
    // createMany triggers an implicit transaction, which the Neon HTTP adapter doesn't support — insert rows one by one instead.
    for (const size of data.sizes) {
      await prisma.cakeSize.create({
        data: { cake_id: cakeId, size: size.size, price: size.price, available: size.available },
      });
    }

    const category = await prisma.category.findUnique({ where: { id: data.categoryId }, select: { slug: true } });
    revalidateTag("cakes");
    revalidatePath("/");
    revalidatePath("/checkout");
    if (existingCake?.slug) {
      revalidatePath(`/cakes/${existingCake.slug}`);
    }
    revalidatePath(`/cakes/${data.slug}`);
    if (category?.slug) {
      revalidatePath(`/categories/${category.slug}`);
    }
    if (existingCake?.category_id && category?.slug) {
      const previousCategory = await prisma.category.findUnique({ where: { id: existingCake.category_id }, select: { slug: true } });
      if (previousCategory?.slug && previousCategory.slug !== category.slug) {
        revalidatePath(`/categories/${previousCategory.slug}`);
      }
    }

    return NextResponse.json({ cake });
  } catch (error) {
    if (error instanceof ImageOptimizationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const message = getErrorText(error);
    const code = typeof error === "object" && error && "code" in error ? String((error as { code?: unknown }).code ?? "") : "";
    if (isDuplicateSlugError(message)) {
      const conflict = parseUniqueConflict(message);
      const conflictLabel = conflict.field === "slug" ? "slug" : conflict.field;
      const readable = conflict.value
        ? `${conflictLabel} \"${conflict.value}\" already exists. Please use another value.`
        : "Slug already exists. Please use another slug.";
      return NextResponse.json({ error: readable, field: conflict.field, value: conflict.value }, { status: 409 });
    }
    if (code === "P2000") {
      return NextResponse.json({ error: "One of the fields is too long. Please shorten text or upload a smaller image." }, { status: 400 });
    }
    if (code === "P2003") {
      return NextResponse.json({ error: "Invalid category selected. Please choose a valid category." }, { status: 400 });
    }
    if (message.toLowerCase().includes("payload") || message.toLowerCase().includes("body") || message.toLowerCase().includes("too large")) {
      return NextResponse.json({ error: "Image payload is too large. Please upload a smaller image." }, { status: 413 });
    }
    console.error("PUT /api/admin/cakes/[id] failed", error);
    return NextResponse.json({ error: "Failed to update cake. Please try again.", detail: message || "Unknown server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const cakeId = Number(id);
  if (!Number.isFinite(cakeId)) {
    return NextResponse.json({ error: "Invalid cake id" }, { status: 400 });
  }

  try {
    const existingCake = await prisma.cake.findUnique({ where: { id: cakeId }, select: { slug: true, category_id: true } });
    await prisma.cake.delete({ where: { id: cakeId } });

    revalidateTag("cakes");
    revalidatePath("/");
    revalidatePath("/checkout");
    if (existingCake?.slug) {
      revalidatePath(`/cakes/${existingCake.slug}`);
    }
    if (existingCake?.category_id) {
      const category = await prisma.category.findUnique({ where: { id: existingCake.category_id }, select: { slug: true } });
      if (category?.slug) {
        revalidatePath(`/categories/${category.slug}`);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete cake. Please try again." }, { status: 500 });
  }
}
