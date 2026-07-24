import type { Product } from "../types";

/**
 * Product catalogue for the storefront.
 * Images are placeholder Unsplash photography — replace with real product
 * photography before going to production (see README "Assets to replace").
 */
export const products: Product[] = [
  {
    id: "lemon-cheesecake-flower",
    name: "Lemon Cheesecake Flower",
    description: "Tangy lemon cheesecake mousse, shortbread crumble, citrus confit.",
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "apricot-rose",
    name: "Apricot Rose",
    description: "Apricot compote, almond biscuit, vanilla mascarpone cream.",
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "coconut-pandan",
    name: "Coconut Pandan",
    description: "Pandan sponge, coconut cream, toasted coconut shavings.",
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "strawberry-tart",
    name: "Strawberry Tart",
    description: "Sable Breton, vanilla crème pâtissière, fresh strawberries.",
    price: 11,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "chocolate-vanilla-entremet",
    name: "Chocolate Vanilla Entremet",
    description: "Dark chocolate mousse, vanilla bean cream, cocoa dacquoise. Serves 6.",
    price: 42,
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "raspberry-pistachio-entremet",
    name: "Raspberry Pistachio Entremet",
    description: "Pistachio biscuit, raspberry gelee, light pistachio mousse. Serves 6.",
    price: 44,
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "opera-classic",
    name: "Opera Classic",
    description: "Almond joconde, coffee buttercream, dark chocolate ganache. Serves 6.",
    price: 46,
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "raspberry-cookie",
    name: "Raspberry Sable Cookie",
    description: "Buttery sable cookie filled with raspberry ganache.",
    price: 6,
    category: "Cookies & Bakes",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "chocolate-chip-cookie",
    name: "Salted Chocolate Cookie",
    description: "Brown butter cookie, dark chocolate chunks, fleur de sel.",
    price: 6,
    category: "Cookies & Bakes",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80&auto=format&fit=crop&sat=-20",
  },
  {
    id: "chocolate-loaf-cake",
    name: "Chocolate Loaf Cake",
    description: "Moist dark chocolate loaf, chocolate glaze, cocoa nibs.",
    price: 14,
    category: "Cookies & Bakes",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "numbers-cake",
    name: "Numbers Celebration Cake",
    description: "Custom number-shaped cake with fresh berries and cream. Made to order.",
    price: 68,
    category: "Celebration Cakes",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "flowers-signature",
    name: "Signature Flower Cake",
    description: "Hand-piped buttercream flowers over vanilla sponge. Made to order.",
    price: 78,
    category: "Celebration Cakes",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80&auto=format&fit=crop",
  },
];
