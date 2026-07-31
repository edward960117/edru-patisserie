import { NextResponse } from "next/server";
import { getCustomerSessionCookieName } from "@/lib/auth/customer-session";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getCustomerSessionCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
