import { useState } from "react";

/**
 * Cookie consent banner — small persistent-choice UI at the bottom of the
 * viewport, echoing the reference site's cookie notice. Choice is
 * remembered via localStorage so it doesn't reappear on every visit.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(() => localStorage.getItem("cookie-consent") === null);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] bg-charcoal text-cream px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg">
      <p className="text-xs sm:text-sm text-cream/85 flex-1">
        We use cookies to personalise content, provide social media features, and analyse our
        traffic. Read our{" "}
        <a href="#" className="underline hover:text-gold">
          Privacy Policy
        </a>
        .
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={() => handleChoice(false)}
          className="text-xs sm:text-sm px-4 py-2 border border-cream/40 hover:border-cream transition-colors"
        >
          Continue Without Accepting
        </button>
        <button
          onClick={() => handleChoice(true)}
          className="text-xs sm:text-sm px-4 py-2 bg-gold hover:bg-gold-light transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
