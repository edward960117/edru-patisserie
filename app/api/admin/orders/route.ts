import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { orderInputSchema } from "@/lib/validation/order";
import { ImageOptimizationError, optimizeImageUrlForStorage } from "@/lib/image";

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

  // Exclude heavy fields (source screenshot, raw OCR text) not used by the calendar/list view.
  const orders = await prisma.order.findMany({
    orderBy: { event_date: "asc" },
    select: {
      id: true,
      customer_name: true,
      customer_phone: true,
      cake_name: true,
      size: true,
      price: true,
      quantity: true,
      fulfillment: true,
      event_date: true,
      channel: true,
      status: true,
      notes: true,
    },
  });
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = orderInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const optimizedSourceImageUrl = await optimizeImageUrlForStorage(data.sourceImageUrl);

    let customerId: number | null = null;
    if (data.customerEmail) {
      const matchedCustomer = await prisma.customer.findUnique({ where: { email: data.customerEmail.toLowerCase() } });
      if (!matchedCustomer) {
        return NextResponse.json({ error: "No member account found with that email." }, { status: 400 });
      }
      customerId = matchedCustomer.id;
    }

    const awardOnCreate = data.status === "completed" && customerId !== null;

    // NOTE: the Neon HTTP adapter does not support prisma.$transaction, so the
    // create + points increment are done as sequential (non-atomic) operations.
    const order = await prisma.order.create({
      data: {
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        cake_name: data.cakeName,
        size: data.size,
        price: data.price,
        quantity: data.quantity,
        fulfillment: data.fulfillment,
        event_date: new Date(data.eventDate),
        channel: data.channel,
        status: data.status,
        notes: data.notes,
        source_image_url: optimizedSourceImageUrl,
        raw_extracted_text: data.rawExtractedText,
        customer_id: customerId,
        points_awarded: awardOnCreate,
      },
    });

    if (awardOnCreate && customerId) {
      const pointsToAward = Math.round(data.price * data.quantity);
      await prisma.customer.update({ where: { id: customerId }, data: { points: { increment: pointsToAward } } });
    }

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof ImageOptimizationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save order." }, { status: 500 });
  }
}
