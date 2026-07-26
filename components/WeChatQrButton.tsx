"use client";

import { useState } from "react";
import Image from "next/image";
import { t, type Lang } from "@/lib/i18n-shared";

const COPY_FEEDBACK_DURATION_MS = 1800;

interface Props {
  lang: Lang;
  className?: string;
  footerStyle?: boolean;
  orderDetails?: string;
}

export default function WeChatQrButton({ lang, className, footerStyle = false, orderDetails }: Props) {
  const copy = t(lang);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const draftOrderDetails = orderDetails ?? copy.weChatDefaultOrderDetails;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draftOrderDetails);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch {
      setCopied(false);
    }
  }

  function closeModal() {
    setOpen(false);
    setCopied(false);
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className ?? "btn-lux-outline"}>
        {footerStyle ? (
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e9f7f0] text-[#169256]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8.5 9.2c.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.1-1.2-1.1-.6 0-1.1.5-1.1 1.1 0 .7.5 1.2 1.1 1.2Zm6.9 0c.7 0 1.2-.5 1.2-1.2 0-.6-.5-1.1-1.2-1.1-.6 0-1.1.5-1.1 1.1 0 .7.5 1.2 1.1 1.2Z" />
                <path d="M12.1 2.2c-5.2 0-9.4 3.2-9.4 7.2 0 2.3 1.4 4.3 3.7 5.6l-.8 3.1 3.8-2.1c.9.2 1.8.4 2.7.4 5.2 0 9.4-3.2 9.4-7.2s-4.2-7-9.4-7Zm0 12.5c-.9 0-1.8-.2-2.7-.4l-.4-.1-2.2 1.2.4-1.9-.4-.2c-1.9-1-3-2.5-3-4.1 0-3 3.7-5.5 8.3-5.5s8.3 2.5 8.3 5.5-3.7 5.5-8.3 5.5Z" />
              </svg>
            </span>
            <span>WeChat</span>
          </span>
        ) : copy.orderViaWeChat}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="WeChat QR">
          <button type="button" aria-label="Close WeChat QR" className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={closeModal} />

          <div className="relative z-[1] w-full max-w-sm rounded-2xl border border-[color:var(--gold)]/35 bg-[#fdf7ee] p-4 shadow-[0_20px_40px_rgba(47,31,16,0.22)]">
            <p className="heading-serif text-xl text-[color:var(--ink)]">{copy.orderViaWeChat}</p>
            <p className="mt-1 text-xs text-[color:var(--ink-soft)]">{copy.weChatScanHint}</p>

            <div className="mt-3 rounded-xl border border-[color:var(--gold)]/30 bg-white p-1.5">
              <Image
                src="/wechatcontact.jpg"
                alt="WeChat contact QR code"
                width={720}
                height={720}
                className="h-auto max-h-44 w-full rounded-lg object-contain"
              />
            </div>

            <p className="mt-3 text-xs text-[color:var(--ink-soft)]">
              {copy.weChatOrderCopyHint}
            </p>
            <textarea
              readOnly
              value={draftOrderDetails}
              className="mt-1.5 h-20 w-full rounded-xl border border-[color:var(--gold)]/30 bg-white/90 p-3 text-sm leading-relaxed text-[color:var(--ink)]"
            />

            <button type="button" onClick={handleCopy} className="btn-lux mt-2.5 w-full">
              {copied ? copy.orderDetailsCopied : copy.copyOrderDetails}
            </button>

            <button type="button" onClick={closeModal} className="btn-lux-outline mt-2 w-full">
              {lang === "zh" ? "关闭" : "Close"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
