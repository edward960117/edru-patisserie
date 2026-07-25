import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { cakeInputSchema } from "@/lib/validation/cake";

function isDuplicateSlugError(code: string, message: string) {
  const normalized = message.toLowerCase();
  return (
    code === "P2002" ||
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

export async function GET() {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cakes = await prisma.cake.findMany({ include: { sizes: true }, orderBy: { id: "desc" } });
  return NextResponse.json({ cakes });
}

export async function POST(request: Request) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = cakeInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid cake payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const cake = await prisma.cake.create({
      data: {
        category_id: data.categoryId,
        name: data.name,
        name_cn: data.nameCn,
        slug: data.slug,
        description: data.description,
        description_cn: data.descriptionCn,
        ingredients: data.ingredients,
        image_url: data.imageUrl,
        lead_time_days: data.leadTimeDays,
        active: data.active,
        featured: data.featured,
      },
    });

    try {
      for (const size of data.sizes) {
        await prisma.cakeSize.create({
          data: {
            cake_id: cake.id,
            size: size.size,
            price: size.price,
            available: size.available,
          },
        });
      }
    } catch (error) {
      // Best effort rollback without transaction support in HTTP mode.
      await prisma.cake.delete({ where: { id: cake.id } }).catch(() => undefined);
      const detail = error instanceof Error ? error.message : "Unknown cake size creation error";
      throw new Error(`Failed to create cake sizes: ${detail}`);
    }

    return NextResponse.json({ cake }, { status: 201 });
  } catch (error) {
    const message = getErrorText(error);
    const code = typeof error === "object" && error && "code" in error ? String((error as { code?: unknown }).code ?? "") : "";

    if (isDuplicateSlugError(code, message)) {
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
    return NextResponse.json(
      {
        error: "Failed to create cake. Please try again.",
        detail: message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}
