import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { orderUpdateSchema } from "@/lib/validation/order";

async function requireStaff() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(getSessionCookieName())?.value);
  return session?.role === "staff";
}

function parseId(idParam: string) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = orderUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let nextCustomerId = existing.customer_id;
    if (data.customerEmail !== undefined && data.customerEmail !== "") {
      const matchedCustomer = await prisma.customer.findUnique({ where: { email: data.customerEmail.toLowerCase() } });
      if (!matchedCustomer) {
        return NextResponse.json({ error: "No member account found with that email." }, { status: 400 });
      }
      nextCustomerId = matchedCustomer.id;
    }

    const nextStatus = data.status ?? existing.status;
    const nextPrice = data.price ?? existing.price;
    const nextQuantity = data.quantity ?? existing.quantity;

    const becomingCompleted = nextStatus === "completed" && !existing.points_awarded;
    const leavingCompleted = existing.status === "completed" && existing.points_awarded && nextStatus !== "completed";

    // NOTE: the Neon HTTP adapter does not support prisma.$transaction, so these
    // are sequential (non-atomic) operations rather than a single transaction.
    if (leavingCompleted && existing.customer_id) {
      const pointsToRevert = Math.round(existing.price * existing.quantity);
      await prisma.customer.update({
        where: { id: existing.customer_id },
        data: { points: { decrement: pointsToRevert } },
      });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(data.customerName !== undefined ? { customer_name: data.customerName } : {}),
        ...(data.customerPhone !== undefined ? { customer_phone: data.customerPhone } : {}),
        ...(data.cakeName !== undefined ? { cake_name: data.cakeName } : {}),
        ...(data.size !== undefined ? { size: data.size } : {}),
        ...(data.price !== undefined ? { price: data.price } : {}),
        ...(data.quantity !== undefined ? { quantity: data.quantity } : {}),
        ...(data.fulfillment !== undefined ? { fulfillment: data.fulfillment } : {}),
        ...(data.eventDate !== undefined ? { event_date: new Date(data.eventDate) } : {}),
        ...(data.channel !== undefined ? { channel: data.channel } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
        ...(nextCustomerId !== existing.customer_id ? { customer_id: nextCustomerId } : {}),
        ...(leavingCompleted ? { points_awarded: false } : {}),
        ...(becomingCompleted && nextCustomerId ? { points_awarded: true } : {}),
      },
    });

    if (becomingCompleted && nextCustomerId) {
      const pointsToAward = Math.round(nextPrice * nextQuantity);
      await prisma.customer.update({
        where: { id: nextCustomerId },
        data: { points: { increment: pointsToAward } },
      });
    }

    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to update order." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  try {
    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete order." }, { status: 500 });
  }
}
