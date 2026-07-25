(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/AdminDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n-shared.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const defaultSizes = [
    {
        size: '6"',
        price: 0,
        available: true
    },
    {
        size: '8"',
        price: 0,
        available: true
    },
    {
        size: '10"',
        price: 0,
        available: true
    }
];
const emptyForm = {
    categoryId: 0,
    name: "",
    nameCn: "",
    slug: "",
    description: "",
    descriptionCn: "",
    ingredients: "",
    imageUrl: "",
    leadTimeDays: 3,
    active: true,
    featured: false,
    sizes: defaultSizes
};
function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function AdminDashboard(param) {
    let { lang, categories, initialCakes, initialAnnouncement } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang);
    const [cakes, setCakes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCakes);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyForm);
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [announcement, setAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAnnouncement);
    const [announcementMessage, setAnnouncementMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [savingCake, setSavingCake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savingAnnouncement, setSavingAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slugEdited, setSlugEdited] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AdminDashboard.useMemo[stats]": ()=>({
                totalCakes: cakes.length,
                totalCategories: categories.length,
                activeCakes: cakes.filter({
                    "AdminDashboard.useMemo[stats]": (cake)=>cake.active
                }["AdminDashboard.useMemo[stats]"]).length
            })
    }["AdminDashboard.useMemo[stats]"], [
        cakes,
        categories.length
    ]);
    function resetForm() {
        var _categories_;
        var _categories__id;
        setForm({
            ...emptyForm,
            categoryId: (_categories__id = (_categories_ = categories[0]) === null || _categories_ === void 0 ? void 0 : _categories_.id) !== null && _categories__id !== void 0 ? _categories__id : 0
        });
        setEditingId(null);
        setSlugEdited(false);
    }
    async function refreshCakes() {
        const response = await fetch("/api/admin/cakes");
        const result = await response.json();
        setCakes(result.cakes);
    }
    async function handleUpload(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ()=>{
            if (typeof reader.result === "string") {
                const dataUrl = reader.result;
                setForm((prev)=>({
                        ...prev,
                        imageUrl: dataUrl
                    }));
            }
        };
        reader.readAsDataURL(file);
    }
    async function saveCake(event) {
        event.preventDefault();
        if (savingCake) return;
        setMessage("");
        if (!editingId && !form.imageUrl.startsWith("data:image/")) {
            setMessage(copy.adminImageRequired);
            return;
        }
        const actionText = editingId ? copy.adminConfirmUpdateCake : copy.adminConfirmCreateCake;
        if (!window.confirm(actionText)) {
            return;
        }
        setSavingCake(true);
        const payload = {
            ...form,
            categoryId: Number(form.categoryId),
            leadTimeDays: Number(form.leadTimeDays),
            sizes: form.sizes.map((size)=>({
                    ...size,
                    price: Number(size.price)
                }))
        };
        try {
            const response = await fetch(editingId ? "/api/admin/cakes/".concat(editingId) : "/api/admin/cakes", {
                method: editingId ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const result = await response.json();
                var _result_error;
                setMessage((_result_error = result.error) !== null && _result_error !== void 0 ? _result_error : copy.saveFailed);
                return;
            }
            await refreshCakes();
            resetForm();
            setMessage(copy.saveSuccess);
        } finally{
            setSavingCake(false);
        }
    }
    async function deleteCake(id) {
        const confirmed = window.confirm(copy.adminConfirmDeleteCake);
        if (!confirmed) {
            return;
        }
        const response = await fetch("/api/admin/cakes/".concat(id), {
            method: "DELETE"
        });
        if (response.ok) {
            await refreshCakes();
            setMessage(copy.deleteSuccess);
            return;
        }
        const result = await response.json().catch(()=>({}));
        var _result_error;
        setMessage((_result_error = result.error) !== null && _result_error !== void 0 ? _result_error : copy.deleteFailed);
    }
    function editCake(cake) {
        const confirmed = window.confirm(copy.adminConfirmEditCake);
        if (!confirmed) {
            return;
        }
        setEditingId(cake.id);
        setForm({
            categoryId: cake.category_id,
            name: cake.name,
            nameCn: cake.name_cn,
            slug: cake.slug,
            description: cake.description,
            descriptionCn: cake.description_cn,
            ingredients: cake.ingredients,
            imageUrl: cake.image_url,
            leadTimeDays: cake.lead_time_days,
            active: cake.active,
            featured: cake.featured,
            sizes: defaultSizes.map((preset)=>{
                const matched = cake.sizes.find((size)=>size.size === preset.size);
                var _matched_price, _matched_available;
                return {
                    size: preset.size,
                    price: (_matched_price = matched === null || matched === void 0 ? void 0 : matched.price) !== null && _matched_price !== void 0 ? _matched_price : 0,
                    available: (_matched_available = matched === null || matched === void 0 ? void 0 : matched.available) !== null && _matched_available !== void 0 ? _matched_available : true
                };
            })
        });
        setSlugEdited(true);
    }
    async function saveAnnouncement(event) {
        event.preventDefault();
        if (savingAnnouncement) return;
        setAnnouncementMessage("");
        const confirmed = window.confirm(announcement.enabled ? copy.adminConfirmEnableAnnouncement : copy.adminConfirmDisableAnnouncement);
        if (!confirmed) {
            return;
        }
        setSavingAnnouncement(true);
        try {
            const response = await fetch("/api/admin/announcement", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(announcement)
            });
            if (!response.ok) {
                const result = await response.json().catch(()=>({}));
                var _result_error;
                setAnnouncementMessage((_result_error = result.error) !== null && _result_error !== void 0 ? _result_error : copy.adminAnnouncementSaveFailed);
                return;
            }
            const result = await response.json().catch(()=>({}));
            if (result.announcement) {
                setAnnouncement(result.announcement);
            }
            router.refresh();
            setAnnouncementMessage(copy.adminAnnouncementUpdated);
        } finally{
            setSavingAnnouncement(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "card-lux p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[color:var(--ink-soft)]",
                                children: copy.adminTotalCakes
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 252,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-3xl",
                                children: stats.totalCakes
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 252,
                                columnNumber: 121
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "card-lux p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[color:var(--ink-soft)]",
                                children: copy.adminTotalCategories
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 253,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-3xl",
                                children: stats.totalCategories
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 253,
                                columnNumber: 126
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "card-lux p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[color:var(--ink-soft)]",
                                children: copy.adminActiveCakes
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 254,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-3xl",
                                children: stats.activeCakes
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 254,
                                columnNumber: 122
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card-lux p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "heading-serif text-3xl mb-4",
                        children: editingId ? copy.adminEditCake : copy.adminAddCake
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: saveCake,
                        className: "grid gap-4 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    copy.adminCategory,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: form.categoryId,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    categoryId: Number(event.target.value)
                                                })),
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        required: true,
                                        children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: category.id,
                                                children: [
                                                    category.name_cn,
                                                    " / ",
                                                    category.name
                                                ]
                                            }, category.id, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 262,
                                                columnNumber: 45
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    copy.adminName,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.name,
                                        onChange: (event)=>{
                                            const nextName = event.target.value;
                                            setForm((prev)=>({
                                                    ...prev,
                                                    name: nextName,
                                                    slug: slugEdited ? prev.slug : slugify(nextName)
                                                }));
                                        },
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    copy.adminNameChinese,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.nameCn,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    nameCn: event.target.value
                                                })),
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 281,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    copy.adminSlug,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: form.slug,
                                                onChange: (event)=>{
                                                    setSlugEdited(true);
                                                    setForm((prev)=>({
                                                            ...prev,
                                                            slug: slugify(event.target.value)
                                                        }));
                                                },
                                                className: "w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 285,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    const nextSlug = slugify(form.name);
                                                    setForm((prev)=>({
                                                            ...prev,
                                                            slug: nextSlug
                                                        }));
                                                    setSlugEdited(false);
                                                },
                                                className: "shrink-0 rounded-xl border border-[color:var(--gold)]/40 bg-white/85 px-3 py-2 text-xs text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)]",
                                                children: copy.adminSlugAuto
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 294,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm",
                                children: [
                                    copy.adminLeadTimeDays,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: 1,
                                        value: form.leadTimeDays,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    leadTimeDays: Number(event.target.value)
                                                })),
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 308,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 307,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm sm:col-span-2",
                                children: [
                                    copy.adminDescription,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: form.description,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    description: event.target.value
                                                })),
                                        placeholder: copy.adminDescriptionPlaceholder,
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        rows: 3,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm sm:col-span-2",
                                children: [
                                    copy.adminDescriptionChinese,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: form.descriptionCn,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    descriptionCn: event.target.value
                                                })),
                                        placeholder: copy.adminDescriptionChinesePlaceholder,
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        rows: 3,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 314,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm sm:col-span-2",
                                children: [
                                    copy.adminIngredients,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: form.ingredients,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    ingredients: event.target.value
                                                })),
                                        placeholder: copy.adminIngredientsPlaceholder,
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        rows: 3,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm sm:col-span-2",
                                children: [
                                    copy.adminUploadImage,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        onChange: (event)=>{
                                            var _event_target_files;
                                            var _event_target_files_;
                                            return void handleUpload((_event_target_files_ = (_event_target_files = event.target.files) === null || _event_target_files === void 0 ? void 0 : _event_target_files[0]) !== null && _event_target_files_ !== void 0 ? _event_target_files_ : null);
                                        },
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        required: !editingId
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 320,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-[color:var(--ink-soft)]",
                                        children: lang === "zh" ? "手机可从相册选择，电脑可从文件管理器选择。" : "On phone this opens your photo album, on laptop it opens file explorer."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 327,
                                        columnNumber: 13
                                    }, this),
                                    form.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-[color:var(--gold-deep)]",
                                        children: copy.adminImageSelected
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:col-span-2 grid gap-3 sm:grid-cols-3",
                                children: form.sizes.map((size, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-[color:var(--gold)]/20 rounded-xl p-3 bg-white/80",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium",
                                                children: size.size
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 340,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs block mt-2",
                                                children: [
                                                    copy.adminPrice,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        step: "0.01",
                                                        min: 0,
                                                        value: size.price,
                                                        onChange: (event)=>{
                                                            const next = [
                                                                ...form.sizes
                                                            ];
                                                            next[index] = {
                                                                ...next[index],
                                                                price: Number(event.target.value)
                                                            };
                                                            setForm((prev)=>({
                                                                    ...prev,
                                                                    sizes: next
                                                                }));
                                                        },
                                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-lg px-2 py-1",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminDashboard.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs inline-flex items-center gap-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: size.available,
                                                        onChange: (event)=>{
                                                            const next = [
                                                                ...form.sizes
                                                            ];
                                                            next[index] = {
                                                                ...next[index],
                                                                available: event.target.checked
                                                            };
                                                            setForm((prev)=>({
                                                                    ...prev,
                                                                    sizes: next
                                                                }));
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminDashboard.tsx",
                                                        lineNumber: 349,
                                                        columnNumber: 19
                                                    }, this),
                                                    copy.adminAvailable
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, size.size, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm inline-flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: form.featured,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    featured: event.target.checked
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 360,
                                        columnNumber: 69
                                    }, this),
                                    " ",
                                    copy.adminFeatured
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm inline-flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: form.active,
                                        onChange: (event)=>setForm((prev)=>({
                                                    ...prev,
                                                    active: event.target.checked
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 361,
                                        columnNumber: 69
                                    }, this),
                                    " ",
                                    copy.adminActive
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sm:col-span-2 flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: savingCake,
                                        className: "px-5 py-2 rounded-xl bg-[#2f2419] text-white disabled:opacity-70",
                                        children: savingCake ? copy.adminSaving : editingId ? copy.adminUpdate : copy.adminCreate
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 364,
                                        columnNumber: 13
                                    }, this),
                                    editingId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: resetForm,
                                        className: "px-5 py-2 rounded-xl border border-[color:var(--gold)]/40",
                                        children: copy.adminCancel
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 365,
                                        columnNumber: 26
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[#fff8ea] px-4 py-3 text-sm text-[color:var(--ink-soft)]",
                        role: "status",
                        "aria-live": "polite",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card-lux p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "heading-serif text-3xl mb-4",
                        children: copy.adminCakeManagement
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: cakes.map((cake)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "border border-[color:var(--gold)]/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: [
                                                    cake.name,
                                                    " / ",
                                                    cake.name_cn
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-[color:var(--ink-soft)]",
                                                children: [
                                                    "/",
                                                    cake.slug,
                                                    " • ",
                                                    copy.adminLeadTimeShort,
                                                    ": ",
                                                    cake.lead_time_days,
                                                    " ",
                                                    copy.adminDays
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 382,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-[color:var(--ink-soft)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: cake.active ? "font-semibold text-green-700" : "font-semibold text-red-700",
                                                        children: cake.active ? copy.adminActive : copy.adminDisabled
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminDashboard.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            " • ",
                                                            cake.featured ? copy.adminFeatured : copy.adminStandard
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminDashboard.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 383,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 380,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>editCake(cake),
                                                className: "px-4 py-1.5 rounded-lg border border-[color:var(--gold)]/40",
                                                children: copy.adminEdit
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void deleteCake(cake.id),
                                                className: "px-4 py-1.5 rounded-lg bg-red-700 text-white",
                                                children: copy.adminDelete
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 392,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 390,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, cake.id, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 379,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 377,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "card-lux p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "heading-serif text-3xl mb-4",
                        children: copy.adminSellerAnnouncementTitle
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: saveAnnouncement,
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm inline-flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: announcement.enabled,
                                        onChange: (event)=>setAnnouncement((prev)=>({
                                                    ...prev,
                                                    enabled: event.target.checked
                                                }))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this),
                                    lang === "zh" ? "启用滚动公告" : "Enable moving announcement"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm",
                                children: [
                                    lang === "zh" ? "英文公告文案" : "English announcement message",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: announcement.messageEn,
                                        onChange: (event)=>setAnnouncement((prev)=>({
                                                    ...prev,
                                                    messageEn: event.target.value
                                                })),
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        rows: 2,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm",
                                children: [
                                    lang === "zh" ? "中文公告文案" : "Chinese announcement message",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: announcement.messageZh,
                                        onChange: (event)=>setAnnouncement((prev)=>({
                                                    ...prev,
                                                    messageZh: event.target.value
                                                })),
                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90",
                                        rows: 2,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: savingAnnouncement,
                                className: "px-5 py-2 rounded-xl bg-[#2f2419] text-white disabled:opacity-70",
                                children: savingAnnouncement ? copy.adminSaving : lang === "zh" ? "保存公告" : "Save Announcement"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this),
                    announcementMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[#fff8ea] px-4 py-3 text-sm text-[color:var(--ink-soft)]",
                        role: "status",
                        "aria-live": "polite",
                        children: announcementMessage
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 439,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 399,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminDashboard.tsx",
        lineNumber: 250,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "Hg+4St4ET7V944vOB9turOtZ1N8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminDashboard;
var _c;
__turbopack_context__.k.register(_c, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LogoutButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LogoutButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LogoutButton() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function handleLogout() {
        if (loading) return;
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (!confirmed) return;
        setLoading(true);
        await fetch("/api/auth/logout", {
            method: "POST"
        });
        router.replace("/login");
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleLogout,
        disabled: loading,
        className: "inline-flex items-center gap-2 rounded-full border border-[#b64747]/55 bg-[#b83b3b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_16px_rgba(120,25,25,0.24)] hover:bg-[#9f2e2e] disabled:opacity-60",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                children: "↩"
            }, void 0, false, {
                fileName: "[project]/components/LogoutButton.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            loading ? "Logging out..." : "Logout"
        ]
    }, void 0, true, {
        fileName: "[project]/components/LogoutButton.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(LogoutButton, "OeGW3YQfIEwiDdtbkZtE38+y0P4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LogoutButton;
var _c;
__turbopack_context__.k.register(_c, "LogoutButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_025c3e05._.js.map