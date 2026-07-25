"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";
import ConfirmDialog from "@/components/ConfirmDialog";

type Category = { id: number; name: string; name_cn: string };
type CakeSize = { size: '6"' | '8"' | '10"'; price: number; available: boolean };
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
  initialAnnouncement: {
    enabled: boolean;
    messageEn: string;
    messageZh: string;
  };
}

const defaultSizes: CakeSize[] = [
  { size: '6"', price: 0, available: true },
  { size: '8"', price: 0, available: true },
  { size: '10"', price: 0, available: true },
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminDashboard({ lang, categories, initialCakes, initialAnnouncement }: Props) {
  const router = useRouter();
  const copy = t(lang);
  const [cakes, setCakes] = useState(initialCakes);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [announcement, setAnnouncement] = useState(initialAnnouncement);
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [savingCake, setSavingCake] = useState(false);
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [confirmState, setConfirmState] = useState<{ message: string; danger?: boolean } | null>(null);
  const confirmResolverRef = useRef<((value: boolean) => void) | null>(null);

  const stats = useMemo(() => ({
    totalCakes: cakes.length,
    totalCategories: categories.length,
    activeCakes: cakes.filter((cake) => cake.active).length,
  }), [cakes, categories.length]);

  function resetForm() {
    setForm({ ...emptyForm, categoryId: categories[0]?.id ?? 0 });
    setEditingId(null);
    setSlugEdited(false);
  }

  async function refreshCakes() {
    const response = await fetch("/api/admin/cakes");
    const result = (await response.json()) as { cakes: Cake[] };
    setCakes(result.cakes);
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

  async function handleUpload(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const dataUrl = reader.result;
        setForm((prev) => ({ ...prev, imageUrl: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  }

  async function saveCake(event: React.FormEvent) {
    event.preventDefault();
    if (savingCake) return;
    setMessage("");

    if (!editingId && !form.imageUrl.startsWith("data:image/")) {
      setMessage(copy.adminImageRequired);
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
      sizes: form.sizes.map((size) => ({ ...size, price: Number(size.price) })),
    };

    try {
      const response = await fetch(editingId ? `/api/admin/cakes/${editingId}` : "/api/admin/cakes", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.error ?? copy.saveFailed);
        return;
      }

      await refreshCakes();
      resetForm();
      setMessage(copy.saveSuccess);
    } finally {
      setSavingCake(false);
    }
  }

  async function deleteCake(id: number) {
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
          price: matched?.price ?? 0,
          available: matched?.available ?? true,
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

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="card-lux p-5"><p className="text-sm text-[color:var(--ink-soft)]">{copy.adminTotalCakes}</p><p className="heading-serif text-3xl">{stats.totalCakes}</p></article>
        <article className="card-lux p-5"><p className="text-sm text-[color:var(--ink-soft)]">{copy.adminTotalCategories}</p><p className="heading-serif text-3xl">{stats.totalCategories}</p></article>
        <article className="card-lux p-5"><p className="text-sm text-[color:var(--ink-soft)]">{copy.adminActiveCakes}</p><p className="heading-serif text-3xl">{stats.activeCakes}</p></article>
      </div>

      <section className="card-lux p-6">
        <h2 className="heading-serif text-3xl mb-4">{editingId ? copy.adminEditCake : copy.adminAddCake}</h2>
        <form onSubmit={saveCake} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">{copy.adminCategory}
            <select value={form.categoryId} onChange={(event) => setForm((prev) => ({ ...prev, categoryId: Number(event.target.value) }))} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name_cn} / {category.name}</option>)}
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
              className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90"
              required
            />
          </label>
          <label className="text-sm">{copy.adminNameChinese}
            <input value={form.nameCn} onChange={(event) => setForm((prev) => ({ ...prev, nameCn: event.target.value }))} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required />
          </label>
          <label className="text-sm">{copy.adminSlug}
            <div className="mt-1 flex gap-2">
              <input
                value={form.slug}
                onChange={(event) => {
                  setSlugEdited(true);
                  setForm((prev) => ({ ...prev, slug: slugify(event.target.value) }));
                }}
                className="w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90"
                required
              />
              <button
                type="button"
                onClick={() => {
                  const nextSlug = slugify(form.name);
                  setForm((prev) => ({ ...prev, slug: nextSlug }));
                  setSlugEdited(false);
                }}
                className="shrink-0 rounded-xl border border-[color:var(--gold)]/40 bg-white/85 px-3 py-2 text-xs text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)]"
              >
                {copy.adminSlugAuto}
              </button>
            </div>
          </label>
          <label className="text-sm">{copy.adminLeadTimeDays}
            <input type="number" min={1} value={form.leadTimeDays} onChange={(event) => setForm((prev) => ({ ...prev, leadTimeDays: Number(event.target.value) }))} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminDescription}
            <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} placeholder={copy.adminDescriptionPlaceholder} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" rows={3} required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminDescriptionChinese}
            <textarea value={form.descriptionCn} onChange={(event) => setForm((prev) => ({ ...prev, descriptionCn: event.target.value }))} placeholder={copy.adminDescriptionChinesePlaceholder} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" rows={3} required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminIngredients}
            <textarea value={form.ingredients} onChange={(event) => setForm((prev) => ({ ...prev, ingredients: event.target.value }))} placeholder={copy.adminIngredientsPlaceholder} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" rows={3} required />
          </label>
          <label className="text-sm sm:col-span-2">{copy.adminUploadImage}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => void handleUpload(event.target.files?.[0] ?? null)}
              className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90"
              required={!editingId}
            />
            <p className="mt-1 text-xs text-[color:var(--ink-soft)]">
              {lang === "zh" ? "手机可从相册选择，电脑可从文件管理器选择。" : "On phone this opens your photo album, on laptop it opens file explorer."}
            </p>
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
                    const next = [...form.sizes];
                    next[index] = { ...next[index], price: Number(event.target.value) };
                    setForm((prev) => ({ ...prev, sizes: next }));
                  }} className="w-full mt-1 border border-[color:var(--gold)]/30 rounded-lg px-2 py-1" required />
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
            <button disabled={savingCake} className="px-5 py-2 rounded-xl bg-[#2f2419] text-white disabled:opacity-70">{savingCake ? copy.adminSaving : editingId ? copy.adminUpdate : copy.adminCreate}</button>
            {editingId ? <button type="button" onClick={resetForm} className="px-5 py-2 rounded-xl border border-[color:var(--gold)]/40">{copy.adminCancel}</button> : null}
          </div>
        </form>
        {message ? (
          <div className="mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[#fff8ea] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
            {message}
          </div>
        ) : null}
      </section>

      <section className="card-lux p-6">
        <h2 className="heading-serif text-3xl mb-4">{copy.adminCakeManagement}</h2>
        <div className="space-y-3">
          {cakes.map((cake) => (
            <article key={cake.id} className="border border-[color:var(--gold)]/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/80">
              <div>
                <p className="font-medium">{cake.name} / {cake.name_cn}</p>
                <p className="text-sm text-[color:var(--ink-soft)]">/{cake.slug} • {copy.adminLeadTimeShort}: {cake.lead_time_days} {copy.adminDays}</p>
                <p className="mt-1 text-xs text-[color:var(--ink-soft)]">
                  <span className={cake.active ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
                    {cake.active ? copy.adminActive : copy.adminDisabled}
                  </span>
                  <span> • {cake.featured ? copy.adminFeatured : copy.adminStandard}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => void editCake(cake)} className="px-4 py-1.5 rounded-lg border border-[color:var(--gold)]/40">{copy.adminEdit}</button>
                <button type="button" onClick={() => void deleteCake(cake.id)} className="px-4 py-1.5 rounded-lg bg-red-700 text-white">{copy.adminDelete}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

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

          <button disabled={savingAnnouncement} className="px-5 py-2 rounded-xl bg-[#2f2419] text-white disabled:opacity-70">
            {savingAnnouncement ? copy.adminSaving : lang === "zh" ? "保存公告" : "Save Announcement"}
          </button>
        </form>

        {announcementMessage ? (
          <div className="mt-4 rounded-xl border border-[color:var(--gold)]/35 bg-[#fff8ea] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
            {announcementMessage}
          </div>
        ) : null}
      </section>

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
    </div>
  );
}
