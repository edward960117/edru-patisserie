"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";
import ConfirmDialog from "@/components/ConfirmDialog";
import OrderIntakeForm, { type NewOrderPayload } from "@/components/OrderIntakeForm";
import OrderCalendar, { type OrderRecord } from "@/components/OrderCalendar";

type Category = { id: number; slug: string; name: string; name_cn: string; emoji: string; description: string };
type CakeSize = { size: '6"' | '8"' | '10"'; price: string; available: boolean };
type Cake = {
  id: number;
  category_id: number;
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
  sizes: Array<{ id: number; size: string; price: number; available: boolean }>;
};

interface Props {
  lang: Lang;
  categories: Category[];
  initialCakes: Cake[];
  initialOrders?: OrderRecord[];
  dbUnavailable?: boolean;
  initialAnnouncement: {
    enabled: boolean;
    messageEn: string;
    messageZh: string;
  };
  initialPaymentSettings: {
    bankTransferEnabled: boolean;
  };
}

const defaultSizes: CakeSize[] = [
  { size: '6"', price: "0.00", available: false },
  { size: '8"', price: "0.00", available: false },
  { size: '10"', price: "0.00", available: false },
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
  sizes: defaultSizes,
};

const emptyCategoryForm = {
  slug: "",
  name: "",
  nameCn: "",
  emoji: "🎂",
  description: "",
};

const MAX_UPLOAD_EDGE = 1200;
const MAX_DATA_URL_LENGTH = 1_200_000;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizePriceInput(raw: string) {
  if (raw.trim() === "") {
    return "0.00";
  }

  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return "0.00";
  }

  return parsed.toFixed(2);
}

