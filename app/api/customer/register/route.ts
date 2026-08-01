import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth/session";
import { getCustomerSessionCookieName } from "@/lib/auth/customer-session";
import { hashPassword } from "@/lib/auth/password";
import { customerRegisterSchema } from "@/lib/validation/customer";
import { normalizeMobilePhone } from "@/lib/phone";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = customerRegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { email, password, name, phoneCountry, phoneNumber } = parsed.data;
  const normalizedPhone = normalizeMobilePhone(phoneCountry, phoneNumber);
  if (!normalizedPhone) {
    return NextResponse.json({ error: "Enter a valid mobile number for the selected country." }, { status: 400 });
  }

  try {
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const customer = await prisma.customer.create({
      data: { email, password_hash: passwordHash, name, phone: normalizedPhone },
    });

    const token = createSessionToken(customer.id, "customer");
    const response = NextResponse.json({ ok: true });
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const isHttps = forwardedProto === "https" || request.url.startsWith("https://");
    response.cookies.set(getCustomerSessionCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isHttps,
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unable to create account right now. Please try again." }, { status: 503 });
  }
}
