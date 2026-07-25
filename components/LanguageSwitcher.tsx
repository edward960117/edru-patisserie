"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ lang }: { lang: "zh" | "en" }) {
  const router = useRouter();
  const pathname = usePathname();

  async function switchLanguage(nextLang: "zh" | "en") {
    await fetch("/api/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: nextLang }),
    });
    router.replace(pathname);
    router.refresh();
  }

  return (
    <div className="text-[0.72rem] sm:text-sm text-white/95 rounded-full border border-[#e3c89d]/35 bg-[#ffffff12] px-2.5 py-1 backdrop-blur-sm whitespace-nowrap">
      <button
        onClick={() => switchLanguage("zh")}
        className={lang === "zh" ? "font-semibold text-[#ffe8c3]" : "opacity-85 hover:opacity-100"}
      >
        中文
      </button>
      <span className="mx-1.5 sm:mx-2 opacity-70">|</span>
      <button
        onClick={() => switchLanguage("en")}
        className={lang === "en" ? "font-semibold text-[#ffe8c3]" : "opacity-85 hover:opacity-100"}
      >
        English
      </button>
    </div>
  );
}
