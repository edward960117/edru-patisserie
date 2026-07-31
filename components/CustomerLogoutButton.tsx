"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { t, type Lang } from "@/lib/i18n-shared";

export default function CustomerLogoutButton({ lang }: { lang: Lang }) {
  const router = useRouter();
  const copy = t(lang);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    await fetch("/api/customer/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-[#b64747]/55 bg-[#b83b3b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_8px_16px_rgba(120,25,25,0.24)] hover:bg-[#9f2e2e] disabled:opacity-60"
    >
      <span aria-hidden="true">↩</span>
      {loading ? copy.loggingOutLabel : copy.logoutLabel}
    </button>
  );
}
