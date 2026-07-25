import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--bg-soft)]/88 border-b border-[color:var(--gold)]/25 shadow-[0_10px_24px_rgba(48,31,13,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="heading-serif text-[1.02rem] sm:text-[1.75rem] tracking-[0.11em] sm:tracking-[0.2em] uppercase leading-none">
          EDRU <span className="text-[color:var(--gold-deep)]">Patisserie</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 text-[0.67rem] sm:text-[0.76rem] uppercase tracking-[0.11em] sm:tracking-[0.24em] text-[color:var(--ink-soft)]">
          <Link href="/" className="hover:text-[color:var(--gold-deep)]">Home</Link>
          <Link href="/admin" className="hover:text-[color:var(--gold-deep)]">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
