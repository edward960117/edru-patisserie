import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { readPaymentSettings, writePaymentSettings } from "@/lib/payment-settings";

async function requireStaff() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(getSessionCookieName())?.value);
  return session?.role === "staff";
}

export async function GET() {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const paymentSettings = await readPaymentSettings();
  return NextResponse.json({ paymentSettings });
}

export async function PUT(request: Request) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { bankTransferEnabled?: boolean };
    const next = { bankTransferEnabled: Boolean(body.bankTransferEnabled) };

    await writePaymentSettings(next);
    revalidatePath("/checkout");
    return NextResponse.json({ ok: true, paymentSettings: next });
  } catch {
    return NextResponse.json({ error: "Failed to update payment settings. Please try again." }, { status: 500 });
  }
}
