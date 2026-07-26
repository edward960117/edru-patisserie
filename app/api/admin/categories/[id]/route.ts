import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { categoryInputSchema } from "@/lib/validation/category";

async function requireStaff() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(getSessionCookieName())?.value);
  return session?.role === "staff";
}

function isDuplicateSlugError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("p2002") ||
    normalized.includes("unique constraint") ||
    normalized.includes("duplicate key value") ||
    normalized.includes("category_slug_key")
  );
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const categoryId = Number(id);
  if (!Number.isFinite(categoryId)) {
    return NextResponse.json({ error: "Invalid category id" }, { status: 400 });
  }

  try {
    const existingCategory = await prisma.category.findUnique({ where: { id: categoryId }, select: { slug: true } });
    const body = await request.json();
    const parsed = categoryInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid category payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const category = await prisma.category.update({
      where: { id: categoryId },
      data: {
        slug: data.slug,
        name: data.name,
        name_cn: data.nameCn,
        emoji: data.emoji,
        description: data.description,
      },
    });

    revalidateTag("catalog");
    revalidatePath("/");
    if (existingCategory?.slug) {
      revalidatePath(`/categories/${existingCategory.slug}`);
    }
    revalidatePath(`/categories/${data.slug}`);

    return NextResponse.json({ category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    if (isDuplicateSlugError(message)) {
      return NextResponse.json({ error: "Slug already exists. Please use another slug." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update category." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const categoryId = Number(id);
  if (!Number.isFinite(categoryId)) {
    return NextResponse.json({ error: "Invalid category id" }, { status: 400 });
  }

  try {
    const existingCategory = await prisma.category.findUnique({ where: { id: categoryId }, select: { slug: true } });
    await prisma.category.delete({ where: { id: categoryId } });

    revalidateTag("catalog");
    revalidatePath("/");
    if (existingCategory?.slug) {
      revalidatePath(`/categories/${existingCategory.slug}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("p2003") || message.includes("foreign key")) {
      return NextResponse.json({ error: "Cannot delete category with existing cakes." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }
}