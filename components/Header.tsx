"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { t } from "@/lib/i18n-shared";

export default function Header({ lang, customerName = null }: { lang: "zh" | "en"; customerName?: string | null }) {
  const copy = t(lang);
  const homeHref = "/";
  const pathname = usePathname();

  const isHome = pathname === "/" || pathname.startsWith("/?");
  const isAdmin = pathname === "/admin";

  // The home hero shows its own greeting badge, so avoid duplicating it there.
  const showGreeting = Boolean(customerName) && !isHome;
  const greetingInitial = customerName ? customerName.charAt(0).toUpperCase() : "";

  return (
    <header className="sticky top-0 z-[70] bg-gradient-to-b from-[color:var(--bg-soft)]/90 to-[color:var(--bg-soft)]/70 backdrop-blur-xl border-b border-[color:var(--border)]/40 py-3 sm:py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4 rounded-2xl border border-[color:var(--border)]/60 bg-[color:var(--surface)]/95 backdrop-blur-sm px-4 sm:px-6 shadow-[0_12px_32px_rgba(23,61,115,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
          
          {/* Logo section with hover effect */}
          <Link 
            href={homeHref} 
            className="group inline-flex items-center gap-2.5 sm:gap-3 leading-none transition-all duration-300"
          >
            <div className="relative">
              {/* Glow backdrop on hover */}
              <div className="absolute inset-0 rounded-full bg-[color:var(--primary)]/15 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Image
                src="/Designer-mark-blue.png"
                alt="BLUE ISLET logo"
                width={36}
                height={36}
                className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-[color:var(--border)]/60 bg-white/70 object-contain p-1 shadow-[0_6px_16px_rgba(23,61,115,0.15)] transition-all duration-300 group-hover:border-[color:var(--primary)]/40 group-hover:shadow-[0_8px_20px_rgba(23,61,115,0.2)]"
                priority
              />
            </div>
            
            <span className="heading-serif text-[0.95rem] sm:text-[1.2rem] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[color:var(--primary)] font-semibold transition-all duration-300 group-hover:tracking-[0.22em]">
              BLUE ISLET
            </span>
          </Link>

          {/* Navigation with active state indicators */}
          <nav className="flex items-center gap-1 sm:gap-2 text-[0.8rem] sm:text-[0.9rem] uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[color:var(--ink-soft)]">
            {showGreeting && (
              <>
                <Link
                  href="/account"
                  aria-label={`${copy.customerWelcome}, ${customerName}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--border)]/60 bg-[color:var(--surface)] py-1 pl-1 pr-1 sm:pr-3 shadow-sm transition-all duration-300 hover:border-[color:var(--primary)]/40 hover:shadow-md"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--gold-deep)] text-[0.68rem] font-semibold text-white"
                  >
                    {greetingInitial}
                  </span>
                  <span className="hidden sm:inline max-w-[7rem] truncate text-[0.72rem] font-semibold normal-case tracking-normal text-[color:var(--primary)]">
                    {customerName}
                  </span>
                </Link>
                <div className="h-4 w-px bg-[color:var(--border)] mx-1" />
              </>
            )}
            <NavLink href={homeHref} active={isHome} label={copy.navHome} />
            <div className="h-4 w-px bg-[color:var(--border)] mx-1" />
            <NavLink href="/account" active={pathname === "/account"} label={copy.navAccount} />
            <div className="h-4 w-px bg-[color:var(--border)] mx-1" />
            <NavLink href="/admin" active={isAdmin} label={copy.navAdmin} />
          </nav>
        </div>
      </div>
    </header>
  );
}

/**
 * Navigation Link with Active State Indicator
 */
function NavLink({ 
  href, 
  active, 
  label 
}: { 
  href: string; 
  active?: boolean; 
  label: string 
}) {
  return (
    <Link
      href={href}
      className={`
        relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/30 focus:ring-offset-2
        ${active 
          ? 'text-[color:var(--primary)] bg-[color:var(--bg-soft)]/70 font-semibold' 
          : 'hover:text-[color:var(--primary)] hover:bg-[color:var(--bg-soft)]/40'
        }
      `}
    >
      {label}
      
      {/* Animated underline indicator for active state */}
      {active && (
        <div className="absolute bottom-0 left-3 sm:left-4 right-3 sm:right-4 h-0.5 bg-gradient-to-r from-[color:var(--primary)] to-transparent rounded-full animate-fade-in-up" />
      )}
    </Link>
  );
}
