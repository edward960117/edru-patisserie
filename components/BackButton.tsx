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
      className={`btn-lux-outline min-h-10 min-w-24 px-4 text-[0.75rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] uppercase ${className}`}
    >
      {lang === "zh" ? "返回" : "Back"}
    </button>
  );
}
