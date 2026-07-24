import { useLanguage } from "../i18n/LanguageContext";

/**
 * Split "our story" section: image on one side, narrative + CTA on the
 * other — mirrors the reference site's "Our maison" editorial block.
 */
export default function StoryBanner() {
  const { t } = useLanguage();

  return (
    <section id="story" className="bg-cream-dark py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <p className="uppercase tracking-[0.3em] text-xs text-gold mb-3">{t("storyEyebrow")}</p>
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">{t("storyTitle")}</h2>
          <p className="text-sm sm:text-base text-charcoal-soft leading-relaxed mb-6">{t("storyDesc")}</p>
          <a
            href="#contact"
            className="inline-block border border-charcoal px-6 py-3 text-xs sm:text-sm uppercase tracking-wider hover:bg-charcoal hover:text-cream transition-colors"
          >
            {t("storyCta")}
          </a>
        </div>
        {/* DISABLED: image showing pastry chef - removed per request */}
        {/* <div className="order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80&auto=format&fit=crop"
            alt="Pastry chef finishing a cake at ÈDRU PATISSERIE"
            className="w-full h-80 sm:h-[420px] object-cover rounded-lg"
          />
        </div> */}
      </div>
    </section>
  );
}
