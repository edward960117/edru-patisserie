"use client";

import Link from "next/link";
import Image from "next/image";
import { t } from "@/lib/i18n-shared";

export default function Header({ lang }: { lang: "zh" | "en" }) {
  const copy = t(lang);
  const homeHref = "/?intro=1";

  return (
    <header className="sticky top-0 z-[70] bg-[color:var(--bg-soft)]/70 py-2 backdrop-blur-xl sm:py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-15 items-center justify-between gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/90 px-3 shadow-[0_10px_26px_rgba(23,61,115,0.08)] sm:h-20 sm:px-5">
          <Link href={homeHref} className="group inline-flex items-center gap-2 whitespace-nowrap leading-none sm:gap-3">
            <Image
              src="/Designer.png"
              alt="BLUE ISLET logo"
              width={34}
              height={34}
              className="h-7 w-7 rounded-full border border-[color:var(--border)] bg-white object-cover shadow-[0_4px_10px_rgba(23,61,115,0.12)] sm:h-9 sm:w-9"
              priority
            />
            <span className="heading-serif text-[0.98rem] uppercase tracking-[0.12em] text-[color:var(--primary)] sm:text-[1.45rem] sm:tracking-[0.2em]">
              BLUE ISLET
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.08em] text-[color:var(--ink-soft)] sm:gap-3 sm:text-[0.8rem] sm:tracking-[0.15em]">
            <Link href={homeHref} className="nav-atelier px-3 py-1.5 hover:text-[color:var(--primary)]">{copy.navHome}</Link>
            <Link href="/admin" className="nav-atelier px-3 py-1.5 hover:text-[color:var(--primary)]">{copy.navAdmin}</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
