// Shared domain types for the EDRU PATISSERIE storefront.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Individual Cakes" | "Entremets" | "Cookies & Bakes" | "Celebration Cakes";
  image: string;
}
