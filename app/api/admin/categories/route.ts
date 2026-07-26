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

export async function GET() {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ error: "Failed to load categories." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = categoryInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid category payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const category = await prisma.category.create({
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
    revalidatePath(`/categories/${data.slug}`);

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error";
    if (isDuplicateSlugError(message)) {
      return NextResponse.json({ error: "Slug already exists. Please use another slug." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}