// Shared domain types for the EDRU PATISSERIE storefront.

import type { Lang } from "./i18n/translations";

/** Localised text: one string per supported language. */
export type LocalizedText = Record<Lang, string>;

export type ProductCategory = "Individual Cakes" | "Entremets" | "Cookies & Bakes" | "Celebration Cakes";

export interface ProductOption {
  id: string;
  label: LocalizedText;
  inches: number;
  description: LocalizedText;
  price: number;
}

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  category: ProductCategory;
  image: string;
  options: ProductOption[];
}
