import Link from "next/link";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { getFallbackCategoryWithCakes } from "@/lib/fallback-catalog";
import { withResilientTimeout } from "@/lib/with-timeout";
import BackButton from "@/components/BackButton";

type CategoryWithCakes = Prisma.CategoryGetPayload<{
  include: {
    cakes: {
      include: { sizes: true };
    };
  };
}>;

export const revalidate = 60;

const getCategoryBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.category.findUnique({
      where: { slug },
      include: {
        cakes: {
          where: { active: true },
          include: { sizes: true },
          orderBy: { featured: "desc" },
        },
      },
    });
  },
  ["category-by-slug"],
  { revalidate: 300, tags: ["catalog", "cakes"] }
);

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const copy = t(lang);

  let category: CategoryWithCakes | null = null;
  const fallback = getFallbackCategoryWithCakes(slug);

  try {
    category = await withResilientTimeout(() => getCategoryBySlug(slug), 5000);
  } catch {
    category = null;
  }

  if (!category && !fallback) {
    notFound();
  }

  const categoryMeta = category ?? fallback?.category;
  const cakes = category?.cakes ?? fallback?.cakes ?? [];

  if (!categoryMeta) {
      notFound();
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="category-hero card-lux px-5 py-6 sm:px-8 sm:py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="category-hero-emoji">{categoryMeta.emoji}</span>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--primary)]">
              {lang === "zh" ? "精选系列" : "Curated collection"}
            </p>
          </div>
          <BackButton lang={lang} fallbackHref="/" className="whitespace-nowrap" />
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="heading-serif text-[2.1rem] leading-[0.95] sm:text-5xl">{categoryMeta.name_cn}</h1>
            <p className="mt-2 text-base text-[color:var(--ink-soft)] sm:text-lg">{categoryMeta.name}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="category-chip">{cakes.length} {lang === "zh" ? "款作品" : "pieces"}</span>
            <span className="category-chip">{lang === "zh" ? "定制可选" : "Made to order"}</span>
          </div>
        </div>

        {!category ? (
          <p className="mt-5 text-[0.9rem] text-[color:var(--ink-faint)]">
            {lang === "zh" ? "当前显示离线商品列表。" : "Showing offline catalog while database reconnects."}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cakes.map((cake) => {
          const cakeName = lang === "zh" ? (cake.name_cn || cake.name) : cake.name;
          const cakeDescription = lang === "zh" ? (cake.description_cn || cake.description) : cake.description;
          const pricedSizes = cake.sizes.filter((size) => size.available && size.price > 0);
          const minPrice = pricedSizes.length ? Math.min(...pricedSizes.map((size) => size.price)) : null;
          return (
            <Link key={cake.id} href={`/cakes/${cake.slug}`} className="group product-card card-lux flex h-full flex-col overflow-hidden active:scale-[0.995]">
              <div className="product-media relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={cake.image_url}
                  alt={cakeName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="product-media-overlay" />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="heading-serif text-[1.5rem] leading-tight text-[color:var(--ink)] sm:text-[2rem]">{cakeName}</h2>
                  <span className="inline-flex rounded-full border border-[color:var(--primary)]/15 bg-[color:var(--primary)]/5 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--primary)]">
                    {lang === "zh" ? "新作" : "New"}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-[color:var(--ink-faint)]">{cakeDescription}</p>
                <div className="mt-auto pt-4">
                  <p className="min-h-[1.6rem] text-[color:var(--gold-deep)]">
                    {minPrice !== null ? <span className="price-callout">{copy.from} S${minPrice.toFixed(2)}</span> : <span aria-hidden="true" className="invisible">{copy.from} S$00.00</span>}
                  </p>
                  <span className="btn-lux-outline mt-3 w-full inline-flex justify-center">
                    {copy.viewDetails}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
