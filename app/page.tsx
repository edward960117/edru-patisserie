import Image from "next/image";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { fallbackCategories } from "@/lib/fallback-catalog";
import { withTimeout } from "@/lib/with-timeout";

export const revalidate = 60;

const HOME_CATEGORY_SLUGS = [
  "for-her",
  "for-him",
  "mousse-cakes",
  "lifes-four-joys",
  "designer-collection",
  "afternoon-tea-series",
  "custom-cakes",
  "cake-accessories",
];

const HOME_CATEGORY_ORDER = new Map(
  HOME_CATEGORY_SLUGS.map((slug, index) => [slug, index])
);

function sortByHomeCategoryOrder<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aIndex = HOME_CATEGORY_ORDER.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = HOME_CATEGORY_ORDER.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  });
}

const getHomeCategories = unstable_cache(
  async () => {
    return prisma.category.findMany({
      where: {
        slug: { in: HOME_CATEGORY_SLUGS },
      },
      orderBy: { id: "asc" },
    });
  },
  ["home-categories"],
  { revalidate: 300, tags: ["catalog"] }
);

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);

  let categories = sortByHomeCategoryOrder(fallbackCategories);
  try {
    const dbCategories = await withTimeout(getHomeCategories(), 1400);
    if (dbCategories.length > 0) {
      // Merge: use DB results, fill any missing slugs from fallback
      const dbSlugs = new Set(dbCategories.map((c) => c.slug));
      const missing = fallbackCategories.filter((c) => !dbSlugs.has(c.slug));
      categories = sortByHomeCategoryOrder([...dbCategories, ...missing]);
    }
  } catch {
    // Keep homepage available if the database is unavailable.
  }

  return (
    <section className="space-y-8 sm:space-y-10">
      {/* Enhanced Hero Banner - Premium Gradient & Spacing */}
      <div 
        className="relative overflow-hidden rounded-[32px] shadow-[0_32px_72px_rgba(20,86,128,0.15)]"
        style={{ 
          background: "linear-gradient(135deg, #fbfeff 0%, #e8f4fb 40%, #7db8d8 90%, #4a9bca 100%)"
        }}
      >
        {/* Subtle overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% -20%, rgba(255,255,255,0.5), transparent 50%), " +
              "radial-gradient(ellipse at 100% 100%, rgba(31,103,148,0.1), transparent 60%)",
          }}
        />
        
        <div className="relative flex flex-col gap-0 sm:flex-row sm:items-center">
          {/* Left Content - Improved Spacing */}
          <div className="flex flex-1 flex-col gap-6 sm:gap-8 px-8 py-12 sm:px-12 sm:py-14">
            {/* Kicker tagline */}
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-[color:var(--primary)]/70 font-medium">
              {copy.homeTagline}
            </p>
            
            {/* Title & subtitle with better spacing */}
            <div className="space-y-4 sm:space-y-5">
              <h1 className="heading-serif text-[2.2rem] sm:text-[3.2rem] font-semibold leading-[1.1] tracking-[-0.015em] text-[color:var(--ink)]">
                {copy.homeTitle}
              </h1>
              <p className="max-w-md text-[0.98rem] sm:text-lg leading-[1.7] text-[color:var(--ink-soft)]">
                {copy.homeSubtitle}
              </p>
            </div>

            {/* Working Hours & Response Time Info */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              <div className="flex flex-col gap-1">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]/60 font-medium">
                  {copy.messageResponseLabel}
                </p>
                <p className="text-[0.95rem] font-semibold text-[color:var(--ink)]">
                  {copy.messageResponseHours}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]/60 font-medium">
                  {copy.workingHoursLabel}
                </p>
                <p className="text-[0.95rem] font-semibold text-[color:var(--ink)]">
                  {copy.workingHours}
                </p>
              </div>
            </div>
            
            {/* Enhanced Button Hierarchy */}
            <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-4">
              <Link
                href="/categories/todays-recommendation"
                className="btn-lux-primary inline-flex items-center"
              >
                {copy.discoverToday}
              </Link>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--primary)]/30 bg-white/70 backdrop-blur-sm px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.2em] text-[color:var(--primary)]/85 font-medium transition hover:bg-white/85 hover:border-[color:var(--primary)]/50 focus:ring-2 focus:ring-[color:var(--primary)]/20"
              >
                <span>✨</span>
                {copy.signatureCollection}
              </button>
            </div>
            
            {/* Decorative accent line */}
            <div className="mt-4 h-0.5 w-24 bg-gradient-to-r from-[color:var(--secondary)] via-[color:var(--primary)]/60 to-transparent rounded-full" />
          </div>

          {/* Right: Premium Logo Presentation */}
          <div className="hidden sm:flex sm:w-[200px] lg:w-[280px] sm:shrink-0 items-center justify-center px-8 py-12">
            <div className="relative">
              {/* Subtle background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[color:var(--primary)]/12 to-[color:var(--secondary)]/8 blur-3xl scale-125" />
              
              {/* Premium border treatment */}
              <div className="absolute inset-0 rounded-full border border-gradient-to-br from-[color:var(--primary)]/40 to-[color:var(--secondary)]/20" />
              
              <Image
                src="/Designer-blue.png"
                alt="BLUE ISLET signature cake"
                width={200}
                height={200}
                className="relative rounded-full border-2 border-white/80 bg-white/40 object-cover shadow-[0_20px_48px_rgba(19,77,114,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] hover-zoom"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards Grid - 2x2 Layout */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-7">
        {categories.map((category, index) => {
          // Handle custom cakes - redirect to WhatsApp instead of category page
          if (category.slug === "custom-cakes") {
            const whatsappMessage = lang === "zh" ? "需要私人定制蛋糕" : "I need a custom cake";
            return (
              <a
                key={category.id}
                href={`https://wa.me/6581324886?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[28px] border card-lux transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(23,61,115,0.16)] active:scale-[0.98] animate-fade-in-up cursor-pointer"
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  borderColor: "rgba(45, 132, 187, 0.18)"
                }}
              >
                {/* Animated overlay on hover */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-white/0 to-[color:var(--primary)]/0 group-hover:from-white/5 group-hover:to-[color:var(--primary)]/5 transition-all duration-500"
                />

                {/* Content with improved spacing */}
                <div className="relative p-4 sm:p-7 flex flex-col h-full gap-3 sm:gap-4">
                  {/* Header row with emoji and badge */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-3xl sm:text-4xl drop-shadow-sm">{category.emoji}</span>
                    <span className="inline-flex rounded-full border border-[color:var(--primary)]/20 bg-white/60 px-2 py-1 sm:px-3 text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold backdrop-blur-sm whitespace-nowrap transition-all duration-300 group-hover:bg-white/80">
                      {lang === "zh" ? "联系我们" : "Contact Us"}
                    </span>
                  </div>

                  {/* Text content with improved hierarchy */}
                  <div className="flex-1">
                    <h2 className="heading-serif text-[1.15rem] sm:text-[1.65rem] leading-[1.15] text-[color:var(--ink)]">
                      {category.name_cn}
                    </h2>
                    <p className="mt-1 sm:mt-2 text-[0.78rem] sm:text-[0.92rem] leading-[1.45] sm:leading-[1.5] text-[color:var(--ink-soft)]">
                      {category.name}
                    </p>
                  </div>

                  {/* Visual indicator - shows on hover */}
                  <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[color:var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            );
          }

          // Regular category links
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-[28px] border card-lux transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(23,61,115,0.16)] active:scale-[0.98] animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 80}ms`,
                borderColor: "rgba(45, 132, 187, 0.18)"
              }}
            >
              {/* Animated overlay on hover */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/0 to-[color:var(--primary)]/0 group-hover:from-white/5 group-hover:to-[color:var(--primary)]/5 transition-all duration-500"
              />

              {/* Content with improved spacing */}
              <div className="relative p-4 sm:p-7 flex flex-col h-full gap-3 sm:gap-4">
                {/* Header row with emoji and badge */}
                <div className="flex items-start justify-between gap-3">
                  <span className="text-3xl sm:text-4xl drop-shadow-sm">{category.emoji}</span>
                  <span className="inline-flex rounded-full border border-[color:var(--primary)]/20 bg-white/60 px-2 py-1 sm:px-3 text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold backdrop-blur-sm whitespace-nowrap transition-all duration-300 group-hover:bg-white/80">
                    {copy.viewCategoryShort}
                  </span>
                </div>

                {/* Text content with improved hierarchy */}
                <div className="flex-1">
                  <h2 className="heading-serif text-[1.15rem] sm:text-[1.65rem] leading-[1.15] text-[color:var(--ink)]">
                    {category.name_cn}
                  </h2>
                  <p className="mt-1 sm:mt-2 text-[0.78rem] sm:text-[0.92rem] leading-[1.45] sm:leading-[1.5] text-[color:var(--ink-soft)]">
                    {category.name}
                  </p>
                </div>

                {/* Visual indicator - shows on hover */}
                <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[color:var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
