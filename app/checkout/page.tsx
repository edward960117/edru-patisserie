import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getLang, t } from "@/lib/i18n";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contact";
import WeChatQrButton from "@/components/WeChatQrButton";
import BackButton from "@/components/BackButton";
import { withTimeout } from "@/lib/with-timeout";

const getCheckoutCakeBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.cake.findUnique({ where: { slug }, include: { sizes: true } });
  },
  ["checkout-cake-by-slug"],
  { revalidate: 300 }
);

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ cake?: string; size?: string }> }) {
  const params = await searchParams;
  const lang = await getLang();
  const copy = t(lang);
  const cakeSlug = params.cake;
  const sizeId = params.size ? Number(params.size) : null;

  let cake = null;
  try {
    cake = cakeSlug
      ? await withTimeout(getCheckoutCakeBySlug(cakeSlug), 1600)
      : null;
  } catch {
    // Database unavailable — render checkout without cake details.
  }
  const size = cake && sizeId ? cake.sizes.find((item) => item.id === sizeId) : null;
  const cakeName = cake ? (lang === "zh" ? (cake.name_cn || cake.name) : cake.name) : "";
  const weChatCakeSize = size ? (lang === "zh" ? `${size.size} 英寸` : `${size.size} inches`) : "";
  const fulfillmentTitle = lang === "zh" ? "取货与配送" : "Pickup and Delivery";
  const pickupLabel = lang === "zh" ? "取货费用：" : "Pickup fee:";
  const pickupValue = lang === "zh" ? "免费。" : "Free.";
  const deliveryLabel = lang === "zh" ? "配送费用：" : "Delivery fee:";
  const deliveryValue = lang === "zh"
    ? "S$15 至 S$25，视天气情况及配送服务公司而定。"
    : "S$15 to S$25, depending on weather conditions and the delivery service company.";
  const whatsappRawMessage = cake && size
    ? (lang === "zh"
        ? [
            "你好 BLUE ISLET，我想咨询下单：",
            `蛋糕：${cakeName}`,
            `尺寸（英寸）：${size.size}`,
            `价格：S$${size.price.toFixed(2)}`,
          ].join("\n")
        : [
            "Hello BLUE ISLET, I would like to place an order enquiry:",
            `Cake: ${cakeName}`,
            `Size (inches): ${size.size}`,
            `Price: S$${size.price.toFixed(2)}`,
          ].join("\n"))
    : cake
      ? (lang === "zh"
          ? [
              "你好 BLUE ISLET，我想咨询蛋糕下单：",
              `蛋糕：${cakeName}`,
              "我还没决定尺寸，请推荐。",
            ].join("\n")
          : [
              "Hello BLUE ISLET, I would like to place a cake order enquiry:",
              `Cake: ${cakeName}`,
              "I have not decided on the size yet. Please recommend.",
            ].join("\n"))
      : (lang === "zh"
          ? "你好 BLUE ISLET，我想咨询蛋糕下单。"
          : "Hello BLUE ISLET, I would like to place a cake order enquiry.");
  const whatsappMessage = encodeURIComponent(whatsappRawMessage);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  const helperTextClass = "text-left text-sm leading-relaxed text-[color:var(--ink-soft)]";
  const termsItems = copy.checkoutTermsItems.split("|").map((item) => item.trim()).filter(Boolean);

  function emphasizeTerms(item: string) {
    const highlights = lang === "zh"
      ? ["竹签", "支撑棒", "请勿", "脸部", "身体", "误伤", "下单前", "主动联系店家", "移除", "本店恕不承担责任"]
      : ["bamboo skewers", "support dowels", "do not", "face", "body", "accidental injury", "in advance", "contact the shop", "removed", "not liable"];

    const escaped = highlights.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
    const chunks = item.split(pattern);

    return chunks.map((chunk, index) => {
      const matched = highlights.some((term) => term.toLowerCase() === chunk.toLowerCase());
      return matched
        ? <strong key={`${item}-${index}`} className="font-semibold text-[color:var(--ink)]">{chunk}</strong>
        : <span key={`${item}-${index}`}>{chunk}</span>;
    });
  }

  return (
    <section className="max-w-3xl card-lux p-5 sm:p-9">
      <div className="mb-3 flex items-center justify-between gap-3 sm:mb-2">
        <p className="lux-kicker">{copy.orderConcierge}</p>
        <BackButton lang={lang} fallbackHref="/" className="whitespace-nowrap" />
      </div>
      <h1 className="heading-serif mt-1 text-[1.9rem] font-bold leading-tight sm:text-5xl">{copy.checkoutTitle}</h1>
      {cake && size ? (
        <div className="mt-5 space-y-2 rounded-2xl border border-[color:var(--gold)]/20 bg-[rgba(255,250,241,0.7)] p-4 sm:p-5">
          <p><span className="text-[color:var(--ink-soft)]">{copy.cakeLabel}:</span> {cakeName}</p>
          <p><span className="text-[color:var(--ink-soft)]">{copy.sizeLabel}:</span> {size.size}</p>
          <p><span className="text-[color:var(--ink-soft)]">{copy.priceLabel}:</span> S${size.price.toFixed(2)}</p>
          <p className={`${helperTextClass} mt-4`}>{copy.proceedOrderViaWhatsApp}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-lux w-full sm:w-auto whitespace-normal text-center">
              {copy.orderViaWhatsApp}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center">
              {copy.orderViaInstagram}
            </a>
            <WeChatQrButton
              lang={lang}
              className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center"
              orderDetails={{ cakeName, cakeSize: weChatCakeSize, cakePrice: `S$${size.price.toFixed(2)}` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <p className={helperTextClass}>{copy.chooseCakeBeforeCheckout}</p>
          <div className="mt-1 flex flex-wrap gap-2.5">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-lux w-full sm:w-auto whitespace-normal text-center">
              {copy.orderViaWhatsApp}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center">
              {copy.orderViaInstagram}
            </a>
            <WeChatQrButton lang={lang} className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center" />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)]/55 p-4">
        <p className="text-sm uppercase tracking-[0.16em] text-[color:var(--gold)]">{fulfillmentTitle}</p>
        <p className="mt-2 text-[color:var(--ink-soft)]"><span className="font-semibold text-[color:var(--ink)]">{pickupLabel}</span>{pickupValue}</p>
        <p className="mt-1 text-[color:var(--ink-soft)]"><span className="font-semibold text-[color:var(--ink)]">{deliveryLabel}</span>{deliveryValue}</p>

        <details className="mt-4 rounded-xl border border-[color:var(--gold)]/25 bg-white/60 px-3 py-2.5">
          <summary className="cursor-pointer select-none text-sm font-semibold text-[color:var(--ink)] hover:text-[color:var(--gold-deep)]">
            {copy.checkoutTermsToggle}
          </summary>
          <ul className="mt-2 space-y-1.5 pl-4 text-sm leading-relaxed text-[color:var(--ink-soft)]">
            {termsItems.map((item) => (
              <li key={item} className="list-disc">
                {emphasizeTerms(item)}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
