import { useState } from "react";

/**
 * Sticky header with primary navigation, brand wordmark, and account/cart
 * icons — modeled on the reference site's minimal, all-caps navigation bar.
 * Collapses into a slide-down mobile menu below the `md` breakpoint.
 */
const NAV_LINKS = [
  { label: "Our Cakes", href: "#cakes" },
  { label: "Book a Table", href: "#book" },
  { label: "Our Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        {/* Brand wordmark */}
        <a href="#top" className="font-serif text-xl sm:text-2xl tracking-widest uppercase">
          Edru <span className="text-gold">Patisserie</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Account / cart icons + mobile menu toggle */}
        <div className="flex items-center gap-4">
          <button aria-label="Account" className="hidden sm:inline-flex hover:text-gold transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </button>
          <button aria-label="Cart" className="relative hover:text-gold transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h2l2.4 12.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="17" cy="21" r="1" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-gold text-cream text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
          <button
            aria-label="Toggle menu"
            className="md:hidden inline-flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`block h-[1.5px] w-6 bg-charcoal transition-transform ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-charcoal transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-charcoal transition-transform ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav className="md:hidden border-t border-charcoal/10 bg-cream px-4 sm:px-6 py-4 flex flex-col gap-4 text-sm uppercase tracking-wider">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-gold transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
