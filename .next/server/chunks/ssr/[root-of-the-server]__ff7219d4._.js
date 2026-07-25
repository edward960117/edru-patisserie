module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/components/LanguageSwitcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
function LanguageSwitcher({ lang }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    async function switchLanguage(nextLang) {
        await fetch("/api/language", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lang: nextLang
            })
        });
        router.replace(pathname);
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-[0.82rem] sm:text-[0.96rem] text-white/95 rounded-full border border-[#e3c89d]/40 bg-[#ffffff15] px-3 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-sm whitespace-nowrap",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>switchLanguage("zh"),
                className: lang === "zh" ? "font-semibold text-[#ffe8c3] px-1" : "opacity-85 hover:opacity-100 px-1",
                children: "中文"
            }, void 0, false, {
                fileName: "[project]/components/LanguageSwitcher.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mx-2 sm:mx-2.5 opacity-70",
                children: "|"
            }, void 0, false, {
                fileName: "[project]/components/LanguageSwitcher.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>switchLanguage("en"),
                className: lang === "en" ? "font-semibold text-[#ffe8c3] px-1" : "opacity-85 hover:opacity-100 px-1",
                children: "English"
            }, void 0, false, {
                fileName: "[project]/components/LanguageSwitcher.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LanguageSwitcher.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/contact.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INSTAGRAM_URL",
    ()=>INSTAGRAM_URL,
    "WHATSAPP_NUMBER",
    ()=>WHATSAPP_NUMBER
]);
const WHATSAPP_NUMBER = "6581324886";
const INSTAGRAM_URL = "https://www.instagram.com/xiaoru_0207?igsh=MWk1anlmNWl5bHR3NA==";
}),
"[project]/lib/i18n-shared.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "t",
    ()=>t
]);
const text = {
    zh: {
        homeTitle: "甄选蛋糕分类",
        homeSubtitle: "先选风格，再挑选您喜欢的蛋糕",
        homeTagline: "ÈDRU 甄选系列",
        artisanSelection: "匠心甄选",
        orderConcierge: "下单咨询",
        viewCategory: "查看该分类",
        viewDetails: "查看详情",
        from: "起",
        ingredients: "配料",
        availableSizes: "可选尺寸",
        cakeLabel: "蛋糕",
        sizeLabel: "尺寸",
        priceLabel: "价格",
        checkout: "前往结账",
        orderViaWhatsApp: "通过 WhatsApp 下单",
        orderViaInstagram: "通过 Instagram 联系",
        orderViaWeChat: "通过微信下单",
        proceedOrderViaWhatsApp: "请通过 WhatsApp 完成下单。",
        weChatScanHint: "点击后将弹出微信二维码，请扫码联系下单。",
        orContactViaInstagram: "或通过 Instagram 私信我们。",
        checkoutTitle: "结账",
        checkoutTermsToggle: "免责声明 / 条款与说明",
        checkoutTermsItems: "部分蛋糕会使用竹签或支撑棒做内部结构固定。|请勿将脸部或身体直接推向蛋糕，以免被支撑物或尖锐结构误伤。|如需移除竹签或内部支撑，请在下单前主动联系店家确认是否可处理。|若顾客未提前提出移除需求而发生相关风险或受伤，本店恕不承担责任。",
        chooseCakeBeforeCheckout: "请先选择蛋糕和尺寸后再结账。",
        leadTimePrefix: "请至少提前",
        leadTimeSuffix: "天下单。",
        categoryListTitle: "分类蛋糕",
        backHome: "返回首页",
        loginTitle: "员工登录",
        username: "用户名",
        password: "密码",
        signingIn: "登录中...",
        loginFailed: "登录失败",
        loginUnexpectedError: "登录时发生错误，请重试。",
        loginButton: "登录",
        announcementShort: "新鲜蛋糕。支持自取。",
        announcementLong: "支持线上下单并到店自取。甄选手工精品蛋糕。",
        navHome: "首页",
        navAdmin: "管理",
        footerTitle: "手工精品蛋糕与甜点",
        footerSubtitle: "为现代庆典打造的精致手工蛋糕。",
        whatsappCustomizePrompt: "你好 ÈDRU，我想咨询定制蛋糕。",
        adminTitle: "管理后台",
        adminWelcome: "欢迎，小茹",
        saveSuccess: "保存成功。",
        saveFailed: "保存蛋糕失败",
        deleteSuccess: "蛋糕已删除。",
        deleteFailed: "删除蛋糕失败",
        adminTotalCakes: "蛋糕总数",
        adminTotalCategories: "分类总数",
        adminActiveCakes: "上架蛋糕",
        adminEditCake: "编辑蛋糕",
        adminAddCake: "新增蛋糕",
        adminCategory: "分类",
        adminName: "名称",
        adminNameChinese: "中文名称",
        adminSlug: "Slug",
        adminSlugAuto: "自动生成",
        adminLeadTimeDays: "提前天数",
        adminDescription: "描述",
        adminDescriptionChinese: "中文描述",
        adminIngredients: "配料",
        adminDescriptionPlaceholder: "示例：口感细腻的香草海绵蛋糕，夹层草莓奶油，顶部新鲜水果装饰。",
        adminDescriptionChinesePlaceholder: "示例：细腻香草蛋糕胚，搭配草莓奶油夹层，顶部以新鲜水果点缀。",
        adminIngredientsPlaceholder: "示例：低筋面粉、鸡蛋、淡奶油、草莓、糖、黄油。",
        adminUploadImage: "上传图片",
        adminImageSelected: "图片已选择，可保存。",
        adminPrice: "价格",
        adminAvailable: "可售",
        adminFeatured: "推荐",
        adminActive: "启用",
        adminUpdate: "更新",
        adminCreate: "创建",
        adminCancel: "取消",
        adminCakeManagement: "蛋糕管理",
        adminLeadTimeShort: "提前",
        adminDays: "天",
        adminDisabled: "停用",
        adminStandard: "普通",
        adminDelete: "删除",
        adminEdit: "编辑",
        adminSellerAnnouncementTitle: "卖家滚动公告",
        adminSaving: "保存中...",
        adminConfirmUpdateCake: "确认要更新这个蛋糕吗？",
        adminConfirmCreateCake: "确认要创建这个新蛋糕吗？",
        adminConfirmDeleteCake: "确认要删除这个蛋糕吗？",
        adminConfirmEditCake: "确认要编辑这个蛋糕吗？",
        adminImageRequired: "请先选择并上传图片。",
        adminAnnouncementSaveFailed: "保存公告失败",
        adminAnnouncementUpdated: "公告已更新。",
        adminConfirmEnableAnnouncement: "确认要启用滚动公告吗？",
        adminConfirmDisableAnnouncement: "确认要停用滚动公告吗？",
        confirmTitle: "请确认",
        confirmAction: "确认",
        confirmCancel: "取消",
        logoutLabel: "退出登录",
        loggingOutLabel: "退出中...",
        logoutConfirmMessage: "确认要退出登录吗？"
    },
    en: {
        homeTitle: "Cake Categories",
        homeSubtitle: "Choose a style first, then explore cakes",
        homeTagline: "ÈDRU Signature Collection",
        artisanSelection: "Artisan Selection",
        orderConcierge: "Order Concierge",
        viewCategory: "View Category",
        viewDetails: "View Details",
        from: "From",
        ingredients: "Ingredients",
        availableSizes: "Available Sizes",
        cakeLabel: "Cake",
        sizeLabel: "Size",
        priceLabel: "Price",
        checkout: "Checkout",
        orderViaWhatsApp: "Order via WhatsApp",
        orderViaInstagram: "Contact via Instagram",
        orderViaWeChat: "Order via WeChat",
        proceedOrderViaWhatsApp: "Please proceed with your order through WhatsApp.",
        weChatScanHint: "Tap to open the WeChat QR code and scan to place your order.",
        orContactViaInstagram: "Or message us on Instagram.",
        checkoutTitle: "Checkout",
        checkoutTermsToggle: "Disclaimer / Terms",
        checkoutTermsItems: "Some cakes may contain bamboo skewers or support dowels for structural stability.|Please do not push your face or body directly into the cake to avoid accidental injury from internal supports or sharp structures.|If you need the skewers/supports removed, please contact the shop in advance before confirming your order.|If no prior removal request is made, the shop is not liable for related risks or injuries.",
        chooseCakeBeforeCheckout: "Please choose a cake and size before checkout.",
        leadTimePrefix: "Please order at least",
        leadTimeSuffix: "days in advance.",
        categoryListTitle: "Category Cakes",
        backHome: "Back to Home",
        loginTitle: "Staff Login",
        username: "Username",
        password: "Password",
        signingIn: "Signing in...",
        loginFailed: "Login failed",
        loginUnexpectedError: "An unexpected error occurred during login. Please try again.",
        loginButton: "Login",
        announcementShort: "Fresh cakes. Pickup available.",
        announcementLong: "Order online for pickup. Premium handcrafted cakes.",
        navHome: "Home",
        navAdmin: "Admin",
        footerTitle: "Handcrafted Cakes and Desserts",
        footerSubtitle: "Luxury handcrafted cakes for modern celebrations.",
        whatsappCustomizePrompt: "Hello ÈDRU, I would like to ask about a customized cake. 你好 ÈDRU，我想咨询定制蛋糕。",
        adminTitle: "Admin Dashboard",
        adminWelcome: "Welcome Xiao Ru",
        saveSuccess: "Saved successfully.",
        saveFailed: "Failed to save cake",
        deleteSuccess: "Cake deleted.",
        deleteFailed: "Failed to delete cake",
        adminTotalCakes: "Total Cakes",
        adminTotalCategories: "Total Categories",
        adminActiveCakes: "Active Cakes",
        adminEditCake: "Edit Cake",
        adminAddCake: "Add Cake",
        adminCategory: "Category",
        adminName: "Name",
        adminNameChinese: "Name (Chinese)",
        adminSlug: "Slug",
        adminSlugAuto: "Auto",
        adminLeadTimeDays: "Lead Time (days)",
        adminDescription: "Description",
        adminDescriptionChinese: "Description (Chinese)",
        adminIngredients: "Ingredients",
        adminDescriptionPlaceholder: "Example: Soft vanilla sponge layered with strawberry cream and topped with fresh fruits.",
        adminDescriptionChinesePlaceholder: "Example: Delicate vanilla sponge with strawberry cream filling, finished with fresh fruit garnish.",
        adminIngredientsPlaceholder: "Example: Cake flour, eggs, whipping cream, strawberries, sugar, butter.",
        adminUploadImage: "Upload Image",
        adminImageSelected: "Image selected and ready to save.",
        adminPrice: "Price",
        adminAvailable: "Available",
        adminFeatured: "Featured",
        adminActive: "Active",
        adminUpdate: "Update",
        adminCreate: "Create",
        adminCancel: "Cancel",
        adminCakeManagement: "Cake Management",
        adminLeadTimeShort: "lead time",
        adminDays: "day(s)",
        adminDisabled: "Disabled",
        adminStandard: "Standard",
        adminDelete: "Delete",
        adminEdit: "Edit",
        adminSellerAnnouncementTitle: "Seller Moving Announcement",
        adminSaving: "Saving...",
        adminConfirmUpdateCake: "Confirm update this cake?",
        adminConfirmCreateCake: "Confirm create this new cake?",
        adminConfirmDeleteCake: "Confirm delete this cake?",
        adminConfirmEditCake: "Confirm edit this cake?",
        adminImageRequired: "Please choose and upload an image first.",
        adminAnnouncementSaveFailed: "Failed to update announcement",
        adminAnnouncementUpdated: "Announcement updated.",
        adminConfirmEnableAnnouncement: "Confirm to enable moving announcement?",
        adminConfirmDisableAnnouncement: "Confirm to disable moving announcement?",
        confirmTitle: "Please Confirm",
        confirmAction: "Confirm",
        confirmCancel: "Cancel",
        logoutLabel: "Logout",
        loggingOutLabel: "Logging out...",
        logoutConfirmMessage: "Are you sure you want to logout?"
    }
};
function t(lang) {
    return text[lang];
}
}),
"[project]/components/WeChatQrButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WeChatQrButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n-shared.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function WeChatQrButton({ lang, className, footerStyle = false }) {
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["t"])(lang);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen(true),
                className: className ?? "btn-lux-outline",
                children: footerStyle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e9f7f0] text-[#169256]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "currentColor",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8.5 9.2c.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.1-1.2-1.1-.6 0-1.1.5-1.1 1.1 0 .7.5 1.2 1.1 1.2Zm6.9 0c.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.1-1.2-1.1-.6 0-1.1.5-1.1 1.1 0 .7.5 1.2 1.1 1.2Z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WeChatQrButton.tsx",
                                        lineNumber: 23,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12.1 2.2c-5.2 0-9.4 3.2-9.4 7.2 0 2.3 1.4 4.3 3.7 5.6l-.8 3.1 3.8-2.1c.9.2 1.8.4 2.7.4 5.2 0 9.4-3.2 9.4-7.2s-4.2-7-9.4-7Zm0 12.5c-.9 0-1.8-.2-2.7-.4l-.4-.1-2.2 1.2.4-1.9-.4-.2c-1.9-1-3-2.5-3-4.1 0-3 3.7-5.5 8.3-5.5s8.3 2.5 8.3 5.5-3.7 5.5-8.3 5.5Z"
                                    }, void 0, false, {
                                        fileName: "[project]/components/WeChatQrButton.tsx",
                                        lineNumber: 24,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WeChatQrButton.tsx",
                                lineNumber: 22,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/WeChatQrButton.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "WeChat"
                        }, void 0, false, {
                            fileName: "[project]/components/WeChatQrButton.tsx",
                            lineNumber: 27,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/WeChatQrButton.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this) : copy.orderViaWeChat
            }, void 0, false, {
                fileName: "[project]/components/WeChatQrButton.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[130] flex items-center justify-center p-4",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": "WeChat QR",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Close WeChat QR",
                        className: "absolute inset-0 bg-black/40 backdrop-blur-[2px]",
                        onClick: ()=>setOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/components/WeChatQrButton.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-[1] w-full max-w-sm rounded-2xl border border-[color:var(--gold)]/35 bg-[#fdf7ee] p-5 shadow-[0_20px_40px_rgba(47,31,16,0.22)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-2xl text-[color:var(--ink)]",
                                children: copy.orderViaWeChat
                            }, void 0, false, {
                                fileName: "[project]/components/WeChatQrButton.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-[color:var(--ink-soft)]",
                                children: copy.weChatScanHint
                            }, void 0, false, {
                                fileName: "[project]/components/WeChatQrButton.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 rounded-xl border border-[color:var(--gold)]/30 bg-white p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/wechatcontact.jpg",
                                    alt: "WeChat contact QR code",
                                    className: "w-full h-auto rounded-lg object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/components/WeChatQrButton.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/WeChatQrButton.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setOpen(false),
                                className: "btn-lux-outline mt-4 w-full",
                                children: lang === "zh" ? "关闭" : "Close"
                            }, void 0, false, {
                                fileName: "[project]/components/WeChatQrButton.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/WeChatQrButton.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/WeChatQrButton.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
}),
"[project]/components/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contact.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n-shared.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WeChatQrButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WeChatQrButton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Footer({ lang }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const hideContactCtas = pathname.startsWith("/checkout");
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["t"])(lang);
    const whatsappUrl = `https://wa.me/${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WHATSAPP_NUMBER"]}?text=${encodeURIComponent(copy.whatsappCustomizePrompt)}`;
    const ctaCardClass = "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/88 px-4 text-[0.83rem] font-semibold tracking-[0.02em] text-[color:var(--ink-soft)] shadow-[0_8px_18px_rgba(56,34,13,0.08)] hover:-translate-y-0.5 hover:bg-white hover:text-[color:var(--ink)] hover:shadow-[0_10px_20px_rgba(56,34,13,0.12)]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "relative mt-14 overflow-hidden border-t border-[color:var(--gold)]/30 bg-[linear-gradient(180deg,rgba(248,242,232,0.45),rgba(230,211,182,0.55))] sm:mt-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#ecd0a2]/30 blur-2xl",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute -right-24 bottom-2 h-52 w-52 rounded-full bg-[#dfba82]/24 blur-3xl",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-5 rounded-[26px] border border-[color:var(--gold)]/28 bg-[linear-gradient(155deg,rgba(255,252,246,0.9),rgba(248,236,215,0.8))] p-5 shadow-[0_18px_34px_rgba(56,34,13,0.14)] sm:p-7 lg:grid-cols-[1.2fr_1fr] lg:items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "lux-kicker",
                                    children: "ÈDRU Patisserie"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "heading-serif mt-1 text-[1.45rem] leading-tight text-[color:var(--ink)] sm:text-[1.8rem]",
                                    children: copy.footerTitle
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-xl text-[0.92rem] leading-relaxed text-[color:var(--ink-soft)] sm:text-[0.96rem]",
                                    children: copy.footerSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 25,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 inline-flex items-center rounded-full border border-[color:var(--gold)]/35 bg-white/65 px-3 py-1 text-[0.72rem] tracking-[0.08em] text-[color:var(--gold-deep)]",
                                    children: lang === "zh" ? "手工制作 · 庆典蛋糕" : "HANDCRAFTED · CELEBRATION CAKES"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 26,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        hideContactCtas ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-[color:var(--gold)]/24 bg-white/62 p-4 shadow-inner shadow-[#d7bb90]/25",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--gold-deep)]",
                                    children: lang === "zh" ? "联系下单" : "Quick Contact"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: whatsappUrl,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            "aria-label": "WhatsApp",
                                            className: ctaCardClass,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f8ef] text-[#14864b]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "16",
                                                        height: "16",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M20.5 3.5A11.8 11.8 0 0 0 1.8 17.6L0 24l6.6-1.8a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8a11.7 11.7 0 0 0-3.6-8.3Zm-8.2 18.1h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.9 1.1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.7Zm5.4-7.4c-.3-.1-1.9-.9-2.2-1s-.5-.1-.7.1-.8 1-1 1.2c-.2.2-.3.2-.6 0a8.1 8.1 0 0 1-2.4-1.5 8.9 8.9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2.1-.4 0-.6l-1-2.4c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1a12.2 12.2 0 0 0 4.6 4c.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.8-.7 2-1.3.3-.6.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Footer.tsx",
                                                            lineNumber: 46,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Footer.tsx",
                                                        lineNumber: 45,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "WhatsApp"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 49,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 37,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contact$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INSTAGRAM_URL"],
                                            target: "_blank",
                                            rel: "noreferrer",
                                            "aria-label": "Instagram",
                                            className: ctaCardClass,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f8eaf3] text-[#9b3c72]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "16",
                                                        height: "16",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        "aria-hidden": "true",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.2 2h-8A4 4 0 0 0 4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-4 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8a2.7 2.7 0 1 0 2.7 2.7A2.7 2.7 0 0 0 12 9.3Zm4.8-2.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/Footer.tsx",
                                                            lineNumber: 61,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Footer.tsx",
                                                        lineNumber: 60,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Instagram"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Footer.tsx",
                                                    lineNumber: 64,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 52,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WeChatQrButton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            lang: lang,
                                            className: ctaCardClass,
                                            footerStyle: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.tsx",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Footer.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/BackButton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BackButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
function BackButton({ lang }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname === "/") {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>router.back(),
        className: "btn-lux-outline min-w-24 text-[0.75rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] uppercase",
        children: lang === "zh" ? "返回" : "Back"
    }, void 0, false, {
        fileName: "[project]/components/BackButton.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/IntroGate.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IntroGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const STORAGE_KEY = "edru_intro_seen";
const INTRO_DURATION_MS = 260;
const LOGO_CANDIDATES = [
    "/Designer.png",
    "/edru-logo.png",
    "/edru-logo.jpg",
    "/edru-logo.jpeg",
    "/edru-logo.webp",
    "/company-logo.png",
    "/company-logo.jpg",
    "/company-logo.jpeg",
    "/logo.png",
    "/logo.jpg",
    "/logo.jpeg",
    "/logo.webp"
];
function IntroGate({ lang }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const introFlag = searchParams.get("intro");
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [exiting, setExiting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoSrc, setLogoSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedLang, setSelectedLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(lang);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    function lockScroll() {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    }
    function unlockScroll() {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const forceIntro = introFlag === "1";
        const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
        if (seen && !forceIntro) {
            setExiting(false);
            setSubmitting(false);
            setVisible(false);
            unlockScroll();
            return;
        }
        setExiting(false);
        setSubmitting(false);
        setVisible(true);
        lockScroll();
        return ()=>{
            unlockScroll();
        };
    }, [
        pathname,
        introFlag
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!visible) {
            unlockScroll();
        }
    }, [
        visible
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setSelectedLang(lang);
    }, [
        lang,
        visible
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        async function resolveLogo() {
            for (const candidate of LOGO_CANDIDATES){
                const loaded = await new Promise((resolve)=>{
                    const image = new Image();
                    image.onload = ()=>resolve(true);
                    image.onerror = ()=>resolve(false);
                    image.src = candidate;
                });
                if (loaded && !cancelled) {
                    setLogoSrc(candidate);
                    return;
                }
            }
            if (!cancelled) {
                setLogoSrc(null);
            }
        }
        void resolveLogo();
        return ()=>{
            cancelled = true;
        };
    }, []);
    async function enterSite() {
        if (submitting) return;
        setSubmitting(true);
        if (selectedLang !== lang) {
            try {
                await fetch("/api/language", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        lang: selectedLang
                    })
                });
            } catch  {
            // Proceed anyway so user is never blocked by a temporary request failure.
            }
        }
        sessionStorage.setItem(STORAGE_KEY, "1");
        setExiting(true);
        window.setTimeout(()=>{
            if (selectedLang !== lang) {
                setSubmitting(false);
                window.location.replace(window.location.pathname);
                return;
            }
            if (window.location.search) {
                window.history.replaceState({}, "", window.location.pathname);
            }
            setVisible(false);
            setSubmitting(false);
        }, INTRO_DURATION_MS);
    }
    if (!visible) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed inset-0 z-[120] flex items-center justify-center px-5 transition-opacity duration-300 ${exiting ? "opacity-0" : "opacity-100"}`,
        "aria-label": "site-intro",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/12 backdrop-blur-md intro-overlay-pulse"
            }, void 0, false, {
                fileName: "[project]/components/IntroGate.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-md rounded-[20px] border border-[color:var(--gold)]/28 bg-[#fdf7ee] px-6 py-8 sm:px-8 sm:py-10 text-center shadow-[0_12px_28px_rgba(47,31,16,0.1)] intro-panel-rise",
                children: [
                    logoSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: logoSrc,
                        alt: "ÈDRU Patisserie",
                        className: "mx-auto h-auto w-auto max-h-[420px] max-w-full object-contain intro-logo-float",
                        style: {
                            filter: "none",
                            transform: "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/IntroGate.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto max-w-[320px] py-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-5xl text-[color:var(--gold-deep)]",
                                children: "ÈDRU"
                            }, void 0, false, {
                                fileName: "[project]/components/IntroGate.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 tracking-[0.22em] text-[color:var(--ink-soft)] text-xs uppercase",
                                children: "Patisserie"
                            }, void 0, false, {
                                fileName: "[project]/components/IntroGate.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-xs text-[color:var(--ink-soft)]",
                                children: "Logo file not found in public folder."
                            }, void 0, false, {
                                fileName: "[project]/components/IntroGate.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/IntroGate.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-4 heading-serif text-2xl text-[color:var(--ink)]",
                        children: selectedLang === "zh" ? "进入网站" : "Enter Website"
                    }, void 0, false, {
                        fileName: "[project]/components/IntroGate.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-[color:var(--ink-soft)]",
                        children: selectedLang === "zh" ? "欢迎来到甜品工作室" : "Welcome to the patisserie"
                    }, void 0, false, {
                        fileName: "[project]/components/IntroGate.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 inline-flex items-center rounded-full border border-[color:var(--gold)]/40 bg-white/70 p-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelectedLang("zh"),
                                className: `rounded-full px-3 py-1.5 text-sm ${selectedLang === "zh" ? "bg-[color:var(--gold)] text-white" : "text-[color:var(--ink-soft)]"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/flags/cn.svg",
                                            alt: "China",
                                            className: "h-3.5 w-5 rounded-[2px] object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/components/IntroGate.tsx",
                                            lineNumber: 182,
                                            columnNumber: 64
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "中文"
                                        }, void 0, false, {
                                            fileName: "[project]/components/IntroGate.tsx",
                                            lineNumber: 182,
                                            columnNumber: 152
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/IntroGate.tsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/IntroGate.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSelectedLang("en"),
                                className: `rounded-full px-3 py-1.5 text-sm ${selectedLang === "en" ? "bg-[color:var(--gold)] text-white" : "text-[color:var(--ink-soft)]"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/flags/us.svg",
                                            alt: "United States",
                                            className: "h-3.5 w-5 rounded-[2px] object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/components/IntroGate.tsx",
                                            lineNumber: 193,
                                            columnNumber: 64
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "English"
                                        }, void 0, false, {
                                            fileName: "[project]/components/IntroGate.tsx",
                                            lineNumber: 193,
                                            columnNumber: 160
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/IntroGate.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/IntroGate.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/IntroGate.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void enterSite(),
                        disabled: submitting,
                        className: "btn-lux mt-6 min-w-44 text-sm sm:text-base disabled:opacity-70",
                        children: [
                            selectedLang === "zh" ? "进入网站" : "Enter Website",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/components/IntroGate.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/IntroGate.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/IntroGate.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/IntroGate.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SellerNoticeBar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SellerNoticeBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function SellerNoticeBar({ enabled, message }) {
    const [dismissed, setDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!enabled || dismissed || !message.trim()) {
        return null;
    }
    const display = `• ${message.trim()} • ${message.trim()} • ${message.trim()} •`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden border-b border-[color:var(--gold)]/28 bg-[#f6e8d0] text-[#5a4228]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 pr-12 sm:px-5 sm:pr-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "notice-marquee whitespace-nowrap text-[0.78rem] sm:text-[0.88rem] tracking-[0.05em]",
                    "aria-label": "Seller announcement",
                    children: display
                }, void 0, false, {
                    fileName: "[project]/components/SellerNoticeBar.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SellerNoticeBar.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setDismissed(true),
                className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/45 bg-white/70 px-2 py-0.5 text-[0.7rem] text-[color:var(--ink-soft)] hover:bg-white",
                "aria-label": "Hide seller announcement",
                children: "Hide"
            }, void 0, false, {
                fileName: "[project]/components/SellerNoticeBar.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SellerNoticeBar.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ff7219d4._.js.map