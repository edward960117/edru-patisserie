/**
 * Site footer: contact/hours column, quick links, social, and legal bar —
 * matches the reference site's multi-column footer structure.
 */
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-xl mb-3">{t("brandName")}</h3>
          <p className="text-sm text-cream/70 leading-relaxed whitespace-pre-line">{t("footerAddress")}</p>
          <p className="text-sm text-cream/70 mt-3">{t("footerHours")}</p>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider text-gold mb-4">{t("footerExplore")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><a href="#cakes" className="hover:text-cream">{t("navCakes")}</a></li>
            <li><a href="#story" className="hover:text-cream">{t("navStory")}</a></li>
            <li><a href="#book" className="hover:text-cream">{t("navBook")}</a></li>
            <li><a href="#contact" className="hover:text-cream">{t("navContact")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider text-gold mb-4">{t("footerHelp")}</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><a href="#" className="hover:text-cream">{t("footerFaq")}</a></li>
            <li><a href="#" className="hover:text-cream">{t("footerJoinUs")}</a></li>
            <li><a href="#" className="hover:text-cream">{t("footerPrivacy")}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider text-gold mb-4">{t("footerGetInTouch")}</h4>
          <p className="text-sm text-cream/80">hello@edrupatisserie.sg</p>
          <p className="text-sm text-cream/80 mt-1">+65 6123 4567</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-sm underline hover:text-gold"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {year} {t("brandName")}. {t("footerRights")}
      </div>
    </footer>
  );
}
