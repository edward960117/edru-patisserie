import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { getCustomerSession } from "@/lib/auth/customer-session";
import { withResilientTimeout } from "@/lib/with-timeout";
import CustomerLogoutButton from "@/components/CustomerLogoutButton";

export default async function AccountPage() {
  const lang = await getLang();
  const copy = t(lang);
  const session = await getCustomerSession();

  if (!session) {
    redirect("/login/customer?next=/account");
  }

  const customer = await withResilientTimeout(
    () =>
      prisma.customer.findUnique({
        where: { id: session.sub },
        select: { email: true, name: true, points: true, created_at: true },
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

  const displayName = customer.name?.trim() || customer.email.split("@")[0];

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <article className="detail-card card-lux atelier-frame p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[color:var(--primary)]">
              {copy.customerWelcome}, {displayName}
            </p>
            <h1 className="heading-serif mt-1 text-3xl sm:text-4xl">{copy.customerAccountTitle}</h1>
          </div>
          <CustomerLogoutButton lang={lang} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{copy.customerEmailLabel}</p>
            <p className="mt-1 font-medium">{customer.email}</p>
          </div>
          <div className="rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{copy.customerMemberSince}</p>
            <p className="mt-1 font-medium">{memberSince}</p>
          </div>
          <div className="rounded-xl border border-[color:var(--primary)]/30 bg-[color:var(--bg-soft)]/70 px-4 py-3 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{copy.customerPointsBalance}</p>
            <p className="mt-1 text-2xl font-bold text-[color:var(--primary)]">{customer.points}</p>
          </div>
        </div>
      </article>

      <article className="detail-card card-lux atelier-frame p-6 sm:p-8">
        <h2 className="text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.customerOrdersTitle}</h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-[color:var(--ink-faint)]">{copy.customerNoOrders}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3"
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
