"use client";

import Link from "next/link";
import Image from "next/image";
import { t } from "@/lib/i18n-shared";

export default function Header({ lang }: { lang: "zh" | "en" }) {
  const copy = t(lang);
  const homeHref = "/?intro=1";

  return (
    <header className="backdrop-blur bg-[color:var(--bg-soft)]/88 border-b border-[color:var(--gold)]/25 shadow-[0_10px_24px_rgba(48,31,13,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-15 sm:h-20 flex items-center justify-between gap-3">
        <Link href={homeHref} className="group inline-flex items-center gap-2 sm:gap-3 heading-serif text-[0.98rem] sm:text-[1.75rem] tracking-[0.1em] sm:tracking-[0.2em] uppercase leading-none whitespace-nowrap">
          <Image
            src="/Designer.png"
            alt="ÈDRU logo"
            width={34}
            height={34}
            className="h-7 w-7 rounded-full border border-[color:var(--gold)]/40 bg-white/70 object-cover shadow-[0_4px_12px_rgba(38,24,11,0.15)] sm:h-9 sm:w-9"
            priority
          />
          <span>
            ÈDRU <span className="text-[color:var(--gold-deep)] max-[380px]:hidden">Patisserie</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3 text-[0.76rem] sm:text-[0.8rem] uppercase tracking-[0.08em] sm:tracking-[0.2em] text-[color:var(--ink-soft)]">
          <Link href={homeHref} className="nav-atelier px-3 py-1.5 hover:text-[color:var(--gold-deep)]">{copy.navHome}</Link>
          <Link href="/admin" className="nav-atelier px-3 py-1.5 hover:text-[color:var(--gold-deep)]">{copy.navAdmin}</Link>
        </nav>
      </div>
    </header>
  );
}
