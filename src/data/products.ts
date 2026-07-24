import type { Product } from "../types";

/**
 * Product catalogue for the storefront.
 * Images are placeholder Unsplash photography — replace with real product
 * photography before going to production (see README "Assets to replace").
 * Names/descriptions are localized (English + Simplified Chinese) so the
 * catalogue can render in either language via the header's language switch.
 */
export const products: Product[] = [
  {
    id: "lemon-cheesecake-flower",
    name: { en: "Lemon Cheesecake Flower", zh: "柠檬芝士花蛋糕" },
    description: {
      en: "Tangy lemon cheesecake mousse, shortbread crumble, citrus confit.",
      zh: "清爽柠檬芝士慕斯，酥脆黄油碎，柑橘蜜饯点缀。",
    },
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "apricot-rose",
    name: { en: "Apricot Rose", zh: "杏桃玫瑰蛋糕" },
    description: {
      en: "Apricot compote, almond biscuit, vanilla mascarpone cream.",
      zh: "杏桃果泥，杏仁饼底，香草马斯卡彭奶油。",
    },
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "coconut-pandan",
    name: { en: "Coconut Pandan", zh: "椰香班兰蛋糕" },
    description: {
      en: "Pandan sponge, coconut cream, toasted coconut shavings.",
      zh: "班兰海绵蛋糕，椰奶奶油，烘烤椰丝装饰。",
    },
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "strawberry-tart",
    name: { en: "Strawberry Tart", zh: "草莓塔" },
    description: {
      en: "Sable Breton, vanilla crème pâtissière, fresh strawberries.",
      zh: "布列塔尼酥饼，香草卡仕达馅，新鲜草莓。",
    },
    price: 11,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "chocolate-vanilla-entremet",
    name: { en: "Chocolate Vanilla Entremet", zh: "巧克力香草层次蛋糕" },
    description: {
      en: "Dark chocolate mousse, vanilla bean cream, cocoa dacquoise. Serves 6.",
      zh: "黑巧克力慕斯，香草奶油，可可达克瓦兹蛋糕底，约供6人食用。",
    },
    price: 42,
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "raspberry-pistachio-entremet",
    name: { en: "Raspberry Pistachio Entremet", zh: "覆盆子开心果层次蛋糕" },
    description: {
      en: "Pistachio biscuit, raspberry gelee, light pistachio mousse. Serves 6.",
      zh: "开心果饼底，覆盆子果冻，轻盈开心果慕斯，约供6人食用。",
    },
    price: 44,
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "opera-classic",
    name: { en: "Opera Classic", zh: "经典欧培拉蛋糕" },
    description: {
      en: "Almond joconde, coffee buttercream, dark chocolate ganache. Serves 6.",
      zh: "杏仁乔孔达蛋糕，咖啡奶油霜，黑巧克力甘纳许，约供6人食用。",
    },
    price: 46,
    category: "Entremets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "raspberry-cookie",
    name: { en: "Raspberry Sable Cookie", zh: "覆盆子沙布列曲奇" },
    description: {
      en: "Buttery sable cookie filled with raspberry ganache.",
      zh: "黄油沙布列曲奇，夹心覆盆子甘纳许。",
    },
    price: 6,
    category: "Cookies & Bakes",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "chocolate-chip-cookie",
    name: { en: "Salted Chocolate Cookie", zh: "海盐巧克力曲奇" },
    description: {
      en: "Brown butter cookie, dark chocolate chunks, fleur de sel.",
      zh: "焦香黄油曲奇，黑巧克力块，点缀法式海盐。",
    },
    price: 6,
    category: "Cookies & Bakes",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80&auto=format&fit=crop&sat=-20",
  },
  {
    id: "chocolate-loaf-cake",
    name: { en: "Chocolate Loaf Cake", zh: "巧克力磅蛋糕" },
    description: {
      en: "Moist dark chocolate loaf, chocolate glaze, cocoa nibs.",
      zh: "湿润黑巧克力磅蛋糕，巧克力淋面，可可豆碎点缀。",
    },
    price: 14,
    category: "Cookies & Bakes",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "numbers-cake",
    name: { en: "Numbers Celebration Cake", zh: "数字庆典蛋糕" },
    description: {
      en: "Custom number-shaped cake with fresh berries and cream. Made to order.",
      zh: "定制数字造型蛋糕，搭配新鲜莓果与奶油，按需订制。",
    },
    price: 68,
    category: "Celebration Cakes",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "flowers-signature",
    name: { en: "Signature Flower Cake", zh: "招牌花朵蛋糕" },
    description: {
      en: "Hand-piped buttercream flowers over vanilla sponge. Made to order.",
      zh: "手工裱花奶油霜装饰香草海绵蛋糕，按需订制。",
    },
    price: 78,
    category: "Celebration Cakes",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80&auto=format&fit=crop",
  },
];
