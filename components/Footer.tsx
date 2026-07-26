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

  return (
    <footer className="relative mt-14 overflow-hidden bg-[#1c1a17] sm:mt-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">

          {/* Brand */}
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.36em] text-[color:var(--gold)]/70">BLUE ISLET</p>
            <h2 className="heading-serif mt-3 text-[2rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              {copy.footerTitle}
            </h2>
            <p className="mt-3 max-w-sm text-[0.93rem] leading-7 text-white/45">
              {copy.footerSubtitle}
            </p>
            <div className="mt-6 h-px w-16 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-white/30">
              {lang === "zh" ? "手工制作 · 庆典蛋糕" : "HANDCRAFTED · CELEBRATION CAKES"}
            </p>
          </div>

          {/* Contact */}
          {hideContactCtas ? null : (
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[color:var(--gold)]/70">
                {lang === "zh" ? "联系下单" : "Get in touch"}
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-12 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 text-[0.88rem] font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#14864b]/20 text-[#3ecf78]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.5 3.5A11.8 11.8 0 0 0 1.8 17.6L0 24l6.6-1.8a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8a11.7 11.7 0 0 0-3.6-8.3Zm-8.2 18.1h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.9 1.1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.7Zm5.4-7.4c-.3-.1-1.9-.9-2.2-1s-.5-.1-.7.1-.8 1-1 1.2c-.2.2-.3.2-.6 0a8.1 8.1 0 0 1-2.4-1.5 8.9 8.9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2.1-.4 0-.6l-1-2.4c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1a12.2 12.2 0 0 0 4.6 4c.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.8-.7 2-1.3.3-.6.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" />
                    </svg>
                  </span>
                  WhatsApp
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-12 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 text-[0.88rem] font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#9b3c72]/20 text-[#e06fa8]">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.2 2h-8A4 4 0 0 0 4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-4 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8a2.7 2.7 0 1 0 2.7 2.7A2.7 2.7 0 0 0 12 9.3Zm4.8-2.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
                    </svg>
                  </span>
                  Instagram
                </a>

                <WeChatQrButton lang={lang} className="inline-flex h-12 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 text-[0.88rem] font-medium text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white" footerStyle />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 text-center text-[0.72rem] text-white/25">
          © {new Date().getFullYear()} BLUE ISLET · {lang === "zh" ? "版权所有" : "All rights reserved"}
        </div>
      </div>
    </footer>
  );
}
