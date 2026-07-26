import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { fallbackCategories } from "@/lib/fallback-catalog";

export const revalidate = 60;

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);

  let categories = fallbackCategories;
  try {
    const dbCategories = await prisma.category.findMany({
      where: {
        slug: { in: ["todays-recommendation", "for-him", "for-her", "custom-cakes", "birthday-cakes", "seasonal-specials"] },
      },
      orderBy: { id: "asc" },
    });
    if (dbCategories.length > 0) {
      // Merge: use DB results, fill any missing slugs from fallback
      const dbSlugs = new Set(dbCategories.map((c) => c.slug));
      const missing = fallbackCategories.filter((c) => !dbSlugs.has(c.slug));
      categories = [...dbCategories, ...missing];
    }
  } catch {
    // Keep homepage available if the database is unavailable.
  }

  return (
    <section className="space-y-8 sm:space-y-10">
      {/* Combined hero banner */}
      <div className="relative overflow-hidden rounded-[32px] shadow-[0_28px_60px_rgba(0,0,0,0.22)]"
        style={{ background: "linear-gradient(135deg, #2b3a2e 0%, #3f4a3a 40%, #2a3328 70%, #1e2820 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(180,155,118,0.14),_transparent_55%)]" />

        <div className="relative flex flex-col items-start gap-0 sm:flex-row sm:items-center">
          {/* Left: text content */}
          <div className="flex flex-1 flex-col gap-4 px-6 py-7 sm:px-10 sm:py-9">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[color:var(--gold-pale)]/70">{copy.homeTagline}</p>
            <div className="space-y-3">
              <h1 className="heading-serif text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.6rem]">
                {copy.homeTitle}
              </h1>
              <p className="max-w-md text-[0.97rem] leading-7 text-white/60 sm:text-base">
                {copy.homeSubtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/categories/todays-recommendation"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[14px] border border-[color:var(--gold)]/60 bg-[color:var(--gold)]/25 px-5 py-3 text-[0.95rem] font-semibold tracking-[0.02em] text-white backdrop-blur-sm transition hover:bg-[color:var(--gold)]/40"
              >
                {copy.discoverToday}
              </Link>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm">
                {copy.signatureCollection}
              </span>
            </div>
            <div className="mt-2 h-px w-20 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
          </div>

          {/* Right: logo image */}
          <div className="hidden sm:flex sm:w-[200px] lg:w-[240px] sm:shrink-0 items-center justify-center px-6 py-7">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[color:var(--gold)]/10 blur-2xl scale-110" />
              <Image
                src="/Designer.png"
                alt="BLUE ISLET signature cake"
                width={180}
                height={180}
                className="relative rounded-full border border-[color:var(--gold)]/30 object-cover shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group category-card card-lux flex flex-col overflow-hidden p-5 sm:p-6 hover:-translate-y-0.5 hover:shadow-[0_20px_36px_rgba(23,61,115,0.08)] active:scale-[0.995] transition-transform duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[1.8rem]">{category.emoji}</p>
              <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg-soft)] px-3 py-1 text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--primary)]">
                {copy.viewCategoryShort}
              </span>
            </div>
            <h2 className="mt-4 heading-serif text-[1.5rem] leading-tight text-[color:var(--ink)]">{category.name_cn}</h2>
            <p className="mt-2 text-[color:var(--ink-soft)] text-[0.95rem]">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
