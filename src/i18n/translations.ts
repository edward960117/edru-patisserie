// UI copy for the storefront, keyed by language.
// English is the source of truth; Chinese (Simplified) strings sit alongside
// each key so components can look up `t(key)` without extra plumbing.

export type Lang = "en" | "zh";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

export const translations = {
  en: {
    brandName: "Edru Patisserie",
    announcement: "Order online for pickup or delivery — freshly baked, every day",

    navCakes: "Our Cakes",
    navBook: "Book a Table",
    navStory: "Our Story",
    navContact: "Contact",
    account: "Account",
    cart: "Cart",

    heroEyebrow: "Handcrafted Since Day One",
    heroTitle: "ÈDRU PATISSERIE",
    heroSubtitle: "Seasonal cakes and pastries, made fresh daily. Pre-order for pickup or takeaway.",
    heroCta: "Order Now",
    heroAddress: "123 Orchard Road, #01-01, Singapore 238888",
    heroHours: "Wednesday to Sunday · 9:00 am – 7:00 pm",

    categoryAll: "All",
    categoryIndividualCakes: "Individual Cakes",
    categoryEntremets: "Entremets",
    categoryCookiesBakes: "Cookies & Bakes",
    categoryCelebrationCakes: "Celebration Cakes",

    productGridEyebrow: "By pre-order or takeaway",
    productGridTitle: "Our Seasonal Creations",
    priceFrom: "From S$",

    pickupLabel: "I will collect my order on",

    promoEyebrow: "Limited Edition",
    promoTitle: "Autumn Harvest Collection",
    promoDesc:
      "Celebrate the season with our exclusive autumn cake collection — available for pre-order now through the end of the harvest season.",
    promoCta: "Order Now",

    storyEyebrow: "Our Maison",
    storyTitle: "Crafted with Precision, Baked with Heart",
    storyDesc:
      "At EDRU PATISSERIE, every cake begins with the finest seasonal ingredients and a commitment to classic French technique. Our pastry chefs hand-finish each creation in small batches, so every slice tastes as good as it looks.",
    storyCta: "Discover Our Story",

    footerAddress: "123 Orchard Road, #01-01\nSingapore 238888",
    footerHours: "Wednesday to Sunday — 9:00 am to 7:00 pm",
    footerExplore: "Explore",
    footerHelp: "Help",
    footerFaq: "FAQ",
    footerJoinUs: "Join Us",
    footerPrivacy: "Privacy Policy",
    footerGetInTouch: "Get in Touch",
    footerRights: "All rights reserved.",

    cookieText:
      "We use cookies to personalise content, provide social media features, and analyse our traffic. Read our",
    cookiePrivacyLink: "Privacy Policy",
    cookieDecline: "Continue Without Accepting",
    cookieAccept: "Accept All",
  },
  zh: {
    brandName: "EDRU烘培",
    announcement: "线上下单，自取或配送 — 每日新鲜出炉",

    navCakes: "蛋糕系列",
    navBook: "预订座位",
    navStory: "品牌故事",
    navContact: "联系我们",
    account: "账户",
    cart: "购物车",

    heroEyebrow: "用心手作，始于初心",
    heroTitle: "ÈDRU烘培",
    heroSubtitle: "每日新鲜制作的季节限定蛋糕与甜点，欢迎预订自取或外带。",
    heroCta: "立即订购",
    heroAddress: "新加坡238888 乌节路123号 #01-01",
    heroHours: "周三至周日 · 上午9:00 – 晚上7:00",

    categoryAll: "全部",
    categoryIndividualCakes: "单人蛋糕",
    categoryEntremets: "法式层次蛋糕",
    categoryCookiesBakes: "曲奇与烘焙",
    categoryCelebrationCakes: "庆典蛋糕",

    productGridEyebrow: "支持预订或外带",
    productGridTitle: "季节限定甜点",
    priceFrom: "起价 S$",

    pickupLabel: "我将于以下日期取货",

    promoEyebrow: "限量系列",
    promoTitle: "秋季丰收系列",
    promoDesc: "即刻预订，尽享独家秋季蛋糕系列 — 供应至丰收季末。",
    promoCta: "立即订购",

    storyEyebrow: "关于我们",
    storyTitle: "精工细作，用心烘焙",
    storyDesc:
      "在EDRU烘培，每一款蛋糕都始于当季最优质的食材，并秉承经典法式工艺。我们的糕点师以小批量手工制作每一件作品，只为让每一口都名副其实。",
    storyCta: "了解我们的故事",

    footerAddress: "新加坡238888\n乌节路123号 #01-01",
    footerHours: "周三至周日 — 上午9:00至晚上7:00",
    footerExplore: "探索",
    footerHelp: "帮助",
    footerFaq: "常见问题",
    footerJoinUs: "加入我们",
    footerPrivacy: "隐私政策",
    footerGetInTouch: "联系方式",
    footerRights: "版权所有。",

    cookieText: "我们使用Cookie来个性化内容、提供社交媒体功能并分析我们的流量。请阅读我们的",
    cookiePrivacyLink: "隐私政策",
    cookieDecline: "不接受，继续浏览",
    cookieAccept: "接受全部",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
