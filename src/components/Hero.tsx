/**
 * Full-bleed hero: large background photo, centered brand statement, and
 * boutique info (address / hours) — mirrors the reference site's hero,
 * which pairs a big seasonal image with concise store details and a CTA.
 */
export default function Hero() {
  return (
    <section id="top" className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80&auto=format&fit=crop"
        alt="Assortment of handcrafted cakes at EDRU PATISSERIE"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-cream px-4">
        <p className="uppercase tracking-[0.3em] text-xs sm:text-sm mb-4">Handcrafted Since Day One</p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl">
          EDRU PATISSERIE
        </h1>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-cream/90">
          Seasonal cakes and pastries, made fresh daily. Pre-order for pickup or takeaway.
        </p>
        <a
          href="#cakes"
          className="mt-8 inline-block bg-cream text-charcoal px-8 py-3 text-sm uppercase tracking-wider hover:bg-gold hover:text-cream transition-colors"
        >
          Order Now
        </a>

        <div className="mt-10 text-xs sm:text-sm text-cream/80 space-y-1">
          <p>123 Orchard Road, #01-01, Singapore 238888</p>
          <p>Wednesday to Sunday · 9:00 am – 7:00 pm</p>
        </div>
      </div>
    </section>
  );
}
