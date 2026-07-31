"use client";

import { usePathname, useRouter } from "next/navigation";

export default function BackButton({
  lang,
  fallbackHref = "/",
  className = "",
}: {
  lang: "zh" | "en";
  fallbackHref?: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }
        router.push(fallbackHref);
      }}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-[color:var(--gold)]/30 bg-white/70 px-3.5 py-2 text-[0.78rem] font-medium tracking-[0.03em] text-[color:var(--ink-soft)] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[color:var(--primary)]/40 hover:bg-white hover:text-[color:var(--primary)] hover:shadow-md active:scale-95 ${className}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {lang === "zh" ? "返回" : "Back"}
    </button>
  );
}
