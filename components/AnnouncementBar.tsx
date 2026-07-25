import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AnnouncementBar({ lang }: { lang: "zh" | "en" }) {
  return (
    <div className="bg-gradient-to-r from-[#2f2215] via-[#3f2f1f] to-[#2f2215] text-[#f8ebd7] border-b border-[#d8ba89]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
        <p className="text-xs sm:text-sm tracking-[0.07em]">Order online for pickup. Premium handcrafted cakes.</p>
        <LanguageSwitcher lang={lang} />
      </div>
    </div>
  );
}
