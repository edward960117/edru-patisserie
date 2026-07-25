import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";

export default async function CakeDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const copy = t(lang);

  const cake = await prisma.cake.findUnique({
    where: { slug },
    include: { sizes: { where: { available: true }, orderBy: { size: "asc" } } },
  });

  if (!cake) {
    notFound();
  }

  const cakeName = lang === "zh" ? (cake.name_cn || cake.name) : cake.name;
  const cakeDescription = lang === "zh" ? (cake.description_cn || cake.description) : cake.description;

  return (
    <section className="grid gap-5 sm:gap-8 lg:grid-cols-2">
      <div className="card-lux overflow-hidden">
        <div className="relative min-h-[250px] sm:min-h-[360px] h-full w-full">
          <Image
            src={cake.image_url}
            alt={cakeName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <article className="card-lux p-5 sm:p-8">
        <p className="lux-kicker">{copy.artisanSelection}</p>
        <h1 className="heading-serif mt-2 text-[1.86rem] sm:text-5xl leading-tight">{cakeName}</h1>
        <p className="mt-3 text-[color:var(--ink-soft)] leading-relaxed text-[0.98rem]">{cakeDescription}</p>

        <h2 className="mt-6 text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.ingredients}</h2>
        <p className="mt-2">{cake.ingredients}</p>

        <p className="mt-7 text-[color:var(--ink-soft)]">
          {copy.leadTimePrefix}{" "}
          <span className="font-bold text-[color:var(--accent-red)] text-[1.32em]">{cake.lead_time_days}</span>
          {" "}{copy.leadTimeSuffix}
        </p>

        <h2 className="mt-7 text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.availableSizes}</h2>
        <ul className="mt-3 space-y-2.5">
          {cake.sizes.map((size) => (
            <li key={size.id} className="rounded-xl border border-[color:var(--gold)]/22 px-4 py-3.5 bg-[rgba(255,250,241,0.72)]">
              <div className="grid w-full gap-2 sm:flex sm:items-center sm:justify-between sm:gap-3">
                <span className="font-medium">{size.size}</span>
                <span className="text-[color:var(--gold-deep)] font-semibold">S${size.price.toFixed(2)}</span>
                <Link href={`/checkout?cake=${cake.slug}&size=${size.id}`} className="btn-lux text-xs w-full sm:w-auto">
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