function parsePrice(raw: string) {
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function AdminDashboard({ lang, categories, initialCakes, initialOrders = [], dbUnavailable = false, initialAnnouncement, initialPaymentSettings }: Props) {
  const router = useRouter();
  const copy = t(lang);
  const [categoryList, setCategoryList] = useState(categories);
  const [cakes, setCakes] = useState(initialCakes);
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);
  const [orderMessage, setOrderMessage] = useState("");
  const [form, setForm] = useState({ ...emptyForm, categoryId: categoryList[0]?.id ?? 0 });
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [categoryMessage, setCategoryMessage] = useState("");
  const [announcement, setAnnouncement] = useState(initialAnnouncement);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [paymentSettings, setPaymentSettings] = useState(initialPaymentSettings);
  const [paymentSettingsMessage, setPaymentSettingsMessage] = useState("");
  const [savingPaymentSettings, setSavingPaymentSettings] = useState(false);
  const [savingCake, setSavingCake] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);
  const [cakeSearch, setCakeSearch] = useState("");
  const [cakeCategoryFilter, setCakeCategoryFilter] = useState<number | "all">("all");
  const [slugEdited, setSlugEdited] = useState(false);
  const [confirmState, setConfirmState] = useState<{ message: string; danger?: boolean } | null>(null);
  const [errorPopupMessage, setErrorPopupMessage] = useState<string | null>(null);
  const confirmResolverRef = useRef<((value: boolean) => void) | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "categories" | "cakes" | "orders" | "announcement" | "payment">("overview");
  const cakeFormRef = useRef<HTMLDivElement>(null);

  const stats = useMemo(() => ({
    totalCakes: cakes.length,
    totalCategories: categoryList.length,
    activeCakes: cakes.filter((cake) => cake.active).length,
  }), [cakes, categoryList.length]);

  const filteredCakes = useMemo(() => {
    const keyword = cakeSearch.trim().toLowerCase();
    return cakes.filter((cake) => {
      const categoryMatched = cakeCategoryFilter === "all" ? true : cake.category_id === cakeCategoryFilter;
      if (!categoryMatched) return false;
      if (!keyword) return true;
      const target = `${cake.name} ${cake.name_cn} ${cake.slug}`.toLowerCase();
      return target.includes(keyword);
    });
  }, [cakes, cakeSearch, cakeCategoryFilter]);

  const offlineMessage = lang === "zh"
    ? "数据库目前离线，暂时无法保存修改。"
    : "Database is currently offline, so changes cannot be saved right now.";

  function resetForm() {
    setForm({
      ...emptyForm,
      categoryId: categoryList[0]?.id ?? 0,
      sizes: defaultSizes.map((size) => ({ ...size })),
    });
    setEditingId(null);
    setSlugEdited(false);
  }

  function resetCategoryForm() {
    setCategoryForm(emptyCategoryForm);
    setEditingCategoryId(null);
  }

  async function refreshCakes() {
    const response = await fetch("/api/admin/cakes");
    const result = (await response.json()) as { cakes: Cake[] };
    setCakes(result.cakes);
  }

  async function refreshCategories() {
    const response = await fetch("/api/admin/categories");
    const result = (await response.json()) as { categories: Category[] };
    setCategoryList(result.categories);
    return result.categories;
  }

  async function refreshOrders() {
    const response = await fetch("/api/admin/orders");
    if (!response.ok) return;
    const result = (await response.json()) as { orders: OrderRecord[] };
    setOrders(result.orders);
  }

  async function createOrder(payload: NewOrderPayload) {
    if (dbUnavailable) {
      setOrderMessage(offlineMessage);
      throw new Error("offline");
    }
    const response = await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      if (response.status === 401) {
        window.location.assign("/login?next=/admin");
      }
      throw new Error("Failed to save order");
    }
    setOrderMessage("");
    await refreshOrders();
  }

  async function updateOrderStatus(id: number, status: OrderRecord["status"]) {
    const response = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (response.status === 401) {
      window.location.assign("/login?next=/admin");
      return;
    }
    if (response.ok) {
      await refreshOrders();
    }
  }

  async function deleteOrder(id: number) {
    const confirmed = await askConfirm(lang === "zh" ? "确认删除此订单记录？" : "Delete this order record?", true);
    if (!confirmed) return;
    const response = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
    if (response.status === 401) {
      window.location.assign("/login?next=/admin");
      return;
    }
    if (response.ok) {
      await refreshOrders();
    }
  }

  async function compressImageFile(file: File) {
    const objectUrl = URL.createObjectURL(file);

    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image file"));
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
      return canvas.toDataURL("image/jpeg", 0.76);
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  async function askConfirm(message: string, danger = false) {
    return new Promise<boolean>((resolve) => {
      confirmResolverRef.current = resolve;
      setConfirmState({ message, danger });
    });
  }

  function closeConfirm(confirmed: boolean) {
    if (confirmResolverRef.current) {
      confirmResolverRef.current(confirmed);
      confirmResolverRef.current = null;
    }
    setConfirmState(null);
  }

  function showErrorPopup(messageText: string) {
    setErrorPopupMessage(messageText);
  }

  async function handleUpload(file: File | null) {
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

      setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
    } catch {
      setMessage(lang === "zh" ? "图片上传失败，请重试。" : "Image upload failed. Please try again.");
    }
  }

  async function saveCake(event: React.FormEvent) {
    event.preventDefault();
    if (savingCake) return;
    if (dbUnavailable) {
      setMessage(offlineMessage);
      showErrorPopup(offlineMessage);
      return;
    }
    setMessage("");

    if (!editingId && !form.imageUrl.startsWith("data:image/")) {
      setMessage(copy.adminImageRequired);
      return;
    }

    const missingRequiredField =
      !form.categoryId ||
      !form.name.trim() ||
      !form.nameCn.trim() ||
      !form.slug.trim() ||
      !form.description.trim() ||
      !form.descriptionCn.trim() ||
      !form.ingredients.trim();

    if (missingRequiredField) {
      setMessage(lang === "zh" ? "请填写所有必填信息。" : "Please fill in all required fields.");
      return;
    }

    const hasAvailableSize = form.sizes.some((size) => size.available);
    if (!hasAvailableSize) {
      setMessage(lang === "zh" ? "请至少勾选一个可售尺寸。" : "Please select at least one available size.");
      return;
    }

    const invalidAvailablePrice = form.sizes.some((size) => size.available && parsePrice(size.price) <= 0);
    if (invalidAvailablePrice) {
      setMessage(lang === "zh" ? "可售尺寸价格必须大于 0。" : "Available size prices must be greater than 0.");
      return;
    }

    const actionText = editingId
      ? copy.adminConfirmUpdateCake
      : copy.adminConfirmCreateCake;
    const confirmed = await askConfirm(actionText);
    if (!confirmed) {
      return;
    }

    setSavingCake(true);

    const payload = {
      ...form,
      categoryId: Number(form.categoryId),
      leadTimeDays: Number(form.leadTimeDays),
      sizes: form.sizes.map((size) => ({
        ...size,
        price: parsePrice(size.price),
      })),
    };

    try {
      const response = await fetch(editingId ? `/api/admin/cakes/${editingId}` : "/api/admin/cakes", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as {
          error?: string;
          detail?: string;
          field?: string;
          value?: string | null;
          details?: {
            fieldErrors?: Record<string, string[] | undefined>;
            formErrors?: string[];
          };
        };
        if (response.status === 401) {
          window.location.assign("/login?next=/admin");
          return;
        }

        if (result.details?.fieldErrors) {
          const firstFieldError = Object.values(result.details.fieldErrors).find((errors) => errors && errors.length)?.[0];
          const firstFormError = result.details.formErrors?.[0];
          const errorText = firstFieldError ?? firstFormError ?? result.error ?? copy.saveFailed;
          setMessage(errorText);
          showErrorPopup(errorText);
          return;
        }

        if (result.error && result.detail) {
          const errorText = `${result.error} ${result.detail}`;
          setMessage(errorText);
          showErrorPopup(errorText);
          return;
        }

        const conflictHint = (result.field || result.value)
          ? (lang === "zh"
              ? `请修改 ${result.field ?? "该字段"}${result.value ? `（当前值：${result.value}）` : ""} 后重试。`
              : `Please modify ${result.field ?? "this field"}${result.value ? ` (current value: ${result.value})` : ""} and try again.`)
          : "";
        const errorText = `${result.error ?? copy.saveFailed}${conflictHint ? ` ${conflictHint}` : ""}`;
        console.error("saveCake failed", { status: response.status, result });
        setMessage(errorText);
        showErrorPopup(errorText);
        return;
      }

      // The save already succeeded server-side; don't let a refresh hiccup report it as failed.
      resetForm();
      setMessage(copy.saveSuccess);
      try {
        await refreshCakes();
      } catch (refreshError) {
        console.error("Cake saved, but refreshing the list failed", refreshError);
      }
    } catch (error) {
      console.error("saveCake threw before a response was received", error);
      const fallbackText = lang === "zh" ? "保存失败，请检查输入后重试。" : "Save failed. Please check your inputs and try again.";
      setMessage(fallbackText);
      showErrorPopup(fallbackText);
    } finally {
      setSavingCake(false);
    }
  }

  async function saveCategory(event: React.FormEvent) {
    event.preventDefault();
    if (savingCategory) return;
    if (dbUnavailable) {
      setCategoryMessage(offlineMessage);
      return;
    }
    setCategoryMessage("");

    if (!categoryForm.slug.trim() || !categoryForm.name.trim() || !categoryForm.nameCn.trim() || !categoryForm.emoji.trim() || !categoryForm.description.trim()) {
      setCategoryMessage(lang === "zh" ? "请填写所有分类字段。" : "Please fill in all category fields.");
      return;
    }

    const confirmText = editingCategoryId
      ? (lang === "zh" ? "确认更新此分类？" : "Update this category?")
      : (lang === "zh" ? "确认新增此分类？" : "Create this category?");
    const confirmed = await askConfirm(confirmText);
    if (!confirmed) return;

    setSavingCategory(true);
    try {
      const response = await fetch(editingCategoryId ? `/api/admin/categories/${editingCategoryId}` : "/api/admin/categories", {
        method: editingCategoryId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...categoryForm,
          slug: slugify(categoryForm.slug),
        }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        if (response.status === 401) {
          window.location.assign("/login?next=/admin");
          return;
        }
        setCategoryMessage(result.error ?? (lang === "zh" ? "保存分类失败。" : "Failed to save category."));
        return;
      }

      const nextCategories = await refreshCategories();
      await refreshCakes();
      resetCategoryForm();
      if (!nextCategories.some((category) => category.id === form.categoryId)) {
        setForm((prev) => ({ ...prev, categoryId: nextCategories[0]?.id ?? 0 }));
      }
      setCategoryMessage(lang === "zh" ? "分类保存成功。" : "Category saved successfully.");
    } catch {
      setCategoryMessage(lang === "zh" ? "保存分类失败。" : "Failed to save category.");
    } finally {
      setSavingCategory(false);
    }
  }

  async function editCategory(category: Category) {
    if (dbUnavailable) {
      setCategoryMessage(offlineMessage);
      return;
    }
    const confirmed = await askConfirm(lang === "zh" ? "开始编辑此分类？" : "Edit this category?");
    if (!confirmed) return;

    setEditingCategoryId(category.id);
    setCategoryForm({
      slug: category.slug,
      name: category.name,
      nameCn: category.name_cn,
      emoji: category.emoji,
      description: category.description,
    });
  }

  async function deleteCategory(category: Category) {
    if (dbUnavailable) {
      setCategoryMessage(offlineMessage);
      return;
    }
    const confirmed = await askConfirm(
      lang === "zh"
        ? `确认删除分类「${category.name_cn}」？若有蛋糕关联将无法删除。`
        : `Delete category "${category.name}"? It cannot be deleted if cakes are linked.`,
      true
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, { method: "DELETE" });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        if (response.status === 401) {
          window.location.assign("/login?next=/admin");
          return;
        }
        setCategoryMessage(result.error ?? (lang === "zh" ? "删除分类失败。" : "Failed to delete category."));
        return;
      }

      const nextCategories = await refreshCategories();
      if (form.categoryId === category.id) {
        setForm((prev) => ({ ...prev, categoryId: nextCategories[0]?.id ?? 0 }));
      }
      setCategoryMessage(lang === "zh" ? "分类已删除。" : "Category deleted.");
    } catch {
      setCategoryMessage(lang === "zh" ? "删除分类失败。" : "Failed to delete category.");
    }
  }

  async function deleteCake(id: number) {
    if (dbUnavailable) {
      setMessage(offlineMessage);
      showErrorPopup(offlineMessage);
      return;
    }
    const confirmed = await askConfirm(copy.adminConfirmDeleteCake, true);
    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/cakes/${id}`, { method: "DELETE" });
    if (response.ok) {
      await refreshCakes();
      setMessage(copy.deleteSuccess);
      return;
    }

    if (response.status === 401) {
      window.location.assign("/login?next=/admin");
      return;
    }

    const result = (await response.json().catch(() => ({}))) as { error?: string };
    setMessage(result.error ?? copy.deleteFailed);
  }

  async function editCake(cake: Cake) {
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
      sizes: defaultSizes.map((preset) => {
        const matched = cake.sizes.find((size) => size.size === preset.size);
        return {
          size: preset.size,
          price: matched ? matched.price.toFixed(2) : "0.00",
          available: matched?.available ?? false,
        };
      }),
    });
    setSlugEdited(true);
  }

  async function saveAnnouncement(event: React.FormEvent) {
    event.preventDefault();
    if (savingAnnouncement) return;
    setAnnouncementMessage("");

    const confirmed = await askConfirm(
      announcement.enabled ? copy.adminConfirmEnableAnnouncement : copy.adminConfirmDisableAnnouncement
    );
    if (!confirmed) {
      return;
    }

    setSavingAnnouncement(true);

    try {
      const response = await fetch("/api/admin/announcement", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcement),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        if (response.status === 401) {
          window.location.assign("/login?next=/admin");
          return;
        }
        setAnnouncementMessage(result.error ?? copy.adminAnnouncementSaveFailed);
        return;
      }

      const result = (await response.json().catch(() => ({}))) as {
        announcement?: {
          enabled: boolean;
          messageEn: string;
          messageZh: string;
        };
      };
      if (result.announcement) {
        setAnnouncement(result.announcement);
      }

      router.refresh();
      setAnnouncementMessage(copy.adminAnnouncementUpdated);
    } finally {
      setSavingAnnouncement(false);
    }
  }

  async function savePaymentSettings(event: React.FormEvent) {
    event.preventDefault();
    if (savingPaymentSettings) return;
    setPaymentSettingsMessage("");

    const confirmed = await askConfirm(
      paymentSettings.bankTransferEnabled
        ? (lang === "zh" ? "确定要启用 PayNow / 网银转账选项吗？" : "Enable the PayNow / Internet Banking option on checkout?")
        : (lang === "zh" ? "确定要停用 PayNow / 网银转账选项吗？" : "Disable the PayNow / Internet Banking option on checkout?")
    );
    if (!confirmed) {
      return;
    }

    setSavingPaymentSettings(true);

    try {
      const response = await fetch("/api/admin/payment-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentSettings),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        if (response.status === 401) {
          window.location.assign("/login?next=/admin");
          return;
        }
        setPaymentSettingsMessage(result.error ?? (lang === "zh" ? "保存支付设置失败" : "Failed to save payment settings"));
        return;
      }

      const result = (await response.json().catch(() => ({}))) as {
        paymentSettings?: { bankTransferEnabled: boolean };
      };
      if (result.paymentSettings) {
        setPaymentSettings(result.paymentSettings);
      }

      router.refresh();
      setPaymentSettingsMessage(lang === "zh" ? "支付设置已更新。" : "Payment settings updated.");
    } finally {
      setSavingPaymentSettings(false);
    }
  }

  const tabs: Array<{ id: typeof activeTab; label: string; icon: string; count?: number }> = [
    { id: "overview", label: lang === "zh" ? "总览" : "Overview", icon: "📊" },
    { id: "categories", label: lang === "zh" ? "分类管理" : "Categories", icon: "🗂️", count: stats.totalCategories },
    { id: "cakes", label: lang === "zh" ? "蛋糕管理" : "Cakes", icon: "🎂", count: stats.totalCakes },
    { id: "orders", label: lang === "zh" ? "订单记录" : "Orders", icon: "🗓️", count: orders.length },
    { id: "announcement", label: lang === "zh" ? "公告设置" : "Announcement", icon: "📣" },
    { id: "payment", label: lang === "zh" ? "支付设置" : "Payment Settings", icon: "💳" },
  ];

  function goToNewCake() {
    resetForm();
    setActiveTab("cakes");
    requestAnimationFrame(() => cakeFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <div className="space-y-6">
      {dbUnavailable ? null : null}

      {/* Tab navigation */}
      <nav className="card-lux grid grid-cols-2 gap-2 p-2 sm:grid-cols-5" aria-label="Admin sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[color:var(--primary)] text-white shadow-[0_8px_18px_rgba(23,61,115,0.22)]"
                : "text-[color:var(--ink-soft)] hover:bg-[color:var(--bg-soft)]"
            }`}
          >
            <span className="text-lg" aria-hidden="true">{tab.icon}</span>
            <span className="inline-flex items-center gap-1.5">
              {tab.label}
              {typeof tab.count === "number" ? (
                <span className={`rounded-full px-1.5 py-0.5 text-[0.68rem] leading-none ${activeTab === tab.id ? "bg-white/20" : "bg-[color:var(--bg-soft)]"}`}>
                  {tab.count}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </nav>

      {dbUnavailable ? (
        <p className="rounded-xl border border-[color:var(--gold)]/30 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]">
          {offlineMessage}
        </p>
      ) : null}

      {/* Overview tab */}
      {activeTab === "overview" ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="card-lux p-5"><p className="text-sm text-[color:var(--ink-soft)]">{copy.adminTotalCakes}</p><p className="heading-serif text-3xl">{stats.totalCakes}</p></article>
            <article className="card-lux p-5"><p className="text-sm text-[color:var(--ink-soft)]">{copy.adminTotalCategories}</p><p className="heading-serif text-3xl">{stats.totalCategories}</p></article>
            <article className="card-lux p-5"><p className="text-sm text-[color:var(--ink-soft)]">{copy.adminActiveCakes}</p><p className="heading-serif text-3xl">{stats.activeCakes}</p></article>
          </div>

          <section className="card-lux p-6">
            <h2 className="heading-serif mb-4 text-2xl">{lang === "zh" ? "快捷操作" : "Quick Actions"}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={goToNewCake} className="rounded-xl border border-[color:var(--gold)]/30 bg-white/80 p-4 text-left transition hover:border-[color:var(--primary)]/50 hover:bg-white">
                <p className="text-2xl">🎂</p>
                <p className="mt-2 font-medium">{lang === "zh" ? "新增蛋糕" : "Add a Cake"}</p>
                <p className="mt-1 text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "上架新的蛋糕产品" : "Publish a new cake to the menu"}</p>
              </button>
              <button type="button" onClick={() => { resetCategoryForm(); setActiveTab("categories"); }} className="rounded-xl border border-[color:var(--gold)]/30 bg-white/80 p-4 text-left transition hover:border-[color:var(--primary)]/50 hover:bg-white">
                <p className="text-2xl">🗂️</p>
                <p className="mt-2 font-medium">{lang === "zh" ? "新增分类" : "Add a Category"}</p>
                <p className="mt-1 text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "在首页新增分类卡片" : "Create a new homepage category card"}</p>
              </button>
              <button type="button" onClick={() => setActiveTab("announcement")} className="rounded-xl border border-[color:var(--gold)]/30 bg-white/80 p-4 text-left transition hover:border-[color:var(--primary)]/50 hover:bg-white">
                <p className="text-2xl">📣</p>
                <p className="mt-2 font-medium">{lang === "zh" ? "编辑滚动公告" : "Edit Announcement"}</p>
                <p className="mt-1 text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "更新首页滚动通知栏" : "Update the homepage notice bar"}</p>
              </button>
            </div>
          </section>

          <section className="card-lux p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="heading-serif text-2xl">{lang === "zh" ? "最新蛋糕" : "Latest Cakes"}</h2>
              <button type="button" onClick={() => setActiveTab("cakes")} className="text-sm text-[color:var(--primary)] hover:underline">
                {lang === "zh" ? "查看全部 →" : "View all →"}
              </button>
            </div>
            <div className="space-y-2">
              {cakes.slice(0, 5).map((cake) => (
                <div key={cake.id} className="flex items-center gap-3 rounded-xl border border-[color:var(--gold)]/20 bg-white/80 p-3">
                  {cake.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cake.image_url} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-lg bg-[color:var(--bg-soft)]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{cake.name} / {cake.name_cn}</p>
                    <p className="text-xs text-[color:var(--ink-soft)]">
                      <span className={cake.active ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
                        {cake.active ? copy.adminActive : copy.adminDisabled}
                      </span>
                      <span> • {cake.featured ? copy.adminFeatured : copy.adminStandard}</span>
                    </p>
                  </div>
                  <button type="button" onClick={() => { void editCake(cake); setActiveTab("cakes"); }} className="shrink-0 rounded-lg border border-[color:var(--gold)]/40 px-3 py-1.5 text-sm">
                    {copy.adminEdit}
                  </button>
                </div>
              ))}
              {cakes.length === 0 ? (
                <p className="rounded-xl border border-[color:var(--gold)]/20 bg-white/70 px-4 py-3 text-sm text-[color:var(--ink-soft)]">
                  {lang === "zh" ? "暂无蛋糕，点击上方按钮开始新增。" : "No cakes yet — use Quick Actions above to add one."}
                </p>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}

      {/* Categories tab */}
      {activeTab === "categories" ? (
      <section className="card-lux p-6">
        <h2 className="heading-serif mb-4 text-3xl">
          {lang === "zh" ? (editingCategoryId ? "编辑分类" : "新增分类") : (editingCategoryId ? "Edit Category" : "Add Category")}
        </h2>
        <form onSubmit={saveCategory} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">{lang === "zh" ? "英文名称" : "English Name"}
            <input value={categoryForm.name} onChange={(event) => setCategoryForm((prev) => ({ ...prev, name: event.target.value }))} className="input-lux mt-1" placeholder="Category name" required />
          </label>
          <label className="text-sm">{lang === "zh" ? "中文名称" : "Chinese Name"}
            <input value={categoryForm.nameCn} onChange={(event) => setCategoryForm((prev) => ({ ...prev, nameCn: event.target.value }))} className="input-lux mt-1" placeholder="分类名称" required />
          </label>
          <label className="text-sm">Slug
            <input value={categoryForm.slug} onChange={(event) => setCategoryForm((prev) => ({ ...prev, slug: slugify(event.target.value) }))} className="input-lux mt-1" placeholder="category-slug" required />
          </label>
          <label className="text-sm">Emoji
            <input value={categoryForm.emoji} onChange={(event) => setCategoryForm((prev) => ({ ...prev, emoji: event.target.value }))} className="input-lux mt-1" placeholder="🎂" required />
          </label>
          <label className="text-sm sm:col-span-2">{lang === "zh" ? "分类简介" : "Category Description"}
            <textarea value={categoryForm.description} onChange={(event) => setCategoryForm((prev) => ({ ...prev, description: event.target.value }))} className="input-lux mt-1" rows={2} placeholder="Category description" required />
          </label>

          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <button disabled={savingCategory} className="rounded-xl bg-[color:var(--primary)] px-5 py-2 text-white disabled:opacity-70 hover:bg-[color:var(--primary-hover)]">
              {savingCategory ? copy.adminSaving : editingCategoryId ? (lang === "zh" ? "更新分类" : "Update Category") : (lang === "zh" ? "创建分类" : "Create Category")}
            </button>
            {editingCategoryId ? (
              <button type="button" onClick={resetCategoryForm} className="rounded-xl border border-[color:var(--gold)]/40 px-5 py-2">
                {copy.adminCancel}
              </button>
            ) : null}
          </div>
        </form>

        {categoryMessage ? (
          <div className="mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
            {categoryMessage}
          </div>
        ) : null}

        <div className="mt-5 space-y-3">
          {categoryList.map((category) => (
            <article key={category.id} className="flex flex-col gap-3 rounded-xl border border-[color:var(--gold)]/20 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{category.emoji} {category.name_cn} / {category.name}</p>
                <p className="text-sm text-[color:var(--ink-soft)]">/{category.slug}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" disabled={dbUnavailable} onClick={() => void editCategory(category)} className="rounded-lg border border-[color:var(--gold)]/40 px-4 py-1.5 disabled:cursor-not-allowed disabled:opacity-60">{copy.adminEdit}</button>
                <button type="button" disabled={dbUnavailable} onClick={() => void deleteCategory(category)} className="rounded-lg bg-red-700 px-4 py-1.5 text-white disabled:cursor-not-allowed disabled:opacity-60">{copy.adminDelete}</button>
              </div>
            </article>
          ))}
        </div>
      </section>
      ) : null}

      {/* Cakes tab */}
      {activeTab === "cakes" ? (
      <>
      <section ref={cakeFormRef} className="card-lux p-6">
        <h2 className="heading-serif text-3xl mb-4">{editingId ? copy.adminEditCake : copy.adminAddCake}</h2>
        <form onSubmit={saveCake} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">{copy.adminCategory}
            <select value={form.categoryId} onChange={(event) => setForm((prev) => ({ ...prev, categoryId: Number(event.target.value) }))} className="select-premium mt-1" required>
              {categoryList.map((category) => <option key={category.id} value={category.id}>{category.name_cn} / {category.name}</option>)}
            </select>
          </label>
          <label className="text-sm">{copy.adminName}
            <input
              value={form.name}
              onChange={(event) => {
                const nextName = event.target.value;
                setForm((prev) => ({
                  ...prev,
                  name: nextName,
                  slug: slugEdited ? prev.slug : slugify(nextName),
                }));
              }}
              className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90 text-base leading-normal"
              required
            />
          </label>
          <label className="text-sm">{copy.adminNameChinese}
            <input value={form.nameCn} onChange={(event) => setForm((prev) => ({ ...prev, nameCn: event.target.value }))} className="input-lux mt-1" placeholder="蛋糕中文名称" required />
          </label>
          <label className="text-sm">{copy.adminSlug}
            <div className="mt-1 flex gap-2">
              <input
                value={form.slug}
                onChange={(event) => {
                  setSlugEdited(true);
                  setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }));
                }}
                className="w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90 text-base leading-normal"
                required
              />
              <button
                disabled={dbUnavailable}
                type="button"
                onClick={() => {
                  const nextSlug = slugify(form.name);
                  setForm((prev) => ({ ...prev, slug: nextSlug }));
                  setSlugEdited(false);
                }}
                className="shrink-0 rounded-xl border border-[color:var(--gold)]/40 bg-white/85 px-3 py-2 text-xs text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copy.adminSlugAuto}
              </button>
            </div>
          </label>
          <label className="text-sm">{copy.adminLeadTimeDays}
            <input type="number" min={1} value={form.leadTimeDays} onChange={(event) => setForm((prev) => ({ ...prev, leadTimeDays: Number(event.target.value) }))} className="input-lux mt-1" required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminDescription}
            <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder={copy.adminDescriptionPlaceholder} className="input-lux mt-1" rows={3} required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminDescriptionChinese}
            <textarea value={form.descriptionCn} onChange={(event) => setForm((prev) => ({ ...prev, descriptionCn: event.target.value }))} placeholder={copy.adminDescriptionChinesePlaceholder} className="input-lux mt-1" rows={3} required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminIngredients}
            <textarea value={form.ingredients} onChange={(event) => setForm((prev) => ({ ...prev, ingredients: event.target.value }))} placeholder={copy.adminIngredientsPlaceholder} className="input-lux mt-1" rows={3} required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminUploadImage}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => void handleUpload(event.target.files?.[0] ?? null)}
              className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90 text-base leading-normal"
              required={!editingId}
            />
            <p className="mt-1 text-xs text-[color:var(--ink-soft)]">
              {lang === "zh" ? "手机可从相册选择，电脑可从文件管理器选择。" : "On phone this opens your photo album, on laptop it opens file explorer."}
            </p>
            {form.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.imageUrl} alt="" className="mt-2 h-20 w-20 rounded-xl object-cover" />
            ) : null}
            {form.imageUrl ? (
              <p className="mt-1 text-xs text-[color:var(--gold-deep)]">
                {copy.adminImageSelected}
              </p>
            ) : null}
          </label>

          <div className="sm:col-span-2 grid gap-3 sm:grid-cols-3">
            {form.sizes.map((size, index) => (
              <div key={size.size} className="border border-[color:var(--gold)]/20 rounded-xl p-3 bg-white/80">
                <p className="text-sm font-medium">{size.size}</p>
                <label className="text-xs block mt-2">{copy.adminPrice}
                  <input type="number" step="0.01" min={0} value={size.price} onChange={(event) => {
                    const rawValue = event.target.value;
                    const next = [...form.sizes];
                    next[index] = { ...next[index], price: rawValue };
                    setForm((prev) => ({ ...prev, sizes: next }));
                  }} onBlur={(event) => {
                    const next = [...form.sizes];
                    next[index] = { ...next[index], price: normalizePriceInput(event.target.value) };
                    setForm((prev) => ({ ...prev, sizes: next }));
                  }} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-lg px-2 py-1 text-base leading-normal" />
                </label>
                <label className="text-xs inline-flex items-center gap-2 mt-2">
                  <input type="checkbox" checked={size.available} onChange={(event) => {
                    const next = [...form.sizes];
                    next[index] = { ...next[index], available: event.target.checked };
                    setForm((prev) => ({ ...prev, sizes: next }));
                  }} />
                  {copy.adminAvailable}
                </label>
              </div>
            ))}
          </div>

          <label className="text-sm inline-flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(event) => setForm((prev) => ({ ...prev, featured: event.target.checked }))} /> {copy.adminFeatured}</label>
          <label className="text-sm inline-flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={(event) => setForm((prev) => ({ ...prev, active: event.target.checked }))} /> {copy.adminActive}</label>

          <div className="sm:col-span-2 flex gap-3">
            <button disabled={savingCake} className="px-5 py-2 rounded-xl bg-[color:var(--primary)] text-white disabled:opacity-70 hover:bg-[color:var(--primary-hover)]">{savingCake ? copy.adminSaving : editingId ? copy.adminUpdate : copy.adminCreate}</button>
            {editingId ? <button type="button" onClick={resetForm} className="px-5 py-2 rounded-xl border border-[color:var(--gold)]/40">{copy.adminCancel}</button> : null}
          </div>
        </form>
        {message ? (
          <div className="mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
            {message}
          </div>
        ) : null}
      </section>

      <section className="card-lux p-6">
        <h2 className="heading-serif text-3xl mb-4">{copy.adminCakeManagement}</h2>
        <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={cakeSearch}
            onChange={(event) => setCakeSearch(event.target.value)}
            placeholder={lang === "zh" ? "搜索蛋糕名称或 slug" : "Search by cake name or slug"}
            className="w-full rounded-xl border border-[color:var(--gold)]/30 bg-white/90 px-3 py-2 text-base leading-normal"
          />
          <select
            value={cakeCategoryFilter}
            onChange={(event) => setCakeCategoryFilter(event.target.value === "all" ? "all" : Number(event.target.value))}
            className="rounded-xl border border-[color:var(--gold)]/30 bg-white/90 px-3 py-2 text-base leading-normal"
          >
            <option value="all">{lang === "zh" ? "全部分类" : "All Categories"}</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>{category.name_cn}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          {filteredCakes.map((cake) => (
            <article key={cake.id} className="flex flex-col gap-3 rounded-xl border border-[color:var(--gold)]/20 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                {cake.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cake.image_url} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-[color:var(--bg-soft)]" />
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium">{cake.name} / {cake.name_cn}</p>
                  <p className="text-sm text-[color:var(--ink-soft)]">/{cake.slug} • {copy.adminLeadTimeShort}: {cake.lead_time_days} {copy.adminDays}</p>
                  <p className="text-xs text-[color:var(--ink-soft)]">
                    {(categoryList.find((category) => category.id === cake.category_id)?.name_cn) ?? "-"}
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--ink-soft)]">
                    <span className={cake.active ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
                      {cake.active ? copy.adminActive : copy.adminDisabled}
                    </span>
                    <span> • {cake.featured ? copy.adminFeatured : copy.adminStandard}</span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" disabled={dbUnavailable} onClick={() => void editCake(cake)} className="px-4 py-1.5 rounded-lg border border-[color:var(--gold)]/40 disabled:cursor-not-allowed disabled:opacity-60">{copy.adminEdit}</button>
                <button type="button" disabled={dbUnavailable} onClick={() => void deleteCake(cake.id)} className="px-4 py-1.5 rounded-lg bg-red-700 text-white disabled:cursor-not-allowed disabled:opacity-60">{copy.adminDelete}</button>
              </div>
            </article>
          ))}
          {filteredCakes.length === 0 ? (
            <p className="rounded-xl border border-[color:var(--gold)]/20 bg-white/70 px-4 py-3 text-sm text-[color:var(--ink-soft)]">
              {lang === "zh" ? "没有符合筛选条件的蛋糕。" : "No cakes match your current filters."}
            </p>
          ) : null}
        </div>
      </section>
      </>
      ) : null}

      {/* Orders tab */}
      {activeTab === "orders" ? (
        <div className="space-y-6">
          {orderMessage ? (
            <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
              {orderMessage}
            </div>
          ) : null}
          <OrderIntakeForm
            lang={lang}
            knownCakeNames={Array.from(new Set(cakes.flatMap((cake) => [cake.name, cake.name_cn]).filter(Boolean)))}
            disabled={dbUnavailable}
            onSubmit={createOrder}
          />
          <OrderCalendar
            lang={lang}
            orders={orders}
            disabled={dbUnavailable}
            onUpdateStatus={updateOrderStatus}
            onDelete={deleteOrder}
          />
        </div>
      ) : null}

      {/* Announcement tab */}
      {activeTab === "announcement" ? (
      <section className="card-lux p-6">
        <h2 className="heading-serif text-3xl mb-4">{copy.adminSellerAnnouncementTitle}</h2>
        <form onSubmit={saveAnnouncement} className="space-y-4">
          <label className="text-sm inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={announcement.enabled}
              onChange={(event) => setAnnouncement((prev) => ({ ...prev, enabled: event.target.checked }))}
            />
            {lang === "zh" ? "启用滚动公告" : "Enable moving announcement"}
          </label>

          <label className="block text-sm">
            {lang === "zh" ? "英文公告文案" : "English announcement message"}
            <textarea
              value={announcement.messageEn}
              onChange={(event) => setAnnouncement((prev) => ({ ...prev, messageEn: event.target.value }))}
              className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90"
              rows={2}
              required
            />
          </label>

          <label className="block text-sm">
            {lang === "zh" ? "中文公告文案" : "Chinese announcement message"}
            <textarea
              value={announcement.messageZh}
              onChange={(event) => setAnnouncement((prev) => ({ ...prev, messageZh: event.target.value }))}
              className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90"
              rows={2}
              required
            />
          </label>

          {announcement.enabled && (announcement.messageEn.trim() || announcement.messageZh.trim()) ? (
            <div className="rounded-xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-deep)] px-4 py-2 text-[0.8rem] text-[color:var(--primary-hover)]">
              <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">{lang === "zh" ? "预览" : "Preview"}</p>
              <p className="truncate">• {(lang === "zh" ? announcement.messageZh : announcement.messageEn).trim() || "…"} •</p>
            </div>
          ) : null}

          <button disabled={savingAnnouncement || dbUnavailable} className="px-5 py-2 rounded-xl bg-[color:var(--primary)] text-white disabled:opacity-70 hover:bg-[color:var(--primary-hover)]">
            {savingAnnouncement ? copy.adminSaving : lang === "zh" ? "保存公告" : "Save Announcement"}
          </button>
        </form>

        {announcementMessage ? (
          <div className="mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
            {announcementMessage}
          </div>
        ) : null}
      </section>
      ) : null}

      {/* Payment settings tab */}
      {activeTab === "payment" ? (
      <section className="card-lux p-6">
        <h2 className="heading-serif text-3xl mb-4">{lang === "zh" ? "支付设置" : "Payment Settings"}</h2>
        <p className="mb-4 text-sm text-[color:var(--ink-soft)]">
          {lang === "zh"
            ? "控制结账页面上顾客可见的付款方式。关闭后，该选项将从结账页面隐藏。"
            : "Control which payment options customers see on the checkout page. Turning an option off hides it from checkout."}
        </p>
        <form onSubmit={savePaymentSettings} className="space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={paymentSettings.bankTransferEnabled}
              onChange={(event) => setPaymentSettings((prev) => ({ ...prev, bankTransferEnabled: event.target.checked }))}
            />
            {lang === "zh" ? "启用 PayNow / 网银转账付款方式" : "Enable PayNow / Internet Banking payment option"}
          </label>

          <button disabled={savingPaymentSettings || dbUnavailable} className="px-5 py-2 rounded-xl bg-[color:var(--primary)] text-white disabled:opacity-70 hover:bg-[color:var(--primary-hover)]">
            {savingPaymentSettings ? copy.adminSaving : lang === "zh" ? "保存支付设置" : "Save Payment Settings"}
          </button>
        </form>

        {paymentSettingsMessage ? (
          <div className="mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
            {paymentSettingsMessage}
          </div>
        ) : null}
      </section>
      ) : null}

      <ConfirmDialog
        open={Boolean(confirmState)}
        title={copy.confirmTitle}
        message={confirmState?.message ?? ""}
        confirmText={copy.confirmAction}
        cancelText={copy.confirmCancel}
        danger={Boolean(confirmState?.danger)}
        onCancel={() => closeConfirm(false)}
        onConfirm={() => closeConfirm(true)}
      />

      <ConfirmDialog
        open={Boolean(errorPopupMessage)}
        title={lang === "zh" ? "请修改后重试" : "Please Modify and Retry"}
        message={errorPopupMessage ?? ""}
        confirmText={lang === "zh" ? "我知道了" : "Got It"}
        cancelText={lang === "zh" ? "我知道了" : "Got It"}
        singleAction
        onCancel={() => setErrorPopupMessage(null)}
        onConfirm={() => setErrorPopupMessage(null)}
      />
    </div>
  );
}

