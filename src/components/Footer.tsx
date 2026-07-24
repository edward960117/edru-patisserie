/**
 * Site footer: contact/hours column, quick links, social, and legal bar —
 * matches the reference site's multi-column footer structure.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-xl mb-3">Edru Patisserie</h3>
          <p className="text-sm text-cream/70 leading-relaxed">
            123 Orchard Road, #01-01
            <br />
            Singapore 238888
          </p>
          <p className="text-sm text-cream/70 mt-3">Wednesday to Sunday — 9:00 am to 7:00 pm</p>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider text-gold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><a href="#cakes" className="hover:text-cream">Our Cakes</a></li>
            <li><a href="#story" className="hover:text-cream">Our Story</a></li>
            <li><a href="#book" className="hover:text-cream">Book a Table</a></li>
            <li><a href="#contact" className="hover:text-cream">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider text-gold mb-4">Help</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><a href="#" className="hover:text-cream">FAQ</a></li>
            <li><a href="#" className="hover:text-cream">Join Us</a></li>
            <li><a href="#" className="hover:text-cream">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-wider text-gold mb-4">Get in Touch</h4>
          <p className="text-sm text-cream/80">hello@edrupatisserie.sg</p>
          <p className="text-sm text-cream/80 mt-1">+65 6123 4567</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-sm underline hover:text-gold"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/60">
        © {year} Edru Patisserie. All rights reserved.
      </div>
    </footer>
  );
}
