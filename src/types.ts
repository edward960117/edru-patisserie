// Shared domain types for the EDRU PATISSERIE storefront.

import type { Lang } from "./i18n/translations";

/** Localised text: one string per supported language. */
export type LocalizedText = Record<Lang, string>;

export type ProductCategory = "Individual Cakes" | "Entremets" | "Cookies & Bakes" | "Celebration Cakes";

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  category: ProductCategory;
  image: string;
}
