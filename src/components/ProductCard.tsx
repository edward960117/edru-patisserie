import type { Product } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

/**
 * Individual product tile: square image, name, and "From $x" price line —
 * matches the reference site's compact product card used throughout the
 * catalogue grid. Name/description render in the active language.
 */
export default function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();

  return (
    <Link to={`/cakes/${product.id}`} className="group block cursor-pointer" aria-label={product.name[lang]}>
      <div className="aspect-square overflow-hidden rounded-lg bg-cream-dark">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 font-serif text-sm sm:text-base uppercase tracking-wide">{product.name[lang]}</h3>
      <p className="text-xs sm:text-sm text-charcoal-soft mt-1">{product.description[lang]}</p>
      <p className="mt-2 text-sm font-medium text-gold">
        {t("priceFrom")}{product.price.toFixed(2)}
      </p>
    </Link>
  );
}
