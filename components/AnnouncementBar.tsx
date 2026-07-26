import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n-shared";

export default function AnnouncementBar({ lang }: { lang: "zh" | "en" }) {
  const copy = t(lang);

  return (
    <div className="min-h-[40px] border-b border-[color:var(--gold)]/45 bg-[color:var(--primary)] text-white shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]">
      <div className="mx-auto flex h-[40px] max-w-7xl items-center justify-between gap-2.5 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[0.72rem] sm:text-[0.9rem] tracking-[0.03em] sm:tracking-[0.06em] text-white/95">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--gold)]" />
          <p className="leading-snug">
            <span className="sm:hidden">{copy.announcementShort}</span>
            <span className="hidden sm:inline">{copy.announcementLong}</span>
          </p>
        </div>
        <LanguageSwitcher lang={lang} />
      </div>
    </div>
  );
}
