export type FallbackCakeSize = {
  id: number;
  size: string;
  price: number;
  available: boolean;
};

export type FallbackCake = {
  id: number;
  category_slug: string;
  name: string;
  name_cn: string;
  slug: string;
  description: string;
  description_cn: string;
  ingredients: string;
  image_url: string;
  lead_time_days: number;
  featured: boolean;
  active: boolean;
  sizes: FallbackCakeSize[];
};

export type FallbackCategory = {
  id: number;
  slug: string;
  name: string;
  name_cn: string;
  emoji: string;
  description: string;
};

export const fallbackCategories: FallbackCategory[] = [
  {
    id: -1,
    slug: "todays-recommendation",
    name: "Today's Recommendation",
    name_cn: "今日推荐",
    emoji: "✨",
    description: "Chef's featured cakes for the day.",
  },
  {
    id: -2,
    slug: "for-him",
    name: "For Him",
    name_cn: "男生款",
    emoji: "🕴️",
    description: "Bold flavors and elegant finishes.",
  },
  {
    id: -3,
    slug: "for-her",
    name: "For Her",
    name_cn: "女生款",
    emoji: "🌸",
    description: "Light, floral and refined profiles.",
  },
  {
    id: -4,
    slug: "custom-cakes",
    name: "Custom Cakes",
    name_cn: "蛋糕定制",
    emoji: "🎂",
    description: "Tailored cakes for your occasion.",
  },
  {
    id: -5,
    slug: "birthday-cakes",
    name: "Birthday Cakes",
    name_cn: "生日蛋糕",
    emoji: "🎉",
    description: "Celebrate every birthday with a signature cake.",
  },
  {
    id: -6,
    slug: "seasonal-specials",
    name: "Seasonal Specials",
    name_cn: "节日特供",
    emoji: "🎊",
    description: "Limited edition cakes for festive seasons.",
  },
];

