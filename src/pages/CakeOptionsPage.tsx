import { Link, Navigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useLanguage } from "../i18n/LanguageContext";

export default function CakeOptionsPage() {
  const { productId } = useParams();
  const { lang, t } = useLanguage();

  if (!productId) {
    return <Navigate to="/" replace />;
  }

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <p className="uppercase tracking-[0.25em] text-xs text-gold mb-2">{t("optionNotFound")}</p>
        <Link to="/" className="inline-flex mt-6 px-5 py-2 rounded-full border border-charcoal/20 hover:border-gold hover:text-gold transition-colors">
          {t("optionPageBack")}
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <p className="uppercase tracking-[0.25em] text-xs text-gold mb-2">{product.category}</p>
      <h1 className="font-serif text-3xl sm:text-4xl">{t("chooseCakeOptionTitle")}</h1>
      <p className="text-charcoal-soft mt-3 max-w-2xl">{t("chooseCakeOptionSubtitle")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {product.options.map((option) => (
          <article key={option.id} className="rounded-2xl border border-charcoal/15 bg-cream-dark/40 p-6">
            <h2 className="font-serif text-xl">{option.label[lang]}</h2>
            <p className="mt-2 text-sm text-charcoal-soft">{option.inches} {t("optionInches")}</p>
            <p className="mt-3 text-sm text-charcoal-soft">{option.description[lang]}</p>
            <p className="mt-4 text-gold font-medium">S${option.price.toFixed(2)}</p>
            <Link
              to={`/product/${product.id}/${option.id}`}
              className="inline-flex mt-5 px-4 py-2 text-sm uppercase tracking-wide rounded-full border border-charcoal/20 hover:border-gold hover:text-gold transition-colors"
            >
              {t("viewProductDetails")}
            </Link>
          </article>
        ))}
      </div>

      <Link to="/" className="inline-flex mt-10 px-5 py-2 rounded-full border border-charcoal/20 hover:border-gold hover:text-gold transition-colors">
        {t("optionPageBack")}
      </Link>
    </section>
  );
}
