"use client";

import { usePathname } from "next/navigation";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contact";
import { t } from "@/lib/i18n-shared";
import WeChatQrButton from "@/components/WeChatQrButton";

export default function Footer({ lang }: { lang: "zh" | "en" }) {
  const pathname = usePathname();
  const hideContactCtas = pathname.startsWith("/checkout");
  const copy = t(lang);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.whatsappCustomizePrompt)}`;
  const ctaCardClass = "group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/40 bg-white/88 px-4 text-[0.83rem] font-semibold tracking-[0.02em] text-[color:var(--ink-soft)] shadow-[0_8px_18px_rgba(56,34,13,0.08)] hover:-translate-y-0.5 hover:bg-white hover:text-[color:var(--ink)] hover:shadow-[0_10px_20px_rgba(56,34,13,0.12)]";

  return (
    <footer className="relative mt-14 overflow-hidden border-t border-[color:var(--gold)]/30 bg-[linear-gradient(180deg,rgba(248,242,232,0.45),rgba(230,211,182,0.55))] sm:mt-24">
      <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#ecd0a2]/30 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-2 h-52 w-52 rounded-full bg-[#dfba82]/24 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-8">
        <div className="grid gap-5 rounded-[26px] border border-[color:var(--gold)]/28 bg-[linear-gradient(155deg,rgba(255,252,246,0.9),rgba(248,236,215,0.8))] p-5 shadow-[0_18px_34px_rgba(56,34,13,0.14)] sm:p-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="lux-kicker">EDRU Patisserie</p>
            <p className="heading-serif mt-1 text-[1.45rem] leading-tight text-[color:var(--ink)] sm:text-[1.8rem]">{copy.footerTitle}</p>
            <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-[color:var(--ink-soft)] sm:text-[0.96rem]">{copy.footerSubtitle}</p>
            <div className="mt-4 inline-flex items-center rounded-full border border-[color:var(--gold)]/35 bg-white/65 px-3 py-1 text-[0.72rem] tracking-[0.08em] text-[color:var(--gold-deep)]">
              {lang === "zh" ? "手工制作 · 庆典蛋糕" : "HANDCRAFTED · CELEBRATION CAKES"}
            </div>
          </div>

          {hideContactCtas ? null : (
            <div className="rounded-2xl border border-[color:var(--gold)]/24 bg-white/62 p-4 shadow-inner shadow-[#d7bb90]/25">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--gold-deep)]">
                {lang === "zh" ? "联系下单" : "Quick Contact"}
              </p>
              <div className="mt-3 grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className={ctaCardClass}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e8f8ef] text-[#14864b]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.5 3.5A11.8 11.8 0 0 0 1.8 17.6L0 24l6.6-1.8a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8a11.7 11.7 0 0 0-3.6-8.3Zm-8.2 18.1h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.9 1.1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.7Zm5.4-7.4c-.3-.1-1.9-.9-2.2-1s-.5-.1-.7.1-.8 1-1 1.2c-.2.2-.3.2-.6 0a8.1 8.1 0 0 1-2.4-1.5 8.9 8.9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2.1-.4 0-.6l-1-2.4c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1a12.2 12.2 0 0 0 4.6 4c.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.8-.7 2-1.3.3-.6.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" />
                    </svg>
                  </span>
                  <span>WhatsApp</span>
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className={ctaCardClass}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f8eaf3] text-[#9b3c72]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.2 2h-8A4 4 0 0 0 4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-4 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8a2.7 2.7 0 1 0 2.7 2.7A2.7 2.7 0 0 0 12 9.3Zm4.8-2.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
                    </svg>
                  </span>
                  <span>Instagram</span>
                </a>

                <WeChatQrButton lang={lang} className={ctaCardClass} footerStyle />
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
