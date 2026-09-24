import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { getCustomerSession } from "@/lib/auth/customer-session";
import { withResilientTimeout } from "@/lib/with-timeout";
import CustomerAccountPanel from "@/components/CustomerAccountPanel";

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: Promise<{ status?: string }>;
}) {
  const lang = await getLang();
  const copy = t(lang);
  const params = searchParams ? await searchParams : {};
  const session = await getCustomerSession();

  if (!session) {
    redirect("/login/customer?next=/account");
  }

  const customer = await withResilientTimeout(
    () =>
      prisma.customer.findUnique({
        where: { id: session.sub },
        select: { email: true, name: true, phone: true, points: true, created_at: true },
      }),
    5000
  ).catch(() => null);

  if (!customer) {
    redirect("/login/customer?next=/account");
  }

  const orders = await withResilientTimeout(
    () =>
      prisma.order.findMany({
        where: { customer_id: session.sub },
        orderBy: { event_date: "desc" },
        select: { id: true, cake_name: true, size: true, price: true, quantity: true, event_date: true, status: true },
      }),
    5000
  ).catch(() => []);

  const memberSince = new Intl.DateTimeFormat(lang === "zh" ? "zh-SG" : "en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(customer.created_at);

  const successMessage = params.status === "registered"
    ? (lang === "zh" ? "账户注册成功，已进入你的账户。" : "Account registered successfully. You are now signed in.")
    : params.status === "signed_in"
      ? (lang === "zh" ? "登录成功。" : "Signed in successfully.")
      : null;

  return (
    <section className="account-shell mx-auto max-w-5xl space-y-6">
      <div className="account-hero card-lux atelier-frame overflow-hidden p-5 sm:p-7">
        <div className="account-hero__glow" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="lux-kicker">Member portal</p>
            <h1 className="heading-serif mt-2 text-[2.4rem] leading-[0.95] text-[color:var(--ink)] sm:text-[3.3rem]">
              {copy.customerAccountTitle}
            </h1>
          </div>
          <div className="account-badge">
            {lang === "zh" ? "专属会员中心" : "Private member lounge"}
          </div>
        </div>
      </div>

      <CustomerAccountPanel
        lang={lang}
        customer={customer}
        successMessage={successMessage}
      />

      <article className="detail-card card-lux atelier-frame p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.customerOrdersTitle}</h2>
          <span className="account-badge account-badge--soft">{orders.length}</span>
        </div>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-[color:var(--ink-faint)]">{copy.customerNoOrders}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-[18px] border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3 shadow-[0_12px_22px_rgba(88,140,217,0.06)]"
              >
                <div>
                  <p className="font-medium">
                    {order.cake_name} {order.size ? `(${order.size})` : ""}
                  </p>
                  <p className="text-xs text-[color:var(--ink-faint)]">
                    {new Intl.DateTimeFormat(lang === "zh" ? "zh-SG" : "en-SG", { dateStyle: "medium" }).format(order.event_date)}
                    {" · "}
                    {order.status}
                  </p>
                </div>
                <span className="price-callout text-[color:var(--gold-deep)] font-semibold">
                  S${(order.price * order.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
