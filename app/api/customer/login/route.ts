import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth/session";
import { getCustomerSessionCookieName } from "@/lib/auth/customer-session";
import { verifyPassword } from "@/lib/auth/password";
import { customerLoginSchema } from "@/lib/validation/customer";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = customerLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  try {
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer || !customer.active) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await verifyPassword(customer.password_hash, password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

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
    return NextResponse.json({ error: "Login service unavailable right now. Please try again." }, { status: 503 });
  }
}
