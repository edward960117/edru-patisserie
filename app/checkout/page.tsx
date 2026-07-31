import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getLang, t } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/contact";
import { getFallbackCakeBySlug } from "@/lib/fallback-catalog";
import CheckoutOrderForm from "@/components/CheckoutOrderForm";
import WeChatQrButton from "@/components/WeChatQrButton";
import BankTransferButton from "@/components/BankTransferButton";
import BackButton from "@/components/BackButton";
import { withResilientTimeout } from "@/lib/with-timeout";
import { readPaymentSettings } from "@/lib/payment-settings";

const getCheckoutCakeBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.cake.findUnique({ where: { slug }, include: { sizes: true } });
  },
  ["checkout-cake-by-slug"],
  { revalidate: 300, tags: ["cakes"] }
);

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ cake?: string; size?: string }> }) {
  const params = await searchParams;
  const lang = await getLang();
  const copy = t(lang);
  const cakeSlug = params.cake;
  const sizeId = params.size ? Number(params.size) : null;
  const paymentSettings = await readPaymentSettings();

  let cake = null;
  try {
    cake = cakeSlug
      ? await withResilientTimeout(() => getCheckoutCakeBySlug(cakeSlug), 5000)
      : null;
  } catch {
    // Database unavailable — try fallback
    cake = null;
  }
  
  // Use fallback cake data if database unavailable
  if (!cake && cakeSlug) {
    const fallbackCake = getFallbackCakeBySlug(cakeSlug);
    if (fallbackCake) {
      cake = {
        id: fallbackCake.id,
        slug: fallbackCake.slug,
        name: fallbackCake.name,
        name_cn: fallbackCake.name_cn,
        image_url: fallbackCake.image_url,
        lead_time_days: fallbackCake.lead_time_days,
        sizes: fallbackCake.sizes || [],
      } as any;
    }
  }
  
  const size = cake && sizeId ? cake.sizes.find((item: any) => item.id === sizeId) : null;
  const cakeName = cake ? (lang === "zh" ? (cake.name_cn || cake.name) : cake.name) : "";
  const fulfillmentTitle = lang === "zh" ? "取货与配送" : "Pickup and Delivery";
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
          <CheckoutOrderForm
            cakeName={cakeName}
            cakeSlug={cakeSlug || ""}
            sizeId={sizeId || 0}
            sizeSize={size.size}
            sizePrice={size.price}
            leadTimeDays={cake.lead_time_days ?? 3}
            lang={lang}
            whatsappNumber={WHATSAPP_NUMBER}
            baseMessage={whatsappRawMessage}
            copy={copy}
            bankTransferEnabled={paymentSettings.bankTransferEnabled}
          />
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <p className={helperTextClass}>{copy.chooseCakeBeforeCheckout}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2.5">
            <span className="relative inline-block w-full sm:w-auto">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-lux w-full sm:w-auto whitespace-normal text-center">
                {copy.orderViaWhatsApp}
              </a>
              <span className="absolute -top-2.5 -right-2 rounded-full bg-[color:var(--secondary)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
                {lang === "zh" ? "推荐" : "Recommended"}
              </span>
            </span>
            <WeChatQrButton lang={lang} className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center" orderDetails={whatsappRawMessage} />
            {paymentSettings.bankTransferEnabled ? (
              <BankTransferButton lang={lang} className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center" />
            ) : null}
          </div>
          <p className="text-xs text-[color:var(--ink-soft)]/80">
            {lang === "zh"
              ? "推荐使用 WhatsApp 下单，回复更快。微信也依然可用。"
              : "We recommend ordering via WhatsApp for the fastest response. WeChat is also available."}
          </p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)]/55 p-4">
        <p className="text-sm uppercase tracking-[0.16em] text-[color:var(--gold)]">{fulfillmentTitle}</p>

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
