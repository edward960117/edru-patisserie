import test from "node:test";
import assert from "node:assert/strict";

import { normalizePaymentSettings, isOnlinePaymentEnabled } from "./payment-settings";

test("normalizePaymentSettings includes stripe toggle with a safe default", () => {
  assert.deepEqual(normalizePaymentSettings({}), {
    bankTransferEnabled: true,
    stripeEnabled: true,
  });
});

test("online payment is hidden when Stripe is disabled in settings", () => {
  const settings = normalizePaymentSettings({ bankTransferEnabled: true, stripeEnabled: false });
  assert.equal(isOnlinePaymentEnabled(settings, true), false);
});

test("online payment stays hidden when Stripe is not configured", () => {
  const settings = normalizePaymentSettings({ bankTransferEnabled: true, stripeEnabled: true });
  assert.equal(isOnlinePaymentEnabled(settings, false), false);
});
