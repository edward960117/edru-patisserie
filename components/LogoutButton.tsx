"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { t, type Lang } from "@/lib/i18n-shared";

export default function LogoutButton({ lang }: { lang: Lang }) {
  const router = useRouter();
  const copy = t(lang);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setConfirmOpen(true);
  }

  async function confirmLogout() {
    if (loading) return;

    setLoading(true);
    setConfirmOpen(false);

    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-[#b64747]/55 bg-[#b83b3b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_16px_rgba(120,25,25,0.24)] hover:bg-[#9f2e2e] disabled:opacity-60"
      >
        <span aria-hidden="true">↩</span>
        {loading ? copy.loggingOutLabel : copy.logoutLabel}
      </button>
      <ConfirmDialog
        open={confirmOpen}
        title={copy.confirmTitle}
        message={copy.logoutConfirmMessage}
        confirmText={copy.confirmAction}
        cancelText={copy.confirmCancel}
        danger
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => void confirmLogout()}
      />
    </>
  );
}