export const fallbackCakes: FallbackCake[] = [
  {
    id: -101,
    category_slug: "todays-recommendation",
    name: "Lemon Cheesecake Flower",
    name_cn: "柠檬芝士花语",
    slug: "lemon-cheesecake-flower",
    description: "Tangy lemon cheesecake mousse with floral piping and citrus notes.",
    description_cn: "清爽柠檬芝士慕斯，搭配花朵裱花与柑橘香气。",
    ingredients: "Cream cheese, lemon zest, mascarpone, flour, eggs, butter, vanilla",
    image_url: "https://images.unsplash.com/photo-1519869325930-281384150729?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 3,
    featured: true,
    active: true,
    sizes: [
      { id: -1011, size: "6\"", price: 68, available: true },
      { id: -1012, size: "8\"", price: 92, available: true },
      { id: -1013, size: "10\"", price: 128, available: true },
    ],
  },
  {
    id: -102,
    category_slug: "todays-recommendation",
    name: "Pistachio Berry Silk",
    name_cn: "开心果莓果丝绒",
    slug: "pistachio-berry-silk",
    description: "Pistachio sponge layered with berry cream and crunchy praline.",
    description_cn: "开心果蛋糕胚夹层莓果奶油与香脆果仁糖。",
    ingredients: "Pistachio paste, raspberry puree, cream, flour, eggs, sugar",
    image_url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 3,
    featured: false,
    active: true,
    sizes: [
      { id: -1021, size: "6\"", price: 66, available: true },
      { id: -1022, size: "8\"", price: 90, available: true },
      { id: -1023, size: "10\"", price: 124, available: true },
    ],
  },
  {
    id: -201,
    category_slug: "for-him",
    name: "Dark Opera Signature",
    name_cn: "黑金欧培拉",
    slug: "dark-opera-signature",
    description: "Layered almond sponge, espresso buttercream and dark chocolate glaze.",
    description_cn: "杏仁蛋糕层叠浓缩咖啡奶油霜与黑巧克力淋面。",
    ingredients: "Almond flour, coffee extract, dark chocolate, cream, eggs, butter",
    image_url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 4,
    featured: false,
    active: true,
    sizes: [
      { id: -2011, size: "6\"", price: 72, available: true },
      { id: -2012, size: "8\"", price: 99, available: true },
      { id: -2013, size: "10\"", price: 136, available: false },
    ],
  },
  {
    id: -202,
    category_slug: "for-him",
    name: "Hazelnut Noir Crunch",
    name_cn: "榛果黑巧脆层",
    slug: "hazelnut-noir-crunch",
    description: "Intense cocoa mousse with roasted hazelnut crunch and sea salt caramel.",
    description_cn: "浓郁可可慕斯融合烘烤榛果脆层与海盐焦糖。",
    ingredients: "Dark chocolate, hazelnut praline, butter, eggs, sea salt, caramel",
    image_url: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 4,
    featured: true,
    active: true,
    sizes: [
      { id: -2021, size: "6\"", price: 74, available: true },
      { id: -2022, size: "8\"", price: 102, available: true },
      { id: -2023, size: "10\"", price: 140, available: true },
    ],
  },
  {
    id: -301,
    category_slug: "for-her",
    name: "Apricot Rose Velvet",
    name_cn: "杏桃玫瑰丝绒",
    slug: "apricot-rose-velvet",
    description: "Apricot compote and rose cream layered in a soft sponge finish.",
    description_cn: "柔软蛋糕中夹入杏桃果酱与玫瑰奶油层次。",
    ingredients: "Apricot puree, rose water, mascarpone, flour, eggs, sugar",
    image_url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 3,
    featured: false,
    active: true,
    sizes: [
      { id: -3011, size: "6\"", price: 70, available: true },
      { id: -3012, size: "8\"", price: 96, available: true },
      { id: -3013, size: "10\"", price: 132, available: true },
    ],
  },
  {
    id: -302,
    category_slug: "for-her",
    name: "Lychee Jasmine Pearl",
    name_cn: "荔枝茉莉珍珠",
    slug: "lychee-jasmine-pearl",
    description: "Floral jasmine mousse with lychee center and vanilla chiffon.",
    description_cn: "花香茉莉慕斯包裹荔枝夹心与香草戚风。",
    ingredients: "Jasmine tea, lychee, vanilla, cream, flour, eggs, sugar",
    image_url: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 3,
    featured: true,
    active: true,
    sizes: [
      { id: -3021, size: "6\"", price: 73, available: true },
      { id: -3022, size: "8\"", price: 98, available: true },
      { id: -3023, size: "10\"", price: 134, available: true },
    ],
  },
  {
    id: -401,
    category_slug: "custom-cakes",
    name: "Celebration Number Cake",
    name_cn: "庆典数字蛋糕",
    slug: "celebration-number-cake",
    description: "Custom number-shaped cake with seasonal berries and cream flowers.",
    description_cn: "可定制数字造型，搭配当季莓果与奶油花饰。",
    ingredients: "Vanilla sponge, whipped cream, berries, buttercream, sugar flowers",
    image_url: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 5,
    featured: true,
    active: true,
    sizes: [
      { id: -4011, size: "6\"", price: 98, available: true },
      { id: -4012, size: "8\"", price: 138, available: true },
      { id: -4013, size: "10\"", price: 188, available: true },
    ],
  },
  {
    id: -402,
    category_slug: "custom-cakes",
    name: "Golden Anniversary Crown",
    name_cn: "金禧纪念皇冠",
    slug: "golden-anniversary-crown",
    description: "Custom celebration cake with gold accents, roses and layered cream finish.",
    description_cn: "定制庆典蛋糕，金色点缀、玫瑰装饰与层次奶油收边。",
    ingredients: "Vanilla sponge, Swiss meringue buttercream, berry compote, edible gold",
    image_url: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1200&q=80&auto=format&fit=crop",
    lead_time_days: 6,
    featured: false,
    active: true,
    sizes: [
      { id: -4021, size: "6\"", price: 108, available: true },
      { id: -4022, size: "8\"", price: 148, available: true },
      { id: -4023, size: "10\"", price: 198, available: true },
    ],
  },
];

export function getFallbackCategoryWithCakes(slug: string) {
  const category = fallbackCategories.find((item) => item.slug === slug);
  if (!category) {
    return null;
  }

  const cakes = fallbackCakes
    .filter((cake) => cake.category_slug === slug && cake.active)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  return { category, cakes };
}

export function getFallbackCakeBySlug(slug: string) {
  return fallbackCakes.find((cake) => cake.slug === slug && cake.active) ?? null;
}