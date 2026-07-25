import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { getLang, t } from "@/lib/i18n";
import { readSiteAnnouncement } from "@/lib/announcement";

export default async function AdminPage() {
  const lang = await getLang();
  const copy = t(lang);
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  const session = verifySessionToken(token);

  if (!session || session.role !== "staff") {
    redirect("/login");
  }

  const [categories, cakes, announcement] = await Promise.all([
    prisma.category.findMany({ orderBy: { id: "asc" } }),
    prisma.cake.findMany({ include: { sizes: true }, orderBy: { id: "desc" } }),
    readSiteAnnouncement(),
  ]);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="heading-serif text-4xl">{copy.adminTitle}</h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-[color:var(--ink-soft)]">{copy.adminWelcome}</p>
          <LogoutButton lang={lang} />
        </div>
      </div>
      <AdminDashboard lang={lang} categories={categories} initialCakes={cakes} initialAnnouncement={announcement} />
    </section>
  );
}
