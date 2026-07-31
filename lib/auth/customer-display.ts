import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCustomerSession } from "@/lib/auth/customer-session";
import { withResilientTimeout } from "@/lib/with-timeout";

/**
 * Resolves the signed-in customer's display name server-side so the greeting
 * can render with the page instead of triggering a client fetch on every
 * navigation. Wrapped in React cache() so the layout and page share a single
 * lookup per request. Returns null when signed out or if the lookup is slow.
 */
export const getCustomerDisplayName = cache(async (): Promise<string | null> => {
  const session = await getCustomerSession();
  if (!session) return null;

  try {
    const customer = await withResilientTimeout(
      () => prisma.customer.findUnique({ where: { id: session.sub }, select: { name: true, email: true } }),
      1200
    );
    if (!customer) return null;
    return customer.name?.trim() || customer.email.split("@")[0];
  } catch {
    return null;
  }
});
