import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { getCustomerSession } from "@/lib/auth/customer-session";
import { CANDLES } from "@/lib/candles";
import { normalizeMobilePhone, phoneCountryCodeSchema } from "@/lib/phone";

export const runtime = "nodejs";

// Server-side authoritative add-on prices (never trust client amounts).
const ADDON_PRICES: Record<string, { price: number; label_en: string; label_cn: string }> = {
  utensils: { price: 8, label_en: "Cutlery Set (Spoons & Forks)", label_cn: "餐具套装（勺子和叉子）" },
  napkins: { price: 3, label_en: "Premium Napkins", label_cn: "优质纸巾" },
};

const payloadSchema = z.object({
  cakeSlug: z.string().min(1),
  sizeId: z.number().int().positive(),
  fulfillment: z.enum(["pickup", "delivery"]),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  addOnIds: z.array(z.string()).default([]),
  candleId: z.string().nullable().default(null),
  customerPhoneCountry: phoneCountryCodeSchema,
  customerPhoneNumber: z.string().trim().min(1),
  lang: z.enum(["zh", "en"]).default("en"),
});

function getOrigin(request: Request): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Online payment is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order details." }, { status: 400 });
  }
  const data = parsed.data;
  const isZh = data.lang === "zh";
  const customerPhone = normalizeMobilePhone(data.customerPhoneCountry, data.customerPhoneNumber);
  if (!customerPhone) {
    return NextResponse.json({ error: "Please enter a valid mobile number for the selected country." }, { status: 400 });
  }

  // Authoritative cake + size from the database.
  const cake = await prisma.cake.findUnique({
    where: { slug: data.cakeSlug },
    include: { sizes: true },
  });
  if (!cake) {
    return NextResponse.json({ error: "Cake not found." }, { status: 404 });
  }
  const size = cake.sizes.find((item) => item.id === data.sizeId && item.available);
  if (!size) {
    return NextResponse.json({ error: "Selected size is unavailable." }, { status: 404 });
  }

  const cakeName = isZh ? cake.name_cn || cake.name : cake.name;

  const lineItems: Array<{ price_data: { currency: string; unit_amount: number; product_data: { name: string } }; quantity: number }> = [];
  lineItems.push({
    price_data: {
      currency: "sgd",
      unit_amount: Math.round(size.price * 100),
      product_data: { name: `${cakeName} · ${size.size}"` },
    },
    quantity: 1,
  });

  const addOnSummary: string[] = [];

  for (const id of data.addOnIds) {
    if (id === "nothing") continue;
    if (id === "candles") {
      const candle = data.candleId ? CANDLES.find((c) => c.id === data.candleId) : null;
      if (!candle) {
        return NextResponse.json({ error: "Please choose a candle style." }, { status: 400 });
      }
      const label = isZh ? candle.name_cn : candle.name_en;
      lineItems.push({
        price_data: { currency: "sgd", unit_amount: Math.round(candle.price * 100), product_data: { name: label } },
        quantity: 1,
      });
      addOnSummary.push(`${isZh ? candle.name_cn : candle.name_en}: S$${candle.price.toFixed(2)}`);
      continue;
    }
    const addon = ADDON_PRICES[id];
    if (!addon) {
      return NextResponse.json({ error: "Unknown add-on." }, { status: 400 });
    }
    const label = isZh ? addon.label_cn : addon.label_en;
    lineItems.push({
      price_data: { currency: "sgd", unit_amount: Math.round(addon.price * 100), product_data: { name: label } },
      quantity: 1,
    });
    addOnSummary.push(`${label}: S$${addon.price.toFixed(2)}`);
  }

  // Attach the logged-in member (if any) so points are awarded on success.
  const session = await getCustomerSession();
  let customerEmail = "";
  if (session) {
    const customer = await prisma.customer
      .findUnique({ where: { id: session.sub }, select: { email: true } })
      .catch(() => null);
    if (customer) customerEmail = customer.email;
  }

  const fulfillmentLabel = data.fulfillment === "pickup" ? (isZh ? "到店自取" : "Store Pickup") : (isZh ? "配送上门" : "Delivery");
  const notesParts = [
    `${isZh ? "取货方式" : "Fulfillment"}: ${fulfillmentLabel}`,
    `${isZh ? "日期" : "Date"}: ${data.eventDate}`,
  ];
  if (addOnSummary.length > 0) {
    notesParts.push(`${isZh ? "添加项目" : "Add-ons"}: ${addOnSummary.join(", ")}`);
  }

  const origin = getOrigin(request);

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "paynow"],
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      metadata: {
        lang: data.lang,
        cakeName,
        cakeSlug: data.cakeSlug,
        size: size.size,
        fulfillment: fulfillmentLabel,
        eventDate: data.eventDate,
        customerEmail,
        customerPhone,
        notes: notesParts.join(" | "),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?cake=${encodeURIComponent(data.cakeSlug)}&size=${data.sizeId}`,
    });

    if (!checkoutSession.url) {
      return NextResponse.json({ error: "Could not start payment." }, { status: 502 });
    }
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
