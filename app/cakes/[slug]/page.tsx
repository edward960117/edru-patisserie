import Image from "next/image";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { getFallbackCakeBySlug } from "@/lib/fallback-catalog";
import { withResilientTimeout } from "@/lib/with-timeout";
import BackButton from "@/components/BackButton";
import SizeSelector from "@/components/SizeSelector";

export const revalidate = 60;

function bySizeAscending<T extends { size: string }>(a: T, b: T) {
  return parseInt(a.size, 10) - parseInt(b.size, 10);
}

const getCakeBySlug = unstable_cache(
  async (slug: string) => {
    const cake = await prisma.cake.findUnique({
      where: { slug },
      include: { sizes: { where: { available: true } } },
    });
    // "size" is stored as a string (e.g. "10\""), so sort numerically instead of alphabetically.
    cake?.sizes.sort(bySizeAscending);
    return cake;
  },
  ["cake-by-slug"],
  { revalidate: 300, tags: ["cakes"] }
);

export default async function CakeDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const copy = t(lang);

  let cake = null;

  try {
    cake = await withResilientTimeout(() => getCakeBySlug(slug), 5000);
  } catch {
    cake = null;
  }

  const fallbackCake = getFallbackCakeBySlug(slug);
  const resolvedCake = cake ?? fallbackCake;

  if (!resolvedCake) {
    notFound();
  }

  const cakeName = lang === "zh" ? (resolvedCake.name_cn || resolvedCake.name) : resolvedCake.name;
  const cakeDescription = lang === "zh" ? (resolvedCake.description_cn || resolvedCake.description) : resolvedCake.description;

  return (
    <section className="md:grid md:gap-8 md:grid-cols-[2fr_3fr]">
      <div className="hidden md:block card-lux atelier-frame overflow-hidden">
        <div className="product-media relative aspect-[4/3] w-full max-h-[300px] overflow-hidden rounded-[20px]">
          <Image
            src={resolvedCake.image_url}
            alt={cakeName}
            fill
            priority
            sizes="32vw"
            className="object-cover"
          />
        </div>
      </div>

      <article className="detail-card card-lux atelier-frame p-4 sm:p-8">
        <div className="flex items-start gap-3 md:block">
          <div className="md:hidden relative w-16 h-16 shrink-0 overflow-hidden rounded-xl product-media">
            <Image src={resolvedCake.image_url} alt={cakeName} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="lux-kicker">{copy.artisanSelection}</p>
              <BackButton lang={lang} fallbackHref="/" className="whitespace-nowrap" />
            </div>
            <h1 className="heading-serif text-xl sm:text-3xl md:text-5xl leading-tight">{cakeName}</h1>
          </div>
        </div>
        <p className="mt-2 text-[color:var(--ink-faint)] leading-relaxed text-[0.92rem] line-clamp-2 md:line-clamp-none">{cakeDescription}</p>

        <details className="mt-3 group" open>
          <summary className="cursor-pointer select-none text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            {copy.ingredients}
          </summary>
          <p className="mt-2">{resolvedCake.ingredients}</p>
        </details>

        <p className="mt-3 text-[0.9rem] text-[color:var(--ink-soft)]">
          {copy.leadTimePrefix}{" "}
          <span className="font-bold text-[color:var(--accent-red)] text-[1.2em]">{resolvedCake.lead_time_days}</span>
          {" "}{copy.leadTimeSuffix}
        </p>

        {!cake ? (
          <p className="mt-2 text-[0.86rem] text-[color:var(--ink-faint)]">
            {lang === "zh" ? "当前显示离线商品信息。" : "Showing offline product data while database reconnects."}
          </p>
        ) : null}

        <div className="divider-ornate mt-4" />

        <h2 className="mt-4 text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.availableSizes}</h2>
        <div className="mt-3">
          <SizeSelector
            lang={lang}
            cakeSlug={resolvedCake.slug}
            sizes={resolvedCake.sizes
              .filter((size) => size.available)
              .map((size) => ({ id: size.id, size: size.size, price: size.price }))
              .sort(bySizeAscending)}
            checkoutLabel={copy.checkout}
          />
        </div>
      </article>
    </section>
  );
}
