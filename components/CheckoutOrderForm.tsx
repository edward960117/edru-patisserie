"use client";

import { useState } from "react";
import WeChatQrButton from "@/components/WeChatQrButton";
import { type Lang } from "@/lib/i18n-shared";

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
  lang: Lang;
  whatsappNumber: string;
  baseMessage: string;
  copy: any;
}

export default function CheckoutOrderForm({
  cakeName,
  cakeSlug,
  sizeId,
  sizeSize,
  sizePrice,
  lang,
  whatsappNumber,
  baseMessage,
  copy,
}: CheckoutOrderFormProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set(["nothing"])); // Default: "Do not need anything"
  const [error, setError] = useState<string>("");

  const toggleAddOn = (id: string) => {
    setError(""); // Clear error when user interacts
    const newSet = new Set(selectedAddOns);
    
    // If toggling "nothing", clear other selections
    if (id === "nothing") {
      if (newSet.has("nothing")) {
        newSet.delete("nothing");
      } else {
        newSet.clear();
        newSet.add("nothing");
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
    
    // Ensure at least one option is selected
    if (newSet.size === 0) {
      newSet.add("nothing");
    }
    
    setSelectedAddOns(newSet);
  };

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (selectedAddOns.size === 0) {
      e.preventDefault();
      setError(lang === "zh" ? "请至少选择一个选项" : "Please select at least one option");
    }
  };

  const selectedAddOnDetails = ADD_ONS.filter((addon) => selectedAddOns.has(addon.id) && addon.id !== "nothing");
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

  const finalMessage = baseMessage + addOnsText + totalText;
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div>
      <div className="mt-7 rounded-2xl border border-[color:var(--secondary)]/25 bg-[color:var(--secondary)]/5 p-5 sm:p-6">
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
              </div>
              {addon.price > 0 && <span className="text-sm font-semibold text-[color:var(--primary)]">S${addon.price.toFixed(2)}</span>}
            </label>
          ))}
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-[color:var(--accent-red)]/30 bg-[color:var(--accent-red)]/5 p-3">
            <p className="text-sm font-medium text-[color:var(--accent-red)]">{error}</p>
          </div>
        )}

        <div className="mt-5 rounded-lg border border-[color:var(--primary)]/30 bg-[color:var(--primary)]/5 p-4">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
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

      <p className="mt-5 text-left text-sm leading-relaxed text-[color:var(--ink-soft)]">
        {copy.proceedOrderViaWhatsApp}
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noreferrer" 
          className="btn-lux w-full sm:w-auto whitespace-normal text-center"
          onClick={handleOrderClick}
        >
          {copy.orderViaWhatsApp}
        </a>
        <WeChatQrButton 
          lang={lang} 
          className="btn-lux-outline w-full sm:w-auto whitespace-normal text-center" 
          orderDetails={finalMessage}
          onClick={handleOrderClick}
        />
      </div>
    </div>
  );
}
