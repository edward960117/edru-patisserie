import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { cakeInputSchema } from "@/lib/validation/cake";

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

  const body = await request.json();
  const parsed = cakeInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cake payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

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
      image_url: data.imageUrl,
      lead_time_days: data.leadTimeDays,
      active: data.active,
      featured: data.featured,
    },
  });

  await prisma.cakeSize.deleteMany({ where: { cake_id: cakeId } });
  await prisma.cakeSize.createMany({
    data: data.sizes.map((size) => ({ cake_id: cakeId, size: size.size, price: size.price, available: size.available })),
  });

  return NextResponse.json({ cake });
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

  await prisma.cake.delete({ where: { id: cakeId } });
  return NextResponse.json({ ok: true });
}
