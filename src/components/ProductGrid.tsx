import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import PickupScheduler from "./PickupScheduler";
import type { Product } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import type { TranslationKey } from "../i18n/translations";

const CATEGORIES: Array<Product["category"] | "All"> = [
  "All",
  "Individual Cakes",
  "Entremets",
  "Cookies & Bakes",
  "Celebration Cakes",
];

const CATEGORY_LABEL_KEYS: Record<typeof CATEGORIES[number], TranslationKey> = {
  All: "categoryAll",
  "Individual Cakes": "categoryIndividualCakes",
  Entremets: "categoryEntremets",
  "Cookies & Bakes": "categoryCookiesBakes",
  "Celebration Cakes": "categoryCelebrationCakes",
};

/**
 * Catalogue section: pickup scheduler + category filter tabs + responsive
 * product grid (2 cols mobile, 3 tablet, 4 desktop) — reproduces the
 * reference site's "seasonal creations" listing.
 */
export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  const { t } = useLanguage();

  const filtered = useMemo(
    () => (activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section id="cakes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-10">
        <p className="uppercase tracking-[0.3em] text-xs text-gold mb-2">{t("productGridEyebrow")}</p>
        <h2 className="font-serif text-3xl sm:text-4xl">{t("productGridTitle")}</h2>
      </div>

      <PickupScheduler />

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-xs sm:text-sm uppercase tracking-wide rounded-full border transition-colors ${
              activeCategory === category
                ? "bg-charcoal text-cream border-charcoal"
                : "border-charcoal/20 hover:border-gold hover:text-gold"
            }`}
          >
            {t(CATEGORY_LABEL_KEYS[category])}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
