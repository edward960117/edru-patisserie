import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export interface FulfillResult {
  orderId: number;
  alreadyFulfilled: boolean;
  pointsAwarded: number;
  cakeName: string;
  amountPaid: number;
  memberEmail: string | null;
}

/**
 * Idempotently turns a paid Stripe Checkout Session into an Order and awards
 * loyalty points. Safe to call multiple times for the same session (webhook +
 * success-page fallback) — keyed on the unique stripe_session_id column.
 */
export async function fulfillCheckoutSession(session: Stripe.Checkout.Session): Promise<FulfillResult> {
  const meta = session.metadata ?? {};
  const amountPaid = (session.amount_total ?? 0) / 100;

  const existing = await prisma.order.findUnique({ where: { stripe_session_id: session.id } });
  if (existing) {
    return {
      orderId: existing.id,
      alreadyFulfilled: true,
      pointsAwarded: 0,
      cakeName: existing.cake_name,
      amountPaid: existing.price,
      memberEmail: meta.customerEmail || session.customer_details?.email || null,
    };
  }

  const email = (meta.customerEmail || session.customer_details?.email || "").trim().toLowerCase();
  let customerId: number | null = null;
  if (email) {
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (customer) customerId = customer.id;
  }

  const points = customerId ? Math.round(amountPaid) : 0;

  const order = await prisma.order.create({
    data: {
      customer_name: meta.customerName || "",
      customer_phone: meta.customerPhone || "",
      cake_name: meta.cakeName || "",
      size: meta.size || "",
      price: amountPaid,
      quantity: 1,
      fulfillment: meta.fulfillment || "",
      event_date: meta.eventDate ? new Date(meta.eventDate) : new Date(),
      channel: "other",
      status: "confirmed",
      notes: meta.notes || "",
      customer_id: customerId,
      points_awarded: points > 0,
      stripe_session_id: session.id,
    },
  });

  if (points > 0 && customerId) {
    await prisma.customer.update({ where: { id: customerId }, data: { points: { increment: points } } });
  }

  return {
    orderId: order.id,
    alreadyFulfilled: false,
    pointsAwarded: points,
    cakeName: order.cake_name,
    amountPaid,
    memberEmail: email || null,
  };
}
