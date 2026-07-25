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
    <section className="space-y-10">
      <div className="card-lux relative overflow-hidden px-7 py-10 sm:px-10 sm:py-12">
        <div className="absolute -top-14 -right-10 h-40 w-40 rounded-full bg-[#d9b582]/18 blur-2xl" />
        <p className="lux-kicker">EDRU Signature Collection</p>
        <h1 className="heading-serif mt-2 text-5xl sm:text-6xl leading-[0.95]">{copy.homeTitle}</h1>
        <p className="mt-4 max-w-2xl text-[color:var(--ink-soft)] text-lg">{copy.homeSubtitle}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group card-lux p-6 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(65,42,18,0.14)]"
          >
            <p className="text-3xl">{category.emoji}</p>
            <h2 className="mt-4 heading-serif text-[1.95rem] leading-tight">{category.name_cn}</h2>
            <p className="mt-1 text-[color:var(--ink-soft)] text-[0.95rem]">{category.name}</p>
            <p className="mt-7 text-xs text-[color:var(--gold-deep)] uppercase tracking-[0.2em] group-hover:tracking-[0.23em]">{copy.viewCategory}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
