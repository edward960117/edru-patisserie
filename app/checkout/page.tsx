import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contact";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ cake?: string; size?: string }> }) {
  const params = await searchParams;
  const lang = await getLang();
  const copy = t(lang);
  const cakeSlug = params.cake;
  const sizeId = params.size ? Number(params.size) : null;

  const cake = cakeSlug
    ? await prisma.cake.findUnique({ where: { slug: cakeSlug }, include: { sizes: true } })
    : null;
  const size = cake && sizeId ? cake.sizes.find((item) => item.id === sizeId) : null;
  const cakeName = cake ? (lang === "zh" ? (cake.name_cn || cake.name) : cake.name) : "";
  const fulfillmentTitle = lang === "zh" ? "取货与配送" : "Pickup and Delivery";
  const pickupDetail = lang === "zh"
    ? "取货费用：免费。"
    : "Pickup fee: Free.";
  const deliveryDetail = lang === "zh"
    ? "配送费用：S$15 至 S$25，视天气情况及配送服务公司而定。"
    : "Delivery fee: S$15 to S$25, depending on weather conditions and the delivery service company.";
  const whatsappMessage = cake && size
    ? encodeURIComponent(
      lang === "zh"
        ? [
            "你好 EDRU，我想咨询下单：",
            `蛋糕：${cakeName}`,
            `尺寸（英寸）：${size.size}`,
            `价格：S$${size.price.toFixed(2)}`,
          ].join("\n")
        : [
            "Hello EDRU, I would like to place an order enquiry:",
            `Cake: ${cakeName}`,
            `Size (inches): ${size.size}`,
            `Price: S$${size.price.toFixed(2)}`,
          ].join("\n")
    )
    : encodeURIComponent(
      lang === "zh"
        ? "你好 EDRU，我想咨询蛋糕下单。"
        : "Hello EDRU, I would like to place a cake order enquiry."
    );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <section className="max-w-3xl card-lux p-7 sm:p-9">
      <p className="lux-kicker">Order Concierge</p>
      <h1 className="heading-serif mt-1 text-4xl sm:text-5xl">{copy.checkoutTitle}</h1>
      {cake && size ? (
        <div className="mt-6 space-y-2 rounded-2xl border border-[color:var(--gold)]/20 bg-[rgba(255,250,241,0.7)] p-5">
          <p><span className="text-[color:var(--ink-soft)]">Cake:</span> {cakeName}</p>
          <p><span className="text-[color:var(--ink-soft)]">Size:</span> {size.size}</p>
          <p><span className="text-[color:var(--ink-soft)]">Price:</span> S${size.price.toFixed(2)}</p>
          <p className="text-sm text-[color:var(--ink-soft)] mt-4">{copy.proceedOrderViaWhatsApp}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-lux">
              {copy.orderViaWhatsApp}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn-lux-outline">
              {copy.orderViaInstagram}
            </a>
          </div>
          <p className="text-sm text-[color:var(--ink-soft)]">{copy.orContactViaInstagram}</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-[color:var(--ink-soft)]">{copy.chooseCakeBeforeCheckout}</p>
          <div className="flex flex-wrap items-center gap-2">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-lux">
              {copy.orderViaWhatsApp}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn-lux-outline">
              {copy.orderViaInstagram}
            </a>
          </div>
          <p className="text-sm text-[color:var(--ink-soft)]">{copy.orContactViaInstagram}</p>
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)]/55 p-4">
        <p className="text-sm uppercase tracking-[0.16em] text-[color:var(--gold)]">{fulfillmentTitle}</p>
        <p className="mt-2 text-[color:var(--ink-soft)]">{pickupDetail}</p>
        <p className="mt-1 text-[color:var(--ink-soft)]">{deliveryDetail}</p>
      </div>
    </section>
  );
}
