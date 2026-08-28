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
      className="group inline-flex items-center gap-2.5 rounded-full border border-[rgba(130,79,79,0.18)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(248,240,239,0.94))] px-3.5 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--ink)] shadow-[0_12px_26px_rgba(66,40,40,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(130,79,79,0.28)] hover:shadow-[0_16px_36px_rgba(66,40,40,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff3f3_0%,#f3dfe2_100%)] text-base text-[#8c3d4d] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-[rgba(140,61,77,0.12)] transition-transform duration-200 group-hover:rotate-[-10deg]" aria-hidden="true">
        ↩
      </span>
      <span className="text-[color:var(--ink)]">{loading ? copy.loggingOutLabel : copy.logoutLabel}</span>
    </button>
  );
}
