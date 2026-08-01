"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import WeChatQrButton from "@/components/WeChatQrButton";
import BankTransferButton from "@/components/BankTransferButton";
import { type Lang } from "@/lib/i18n-shared";
import { CANDLES } from "@/lib/candles";

interface AddOn {
  id: string;
  label: string;
  label_cn: string;
  price: number;
  isRequired?: boolean;
}

const ADD_ONS: AddOn[] = [
  { id: "candles", label: "Birthday Candles", label_cn: "生日蜡烛", price: 5 },
  { id: "utensils", label: "Cutlery Set (Spoons & Forks)", label_cn: "餐具套装（勺子和叉子）", price: 8 },
  { id: "napkins", label: "Premium Napkins", label_cn: "优质纸巾", price: 3 },
  { id: "nothing", label: "Do Not Need Anything", label_cn: "无需任何添加", price: 0, isRequired: true },
];


interface CheckoutOrderFormProps {
  cakeName: string;
  cakeSlug: string;
  sizeId: number;
  sizeSize: string;
  sizePrice: number;
  leadTimeDays: number;
  lang: Lang;
  whatsappNumber: string;
  baseMessage: string;
  copy: any;
  bankTransferEnabled: boolean;
  onlinePaymentEnabled: boolean;
  isLoggedIn: boolean;
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CheckoutOrderForm({
  cakeName,
  cakeSlug,
  sizeId,
  sizeSize,
  sizePrice,
  leadTimeDays,
  lang,
  whatsappNumber,
  baseMessage,
  copy,
  bankTransferEnabled,
  onlinePaymentEnabled,
  isLoggedIn,
}: CheckoutOrderFormProps) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + leadTimeDays);
  const minDateStr = formatDateInput(minDate);

  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set()); // Nothing ticked by default
  const [hasError, setHasError] = useState(false);
  const [fulfillmentMethod, setFulfillmentMethod] = useState<"pickup" | "delivery" | "">("");
  const [fulfillmentError, setFulfillmentError] = useState(false);
  const fulfillmentSectionRef = useRef<HTMLDivElement>(null);
  const [pickupDate, setPickupDate] = useState(""); // Empty by default so user must actively pick a date
  const [dateError, setDateError] = useState(false);
  const dateInputRef = useRef<HTMLButtonElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date(minDate.getFullYear(), minDate.getMonth(), 1));
  const calendarRef = useRef<HTMLDivElement>(null);
  const addOnsSectionRef = useRef<HTMLDivElement>(null);
  const [showCandleModal, setShowCandleModal] = useState(false);
  const [selectedCandleId, setSelectedCandleId] = useState<string | null>(null);
  const [pendingCandleId, setPendingCandleId] = useState<string | null>(null);
  const [paymentPending, setPaymentPending] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [guestConfirmed, setGuestConfirmed] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const candleModalRef = useRef<HTMLDialogElement>(null);
  const loginPromptRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!calendarOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  useEffect(() => {
    if (!showCandleModal) return;
    requestAnimationFrame(() => {
      const dialog = candleModalRef.current;
      if (!dialog) return;
      if (!dialog.open) {
        dialog.showModal();
      }
      dialog.focus({ preventScroll: true });
    });
    return () => {
      candleModalRef.current?.close();
    };
  }, [showCandleModal]);

  useEffect(() => {
    if (!showLoginPrompt) return;
    requestAnimationFrame(() => {
      const dialog = loginPromptRef.current;
      if (!dialog) return;
      if (!dialog.open) {
        dialog.showModal();
      }
      dialog.focus({ preventScroll: true });
    });
    return () => {
      loginPromptRef.current?.close();
    };
  }, [showLoginPrompt]);

  const weekdayLabels = lang === "zh" ? ["日", "一", "二", "三", "四", "五", "六"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarCells = useMemo(() => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: Array<{ dateStr: string; day: number } | null> = [];
    for (let i = 0; i < startWeekday; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({ dateStr: formatDateInput(new Date(year, month, day)), day });
    }
    return cells;
  }, [calendarViewDate]);

  const calendarMonthLabel = calendarViewDate.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    month: "long",
    year: "numeric",
  });

  function goToCalendarMonth(offset: number) {
    setCalendarViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  }

  const toggleAddOn = (id: string) => {
    setHasError(false); // Clear error when user interacts

    if (id === "candles") {
      if (selectedAddOns.has("candles")) {
        // Unchecking: remove the candle add-on and clear the selection
        const newSet = new Set(selectedAddOns);
        newSet.delete("candles");
        setSelectedAddOns(newSet);
        setSelectedCandleId(null);
      } else {
        // Ticking: open the picker, only add to the set once a candle is confirmed
        setPendingCandleId(selectedCandleId ?? CANDLES[0].id);
        setShowCandleModal(true);
      }
      return;
    }

    const newSet = new Set(selectedAddOns);
    
    // If toggling "nothing", clear other selections
    if (id === "nothing") {
      if (newSet.has("nothing")) {
        newSet.delete("nothing");
      } else {
        newSet.clear();
        newSet.add("nothing");
        setSelectedCandleId(null);
      }
    } else {
      // If selecting an add-on, remove "nothing"
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.delete("nothing");
        newSet.add(id);
      }
    }
    
    setSelectedAddOns(newSet);
  };

  const confirmCandleSelection = () => {
    if (!pendingCandleId) return;
    const newSet = new Set(selectedAddOns);
    newSet.delete("nothing");
    newSet.add("candles");
    setSelectedAddOns(newSet);
    setSelectedCandleId(pendingCandleId);
    setShowCandleModal(false);
  };

  const cancelCandleSelection = () => {
    setShowCandleModal(false);
  };

  // Validates the required fields, sets error states and scrolls to the first
  // missing field. Returns true when the order is complete and ready to submit.
  const validateOrderFields = (): boolean => {
    let hasIssue = false;
    let shouldFocusFulfillment = false;
    let shouldFocusDate = false;
    let shouldFocusAddOns = false;
    if (!fulfillmentMethod) {
      hasIssue = true;
      shouldFocusFulfillment = true;
      setFulfillmentError(true);
    }
    if (!pickupDate || pickupDate < minDateStr) {
      hasIssue = true;
      shouldFocusDate = true;
      setDateError(true);
    }
    if (selectedAddOns.size === 0) {
      hasIssue = true;
      shouldFocusAddOns = true;
      setHasError(true);
    }
    // Scroll to whichever required field is missing, in the order it appears on the page
    if (shouldFocusFulfillment) {
      fulfillmentSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (shouldFocusDate) {
      dateInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      dateInputRef.current?.focus();
      setCalendarOpen(true);
    } else if (shouldFocusAddOns) {
      addOnsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return !hasIssue;
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (!validateOrderFields()) {
      e.preventDefault();
    }
  };

  const handlePayOnline = async (bypassLoginPrompt = false) => {
    if (paymentPending) return;
    if (!validateOrderFields()) return;
    if (!isLoggedIn && !guestConfirmed && !bypassLoginPrompt) {
      setShowLoginPrompt(true);
      return;
    }
    setPaymentError("");
    setPaymentPending(true);
    try {
      const addOnIds = Array.from(selectedAddOns).filter((id) => id !== "nothing");
      const response = await fetch("/api/payment/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cakeSlug,
          sizeId,
          fulfillment: fulfillmentMethod,
          eventDate: pickupDate,
          addOnIds,
          candleId: selectedCandleId,
          lang,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.url) {
        setPaymentError(
          lang === "zh"
            ? "无法开始在线付款，请稍后再试或使用 WhatsApp 下单。"
            : "Could not start online payment. Please try again or order via WhatsApp."
        );
        setPaymentPending(false);
        return;
      }
      window.location.assign(result.url);
    } catch {
      setPaymentError(
        lang === "zh"
          ? "无法开始在线付款，请稍后再试或使用 WhatsApp 下单。"
          : "Could not start online payment. Please try again or order via WhatsApp."
      );
      setPaymentPending(false);
    }
  };

  const goToRegister = () => {
    const next = `${window.location.pathname}${window.location.search}`;
    window.location.assign(`/login/customer?next=${encodeURIComponent(next)}`);
  };

  const continueAsGuest = () => {
    setShowLoginPrompt(false);
    setGuestConfirmed(true);
    void handlePayOnline(true);
  };

  const selectedCandle = selectedCandleId ? CANDLES.find((candle) => candle.id === selectedCandleId) ?? null : null;
  const modalHost = typeof document !== "undefined" ? document.body : null;

  const pickupLabelText = lang === "zh" ? "到店自取" : "Store Pickup";
  const pickupHintText = lang === "zh" ? "取货费用：免费。" : "Pickup fee: Free.";
  const deliveryLabelText = lang === "zh" ? "配送上门" : "Delivery";
  const deliveryHintText =
    lang === "zh"
      ? "配送费用：S$15 至 S$25，视天气情况及配送服务公司而定。"
      : "Delivery fee: S$15 to S$25, depending on weather conditions and the delivery service company.";

  const selectedAddOnDetails = ADD_ONS.filter((addon) => selectedAddOns.has(addon.id) && addon.id !== "nothing" && addon.id !== "candles").map((addon) => ({
    label: addon.label,
    label_cn: addon.label_cn,
    price: addon.price,
  }));
  if (selectedAddOns.has("candles") && selectedCandle) {
    selectedAddOnDetails.unshift({
      label: selectedCandle.name_en,
      label_cn: selectedCandle.name_cn,
      price: selectedCandle.price,
    });
  }
  const addOnTotal = selectedAddOnDetails.reduce((sum, addon) => sum + addon.price, 0);
  const grandTotal = sizePrice + addOnTotal;

  const addOnsText =
    selectedAddOnDetails.length > 0
      ? lang === "zh"
        ? `\n\n添加项目:\n${selectedAddOnDetails.map((addon) => `- ${addon.label_cn}: S$${addon.price.toFixed(2)}`).join("\n")}`
        : `\n\nAdd-ons:\n${selectedAddOnDetails.map((addon) => `- ${addon.label}: S$${addon.price.toFixed(2)}`).join("\n")}`
      : "";

  const totalText =
    addOnTotal > 0
      ? lang === "zh"
        ? `\n蛋糕价格: S$${sizePrice.toFixed(2)}\n添加项目总计: S$${addOnTotal.toFixed(2)}\n总价: S$${grandTotal.toFixed(2)}`
        : `\nCake Price: S$${sizePrice.toFixed(2)}\nAdd-ons Total: S$${addOnTotal.toFixed(2)}\nGrand Total: S$${grandTotal.toFixed(2)}`
      : "";

  const dateText = pickupDate
    ? lang === "zh"
      ? `\n\n\u53d6\u8d27/\u914d\u9001\u65e5\u671f: ${pickupDate}`
      : `\n\nPickup/Delivery Date: ${pickupDate}`
    : "";

  const fulfillmentText = fulfillmentMethod
    ? lang === "zh"
      ? `\n取货方式: ${fulfillmentMethod === "pickup" ? "到店自取" : "配送上门"}`
      : `\nFulfillment: ${fulfillmentMethod === "pickup" ? "Store Pickup" : "Delivery"}`
    : "";

  const finalMessage = baseMessage + fulfillmentText + dateText + addOnsText + totalText;
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div>
      <div ref={fulfillmentSectionRef} className="mt-7 rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)]/55 p-5 sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)]">
          {lang === "zh" ? "取货方式（必选）" : "Fulfillment Method (Required)"}
        </h3>
        <p className="mt-2 text-xs text-[color:var(--ink-soft)]">
          {lang === "zh" ? "请选择到店自取或配送上门：" : "Please choose store pickup or delivery:"}
        </p>

        <div className="mt-4 space-y-3">
          <label className={`flex items-center gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
            fulfillmentMethod === "pickup" ? "border-[color:var(--primary)] bg-white/50" : "border-[color:var(--gold)]/15 hover:bg-white/40"
          }`}>
            <input
              type="radio"
              name="fulfillment-method"
              checked={fulfillmentMethod === "pickup"}
              onChange={() => {
                setFulfillmentMethod("pickup");
                setFulfillmentError(false);
              }}
              className="w-5 h-5 accent-[color:var(--primary)] cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-[color:var(--ink)]">{pickupLabelText}</span>
              <p className="text-xs text-[color:var(--ink-soft)]">{pickupHintText}</p>
            </div>
          </label>
          <label className={`flex items-center gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
            fulfillmentMethod === "delivery" ? "border-[color:var(--primary)] bg-white/50" : "border-[color:var(--gold)]/15 hover:bg-white/40"
          }`}>
            <input
              type="radio"
              name="fulfillment-method"
              checked={fulfillmentMethod === "delivery"}
              onChange={() => {
                setFulfillmentMethod("delivery");
                setFulfillmentError(false);
              }}
              className="w-5 h-5 accent-[color:var(--primary)] cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-[color:var(--ink)]">{deliveryLabelText}</span>
              <p className="text-xs text-[color:var(--ink-soft)]">{deliveryHintText}</p>
            </div>
          </label>
        </div>

        {fulfillmentError && (
          <p className="mt-3 text-sm font-medium text-[color:var(--accent-red)]">
            {lang === "zh" ? "请选择取货或配送方式。" : "Please choose a pickup or delivery option."}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)]/55 p-5 sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)]">
          {lang === "zh" ? "取货/配送日期" : "Pickup / Delivery Date"}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-[color:var(--ink-soft)] break-words">
          {lang === "zh" ? (
            <>
              此蛋糕需提前 {leadTimeDays} 天下单。
              <br />
              最早可选日期：{minDateStr}
            </>
          ) : (
            <>
              This cake requires {leadTimeDays} day{leadTimeDays > 1 ? "s" : ""} advance notice.
              <br />
              Earliest available date: {minDateStr}
            </>
          )}
        </p>
        <div ref={calendarRef} className="relative mt-3 w-full sm:w-72">
          <button
            ref={dateInputRef}
            type="button"
            onClick={() => setCalendarOpen((open) => !open)}
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            className={`flex w-full items-center justify-between rounded-lg border bg-white/90 px-3 py-2 text-base text-left text-[color:var(--ink)] ${
              dateError ? "border-[color:var(--accent-red)]" : "border-[color:var(--gold)]/30"
            }`}
          >
            <span className={pickupDate ? "" : "text-[color:var(--ink-faint)]"}>
              {pickupDate || (lang === "zh" ? "选择日期" : "Select a date")}
            </span>
            <span aria-hidden="true" className="text-[color:var(--ink-soft)]">📅</span>
          </button>

          {calendarOpen && (
            <div
              role="dialog"
              aria-label={lang === "zh" ? "选择取货/配送日期" : "Select pickup/delivery date"}
              className="absolute z-20 mt-2 w-full min-w-[280px] rounded-xl border border-[color:var(--gold)]/30 bg-white p-3 shadow-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => goToCalendarMonth(-1)}
                  className="rounded-lg border border-[color:var(--gold)]/30 px-3 py-1.5 text-sm hover:bg-[color:var(--bg-soft)]"
                  aria-label={lang === "zh" ? "上一个月" : "Previous month"}
                >
                  ‹
                </button>
                <p className="text-sm font-medium text-[color:var(--ink)]">{calendarMonthLabel}</p>
                <button
                  type="button"
                  onClick={() => goToCalendarMonth(1)}
                  className="rounded-lg border border-[color:var(--gold)]/30 px-3 py-1.5 text-sm hover:bg-[color:var(--bg-soft)]"
                  aria-label={lang === "zh" ? "下一个月" : "Next month"}
                >
                  ›
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-[color:var(--ink-soft)]">
                {weekdayLabels.map((label) => (
                  <div key={label} className="py-1">
                    {label}
                  </div>
                ))}
                {calendarCells.map((cell, index) => {
                  if (!cell) return <div key={`empty-${index}`} />;
                  const isUnavailable = cell.dateStr < minDateStr;
                  const isSelected = cell.dateStr === pickupDate;
                  return (
                    <button
                      key={cell.dateStr}
                      type="button"
                      disabled={isUnavailable}
                      aria-disabled={isUnavailable}
                      aria-current={isSelected ? "date" : undefined}
                      onClick={() => {
                        setPickupDate(cell.dateStr);
                        setDateError(false);
                        setCalendarOpen(false);
                      }}
                      className={`aspect-square rounded-lg text-sm transition-colors ${
                        isUnavailable
                          ? "cursor-not-allowed text-[color:var(--ink-faint)]/50 bg-[color:var(--bg-soft)]/60"
                          : isSelected
                            ? "bg-[color:var(--primary)] text-white"
                            : "bg-white text-[color:var(--ink)] hover:bg-[color:var(--bg-soft)]"
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-[color:var(--ink-soft)]">
                {lang === "zh" ? "灰色日期不可选择（提前期不足）。" : "Greyed-out dates are unavailable (inside the lead time)."}
              </p>
            </div>
          )}
        </div>
        {dateError && (
          <p className="mt-2 text-sm font-medium text-[color:var(--accent-red)]">
            {!pickupDate
              ? lang === "zh"
                ? "请选择取货/配送日期。"
                : "Please choose a pickup/delivery date."
              : lang === "zh"
                ? `请选择不早于 ${minDateStr} 的日期。`
                : `Please choose a date on or after ${minDateStr}.`}
          </p>
        )}
      </div>

      <div ref={addOnsSectionRef} className="mt-6 rounded-2xl border border-[color:var(--secondary)]/25 bg-[color:var(--secondary)]/5 p-5 sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)]">
          {lang === "zh" ? "添加项目（必选）" : "Add-ons (Required)"}
        </h3>
        <p className="mt-2 text-xs text-[color:var(--ink-soft)]">
          {lang === "zh" ? "请至少选择一个选项：" : "Please select at least one option:"}
        </p>

        <div className="mt-4 space-y-3">
          {ADD_ONS.map((addon) => (
            <label key={addon.id} className="flex items-center gap-3 cursor-pointer rounded-lg border border-[color:var(--gold)]/15 p-3 hover:bg-white/40 transition-colors">
              <input
                type="checkbox"
                checked={selectedAddOns.has(addon.id)}
                onChange={() => toggleAddOn(addon.id)}
                className="w-5 h-5 rounded border-[color:var(--primary)] accent-[color:var(--primary)] cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-[color:var(--ink)]">
                  {lang === "zh" ? addon.label_cn : addon.label}
                </span>
                {addon.id === "candles" && selectedAddOns.has("candles") && selectedCandle && (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-[color:var(--secondary)]">
                      {lang === "zh" ? selectedCandle.name_cn : selectedCandle.name_en}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPendingCandleId(selectedCandleId);
                        setShowCandleModal(true);
                      }}
                      className="text-xs font-semibold text-[color:var(--primary)] underline underline-offset-2"
                    >
                      {lang === "zh" ? "更改" : "Change"}
                    </button>
                  </div>
                )}
              </div>
              {addon.id === "candles"
                ? selectedAddOns.has("candles") && selectedCandle && (
                    <span className="text-sm font-semibold text-[color:var(--primary)]">S${selectedCandle.price.toFixed(2)}</span>
                  )
                : addon.price > 0 && <span className="text-sm font-semibold text-[color:var(--primary)]">S${addon.price.toFixed(2)}</span>}
            </label>
          ))}
        </div>

        {hasError && (
          <div className="mt-4 rounded-lg border border-[color:var(--accent-red)]/30 bg-[color:var(--accent-red)]/5 p-3">
            <p className="text-sm font-medium text-[color:var(--accent-red)]">
              {lang === "zh" ? "请至少选择一个选项" : "Please select at least one option"}
            </p>
          </div>
        )}

        <div className="mt-5 rounded-lg border border-[color:var(--primary)]/30 bg-[color:var(--primary)]/5 p-4">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "取货方式" : "Fulfillment"}</p>
              <p className="text-lg font-bold text-[color:var(--ink)]">
                {fulfillmentMethod ? (fulfillmentMethod === "pickup" ? pickupLabelText : deliveryLabelText) : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "取货/配送日期" : "Pickup/Delivery Date"}</p>
              <p className="text-lg font-bold text-[color:var(--ink)]">{pickupDate || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "蛋糕价格" : "Cake Price"}</p>
              <p className="text-lg font-bold text-[color:var(--ink)]">S${sizePrice.toFixed(2)}</p>
            </div>
            {addOnTotal > 0 && (
              <div>
                <p className="text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "添加项目" : "Add-ons"}</p>
                <p className="text-lg font-bold text-[color:var(--secondary)]">S${addOnTotal.toFixed(2)}</p>
              </div>
            )}
          </div>
          {addOnTotal > 0 && (
            <div className="mt-3 pt-3 border-t border-[color:var(--primary)]/20">
              <p className="text-xs text-[color:var(--ink-soft)]">{lang === "zh" ? "总计" : "Grand Total"}</p>
              <p className="text-2xl font-bold text-[color:var(--primary)]">S${grandTotal.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>

      {onlinePaymentEnabled && (
        <div className="mt-5 rounded-2xl border border-[color:var(--primary)]/25 bg-[color:var(--primary)]/6 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-[color:var(--ink)]">
                {lang === "zh" ? "在线支付" : "Online payment"}
              </p>
              <p className="mt-0.5 text-xs text-[color:var(--ink-soft)]">
                {lang === "zh"
                  ? "付款成功后，积分会自动累积到会员账户。"
                  : "Loyalty points are automatically added to your member account after payment."}
              </p>
            </div>
            <p className="text-xl font-bold text-[color:var(--primary)]">S${grandTotal.toFixed(2)}</p>
          </div>
          <span className="relative mt-3 block w-full">
            <button
              type="button"
              onClick={() => handlePayOnline()}
              disabled={paymentPending}
              className="btn-lux w-full whitespace-normal text-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentPending
                ? lang === "zh"
                  ? "正在跳转到安全支付…"
                  : "Redirecting to secure payment…"
                : lang === "zh"
                  ? `安全支付 S$${grandTotal.toFixed(2)}`
                  : `Pay S$${grandTotal.toFixed(2)} securely`}
            </button>
            <span className="absolute -top-2.5 -right-2 rounded-full bg-[color:var(--secondary)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
              {lang === "zh" ? "推荐" : "Recommended"}
            </span>
          </span>
          {paymentError && (
            <p className="mt-2 text-sm font-medium text-[color:var(--secondary)]">{paymentError}</p>
          )}
          <p className="mt-2 text-[0.7rem] leading-relaxed text-[color:var(--ink-soft)]/80">
            {lang === "zh"
              ? "您将跳转到安全支付页面完成付款，我们不会接触您的银行卡或网银信息。"
              : "You'll be redirected to a secure payment page. We never see your card or banking credentials."}
          </p>
        </div>
      )}

      <p className="mt-5 text-left text-sm leading-relaxed text-[color:var(--ink-soft)]">
        {copy.proceedOrderViaWhatsApp}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <span className="relative inline-block w-full sm:w-auto">
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-lux w-full sm:w-auto whitespace-normal text-center"
            onClick={handleOrderClick}
          >
            {copy.orderViaWhatsApp}
          </a>
          <span className="absolute -top-2.5 -right-2 rounded-full bg-[color:var(--secondary)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
            {lang === "zh" ? "推荐" : "Recommended"}
          </span>
        </span>
        <WeChatQrButton 
          lang={lang} 
          className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center" 
          orderDetails={finalMessage}
          onClick={handleOrderClick}
        />
        {bankTransferEnabled ? (
          <BankTransferButton
            lang={lang}
            className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center"
            onClick={handleOrderClick}
          />
        ) : null}
      </div>
      <p className="mt-2 text-left text-xs text-[color:var(--ink-soft)]/80">
        {lang === "zh"
          ? "推荐使用 WhatsApp 下单，回复更快。微信也依然可用。"
          : "We recommend ordering via WhatsApp for the fastest response. WeChat is also available."}
      </p>

      {showCandleModal
        ? (modalHost
            ? createPortal(
                <dialog
                  className="fixed inset-0 z-[9999] m-0 h-full w-full max-h-none max-w-none border-0 bg-black/40 p-4 backdrop:bg-black/40"
                  aria-label={lang === "zh" ? "选择蜡烛款式" : "Choose candle style"}
                  ref={candleModalRef}
                  onCancel={(event) => {
                    event.preventDefault();
                    cancelCandleSelection();
                  }}
                  onClick={(event) => {
                    if (event.target === event.currentTarget) {
                      cancelCandleSelection();
                    }
                  }}
                >
                  <div className="mx-auto flex min-h-full w-full max-w-lg items-center justify-center">
                    <div className="max-h-[85vh] w-full overflow-y-auto rounded-2xl bg-[color:var(--card)] p-5 sm:p-6 shadow-[0_20px_48px_rgba(20,86,128,0.25)]">
                    <h3 className="heading-serif text-xl text-[color:var(--ink)]">
                      {lang === "zh" ? "选择蜡烛款式" : "Choose Your Candle Style"}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
                      {lang === "zh" ? "请选择一款蜡烛，然后点击确认。" : "Pick a candle style, then confirm."}
                    </p>

                    <div className="mt-4 space-y-2.5">
                      {CANDLES.map((candle) => (
                        <label
                          key={candle.id}
                          className={`flex items-center gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
                            pendingCandleId === candle.id
                              ? "border-[color:var(--primary)] bg-[color:var(--primary)]/5"
                              : "border-[color:var(--gold)]/20 hover:bg-white/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="candle-style"
                            checked={pendingCandleId === candle.id}
                            onChange={() => setPendingCandleId(candle.id)}
                            className="h-5 w-5 accent-[color:var(--primary)] cursor-pointer"
                          />
                          <img src={candle.image_path} alt={lang === "zh" ? candle.name_cn : candle.name_en} className="h-10 w-10 object-contain" />
                          <span className="flex-1 text-sm font-medium text-[color:var(--ink)]">
                            {lang === "zh" ? candle.name_cn : candle.name_en}
                          </span>
                          <span className="text-sm font-semibold text-[color:var(--primary)]">S${candle.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={cancelCandleSelection}
                        className="btn-lux-outline"
                      >
                        {lang === "zh" ? "取消" : "Cancel"}
                      </button>
                      <button
                        type="button"
                        onClick={confirmCandleSelection}
                        disabled={!pendingCandleId}
                        className="btn-lux disabled:opacity-60"
                      >
                        {lang === "zh" ? "确认" : "Confirm"}
                      </button>
                    </div>
                    </div>
                  </div>
                </dialog>,
                modalHost
              )
            : null)
        : null}

      {showLoginPrompt
        ? (modalHost
            ? createPortal(
                <dialog
                  className="fixed inset-0 z-[9999] m-0 h-full w-full max-h-none max-w-none border-0 bg-black/40 p-4 backdrop:bg-black/40"
                  aria-label={lang === "zh" ? "登录以赚取积分" : "Sign in to earn points"}
                  ref={loginPromptRef}
                  onCancel={(event) => {
                    event.preventDefault();
                  }}
                  onClick={(event) => {
                    if (event.target === event.currentTarget) {
                      continueAsGuest();
                    }
                  }}
                >
                  <div className="mx-auto flex min-h-full w-full max-w-md items-center justify-center">
                    <div className="w-full rounded-2xl bg-[color:var(--card)] p-5 sm:p-6 shadow-[0_20px_48px_rgba(20,86,128,0.25)]">
                    <h3 className="heading-serif text-xl text-[color:var(--ink)]">
                      {lang === "zh" ? "登录会员账号赚积分？" : "Sign in to earn points?"}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                      {lang === "zh"
                        ? "您还没有登录会员账户。登录或注册后，付款完成即可自动累积积分；也可以选择不登录直接继续付款。"
                        : "You're not signed in yet. Sign in or register to automatically earn points once payment completes, or continue without an account."}
                    </p>
                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
                      <button type="button" onClick={continueAsGuest} className="btn-lux-outline">
                        {lang === "zh" ? "不登录，继续付款" : "Continue without signing in"}
                      </button>
                      <button type="button" onClick={goToRegister} className="btn-lux">
                        {lang === "zh" ? "登录 / 注册赚积分" : "Sign in / Register to earn points"}
                      </button>
                    </div>
                    </div>
                  </div>
                </dialog>,
                modalHost
              )
            : null)
        : null}
    </div>
  );
}
