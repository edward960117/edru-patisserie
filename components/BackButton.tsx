"use client";

import { usePathname, useRouter } from "next/navigation";

export default function BackButton({ lang }: { lang: "zh" | "en" }) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="btn-lux-outline text-[0.72rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.14em] uppercase"
    >
      {lang === "zh" ? "返回" : "Back"}
    </button>
  );
}
