import BackButton from "@/components/BackButton";
import { getLang } from "@/lib/i18n";
import { CANDLES } from "@/lib/candles";

export default async function CakeAccessoriesPage() {
  const lang = await getLang();

  const copy = {
    cakeAccessories: lang === "zh" ? "蛋糕配件" : "Cake Accessories",
    candleCollection: lang === "zh" ? "蜡烛系列" : "Candle Collection",
    selectCandles: lang === "zh" ? "选择您喜爱的蜡烛来装饰蛋糕" : "Select your favorite candles to decorate your cake",
    addToOrder: lang === "zh" ? "在下单时添加" : "Add when ordering",
    pricePrefix: lang === "zh" ? "S$" : "S$",
    back: lang === "zh" ? "返回" : "Back",
  };

  return (
    <section>
      {/* Header Card */}
      <div className="card-lux atelier-frame px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-2">
          <p className="text-2xl">🕯️</p>
          <BackButton lang={lang} fallbackHref="/" className="whitespace-nowrap" />
        </div>
        <h1 className="heading-serif text-[1.9rem] sm:text-5xl leading-tight">
          {copy.cakeAccessories}
        </h1>
        <p className="text-[color:var(--ink-soft)] mt-2 text-base sm:text-lg">
          {copy.candleCollection}
        </p>
        <p className="text-[0.9rem] text-[color:var(--ink-faint)] mt-4">
          {copy.selectCandles}
        </p>
      </div>

      {/* Candles Grid */}
      <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CANDLES.map((candle) => (
          <div
            key={candle.id}
            className="group card-lux flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(23,61,115,0.14)] active:scale-[0.995] transition-all duration-300"
          >
            {/* Image Container - SVG Candle Graphic */}
            <div 
              className="relative h-44 sm:h-52 w-full overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${candle.color}20, ${candle.color}05)`
              }}
            >
              <img
                src={candle.image_path}
                alt={lang === "zh" ? candle.name_cn : candle.name_en}
                className="h-32 w-24 object-contain opacity-90"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }}
              />
              
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-[color:var(--primary)] text-white rounded-full px-3 py-1 text-sm font-bold shadow-lg">
                {copy.pricePrefix}{candle.price.toFixed(2)}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h2 className="heading-serif text-[1.3rem] sm:text-xl leading-tight text-[color:var(--ink)]">
                {lang === "zh" ? candle.name_cn : candle.name_en}
              </h2>
              <p className="mt-2 text-[0.92rem] text-[color:var(--ink-faint)] line-clamp-3">
                {lang === "zh" ? candle.description_cn : candle.description_en}
              </p>

              {/* Footer */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-[0.75rem] uppercase tracking-[0.15em] text-[color:var(--primary)] font-semibold">
                  {copy.addToOrder}
                </span>
                <div 
                  className="w-6 h-6 rounded-full border-2 border-[color:var(--primary)]/30 shadow-sm"
                  style={{ backgroundColor: candle.color || "#588cd9" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className="mt-12 card-lux bg-gradient-to-br from-[color:var(--secondary)]/5 to-[color:var(--primary)]/5 rounded-2xl p-6 sm:p-8 border border-[color:var(--primary)]/20">
        <h3 className="text-lg font-semibold text-[color:var(--ink)] mb-3">
          {lang === "zh" ? "💡 提示" : "💡 Tips"}
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-[color:var(--ink-soft)]">
          {lang === "zh"
            ? "这些精美蜡烛可以在下单时作为添加项目选择。联系我们的团队，我们可以为您的蛋糕定制任何风格的蜡烛。"
            : "These beautiful candles can be selected as add-ons when placing your order. Contact our team and we can customize any style of candles for your cake."}
        </p>
      </div>
    </section>
  );
}
