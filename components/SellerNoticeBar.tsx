"use client";

import { useState } from "react";

interface Props {
  enabled: boolean;
  message: string;
}

export default function SellerNoticeBar({ enabled, message }: Props) {
  const [dismissed, setDismissed] = useState(false);

  if (!enabled || dismissed || !message.trim()) {
    return null;
  }

  const display = `• ${message.trim()} • ${message.trim()} • ${message.trim()} •`;

  return (
    <div className="relative overflow-hidden border-b border-[color:var(--gold)]/28 bg-[#f6e8d0] text-[#5a4228]">
      <div className="px-3 py-2 pr-12 sm:px-5 sm:pr-14">
        <p className="notice-marquee whitespace-nowrap text-[0.78rem] sm:text-[0.88rem] tracking-[0.05em]" aria-label="Seller announcement">
          {display}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[color:var(--gold)]/45 bg-white/70 px-2 py-0.5 text-[0.7rem] text-[color:var(--ink-soft)] hover:bg-white"
        aria-label="Hide seller announcement"
      >
        Hide
      </button>
    </div>
  );
}
