import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function AnnouncementBar({ lang }: { lang: "zh" | "en" }) {
  return (
    <div className="bg-gradient-to-r from-[#2f2215] via-[#3f2f1f] to-[#2f2215] text-[#f8ebd7] border-b border-[#d8ba89]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:h-10 flex items-center justify-between gap-3">
        <p className="text-[0.68rem] sm:text-sm tracking-[0.05em] sm:tracking-[0.07em] leading-snug text-[#f9e6c8]">
          <span className="sm:hidden">Fresh cakes. Pickup available.</span>
          <span className="hidden sm:inline">Order online for pickup. Premium handcrafted cakes.</span>
        </p>
        <LanguageSwitcher lang={lang} />
      </div>
    </div>
  );
}
