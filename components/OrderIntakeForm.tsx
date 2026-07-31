"use client";

import { useRef, useState } from "react";
import { guessChannel, parseOrderText } from "@/lib/order-parser";

type Channel = "whatsapp" | "wechat" | "handwritten" | "other";

export interface NewOrderPayload {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cakeName: string;
  size: string;
  price: number;
  quantity: number;
  fulfillment: string;
  eventDate: string;
  channel: Channel;
  notes: string;
  sourceImageUrl: string;
  rawExtractedText: string;
}

interface Props {
  lang: "zh" | "en";
  knownCakeNames: string[];
  disabled?: boolean;
  onSubmit: (order: NewOrderPayload) => Promise<void>;
}

const emptyDraft = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  cakeName: "",
  size: "",
  price: "",
  quantity: "1",
  fulfillment: "",
  eventDate: "",
  notes: "",
};

export default function OrderIntakeForm({ lang, knownCakeNames, disabled = false, onSubmit }: Props) {
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [rawText, setRawText] = useState<string>("");
  const [draft, setDraft] = useState(emptyDraft);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ customerName?: boolean; cakeName?: boolean; eventDate?: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const cakeNameInputRef = useRef<HTMLInputElement>(null);
  const eventDateInputRef = useRef<HTMLInputElement>(null);

  function resetAll() {
    setImageDataUrl("");
    setRawText("");
    setDraft(emptyDraft);
    setReviewing(false);
    setStatusMessage("");
    setFieldErrors({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleFile(file: File | null) {
    if (!file) return;
    setStatusMessage("");
    setReviewing(false);

    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(file);
    });
    setImageDataUrl(dataUrl);

    setScanning(true);
    setScanProgress(0);
    try {
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker("eng+chi_sim", 1, {
        logger: (message) => {
          if (message.status === "recognizing text" && typeof message.progress === "number") {
            setScanProgress(Math.round(message.progress * 100));
          }
        },
      });
      const { data } = await worker.recognize(dataUrl);
      await worker.terminate();

      const text = data.text || "";
      setRawText(text);
      const parsed = parseOrderText(text, knownCakeNames);
      setDraft({
        customerName: parsed.customerName,
        customerPhone: parsed.customerPhone,
        cakeName: parsed.cakeName,
        size: parsed.size,
        price: parsed.price ? String(parsed.price) : "",
        quantity: String(parsed.quantity),
        fulfillment: parsed.fulfillment,
        eventDate: parsed.eventDate,
        notes: "",
      });
      setReviewing(true);

      const detectedChannel = guessChannel(text);
      if (detectedChannel) {
        setChannel(detectedChannel);
      }
      const detectedLabel = detectedChannel
        ? { whatsapp: "WhatsApp", wechat: "WeChat", handwritten: lang === "zh" ? "手写订单" : "a handwritten note" }[detectedChannel]
        : "";
      setStatusMessage(
        detectedChannel
          ? (lang === "zh"
              ? `已自动识别，并系统推测来源为“${detectedLabel}”，如不正确请手动选择。`
              : `Auto-extraction complete — we guessed this came from ${detectedLabel}. Please check all details below, and change the channel above if that guess is wrong.`)
          : (lang === "zh"
              ? "已尝试自动识别，请核对以下信息是否正确。"
              : "Auto-extraction complete — please check the details below are correct.")
      );
    } catch {
      setRawText("");
      setReviewing(true);
      setStatusMessage(
        lang === "zh"
          ? "自动识别失败，请手动填写订单信息。"
          : "Automatic extraction failed. Please fill in the order details manually."
      );
    } finally {
      setScanning(false);
    }
  }

  function startHandwrittenOrManual(nextChannel: Channel) {
    setChannel(nextChannel);
    resetAll();
    setReviewing(true);
  }

  async function handleConfirm() {
    if (submitting) return;
    const errors: { customerName?: boolean; cakeName?: boolean; eventDate?: boolean } = {};
    if (!draft.customerName.trim()) errors.customerName = true;
    if (!draft.cakeName.trim()) errors.cakeName = true;
    if (!draft.eventDate) errors.eventDate = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatusMessage(
        lang === "zh"
          ? "请至少填写客户姓名、蛋糕名称与取货/配送日期。"
          : "Please fill in at least customer name, cake name, and the pickup/delivery date."
      );
      // Scroll to whichever required field is missing, in the order it appears on the form
      const targetRef = errors.customerName ? nameInputRef : errors.cakeName ? cakeNameInputRef : eventDateInputRef;
      targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      targetRef.current?.focus();
      return;
    }
    setFieldErrors({});

    setSubmitting(true);
    try {
      await onSubmit({
        customerName: draft.customerName.trim(),
        customerPhone: draft.customerPhone.trim(),
        customerEmail: draft.customerEmail.trim(),
        cakeName: draft.cakeName.trim(),
        size: draft.size.trim(),
        price: Number.parseFloat(draft.price) || 0,
        quantity: Number.parseInt(draft.quantity, 10) || 1,
        fulfillment: draft.fulfillment,
        eventDate: draft.eventDate,
        channel,
        notes: draft.notes.trim(),
        sourceImageUrl: imageDataUrl,
        rawExtractedText: rawText,
      });
      setStatusMessage(lang === "zh" ? "订单已保存并加入日历。" : "Order saved and added to the calendar.");
      resetAll();
    } catch {
      setStatusMessage(lang === "zh" ? "保存失败，请重试。" : "Failed to save the order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const channelOptions: Array<{ id: Channel; label: string; icon: string }> = [
    { id: "whatsapp", label: "WhatsApp", icon: "💬" },
    { id: "wechat", label: "WeChat", icon: "🟢" },
    { id: "handwritten", label: lang === "zh" ? "手写订单" : "Handwritten", icon: "✍️" },
    { id: "other", label: lang === "zh" ? "其他" : "Other", icon: "📝" },
  ];

  return (
    <section className="card-lux p-6">
      <h2 className="heading-serif mb-1 text-2xl">{lang === "zh" ? "记录新订单" : "Record a New Order"}</h2>
      <p className="mb-4 text-sm text-[color:var(--ink-soft)]">
        {lang === "zh"
          ? "上传聊天记录截图或手写单据照片，系统会尝试自动识别订单信息，你可以在保存前核对与修改。"
          : "Upload a chat screenshot or a photo of a handwritten note. We'll try to auto-extract the order details for you to review before saving."}
      </p>

      <div className="mb-1 flex flex-wrap gap-2">
        {channelOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => setChannel(option.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              channel === option.id
                ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                : "border-[color:var(--gold)]/30 bg-white/80 text-[color:var(--ink-soft)] hover:bg-white"
            }`}
          >
            <span aria-hidden="true">{option.icon}</span>
            {option.label}
          </button>
        ))}
      </div>
      {reviewing && rawText ? (
        <p className="mb-3 text-xs text-[color:var(--ink-soft)]">
          {lang === "zh" ? "来源已根据图片内容自动猜测，如不正确请点击上方按钮更改。" : "Channel was auto-guessed from the image — tap a button above to change it if it's wrong."}
        </p>
      ) : null}

      {!reviewing ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex-1">
            <span className="sr-only">{lang === "zh" ? "上传截图" : "Upload screenshot"}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={disabled || scanning}
              onChange={(event) => void handleFile(event.target.files?.[0] ?? null)}
              className="w-full rounded-xl border border-[color:var(--gold)]/30 bg-white/90 px-3 py-2 text-base leading-normal"
            />
          </label>
          <button
            type="button"
            disabled={disabled}
            onClick={() => startHandwrittenOrManual(channel)}
            className="shrink-0 rounded-xl border border-[color:var(--gold)]/40 bg-white/85 px-4 py-2 text-sm text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)]"
          >
            {lang === "zh" ? "手动输入订单" : "Enter order manually"}
          </button>
        </div>
      ) : null}

      {scanning ? (
        <div className="mt-4 rounded-xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]">
          {lang === "zh" ? `正在识别图片文字… ${scanProgress}%` : `Reading text from image… ${scanProgress}%`}
        </div>
      ) : null}

      {reviewing ? (
        <div className="mt-5 space-y-4">
          {imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageDataUrl} alt="" className="max-h-48 rounded-xl border border-[color:var(--gold)]/25 object-contain" />
          ) : null}

          {statusMessage ? (
            <div className="rounded-xl border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)] px-4 py-3 text-sm text-[color:var(--ink-soft)]" role="status" aria-live="polite">
              {statusMessage}
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">{lang === "zh" ? "客户姓名 *" : "Customer Name *"}
              <input
                ref={nameInputRef}
                value={draft.customerName}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, customerName: event.target.value }));
                  setFieldErrors((prev) => ({ ...prev, customerName: false }));
                }}
                className={`input-lux mt-1 ${fieldErrors.customerName ? "input-error" : ""}`}
                required
              />
            </label>
            <label className="text-sm">{lang === "zh" ? "联系电话" : "Phone"}
              <input value={draft.customerPhone} onChange={(event) => setDraft((prev) => ({ ...prev, customerPhone: event.target.value }))} className="input-lux mt-1" />
            </label>
            <label className="text-sm">{lang === "zh" ? "会员邮箱（选填，用于积分）" : "Member Email (optional, for points)"}
              <input
                type="email"
                value={draft.customerEmail}
                onChange={(event) => setDraft((prev) => ({ ...prev, customerEmail: event.target.value }))}
                className="input-lux mt-1"
                placeholder={lang === "zh" ? "customer@example.com" : "customer@example.com"}
              />
            </label>
            <label className="text-sm">{lang === "zh" ? "蛋糕名称 *" : "Cake Name *"}
              <input
                ref={cakeNameInputRef}
                value={draft.cakeName}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, cakeName: event.target.value }));
                  setFieldErrors((prev) => ({ ...prev, cakeName: false }));
                }}
                className={`input-lux mt-1 ${fieldErrors.cakeName ? "input-error" : ""}`}
                list="known-cake-names"
                required
              />
              <datalist id="known-cake-names">
                {knownCakeNames.map((name) => <option key={name} value={name} />)}
              </datalist>
            </label>
            <label className="text-sm">{lang === "zh" ? "尺寸" : "Size"}
              <input value={draft.size} onChange={(event) => setDraft((prev) => ({ ...prev, size: event.target.value }))} placeholder='6"' className="input-lux mt-1" />
            </label>
            <label className="text-sm">{lang === "zh" ? "价格 (S$)" : "Price (S$)"}
              <input type="number" min={0} step="0.01" value={draft.price} onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))} className="input-lux mt-1" />
            </label>
            <label className="text-sm">{lang === "zh" ? "数量" : "Quantity"}
              <input type="number" min={1} value={draft.quantity} onChange={(event) => setDraft((prev) => ({ ...prev, quantity: event.target.value }))} className="input-lux mt-1" />
            </label>
            <label className="text-sm">{lang === "zh" ? "取货/配送日期 *" : "Pickup/Delivery Date *"}
              <input
                ref={eventDateInputRef}
                type="date"
                value={draft.eventDate}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, eventDate: event.target.value }));
                  setFieldErrors((prev) => ({ ...prev, eventDate: false }));
                }}
                className={`input-lux mt-1 ${fieldErrors.eventDate ? "input-error" : ""}`}
                required
              />
            </label>
            <label className="text-sm">{lang === "zh" ? "取货方式" : "Fulfillment"}
              <select value={draft.fulfillment} onChange={(event) => setDraft((prev) => ({ ...prev, fulfillment: event.target.value }))} className="select-premium mt-1">
                <option value="">{lang === "zh" ? "未指定" : "Not specified"}</option>
                <option value="pickup">{lang === "zh" ? "自取" : "Pickup"}</option>
                <option value="delivery">{lang === "zh" ? "配送" : "Delivery"}</option>
              </select>
            </label>
            <label className="text-sm sm:col-span-2">{lang === "zh" ? "备注" : "Notes"}
              <textarea value={draft.notes} onChange={(event) => setDraft((prev) => ({ ...prev, notes: event.target.value }))} className="input-lux mt-1" rows={2} />
            </label>
          </div>

          {rawText ? (
            <details className="rounded-xl border border-[color:var(--gold)]/20 bg-white/70 px-4 py-2">
              <summary className="cursor-pointer text-xs uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                {lang === "zh" ? "查看原始识别文字" : "View raw extracted text"}
              </summary>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-[color:var(--ink-soft)]">{rawText}</pre>
            </details>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={submitting || disabled}
              onClick={() => void handleConfirm()}
              className="rounded-xl bg-[color:var(--primary)] px-5 py-2 text-white disabled:opacity-70 hover:bg-[color:var(--primary-hover)]"
            >
              {submitting ? (lang === "zh" ? "保存中…" : "Saving…") : (lang === "zh" ? "确认信息正确，保存订单" : "Confirm details are correct & save")}
            </button>
            <button type="button" onClick={resetAll} className="rounded-xl border border-[color:var(--gold)]/40 px-5 py-2">
              {lang === "zh" ? "取消" : "Cancel"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
