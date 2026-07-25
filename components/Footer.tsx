import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/contact";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="mt-14 sm:mt-24 border-t border-[color:var(--gold)]/28 bg-[linear-gradient(180deg,rgba(248,242,232,0),rgba(235,221,200,0.45))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 text-sm text-[color:var(--ink-soft)]">
        <p className="lux-kicker">EDRU Patisserie</p>
        <p className="heading-serif mt-1 text-xl sm:text-2xl text-[color:var(--ink)]">Handcrafted Cakes and Desserts</p>
        <p className="mt-2 max-w-2xl">Luxury handcrafted cakes for modern celebrations.</p>
        <div className="mt-5 grid grid-cols-2 sm:flex items-stretch gap-3 max-w-sm sm:max-w-none">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="btn-lux-outline gap-2 w-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.5 3.5A11.8 11.8 0 0 0 1.8 17.6L0 24l6.6-1.8a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8a11.7 11.7 0 0 0-3.6-8.3Zm-8.2 18.1h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.9 1.1 1-3.8-.2-.4a9.8 9.8 0 1 1 8.6 4.7Zm5.4-7.4c-.3-.1-1.9-.9-2.2-1s-.5-.1-.7.1-.8 1-1 1.2c-.2.2-.3.2-.6 0a8.1 8.1 0 0 1-2.4-1.5 8.9 8.9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2.1-.4 0-.6l-1-2.4c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1a12.2 12.2 0 0 0 4.6 4c.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.8-.7 2-1.3.3-.6.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="btn-lux-outline gap-2 w-full"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.2 2h-8A4 4 0 0 0 4 8v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Zm-4 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8a2.7 2.7 0 1 0 2.7 2.7A2.7 2.7 0 0 0 12 9.3Zm4.8-2.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
