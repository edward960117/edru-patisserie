import Link from "next/link";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";
import { getFallbackCakeBySlug } from "@/lib/fallback-catalog";
import { withTimeout } from "@/lib/with-timeout";
import BackButton from "@/components/BackButton";

export const revalidate = 60;

const getCakeBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.cake.findUnique({
      where: { slug },
      include: { sizes: { where: { available: true }, orderBy: { size: "asc" } } },
    });
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
    cake = await withTimeout(getCakeBySlug(slug), 5000);
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
    <section className="grid gap-5 sm:gap-8 lg:grid-cols-2">
      <div className="card-lux atelier-frame overflow-hidden">
        <div className="product-media relative aspect-[16/10] w-full overflow-hidden rounded-[20px]">
          <Image
            src={resolvedCake.image_url}
            alt={cakeName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>

      <article className="detail-card card-lux atelier-frame p-5 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="lux-kicker">{copy.artisanSelection}</p>
          <BackButton lang={lang} fallbackHref="/" className="whitespace-nowrap" />
        </div>
        <h1 className="heading-serif mt-2 text-[1.86rem] sm:text-5xl leading-tight">{cakeName}</h1>
        <p className="mt-3 text-[color:var(--ink-faint)] leading-relaxed text-[0.98rem]">{cakeDescription}</p>

        <h2 className="mt-6 text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.ingredients}</h2>
        <p className="mt-2">{resolvedCake.ingredients}</p>

        <p className="mt-7 text-[color:var(--ink-soft)]">
          {copy.leadTimePrefix}{" "}
          <span className="font-bold text-[color:var(--accent-red)] text-[1.32em]">{resolvedCake.lead_time_days}</span>
          {" "}{copy.leadTimeSuffix}
        </p>

        {!cake ? (
          <p className="mt-3 text-[0.86rem] text-[color:var(--ink-faint)]">
            {lang === "zh" ? "当前显示离线商品信息。" : "Showing offline product data while database reconnects."}
          </p>
        ) : null}

        <div className="divider-ornate mt-7" />

        <h2 className="mt-7 text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.availableSizes}</h2>
        <ul className="mt-3 space-y-2.5">
          {resolvedCake.sizes.filter((size) => size.available).map((size) => (
            <li key={size.id} className="size-row rounded-xl border border-[color:var(--gold)]/28 px-4 py-3.5 bg-[color:var(--surface)]/92">
              <div className="relative grid w-full gap-2 sm:flex sm:items-center sm:justify-between sm:gap-3">
                <span className="font-medium heading-serif text-lg">{size.size}</span>
                <span className="price-callout text-[color:var(--gold-deep)] font-semibold">S${size.price.toFixed(2)}</span>
                <Link href={`/checkout?cake=${resolvedCake.slug}&size=${size.id}`} className="btn-lux text-xs w-full sm:w-auto">
                  {copy.checkout}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
