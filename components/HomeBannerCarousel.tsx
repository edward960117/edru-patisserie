"use client";

export default function HomeBannerCarousel() {
  return (
    <div className="relative overflow-hidden rounded-[32px] shadow-[0_28px_60px_rgba(23,61,115,0.10)]"
      style={{
        background: "linear-gradient(135deg, #2b3a2e 0%, #3f4a3a 40%, #2a3328 70%, #1e2820 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,155,118,0.18),_transparent_60%)]" />

      <div className="relative px-7 py-10 sm:px-12 sm:py-14">
        <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[color:var(--gold-pale)]/70">BLUE ISLET · luxury cakes</p>
        <h2 className="mt-4 heading-serif text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-[2.8rem]">
          Celebrate with<br className="hidden sm:block" /> handcrafted elegance
        </h2>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-white/60 sm:text-base">
          Discover premium cakes and desserts designed for every special moment, delivered with refined taste and modern style.
        </p>
        <div className="mt-6 h-px w-20 bg-gradient-to-r from-[color:var(--gold)] to-transparent" />
      </div>
    </div>
  );
}
