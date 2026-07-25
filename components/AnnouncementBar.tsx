import LanguageSwitcher from "@/components/LanguageSwitcher";
import { t } from "@/lib/i18n-shared";

export default function AnnouncementBar({ lang }: { lang: "zh" | "en" }) {
  const copy = t(lang);

  return (
    <div className="bg-gradient-to-r from-[#2f2215] via-[#3f2f1f] to-[#2f2215] text-[#f8ebd7] border-b border-[#d8ba89]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-3">
        <p className="text-[0.74rem] sm:text-[0.95rem] tracking-[0.03em] sm:tracking-[0.07em] leading-snug text-[#f9e6c8]">
          <span className="sm:hidden">{copy.announcementShort}</span>
          <span className="hidden sm:inline">{copy.announcementLong}</span>
        </p>
        <LanguageSwitcher lang={lang} />
      </div>
    </div>
  );
}
