import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getLang, t } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const categories = await prisma.category.findMany({
    where: {
      slug: { in: ["todays-recommendation", "for-him", "for-her", "custom-cakes"] },
    },
    orderBy: { id: "asc" },
  });

  return (
    <section className="space-y-7 sm:space-y-10">
      <div className="card-lux relative overflow-hidden px-5 py-7 sm:px-10 sm:py-12">
        <div className="absolute -top-14 -right-10 h-40 w-40 rounded-full bg-[#d9b582]/18 blur-2xl" />
        <p className="lux-kicker">{copy.homeTagline}</p>
        <h1 className="heading-serif mt-2 text-[1.86rem] sm:text-6xl leading-[1.05]">{copy.homeTitle}</h1>
        <p className="mt-3 sm:mt-4 max-w-2xl text-[color:var(--ink-soft)] text-[0.98rem] sm:text-lg leading-relaxed">{copy.homeSubtitle}</p>
      </div>

      <div className="grid home-category-grid gap-3 sm:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group card-lux p-5 sm:p-6 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(65,42,18,0.14)] active:scale-[0.995]"
          >
            <p className="text-[1.7rem] sm:text-3xl">{category.emoji}</p>
            <h2 className="mt-3 sm:mt-4 heading-serif text-[1.4rem] sm:text-[1.95rem] leading-tight">{category.name_cn}</h2>
            <p className="mt-1 text-[color:var(--ink-soft)] text-[0.95rem]">{category.name}</p>
            <p className="mt-5 sm:mt-7 text-[0.74rem] sm:text-xs text-[color:var(--gold-deep)] uppercase tracking-[0.15em] sm:tracking-[0.2em] group-hover:tracking-[0.21em]">{copy.viewCategory}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
