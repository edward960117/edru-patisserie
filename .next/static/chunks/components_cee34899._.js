(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConfirmDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ConfirmDialog(param) {
    let { open, title, message, confirmText, cancelText, singleAction = false, danger = false, onConfirm, onCancel } = param;
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[140] flex items-center justify-center px-4",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/30 backdrop-blur-[2px]",
                onClick: onCancel
            }, void 0, false, {
                fileName: "[project]/components/ConfirmDialog.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-sm rounded-2xl border border-[color:var(--gold)]/35 bg-[linear-gradient(150deg,rgba(255,252,246,0.96),rgba(248,236,214,0.92))] p-5 shadow-[0_18px_34px_rgba(56,34,13,0.2)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "heading-serif text-2xl text-[color:var(--ink)]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/ConfirmDialog.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/ConfirmDialog.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex justify-end gap-2.5",
                        children: [
                            singleAction ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onCancel,
                                className: "rounded-full border border-[color:var(--gold)]/45 bg-white/85 px-4 py-2 text-sm text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)]",
                                children: cancelText
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onConfirm,
                                className: danger ? "rounded-full border border-[#ad3d3d] bg-[#b83b3b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9f2e2e]" : "rounded-full border border-[color:var(--gold)]/55 bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--gold-deep)]",
                                children: confirmText
                            }, void 0, false, {
                                fileName: "[project]/components/ConfirmDialog.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ConfirmDialog.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ConfirmDialog.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ConfirmDialog.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = ConfirmDialog;
var _c;
__turbopack_context__.k.register(_c, "ConfirmDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const defaultSizes = [
    {
        size: '6"',
        price: "0.00",
        available: false
    },
    {
        size: '8"',
        price: "0.00",
        available: false
    },
    {
        size: '10"',
        price: "0.00",
        available: false
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
const MAX_UPLOAD_EDGE = 1600;
const MAX_DATA_URL_LENGTH = 1_800_000;
function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function normalizePriceInput(raw) {
    if (raw.trim() === "") {
        return "0.00";
    }
    const parsed = Number.parseFloat(raw);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return "0.00";
    }
    return parsed.toFixed(2);
}
function parsePrice(raw) {
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
}
function AdminDashboard(param) {
    let { lang, categories, initialCakes, initialAnnouncement } = param;
    var _categories_;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang);
    const [cakes, setCakes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCakes);
    var _categories__id;
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...emptyForm,
        categoryId: (_categories__id = (_categories_ = categories[0]) === null || _categories_ === void 0 ? void 0 : _categories_.id) !== null && _categories__id !== void 0 ? _categories__id : 0
    });
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [announcement, setAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAnnouncement);
    const [announcementMessage, setAnnouncementMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [savingCake, setSavingCake] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savingAnnouncement, setSavingAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slugEdited, setSlugEdited] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmState, setConfirmState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorPopupMessage, setErrorPopupMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const confirmResolverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
            categoryId: (_categories__id = (_categories_ = categories[0]) === null || _categories_ === void 0 ? void 0 : _categories_.id) !== null && _categories__id !== void 0 ? _categories__id : 0,
            sizes: defaultSizes.map((size)=>({
                    ...size
                }))
        });
        setEditingId(null);
        setSlugEdited(false);
    }
    async function refreshCakes() {
        const response = await fetch("/api/admin/cakes");
        const result = await response.json();
        setCakes(result.cakes);
    }
    async function compressImageFile(file) {
        const objectUrl = URL.createObjectURL(file);
        try {
            const image = await new Promise((resolve, reject)=>{
                const img = new Image();
                img.onload = ()=>resolve(img);
                img.onerror = ()=>reject(new Error("Failed to load image file"));
                img.src = objectUrl;
            });
            const longEdge = Math.max(image.width, image.height);
            const scale = longEdge > MAX_UPLOAD_EDGE ? MAX_UPLOAD_EDGE / longEdge : 1;
            const width = Math.max(1, Math.round(image.width * scale));
            const height = Math.max(1, Math.round(image.height * scale));
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
            if (!context) {
                throw new Error("Unable to process image");
            }
            context.drawImage(image, 0, 0, width, height);
            return canvas.toDataURL("image/jpeg", 0.82);
        } finally{
            URL.revokeObjectURL(objectUrl);
        }
    }
    async function askConfirm(message) {
        let danger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        return new Promise((resolve)=>{
            confirmResolverRef.current = resolve;
            setConfirmState({
                message,
                danger
            });
        });
    }
    function closeConfirm(confirmed) {
        if (confirmResolverRef.current) {
            confirmResolverRef.current(confirmed);
            confirmResolverRef.current = null;
        }
        setConfirmState(null);
    }
    function showErrorPopup(messageText) {
        setErrorPopupMessage(messageText);
    }
    async function handleUpload(file) {
        if (!file) return;
        setMessage("");
        try {
            const dataUrl = await compressImageFile(file);
            if (!dataUrl.startsWith("data:image/")) {
                setMessage(lang === "zh" ? "图片处理失败，请重新选择。" : "Image processing failed. Please choose the image again.");
                return;
            }
            if (dataUrl.length > MAX_DATA_URL_LENGTH) {
                setMessage(lang === "zh" ? "图片过大，请选择更小的图片。" : "Image is too large. Please choose a smaller image.");
                return;
            }
            setForm((prev)=>({
                    ...prev,
                    imageUrl: dataUrl
                }));
        } catch (e) {
            setMessage(lang === "zh" ? "图片上传失败，请重试。" : "Image upload failed. Please try again.");
        }
    }
    async function saveCake(event) {
        event.preventDefault();
        if (savingCake) return;
        setMessage("");
        if (!editingId && !form.imageUrl.startsWith("data:image/")) {
            setMessage(copy.adminImageRequired);
            return;
        }
        const missingRequiredField = !form.categoryId || !form.name.trim() || !form.nameCn.trim() || !form.slug.trim() || !form.description.trim() || !form.descriptionCn.trim() || !form.ingredients.trim();
        if (missingRequiredField) {
            setMessage(lang === "zh" ? "请填写所有必填信息。" : "Please fill in all required fields.");
            return;
        }
        const hasAvailableSize = form.sizes.some((size)=>size.available);
        if (!hasAvailableSize) {
            setMessage(lang === "zh" ? "请至少勾选一个可售尺寸。" : "Please select at least one available size.");
            return;
        }
        const invalidAvailablePrice = form.sizes.some((size)=>size.available && parsePrice(size.price) <= 0);
        if (invalidAvailablePrice) {
            setMessage(lang === "zh" ? "可售尺寸价格必须大于 0。" : "Available size prices must be greater than 0.");
            return;
        }
        const actionText = editingId ? copy.adminConfirmUpdateCake : copy.adminConfirmCreateCake;
        const confirmed = await askConfirm(actionText);
        if (!confirmed) {
            return;
        }
        setSavingCake(true);
        const payload = {
            ...form,
            categoryId: Number(form.categoryId),
            leadTimeDays: Number(form.leadTimeDays),
            sizes: form.sizes.map((size)=>({
                    ...size,
                    price: parsePrice(size.price)
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
                var _result_details;
                const result = await response.json().catch(()=>({}));
                if (response.status === 401) {
                    window.location.assign("/login?next=/admin");
                    return;
                }
                if ((_result_details = result.details) === null || _result_details === void 0 ? void 0 : _result_details.fieldErrors) {
                    var _Object_values_find, _result_details_formErrors;
                    const firstFieldError = (_Object_values_find = Object.values(result.details.fieldErrors).find((errors)=>errors && errors.length)) === null || _Object_values_find === void 0 ? void 0 : _Object_values_find[0];
                    const firstFormError = (_result_details_formErrors = result.details.formErrors) === null || _result_details_formErrors === void 0 ? void 0 : _result_details_formErrors[0];
                    var _ref, _ref1;
                    const errorText = (_ref1 = (_ref = firstFieldError !== null && firstFieldError !== void 0 ? firstFieldError : firstFormError) !== null && _ref !== void 0 ? _ref : result.error) !== null && _ref1 !== void 0 ? _ref1 : copy.saveFailed;
                    setMessage(errorText);
                    showErrorPopup(errorText);
                    return;
                }
                if (result.error && result.detail) {
                    const errorText = "".concat(result.error, " ").concat(result.detail);
                    setMessage(errorText);
                    showErrorPopup(errorText);
                    return;
                }
                var _result_field, _result_field1;
                const conflictHint = result.field || result.value ? lang === "zh" ? "请修改 ".concat((_result_field = result.field) !== null && _result_field !== void 0 ? _result_field : "该字段").concat(result.value ? "（当前值：".concat(result.value, "）") : "", " 后重试。") : "Please modify ".concat((_result_field1 = result.field) !== null && _result_field1 !== void 0 ? _result_field1 : "this field").concat(result.value ? " (current value: ".concat(result.value, ")") : "", " and try again.") : "";
                var _result_error;
                const errorText = "".concat((_result_error = result.error) !== null && _result_error !== void 0 ? _result_error : copy.saveFailed).concat(conflictHint ? " ".concat(conflictHint) : "");
                setMessage(errorText);
                showErrorPopup(errorText);
                return;
            }
            await refreshCakes();
            resetForm();
            setMessage(copy.saveSuccess);
        } catch (e) {
            const fallbackText = lang === "zh" ? "保存失败，请检查输入后重试。" : "Save failed. Please check your inputs and try again.";
            setMessage(fallbackText);
            showErrorPopup(fallbackText);
        } finally{
            setSavingCake(false);
        }
    }
    async function deleteCake(id) {
        const confirmed = await askConfirm(copy.adminConfirmDeleteCake, true);
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
        if (response.status === 401) {
            window.location.assign("/login?next=/admin");
            return;
        }
        const result = await response.json().catch(()=>({}));
        var _result_error;
        setMessage((_result_error = result.error) !== null && _result_error !== void 0 ? _result_error : copy.deleteFailed);
    }
    async function editCake(cake) {
        const confirmed = await askConfirm(copy.adminConfirmEditCake);
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
                var _matched_available;
                return {
                    size: preset.size,
                    price: matched ? matched.price.toFixed(2) : "0.00",
                    available: (_matched_available = matched === null || matched === void 0 ? void 0 : matched.available) !== null && _matched_available !== void 0 ? _matched_available : false
                };
            })
        });
        setSlugEdited(true);
    }
    async function saveAnnouncement(event) {
        event.preventDefault();
        if (savingAnnouncement) return;
        setAnnouncementMessage("");
        const confirmed = await askConfirm(announcement.enabled ? copy.adminConfirmEnableAnnouncement : copy.adminConfirmDisableAnnouncement);
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
                if (response.status === 401) {
                    window.location.assign("/login?next=/admin");
                    return;
                }
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
    var _confirmState_message;
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
                                lineNumber: 423,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-3xl",
                                children: stats.totalCakes
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 423,
                                columnNumber: 121
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 423,
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
                                lineNumber: 424,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-3xl",
                                children: stats.totalCategories
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 424,
                                columnNumber: 126
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 424,
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
                                lineNumber: 425,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "heading-serif text-3xl",
                                children: stats.activeCakes
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 425,
                                columnNumber: 122
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 422,
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
                        lineNumber: 429,
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
                                                lineNumber: 433,
                                                columnNumber: 45
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 431,
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
                                        lineNumber: 437,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 436,
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
                                        lineNumber: 452,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 451,
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
                                                lineNumber: 456,
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
                                                lineNumber: 465,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 455,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 454,
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
                                        lineNumber: 479,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 478,
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
                                        lineNumber: 482,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 481,
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
                                        lineNumber: 485,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 484,
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
                                        lineNumber: 488,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 487,
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
                                        lineNumber: 491,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-[color:var(--ink-soft)]",
                                        children: lang === "zh" ? "手机可从相册选择，电脑可从文件管理器选择。" : "On phone this opens your photo album, on laptop it opens file explorer."
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 498,
                                        columnNumber: 13
                                    }, this),
                                    form.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-[color:var(--gold-deep)]",
                                        children: copy.adminImageSelected
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 502,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 490,
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
                                                lineNumber: 511,
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
                                                            const rawValue = event.target.value;
                                                            const next = [
                                                                ...form.sizes
                                                            ];
                                                            next[index] = {
                                                                ...next[index],
                                                                price: rawValue
                                                            };
                                                            setForm((prev)=>({
                                                                    ...prev,
                                                                    sizes: next
                                                                }));
                                                        },
                                                        onBlur: (event)=>{
                                                            const next = [
                                                                ...form.sizes
                                                            ];
                                                            next[index] = {
                                                                ...next[index],
                                                                price: normalizePriceInput(event.target.value)
                                                            };
                                                            setForm((prev)=>({
                                                                    ...prev,
                                                                    sizes: next
                                                                }));
                                                        },
                                                        className: "w-full mt-1 border border-[color:var(--gold)]/30 rounded-lg px-2 py-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/AdminDashboard.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 512,
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
                                                        lineNumber: 525,
                                                        columnNumber: 19
                                                    }, this),
                                                    copy.adminAvailable
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 524,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, size.size, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 508,
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
                                        lineNumber: 536,
                                        columnNumber: 69
                                    }, this),
                                    " ",
                                    copy.adminFeatured
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 536,
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
                                        lineNumber: 537,
                                        columnNumber: 69
                                    }, this),
                                    " ",
                                    copy.adminActive
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 537,
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
                                        lineNumber: 540,
                                        columnNumber: 13
                                    }, this),
                                    editingId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: resetForm,
                                        className: "px-5 py-2 rounded-xl border border-[color:var(--gold)]/40",
                                        children: copy.adminCancel
                                    }, void 0, false, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 541,
                                        columnNumber: 26
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 539,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 430,
                        columnNumber: 9
                    }, this),
                    message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[#fff8ea] px-4 py-3 text-sm text-[color:var(--ink-soft)]",
                        role: "status",
                        "aria-live": "polite",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 545,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 428,
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
                        lineNumber: 552,
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
                                                lineNumber: 557,
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
                                                lineNumber: 558,
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
                                                        lineNumber: 560,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            " • ",
                                                            cake.featured ? copy.adminFeatured : copy.adminStandard
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/AdminDashboard.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 559,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 556,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void editCake(cake),
                                                className: "px-4 py-1.5 rounded-lg border border-[color:var(--gold)]/40",
                                                children: copy.adminEdit
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 567,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void deleteCake(cake.id),
                                                className: "px-4 py-1.5 rounded-lg bg-red-700 text-white",
                                                children: copy.adminDelete
                                            }, void 0, false, {
                                                fileName: "[project]/components/AdminDashboard.tsx",
                                                lineNumber: 568,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AdminDashboard.tsx",
                                        lineNumber: 566,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, cake.id, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 555,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 551,
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
                        lineNumber: 576,
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
                                        lineNumber: 579,
                                        columnNumber: 13
                                    }, this),
                                    lang === "zh" ? "启用滚动公告" : "Enable moving announcement"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 578,
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
                                        lineNumber: 589,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 587,
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
                                        lineNumber: 600,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 598,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: savingAnnouncement,
                                className: "px-5 py-2 rounded-xl bg-[#2f2419] text-white disabled:opacity-70",
                                children: savingAnnouncement ? copy.adminSaving : lang === "zh" ? "保存公告" : "Save Announcement"
                            }, void 0, false, {
                                fileName: "[project]/components/AdminDashboard.tsx",
                                lineNumber: 609,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this),
                    announcementMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[#fff8ea] px-4 py-3 text-sm text-[color:var(--ink-soft)]",
                        role: "status",
                        "aria-live": "polite",
                        children: announcementMessage
                    }, void 0, false, {
                        fileName: "[project]/components/AdminDashboard.tsx",
                        lineNumber: 615,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: Boolean(confirmState),
                title: copy.confirmTitle,
                message: (_confirmState_message = confirmState === null || confirmState === void 0 ? void 0 : confirmState.message) !== null && _confirmState_message !== void 0 ? _confirmState_message : "",
                confirmText: copy.confirmAction,
                cancelText: copy.confirmCancel,
                danger: Boolean(confirmState === null || confirmState === void 0 ? void 0 : confirmState.danger),
                onCancel: ()=>closeConfirm(false),
                onConfirm: ()=>closeConfirm(true)
            }, void 0, false, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 621,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: Boolean(errorPopupMessage),
                title: lang === "zh" ? "请修改后重试" : "Please Modify and Retry",
                message: errorPopupMessage !== null && errorPopupMessage !== void 0 ? errorPopupMessage : "",
                confirmText: lang === "zh" ? "我知道了" : "Got It",
                cancelText: lang === "zh" ? "我知道了" : "Got It",
                singleAction: true,
                onCancel: ()=>setErrorPopupMessage(null),
                onConfirm: ()=>setErrorPopupMessage(null)
            }, void 0, false, {
                fileName: "[project]/components/AdminDashboard.tsx",
                lineNumber: 632,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AdminDashboard.tsx",
        lineNumber: 421,
        columnNumber: 5
    }, this);
}
_s(AdminDashboard, "M9ZdQ9b1iMicRO2gXekZvB+S0R0=", false, function() {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n-shared.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function LogoutButton(param) {
    let { lang } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2d$shared$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmOpen, setConfirmOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function handleLogout() {
        if (loading) return;
        setConfirmOpen(true);
    }
    async function confirmLogout() {
        if (loading) return;
        setLoading(true);
        setConfirmOpen(false);
        await fetch("/api/auth/logout", {
            method: "POST"
        });
        router.replace("/login");
        router.refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    loading ? copy.loggingOutLabel : copy.logoutLabel
                ]
            }, void 0, true, {
                fileName: "[project]/components/LogoutButton.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: confirmOpen,
                title: copy.confirmTitle,
                message: copy.logoutConfirmMessage,
                confirmText: copy.confirmAction,
                cancelText: copy.confirmCancel,
                danger: true,
                onCancel: ()=>setConfirmOpen(false),
                onConfirm: ()=>void confirmLogout()
            }, void 0, false, {
                fileName: "[project]/components/LogoutButton.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(LogoutButton, "k/VabN2a9vU4MR9awVJARBZw5Oc=", false, function() {
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

//# sourceMappingURL=components_cee34899._.js.map