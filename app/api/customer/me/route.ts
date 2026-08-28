import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth/customer-session";
import { normalizeMobilePhone, parseStoredMobilePhone, phoneCountryCodeSchema } from "@/lib/phone";

const customerProfilePatchSchema = z.object({
  phone: z.string().trim().optional(),
  phoneCountry: phoneCountryCodeSchema.optional(),
  phoneNumber: z.string().trim().optional(),
});

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: session.sub },
    select: { id: true, email: true, name: true, phone: true, points: true, created_at: true },
  });

  if (!customer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ customer });
}

export async function PATCH(request: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = customerProfilePatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid contact number." }, { status: 400 });
  }

  const { phone, phoneCountry, phoneNumber } = parsed.data;

  let safePhone = "";

  if (phone) {
    const parsedPhone = parseStoredMobilePhone(phone.trim());
    if (!parsedPhone.nationalNumber) {
      return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
    }
    const normalized = normalizeMobilePhone(parsedPhone.countryCode, parsedPhone.nationalNumber);
    if (!normalized) {
      return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
    }
    safePhone = normalized;
  } else if (phoneCountry && phoneNumber) {
    const normalized = normalizeMobilePhone(phoneCountry, phoneNumber);
    if (!normalized) {
      return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
    }
    safePhone = normalized;
  } else {
    return NextResponse.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  }

  const customer = await prisma.customer.update({
    where: { id: session.sub },
    data: { phone: safePhone },
  });

  return NextResponse.json({ ok: true, message: "Contact number updated successfully.", customer });
}
