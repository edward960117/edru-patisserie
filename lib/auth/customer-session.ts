import { cookies } from "next/headers";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/auth/constants";
import { verifySessionToken } from "@/lib/auth/session";

export function getCustomerSessionCookieName() {
  return CUSTOMER_SESSION_COOKIE;
}

export async function getCustomerSession() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value);
  if (!session || session.role !== "customer") {
    return null;
  }
  return session;
}
