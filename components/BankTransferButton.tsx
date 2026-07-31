"use client";

import { useState } from "react";
import { t, type Lang } from "@/lib/i18n-shared";
import { PAYNOW_ID, BANK_TRANSFER_DETAILS } from "@/lib/contact";

const COPY_FEEDBACK_DURATION_MS = 1800;

interface Props {
  lang: Lang;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function BankTransferButton({ lang, className, onClick }: Props) {
  const copy = t(lang);
  const [open, setOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<"paynow" | "account" | null>(null);

  async function handleCopy(field: "paynow" | "account", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField((prev) => (prev === field ? null : prev)), COPY_FEEDBACK_DURATION_MS);
    } catch {
      setCopiedField(null);
    }
  }

  function closeModal() {
    setOpen(false);
    setCopiedField(null);
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setOpen(true);
    }
  }

  return (
    <>
      <button type="button" onClick={handleButtonClick} className={className ?? "btn-lux-outline"}>
        {copy.orderViaBankTransfer}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label={copy.bankTransferModalTitle}>
          <button type="button" aria-label="Close" className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeModal} />

          <div className="relative z-[1] w-full max-w-md rounded-2xl border border-[color:var(--gold)]/35 bg-[color:var(--card)] p-5 shadow-[0_20px_40px_rgba(20,86,128,0.22)]">
            <p className="heading-serif text-lg text-[color:var(--ink)]">{copy.bankTransferModalTitle}</p>
            <p className="mt-1.5 text-sm leading-snug text-[color:var(--ink-soft)]">{copy.bankTransferHint}</p>

            <div className="mt-4 rounded-xl border border-[color:var(--gold)]/25 bg-white/80 p-3.5">
              <p className="text-xs uppercase tracking-[0.1em] text-[color:var(--ink-soft)]">{copy.payNowLabel}</p>
              <p className="mt-1 font-semibold text-[color:var(--ink)]">{PAYNOW_ID}</p>
              <button
                type="button"
                onClick={() => void handleCopy("paynow", PAYNOW_ID)}
                className="btn-lux-outline mt-2 w-full py-1.5 text-sm"
              >
                {copiedField === "paynow" ? copy.copied : copy.copyPayNow}
              </button>
            </div>

            <div className="mt-3 rounded-xl border border-[color:var(--gold)]/25 bg-white/80 p-3.5">
              <p className="text-xs uppercase tracking-[0.1em] text-[color:var(--ink-soft)]">{copy.bankNameLabel}</p>
              <p className="mt-1 font-semibold text-[color:var(--ink)]">{BANK_TRANSFER_DETAILS.bankName}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[color:var(--ink-soft)]">{copy.accountNumberLabel}</p>
              <p className="mt-1 font-semibold text-[color:var(--ink)]">{BANK_TRANSFER_DETAILS.accountNumber}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.1em] text-[color:var(--ink-soft)]">{copy.accountNameLabel}</p>
              <p className="mt-1 font-semibold text-[color:var(--ink)]">{BANK_TRANSFER_DETAILS.accountName}</p>
              <button
                type="button"
                onClick={() => void handleCopy("account", BANK_TRANSFER_DETAILS.accountNumber)}
                className="btn-lux-outline mt-2 w-full py-1.5 text-sm"
              >
                {copiedField === "account" ? copy.copied : copy.copyAccountNumber}
              </button>
            </div>

            <button type="button" onClick={closeModal} className="btn-lux mt-4 w-full py-1.5 text-sm">
              {lang === "zh" ? "关闭" : "Close"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
