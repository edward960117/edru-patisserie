import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getLang();
  const copy = t(lang);

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      cakes: {
        where: { active: true },
        include: { sizes: true },
        orderBy: { featured: "desc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <section>
      <div className="card-lux px-5 py-6 sm:px-8 sm:py-8">
        <p className="text-2xl">{category.emoji}</p>
        <h1 className="heading-serif text-[1.9rem] sm:text-5xl leading-tight">{category.name_cn}</h1>
        <p className="text-[color:var(--ink-soft)] mt-2 text-base sm:text-lg">{category.name}</p>
      </div>

      <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.cakes.map((cake) => {
          const cakeName = lang === "zh" ? (cake.name_cn || cake.name) : cake.name;
          const cakeDescription = lang === "zh" ? (cake.description_cn || cake.description) : cake.description;
          const minPrice = cake.sizes.length ? Math.min(...cake.sizes.map((size) => size.price)) : null;
          return (
            <Link key={cake.id} href={`/cakes/${cake.slug}`} className="card-lux overflow-hidden block hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(65,42,18,0.14)] active:scale-[0.995]">
              <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                <Image
                  src={cake.image_url}
                  alt={cakeName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h2 className="heading-serif text-[1.5rem] sm:text-3xl leading-tight">{cakeName}</h2>
                <p className="mt-2 text-[0.92rem] text-[color:var(--ink-soft)] line-clamp-2">{cakeDescription}</p>
                {minPrice ? <p className="mt-3 text-[color:var(--gold-deep)]">{copy.from} S${minPrice.toFixed(2)}</p> : null}
                <span className="btn-lux-outline mt-4 w-full inline-flex sm:w-auto">
                  {copy.viewDetails}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
