"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { type Lang } from "@/lib/i18n-shared";

const STORAGE_KEY = "edru_intro_seen";
const INTRO_DURATION_MS = 260;
const INTRO_LOGO = "/Designer.png";

export default function IntroGate({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const introFlag = searchParams.get("intro");
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [logoBroken, setLogoBroken] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Lang>(lang);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.classList.add("intro-active");

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.classList.remove("intro-active");
    };
  }, [visible]);

  useEffect(() => {
    const forceIntro = introFlag === "1";
    const hasSeen = sessionStorage.getItem(STORAGE_KEY) === "1";
    const shouldShowIntro = forceIntro || !hasSeen;

    if (!shouldShowIntro) {
      setExiting(false);
      setSubmitting(false);
      setVisible(false);
      return;
    }

    setExiting(false);
    setSubmitting(false);
    setVisible(true);
    return undefined;
  }, [pathname, introFlag]);

  useEffect(() => {
    setSelectedLang(lang);
  }, [lang, visible]);

  async function enterSite() {
    if (submitting) return;
    setSubmitting(true);

    if (selectedLang !== lang) {
      try {
        await fetch("/api/language", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lang: selectedLang }),
        });
      } catch {
        // Proceed anyway so user is never blocked by a temporary request failure.
      }
    }

    sessionStorage.setItem(STORAGE_KEY, "1");
    setExiting(true);
    window.setTimeout(() => {
      if (selectedLang !== lang) {
        setSubmitting(false);
        window.location.replace(window.location.pathname);
        return;
      }
      if (window.location.search) {
        window.history.replaceState({}, "", window.location.pathname);
      }
      setVisible(false);
      setSubmitting(false);
    }, INTRO_DURATION_MS);
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[220] px-5 transition-opacity duration-300 overscroll-contain ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ minHeight: "100dvh", touchAction: "none" }}
      aria-label="site-intro"
    >
      <div className="absolute inset-0 bg-[rgba(18,10,5,0.34)] backdrop-blur-[6px] intro-overlay-pulse" />
      <div className="fixed left-1/2 top-1/2 w-[min(100%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-[color:var(--gold)]/28 bg-[#fdf7ee] px-6 py-8 sm:px-8 sm:py-10 text-center shadow-[0_12px_28px_rgba(47,31,16,0.1)] intro-panel-rise">
        {!logoBroken ? (
          <Image
            src={INTRO_LOGO}
            alt="ÈDRU Patisserie"
            width={560}
            height={420}
            priority
            className="mx-auto h-auto w-auto max-h-[420px] max-w-full object-contain intro-logo-float"
            style={{ filter: "none", transform: "none" }}
            onError={() => setLogoBroken(true)}
          />
        ) : (
          <div className="mx-auto max-w-[320px] py-7">
            <p className="heading-serif text-5xl text-[color:var(--gold-deep)]">ÈDRU</p>
            <p className="mt-2 tracking-[0.22em] text-[color:var(--ink-soft)] text-xs uppercase">Patisserie</p>
            <p className="mt-4 text-xs text-[color:var(--ink-soft)]">Logo file not found in public folder.</p>
          </div>
        )}

        <h1 className="mt-4 heading-serif text-2xl text-[color:var(--ink)]">
          {selectedLang === "zh" ? "进入网站" : "Enter Website"}
        </h1>
        <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
          {selectedLang === "zh" ? "欢迎来到甜品工作室" : "Welcome to the patisserie"}
        </p>

        <div className="mt-5 inline-flex items-center rounded-full border border-[color:var(--gold)]/40 bg-white/70 p-1.5">
          <button
            type="button"
            onClick={() => setSelectedLang("zh")}
            className={`rounded-full px-3 py-1.5 text-sm ${
              selectedLang === "zh"
                ? "bg-[color:var(--gold)] text-white"
                : "text-[color:var(--ink-soft)]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5"><Image src="/flags/cn.svg" alt="China" width={20} height={14} className="h-3.5 w-5 rounded-[2px] object-cover" /><span>中文</span></span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedLang("en")}
            className={`rounded-full px-3 py-1.5 text-sm ${
              selectedLang === "en"
                ? "bg-[color:var(--gold)] text-white"
                : "text-[color:var(--ink-soft)]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5"><Image src="/flags/us.svg" alt="United States" width={20} height={14} className="h-3.5 w-5 rounded-[2px] object-cover" /><span>English</span></span>
          </button>
        </div>

        <button type="button" onClick={() => void enterSite()} disabled={submitting} className="btn-lux mt-6 min-w-44 text-sm sm:text-base disabled:opacity-70">
          {selectedLang === "zh" ? "进入网站" : "Enter Website"}
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
