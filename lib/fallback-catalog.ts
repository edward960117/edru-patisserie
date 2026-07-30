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
    id: -3,
    slug: "for-her",
    name: "For Her",
    name_cn: "女生款",
    emoji: "🌸",
    description: "Light, floral and refined profiles.",
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
    id: -7,
    slug: "mousse-cakes",
    name: "Mousse Cakes",
    name_cn: "慕斯蛋糕",
    emoji: "🍰",
    description: "Silky smooth mousse with delicate layers.",
  },
  {
    id: -8,
    slug: "lifes-four-joys",
    name: "Life's Four Joys",
    name_cn: "人生四喜",
    emoji: "🎊",
    description: "Traditional cakes for life's precious moments.",
  },
  {
    id: -9,
    slug: "designer-collection",
    name: "Designer Collection",
    name_cn: "设计师款",
    emoji: "✨",
    description: "Artistic and innovative cake designs.",
  },
  {
    id: -10,
    slug: "afternoon-tea-series",
    name: "Afternoon Tea Series",
    name_cn: "下午茶系列",
    emoji: "☕",
    description: "Perfect treats for tea time.",
  },
  {
    id: -11,
    slug: "custom-cakes",
    name: "Custom Cakes",
    name_cn: "私人定制",
    emoji: "🎨",
    description: "Personalized and bespoke cake designs just for you.",
  },
  {
    id: -12,
    slug: "cake-accessories",
    name: "Cake Accessories",
    name_cn: "蛋糕配件",
    emoji: "🕯️",
    description: "Premium candles and decorative accessories for your cakes.",
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
    image_url: "/cakes/lemon-cheesecake-flower.jpg",
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
    image_url: "/cakes/pistachio-berry-silk.jpg",
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
    image_url: "/cakes/dark-opera-signature.jpg",
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
    image_url: "/cakes/hazelnut-noir-crunch.jpg",
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
    image_url: "/cakes/apricot-rose-velvet.jpg",
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
    image_url: "/cakes/lychee-jasmine-pearl.jpg",
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
    id: -501,
    category_slug: "mousse-cakes",
    name: "Strawberry Cloud Mousse",
    name_cn: "草莓云朵慕斯",
    slug: "strawberry-cloud-mousse",
    description: "Light strawberry mousse layered with vanilla chiffon and berry glaze.",
    description_cn: "轻盈草莓慕斯夹层香草戚风，覆以莓果镜面。",
    ingredients: "Strawberry puree, cream, vanilla sponge, gelatin, sugar",
    image_url: "/cakes/lemon-cheesecake-flower.jpg",
    lead_time_days: 3,
    featured: true,
    active: true,
    sizes: [
      { id: -5011, size: "6\"", price: 69, available: true },
      { id: -5012, size: "8\"", price: 94, available: true },
      { id: -5013, size: "10\"", price: 130, available: true },
    ],
  },
  {
    id: -502,
    category_slug: "mousse-cakes",
    name: "Mango Velvet Dome",
    name_cn: "芒果丝绒慕斯",
    slug: "mango-velvet-dome",
    description: "Tropical mango mousse with passionfruit center and soft sponge base.",
    description_cn: "热带芒果慕斯搭配百香果夹心与绵软蛋糕底。",
    ingredients: "Mango puree, passionfruit, cream, sponge cake, sugar",
    image_url: "/cakes/pistachio-berry-silk.jpg",
    lead_time_days: 3,
    featured: false,
    active: true,
    sizes: [
      { id: -5021, size: "6\"", price: 71, available: true },
      { id: -5022, size: "8\"", price: 96, available: true },
      { id: -5023, size: "10\"", price: 132, available: true },
    ],
  },
  {
    id: -601,
    category_slug: "lifes-four-joys",
    name: "Longevity Peach Celebration",
    name_cn: "寿桃庆典蛋糕",
    slug: "longevity-peach-celebration",
    description: "Classic celebration cake inspired by longevity peach traditions.",
    description_cn: "灵感源自传统寿桃意象的经典庆典蛋糕。",
    ingredients: "Vanilla sponge, cream, peach puree, red bean, sugar",
    image_url: "/cakes/golden-anniversary-crown.jpg",
    lead_time_days: 4,
    featured: true,
    active: true,
    sizes: [
      { id: -6011, size: "6\"", price: 75, available: true },
      { id: -6012, size: "8\"", price: 102, available: true },
      { id: -6013, size: "10\"", price: 138, available: true },
    ],
  },
  {
    id: -602,
    category_slug: "lifes-four-joys",
    name: "Prosperity Walnut Date Cake",
    name_cn: "枣香核桃福运蛋糕",
    slug: "prosperity-walnut-date-cake",
    description: "Rich date sponge and toasted walnut cream for festive gatherings.",
    description_cn: "浓郁红枣蛋糕胚搭配烘香核桃奶油，适合团聚庆贺。",
    ingredients: "Red dates, toasted walnuts, cream, flour, eggs, sugar",
    image_url: "/cakes/dark-opera-signature.jpg",
    lead_time_days: 4,
    featured: false,
    active: true,
    sizes: [
      { id: -6021, size: "6\"", price: 73, available: true },
      { id: -6022, size: "8\"", price: 99, available: true },
      { id: -6023, size: "10\"", price: 135, available: true },
    ],
  },
  {
    id: -701,
    category_slug: "designer-collection",
    name: "Aurora Mirror Glaze",
    name_cn: "极光镜面蛋糕",
    slug: "aurora-mirror-glaze",
    description: "Sleek mirror glaze finish with layered berry and vanilla notes.",
    description_cn: "流光镜面外观，层层莓果与香草风味交织。",
    ingredients: "Berry compote, vanilla mousse, mirror glaze, sponge",
    image_url: "/cakes/lychee-jasmine-pearl.jpg",
    lead_time_days: 5,
    featured: true,
    active: true,
    sizes: [
      { id: -7011, size: "6\"", price: 82, available: true },
      { id: -7012, size: "8\"", price: 112, available: true },
      { id: -7013, size: "10\"", price: 152, available: true },
    ],
  },
  {
    id: -702,
    category_slug: "designer-collection",
    name: "Minimalist Pearl Ribbon",
    name_cn: "极简珍珠缎带",
    slug: "minimalist-pearl-ribbon",
    description: "Refined minimalist finish with smooth cream ribbons and pearl accents.",
    description_cn: "极简线条奶油缎带与珍珠点缀，优雅细腻。",
    ingredients: "Vanilla sponge, mascarpone cream, sugar pearls, buttercream",
    image_url: "/cakes/apricot-rose-velvet.jpg",
    lead_time_days: 5,
    featured: false,
    active: true,
    sizes: [
      { id: -7021, size: "6\"", price: 79, available: true },
      { id: -7022, size: "8\"", price: 108, available: true },
      { id: -7023, size: "10\"", price: 148, available: true },
    ],
  },
  {
    id: -801,
    category_slug: "afternoon-tea-series",
    name: "Earl Grey Citrus Slice",
    name_cn: "伯爵柑橘茶香",
    slug: "earl-grey-citrus-slice",
    description: "Elegant Earl Grey sponge with citrus cream and light tea aroma.",
    description_cn: "伯爵茶蛋糕胚搭配柑橘奶油，茶香清雅。",
    ingredients: "Earl Grey tea, citrus zest, cream, flour, eggs, sugar",
    image_url: "/cakes/lemon-cheesecake-flower.jpg",
    lead_time_days: 2,
    featured: true,
    active: true,
    sizes: [
      { id: -8011, size: "6\"", price: 62, available: true },
      { id: -8012, size: "8\"", price: 86, available: true },
      { id: -8013, size: "10\"", price: 118, available: true },
    ],
  },
  {
    id: -802,
    category_slug: "afternoon-tea-series",
    name: "Matcha Yuzu Tea Cake",
    name_cn: "抹茶柚香下午茶",
    slug: "matcha-yuzu-tea-cake",
    description: "Japanese matcha cream with bright yuzu curd and airy sponge.",
    description_cn: "日式抹茶奶油结合清新柚子夹心，口感轻盈。",
    ingredients: "Matcha, yuzu curd, cream, sponge cake, sugar",
    image_url: "/cakes/pistachio-berry-silk.jpg",
    lead_time_days: 2,
    featured: false,
    active: true,
    sizes: [
      { id: -8021, size: "6\"", price: 64, available: true },
      { id: -8022, size: "8\"", price: 88, available: true },
      { id: -8023, size: "10\"", price: 120, available: true },
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
    image_url: "/cakes/celebration-number-cake.jpg",
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
    image_url: "/cakes/golden-anniversary-crown.jpg",
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