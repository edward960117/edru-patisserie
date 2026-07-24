import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "./translations";

const STORAGE_KEY = "edru-language";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "zh" || stored === "en" ? stored : "en";
}

/**
 * Provides the active language and a `t()` translation helper to the whole
 * app. Selection persists in localStorage and updates `<html lang>` for
 * accessibility/SEO.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => translations[lang][key],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
