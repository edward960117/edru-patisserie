import { Link, Navigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useLanguage } from "../i18n/LanguageContext";

export default function ProductDetailPage() {
  const { productId, optionId } = useParams();
  const { lang, t } = useLanguage();

  if (!productId || !optionId) {
    return <Navigate to="/" replace />;
  }

  const product = products.find((item) => item.id === productId);
  const option = product?.options.find((item) => item.id === optionId);

  if (!product || !option) {
    return (
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <p className="uppercase tracking-[0.25em] text-xs text-gold mb-2">{t("productNotFound")}</p>
        <Link to="/" className="inline-flex mt-6 px-5 py-2 rounded-full border border-charcoal/20 hover:border-gold hover:text-gold transition-colors">
          {t("optionPageBack")}
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <p className="uppercase tracking-[0.25em] text-xs text-gold mb-2">{t("productDetailTitle")}</p>
      <h1 className="font-serif text-3xl sm:text-4xl">{product.name[lang]}</h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="aspect-square rounded-2xl overflow-hidden bg-cream-dark">
          <img src={product.image} alt={product.name[lang]} className="h-full w-full object-cover" />
        </div>

        <article className="rounded-2xl border border-charcoal/15 p-6 sm:p-8 bg-cream-dark/30">
          <h2 className="font-serif text-2xl">{option.label[lang]}</h2>
          <p className="mt-2 text-sm text-charcoal-soft">{t("selectedSize")}: {option.inches} {t("optionInches")}</p>
          <p className="mt-5 text-gold text-xl font-medium">S${option.price.toFixed(2)}</p>

          <h3 className="mt-6 text-xs uppercase tracking-[0.2em] text-charcoal-soft">{t("productDescriptionLabel")}</h3>
          <p className="mt-2 text-charcoal-soft leading-relaxed">{product.description[lang]}</p>

          <h3 className="mt-6 text-xs uppercase tracking-[0.2em] text-charcoal-soft">{t("optionDescriptionLabel")}</h3>
          <p className="mt-2 text-charcoal-soft leading-relaxed">{option.description[lang]}</p>

          <Link
            to={`/cakes/${product.id}`}
            className="inline-flex mt-8 px-5 py-2 rounded-full border border-charcoal/20 hover:border-gold hover:text-gold transition-colors"
          >
            {t("productDetailBackToOptions")}
          </Link>
        </article>
      </div>
    </section>
  );
}
