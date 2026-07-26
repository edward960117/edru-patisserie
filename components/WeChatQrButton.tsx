"use client";

import { useState } from "react";
import Image from "next/image";
import { t, type Lang } from "@/lib/i18n-shared";

interface OrderSummary {
  cakeName: string;
  size: string;
  price: number;
}

interface Props {
  lang: Lang;
  className?: string;
  footerStyle?: boolean;
  orderSummary?: OrderSummary;
}

export default function WeChatQrButton({ lang, className, footerStyle = false, orderSummary }: Props) {
  const copy = t(lang);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const orderMessage = orderSummary
    ? [
        copy.weChatOrderLine1,
        `${copy.weChatOrderCakeLabel}${orderSummary.cakeName}`,
        `${copy.weChatOrderSizeLabel}${orderSummary.size}`,
        `${copy.weChatOrderPriceLabel}${orderSummary.price.toFixed(2)}`,
        copy.weChatOrderQuestion,
      ].join("\n")
    : null;

  function handleCopy() {
    if (!orderMessage) return;
    navigator.clipboard.writeText(orderMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
          <button type="button" aria-label="Close WeChat QR" className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />

          <div className="relative z-[1] w-full max-w-sm overflow-y-auto max-h-[90dvh] rounded-2xl border border-[color:var(--gold)]/35 bg-[#fdf7ee] p-5 shadow-[0_20px_40px_rgba(47,31,16,0.22)]">
            <p className="heading-serif text-2xl text-[color:var(--ink)]">{copy.orderViaWeChat}</p>
            <p className="mt-2 text-sm text-[color:var(--ink-soft)]">{copy.weChatScanHint}</p>

            <div className="mt-4 rounded-xl border border-[color:var(--gold)]/30 bg-white p-2">
              <Image
                src="/wechatcontact.jpg"
                alt="WeChat contact QR code"
                width={720}
                height={720}
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>

            {orderMessage && (
              <div className="mt-4 rounded-xl border border-[color:var(--gold)]/30 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--gold-deep)]">{copy.weChatOrderSummaryTitle}</p>
                <p className="mt-1 text-xs text-[color:var(--ink-soft)]">{copy.weChatOrderSummaryHint}</p>
                <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-[color:var(--gold)]/20 bg-[#fdf7ee] px-3 py-2.5 font-sans text-sm leading-relaxed text-[color:var(--ink)] select-all">
                  {orderMessage}
                </pre>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="mt-3 w-full rounded-xl border border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 py-2 text-sm font-medium text-[color:var(--ink)] transition-colors hover:bg-[color:var(--gold)]/20 active:bg-[color:var(--gold)]/30"
                >
                  {copied ? copy.weChatCopied : copy.weChatCopyOrder}
                </button>
              </div>
            )}

            <button type="button" onClick={() => setOpen(false)} className="btn-lux-outline mt-4 w-full">
              {lang === "zh" ? "关闭" : "Close"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
