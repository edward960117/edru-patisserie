import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import AdminDashboard from "@/components/AdminDashboard";
import LogoutButton from "@/components/LogoutButton";
import SessionIdleGuard from "@/components/SessionIdleGuard";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { getLang, t } from "@/lib/i18n";
import { readSiteAnnouncement } from "@/lib/announcement";
import { readPaymentSettings } from "@/lib/payment-settings";
import { fallbackCategories } from "@/lib/fallback-catalog";
import { withResilientTimeout } from "@/lib/with-timeout";

export default async function AdminPage() {
  const lang = await getLang();
  const copy = t(lang);
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session || session.role !== "staff") {
    redirect("/login");
  }

  let dbUnavailable = false;
  let categories = fallbackCategories.map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    name_cn: category.name_cn,
    emoji: category.emoji,
    description: category.description,
  }));
  let cakes: Prisma.CakeGetPayload<{ include: { sizes: true } }>[] = [];
  const orderListSelect = {
    id: true,
    customer_name: true,
    customer_phone: true,
    cake_name: true,
    size: true,
    price: true,
    quantity: true,
    fulfillment: true,
    event_date: true,
    channel: true,
    status: true,
    notes: true,
  } satisfies Prisma.OrderSelect;
  let orders: Prisma.OrderGetPayload<{ select: typeof orderListSelect }>[] = [];
  let announcement = await readSiteAnnouncement();
  let paymentSettings = await readPaymentSettings();

  try {
    const [dbCategories, dbCakes, dbOrders, dbAnnouncement, dbPaymentSettings] = await Promise.all([
      withResilientTimeout(() => prisma.category.findMany({ orderBy: { id: "asc" } }), 1600),
      withResilientTimeout(() => prisma.cake.findMany({ include: { sizes: true }, orderBy: { id: "desc" } }), 1800),
      withResilientTimeout(
        () =>
          prisma.order.findMany({
            orderBy: { event_date: "asc" },
            select: orderListSelect,
          }),
        1800
      ),
      readSiteAnnouncement(),
      readPaymentSettings(),
    ]);

    categories = dbCategories;
    cakes = dbCakes;
    orders = dbOrders;
    announcement = dbAnnouncement;
    paymentSettings = dbPaymentSettings;
  } catch {
    dbUnavailable = true;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SessionIdleGuard lang={lang} />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="heading-serif text-4xl">{copy.adminTitle}</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-[color:var(--ink-soft)]">{copy.adminWelcome}</p>
          <LogoutButton lang={lang} />
        </div>
      </div>
      {dbUnavailable ? (
        <p className="mb-5 rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]">
          {lang === "zh"
            ? "数据库暂时不可用，后台已进入离线模式。可查看页面，但新增/编辑需等待数据库恢复。"
            : "Database is temporarily unavailable. Admin is in offline mode; you can view the page, but create/edit actions require database recovery."}
        </p>
      ) : null}
      <AdminDashboard
        lang={lang}
        categories={categories}
        initialCakes={cakes}
        initialOrders={orders.map((order) => ({
          id: order.id,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          cake_name: order.cake_name,
          size: order.size,
          price: order.price,
          quantity: order.quantity,
          fulfillment: order.fulfillment,
          event_date: order.event_date.toISOString(),
          channel: order.channel,
          status: order.status,
          notes: order.notes,
        }))}
        dbUnavailable={dbUnavailable}
        initialAnnouncement={announcement}
        initialPaymentSettings={paymentSettings}
      />
    </section>
  );
}
