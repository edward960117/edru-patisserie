import { cookies } from "next/headers";

export type Lang = "zh" | "en";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const value = cookieStore.get("edru_lang")?.value;
  return value === "en" ? "en" : "zh";
}

const text = {
  zh: {
    homeTitle: "甄选蛋糕分类",
    homeSubtitle: "先选风格，再挑选您喜欢的蛋糕",
    viewCategory: "查看该分类",
    viewDetails: "查看详情",
    from: "起",
    ingredients: "配料",
    availableSizes: "可选尺寸",
    checkout: "前往结账",
    orderViaWhatsApp: "通过 WhatsApp 下单",
    orderViaInstagram: "通过 Instagram 联系",
    proceedOrderViaWhatsApp: "请通过 WhatsApp 完成下单。",
    orContactViaInstagram: "或通过 Instagram 私信我们。",
    checkoutTitle: "结账",
    chooseCakeBeforeCheckout: "请先选择蛋糕和尺寸后再结账。",
    leadTimePrefix: "请至少提前",
    leadTimeSuffix: "天下单。",
    categoryListTitle: "分类蛋糕",
    backHome: "返回首页",
    loginTitle: "员工登录",
    loginButton: "登录",
    adminTitle: "管理后台",
  },
  en: {
    homeTitle: "Cake Categories",
    homeSubtitle: "Choose a style first, then explore cakes",
    viewCategory: "View Category",
    viewDetails: "View Details",
    from: "From",
    ingredients: "Ingredients",
    availableSizes: "Available Sizes",
    checkout: "Checkout",
    orderViaWhatsApp: "Order via WhatsApp",
    orderViaInstagram: "Contact via Instagram",
    proceedOrderViaWhatsApp: "Please proceed with your order through WhatsApp.",
    orContactViaInstagram: "Or message us on Instagram.",
    checkoutTitle: "Checkout",
    chooseCakeBeforeCheckout: "Please choose a cake and size before checkout.",
    leadTimePrefix: "Please order at least",
    leadTimeSuffix: "days in advance.",
    categoryListTitle: "Category Cakes",
    backHome: "Back to Home",
    loginTitle: "Staff Login",
    loginButton: "Login",
    adminTitle: "Admin Dashboard",
  },
} as const;

export function t(lang: Lang) {
  return text[lang];
}
