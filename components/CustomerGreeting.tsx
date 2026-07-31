import { t } from "@/lib/i18n-shared";

export default function CustomerGreeting({
  name,
  lang,
  variant = "bar",
}: {
  name: string | null;
  lang: "zh" | "en";
  variant?: "bar" | "banner";
}) {
  if (!name) return null;

  const copy = t(lang);
  const initial = name.charAt(0).toUpperCase();

  if (variant === "banner") {
    return (
      <span className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 py-1 pl-1 pr-3.5 shadow-[0_6px_18px_rgba(20,86,128,0.14)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_22px_rgba(20,86,128,0.2)]">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--gold-deep)] text-[0.8rem] font-semibold text-white shadow-inner"
        >
          {initial}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.6rem] uppercase tracking-[0.16em] text-[color:var(--ink-soft)]/70">
            {copy.customerWelcome}
          </span>
          <span className="text-[0.85rem] font-semibold text-[color:var(--primary)]">{name}</span>
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap text-[0.72rem] sm:text-[0.9rem] text-white/95">
      <span aria-hidden="true">👋</span>
      <span className="hidden sm:inline">{copy.customerWelcome},</span>
      <span className="font-semibold">{name}</span>
    </span>
  );
}
