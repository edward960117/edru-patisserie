import type { Product, ProductCategory, ProductOption } from "../types";

const optionBlueprints: Record<ProductCategory, Array<{ id: string; inches: number; priceDelta: number; labelEn: string; labelZh: string; descEn: string; descZh: string }>> = {
  "Individual Cakes": [
    {
      id: "petit-4",
      inches: 4,
      priceDelta: 0,
      labelEn: "Petit 4-inch",
      labelZh: "迷你4寸",
      descEn: "Ideal for one to two servings and quick gifting.",
      descZh: "适合1到2人享用或小巧伴手礼。",
    },
    {
      id: "classic-6",
      inches: 6,
      priceDelta: 10,
      labelEn: "Classic 6-inch",
      labelZh: "经典6寸",
      descEn: "Balanced family size for a small table celebration.",
      descZh: "适合小家庭聚会的经典尺寸。",
    },
    {
      id: "party-8",
      inches: 8,
      priceDelta: 20,
      labelEn: "Party 8-inch",
      labelZh: "派对8寸",
      descEn: "Great for gatherings and birthday moments.",
      descZh: "适合朋友聚会与生日庆祝。",
    },
  ],
  Entremets: [
    {
      id: "signature-6",
      inches: 6,
      priceDelta: 0,
      labelEn: "Signature 6-inch",
      labelZh: "招牌6寸",
      descEn: "Serves around 6 people with full layer definition.",
      descZh: "层次完整，约供6人享用。",
    },
    {
      id: "celebration-8",
      inches: 8,
      priceDelta: 14,
      labelEn: "Celebration 8-inch",
      labelZh: "庆典8寸",
      descEn: "Best for 8 to 10 guests at home celebrations.",
      descZh: "适合8到10位宾客的居家庆典。",
    },
    {
      id: "grand-10",
      inches: 10,
      priceDelta: 28,
      labelEn: "Grand 10-inch",
      labelZh: "盛宴10寸",
      descEn: "Made for larger parties and office sharing.",
      descZh: "适合大型聚会或办公室分享。",
    },
  ],
  "Cookies & Bakes": [
    {
      id: "box-4",
      inches: 4,
      priceDelta: 0,
      labelEn: "Tasting Box",
      labelZh: "尝鲜盒",
      descEn: "A compact box for tea time and sampling.",
      descZh: "小份组合，适合下午茶试吃。",
    },
    {
      id: "box-6",
      inches: 6,
      priceDelta: 8,
      labelEn: "Sharing Box",
      labelZh: "分享盒",
      descEn: "A medium box for family or office sharing.",
      descZh: "中份组合，适合家人或同事分享。",
    },
    {
      id: "box-8",
      inches: 8,
      priceDelta: 16,
      labelEn: "Party Box",
      labelZh: "聚会盒",
      descEn: "A larger box for parties and events.",
      descZh: "大份组合，适合活动或派对。",
    },
  ],
  "Celebration Cakes": [
    {
      id: "celebrate-6",
      inches: 6,
      priceDelta: 0,
      labelEn: "Celebrate 6-inch",
      labelZh: "庆祝6寸",
      descEn: "A compact celebration cake for intimate gatherings.",
      descZh: "适合温馨小聚的庆祝蛋糕尺寸。",
    },
    {
      id: "celebrate-8",
      inches: 8,
      priceDelta: 18,
      labelEn: "Celebrate 8-inch",
      labelZh: "庆祝8寸",
      descEn: "The most popular event size for 10 to 12 guests.",
      descZh: "最受欢迎的庆典尺寸，适合10到12人。",
    },
    {
      id: "celebrate-10",
      inches: 10,
      priceDelta: 32,
      labelEn: "Celebrate 10-inch",
      labelZh: "庆祝10寸",
      descEn: "Designed for major occasions and large tables.",
      descZh: "适用于重要庆典与多人宴会。",
    },
  ],
};

function buildOptions(category: ProductCategory, basePrice: number): ProductOption[] {
  return optionBlueprints[category].map((option) => ({
    id: option.id,
    inches: option.inches,
    price: basePrice + option.priceDelta,
    label: {
      en: option.labelEn,
      zh: option.labelZh,
    },
    description: {
      en: option.descEn,
      zh: option.descZh,
    },
  }));
}

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
    name: { en: "Lemon Cheesecake Flower", zh: "肖茹柠檬芝士花蛋糕" },
    description: {
      en: "Tangy lemon cheesecake mousse, shortbread crumble, citrus confit.",
      zh: "清爽柠檬芝士慕斯，酥脆黄油碎，柑橘蜜饯点缀。",
    },
    price: 12,
    category: "Individual Cakes",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80&auto=format&fit=crop",
    options: buildOptions("Individual Cakes", 12),
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
    options: buildOptions("Individual Cakes", 12),
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
    options: buildOptions("Individual Cakes", 12),
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
    options: buildOptions("Individual Cakes", 11),
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
    options: buildOptions("Entremets", 42),
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
    options: buildOptions("Entremets", 44),
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
    options: buildOptions("Entremets", 46),
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
    options: buildOptions("Cookies & Bakes", 6),
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
    options: buildOptions("Cookies & Bakes", 6),
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
    options: buildOptions("Cookies & Bakes", 14),
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
    options: buildOptions("Celebration Cakes", 68),
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
    options: buildOptions("Celebration Cakes", 78),
  },
];
