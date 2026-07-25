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
    <div className="text-[0.82rem] sm:text-[0.96rem] text-white/95 rounded-full border border-[#e3c89d]/40 bg-[#ffffff15] px-3 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-sm whitespace-nowrap">
      <button
        onClick={() => switchLanguage("zh")}
        className={lang === "zh" ? "font-semibold text-[#ffe8c3] px-1" : "opacity-85 hover:opacity-100 px-1"}
      >
        中文
      </button>
      <span className="mx-2 sm:mx-2.5 opacity-70">|</span>
      <button
        onClick={() => switchLanguage("en")}
        className={lang === "en" ? "font-semibold text-[#ffe8c3] px-1" : "opacity-85 hover:opacity-100 px-1"}
      >
        English
      </button>
    </div>
  );
}
