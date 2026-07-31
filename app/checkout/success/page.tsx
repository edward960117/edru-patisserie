import Link from "next/link";
import { getLang } from "@/lib/i18n";
import { getStripe } from "@/lib/stripe";
import { fulfillCheckoutSession } from "@/lib/payment/fulfill";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const lang = await getLang();
  const isZh = lang === "zh";
  const sessionId = params.session_id;

  let paid = false;
  let cakeName = "";
  let amountPaid = 0;
  let pointsAwarded = 0;
  let memberEmail: string | null = null;

  const stripe = getStripe();
  if (stripe && sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.payment_status === "paid") {
        paid = true;
        // Fallback fulfillment: idempotent, covers environments without a webhook.
        const result = await fulfillCheckoutSession(session);
        cakeName = result.cakeName;
        amountPaid = result.amountPaid;
        pointsAwarded = result.pointsAwarded;
        memberEmail = result.memberEmail;
      }
    } catch (error) {
      console.error("Failed to verify Stripe session on success page:", error);
    }
  }

  return (
    <section className="mx-auto max-w-xl card-lux p-6 text-center sm:p-10">
      {paid ? (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--primary)]/12 text-3xl">
            ✓
          </div>
          <h1 className="heading-serif mt-5 text-3xl font-bold text-[color:var(--ink)] sm:text-4xl">
            {isZh ? "付款成功" : "Payment Successful"}
          </h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            {isZh
              ? "感谢您的订购！我们已收到您的付款，店家会尽快与您联系确认蛋糕细节。"
              : "Thank you for your order! We have received your payment and our team will be in touch shortly to confirm the details."}
          </p>

          <div className="mt-6 space-y-2 rounded-2xl border border-[color:var(--gold)]/25 bg-[rgba(255,250,241,0.65)] p-4 text-left text-sm">
            {cakeName ? (
              <p className="flex justify-between gap-4">
                <span className="text-[color:var(--ink-soft)]">{isZh ? "蛋糕" : "Cake"}</span>
                <span className="font-medium text-[color:var(--ink)]">{cakeName}</span>
              </p>
            ) : null}
            <p className="flex justify-between gap-4">
              <span className="text-[color:var(--ink-soft)]">{isZh ? "已付金额" : "Amount paid"}</span>
              <span className="font-medium text-[color:var(--ink)]">S${amountPaid.toFixed(2)}</span>
            </p>
          </div>

          {memberEmail ? (
            <div className="mt-4 rounded-2xl border border-[color:var(--primary)]/25 bg-[color:var(--primary)]/8 p-4">
              {pointsAwarded > 0 ? (
                <p className="text-sm text-[color:var(--ink)]">
                  {isZh ? (
                    <>本次消费为您累积 <span className="font-bold text-[color:var(--primary)]">{pointsAwarded}</span> 积分，已存入您的账户。</>
                  ) : (
                    <>You earned <span className="font-bold text-[color:var(--primary)]">{pointsAwarded}</span> loyalty points, added to your account.</>
                  )}
                </p>
              ) : (
                <p className="text-sm text-[color:var(--ink-soft)]">
                  {isZh ? "积分已记录到您的会员账户。" : "Your points have been recorded on your member account."}
                </p>
              )}
            </div>
          ) : (
            <p className="mt-4 text-xs text-[color:var(--ink-soft)]/80">
              {isZh
                ? "登录会员账户下单即可自动累积积分。"
                : "Log in to your member account before ordering to earn loyalty points automatically."}
            </p>
          )}

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link href="/account" className="btn-lux w-full sm:w-auto text-center">
              {isZh ? "查看我的账户" : "View My Account"}
            </Link>
            <Link href="/" className="btn-lux-outline w-full sm:w-auto text-center">
              {isZh ? "返回首页" : "Back to Home"}
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--ink-soft)]/12 text-3xl">
            !
          </div>
          <h1 className="heading-serif mt-5 text-2xl font-bold text-[color:var(--ink)] sm:text-3xl">
            {isZh ? "无法确认付款" : "Payment Not Confirmed"}
          </h1>
          <p className="mt-3 text-[color:var(--ink-soft)]">
            {isZh
              ? "我们暂时无法确认这笔付款。如果您已完成支付，请通过 WhatsApp 联系店家协助核实。"
              : "We could not confirm this payment. If you have already paid, please contact us on WhatsApp and we will help verify it."}
          </p>
          <div className="mt-7">
            <Link href="/" className="btn-lux w-full sm:w-auto text-center">
              {isZh ? "返回首页" : "Back to Home"}
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
