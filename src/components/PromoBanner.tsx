import { useLanguage } from "../i18n/LanguageContext";

/**
 * Seasonal promo banner — recreates the reference site's mid-page
 * announcement (e.g. "Mooncakes Collection") used to spotlight limited
 * edition products or events.
 */
export default function PromoBanner() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 text-center text-cream overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600&q=80&auto=format&fit=crop"
        alt="Seasonal cake collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <p className="uppercase tracking-[0.3em] text-xs mb-3">{t("promoEyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl mb-4">{t("promoTitle")}</h2>
        <p className="text-sm sm:text-base text-cream/90 mb-8">{t("promoDesc")}</p>
        <a
          href="#cakes"
          className="inline-block bg-cream text-charcoal px-8 py-3 text-sm uppercase tracking-wider hover:bg-gold hover:text-cream transition-colors"
        >
          {t("promoCta")}
        </a>
      </div>
    </section>
  );
}
