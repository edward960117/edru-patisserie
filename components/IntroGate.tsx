"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { type Lang } from "@/lib/i18n-shared";

const STORAGE_KEY = "edru_intro_seen";
const INTRO_DURATION_MS = 260;
const LOGO_CANDIDATES = [
  "/Designer.png",
  "/edru-logo.png",
  "/edru-logo.jpg",
  "/edru-logo.jpeg",
  "/edru-logo.webp",
  "/company-logo.png",
  "/company-logo.jpg",
  "/company-logo.jpeg",
  "/logo.png",
  "/logo.jpg",
  "/logo.jpeg",
  "/logo.webp",
];

export default function IntroGate({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const introFlag = searchParams.get("intro");
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<Lang>(lang);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const forceIntro = introFlag === "1";
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (seen && !forceIntro) {
      setExiting(false);
      setSubmitting(false);
      setVisible(false);
      return;
    }

    setExiting(false);
    setSubmitting(false);
    setVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname, introFlag]);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
    }
  }, [visible]);

  useEffect(() => {
    setSelectedLang(lang);
  }, [lang, visible]);

  useEffect(() => {
    let cancelled = false;

    async function resolveLogo() {
      for (const candidate of LOGO_CANDIDATES) {
        const loaded = await new Promise<boolean>((resolve) => {
          const image = new Image();
          image.onload = () => resolve(true);
          image.onerror = () => resolve(false);
          image.src = candidate;
        });

        if (loaded && !cancelled) {
          setLogoSrc(candidate);
          return;
        }
      }

      if (!cancelled) {
        setLogoSrc(null);
      }
    }

    void resolveLogo();

    return () => {
      cancelled = true;
    };
  }, []);

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
      className={`fixed inset-0 z-[120] flex items-center justify-center px-5 transition-opacity duration-300 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-label="site-intro"
    >
      <div className="absolute inset-0 bg-black/12 backdrop-blur-md intro-overlay-pulse" />
      <div className="relative w-full max-w-md rounded-[20px] border border-[color:var(--gold)]/28 bg-[#fdf7ee] px-6 py-8 sm:px-8 sm:py-10 text-center shadow-[0_12px_28px_rgba(47,31,16,0.1)] intro-panel-rise">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="EDRU Patisserie"
            className="mx-auto h-auto w-auto max-h-[420px] max-w-full object-contain intro-logo-float"
            style={{ filter: "none", transform: "none" }}
          />
        ) : (
          <div className="mx-auto max-w-[320px] py-7">
            <p className="heading-serif text-5xl text-[color:var(--gold-deep)]">EDRU</p>
            <p className="mt-2 tracking-[0.22em] text-[color:var(--ink-soft)] text-xs uppercase">Patisserie</p>
            <p className="mt-4 text-xs text-[color:var(--ink-soft)]">Logo file not found in public folder.</p>
          </div>
        )}

        <p className="mt-4 text-sm text-[color:var(--ink-soft)]">
          {selectedLang === "zh" ? "欢迎来到 EDRU 甜品工作室" : "Welcome to EDRU Patisserie"}
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
            <span className="inline-flex items-center gap-1.5"><img src="/flags/cn.svg" alt="China" className="h-3.5 w-5 rounded-[2px] object-cover" /><span>中文</span></span>
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
            <span className="inline-flex items-center gap-1.5"><img src="/flags/us.svg" alt="United States" className="h-3.5 w-5 rounded-[2px] object-cover" /><span>English</span></span>
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
