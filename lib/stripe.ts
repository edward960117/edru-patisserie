import Stripe from "stripe";

let cachedStripe: Stripe | null = null;

/** Returns a configured Stripe client, or null when STRIPE_SECRET_KEY is not set. */
export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  if (!cachedStripe) {
    cachedStripe = new Stripe(secretKey);
  }
  return cachedStripe;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
