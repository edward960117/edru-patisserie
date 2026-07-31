"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher({ lang }: { lang: "zh" | "en" }) {
  const router = useRouter();
  const pathname = usePathname();

  async function switchLanguage(nextLang: "zh" | "en") {
    // Set localStorage immediately for instant UI updates
    localStorage.setItem("lang", nextLang);
    
    // Then sync with server/cookie
    await fetch("/api/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: nextLang }),
    });
    // Preserve query string (e.g. checkout's ?cake=&size=) so page state isn't lost
    const query = window.location.search;
    router.replace(`${pathname}${query}`);
    router.refresh();
  }

  return (
    <div className="text-[0.82rem] sm:text-[0.96rem] text-white/95 rounded-full border border-[#b7ddf5]/45 bg-[#ffffff1a] px-3 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-sm whitespace-nowrap">
      <button
        onClick={() => switchLanguage("zh")}
        className={lang === "zh" ? "font-semibold text-[#d6f0ff] px-1" : "opacity-85 hover:opacity-100 px-1"}
      >
        中文
      </button>
      <span className="mx-2 sm:mx-2.5 opacity-70">|</span>
      <button
        onClick={() => switchLanguage("en")}
        className={lang === "en" ? "font-semibold text-[#d6f0ff] px-1" : "opacity-85 hover:opacity-100 px-1"}
      >
        English
      </button>
    </div>
  );
}
