"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

interface Candle {
  id: string;
  name_en: string;
  name_cn: string;
  description_en: string;
  description_cn: string;
  price: number;
  color?: string;
}

const CANDLES: Candle[] = [
  {
    id: "slim-taper",
    name_en: "Classic Slim Taper Candles",
    name_cn: "经典细长蜡烛",
    description_en: "Elegant and timeless slim tapered candles for refined celebrations",
    description_cn: "优雅经典的细长蜡烛，为精致庆典增添韵味",
    price: 8,
    color: "#FFD700",
  },
  {
    id: "spiral-twist",
    name_en: "Spiral Twist Candles",
    name_cn: "螺旋纹蜡烛",
    description_en: "Modern spiral-designed candles with mesmerizing twisted patterns",
    description_cn: "现代螺旋纹设计，充满视觉吸引力的缠绕图案",
    price: 10,
    color: "#FF6B9D",
  },
  {
    id: "mini-birthday",
    name_en: "Mini Birthday Candles Pack",
    name_cn: "迷你生日蜡烛套装",
    description_en: "Colorful small candles perfect for cake decoration, 12-pack",
    description_cn: "五彩缤纷的迷你蜡烛，完美装饰蛋糕，12支装",
    price: 6,
    color: "#FF6B6B",
  },
  {
    id: "number-candles",
    name_en: "Number Birthday Candles",
    name_cn: "数字生日蜡烛",
    description_en: "Elegant number-shaped candles for milestone birthdays (0-9 available)",
    description_cn: "优雅的数字蜡烛，庆祝周年和里程碑时刻",
    price: 12,
    color: "#FFE66D",
  },
  {
    id: "pearl-cluster",
    name_en: "Pearl Cluster Candles",
    name_cn: "珍珠球形蜡烛簇",
    description_en: "Sophisticated pearl-shaped candle clusters for luxurious presentation",
    description_cn: "精致珍珠球蜡烛簇，彰显高端奢华感",
    price: 15,
    color: "#E2B4D9",
  },
  {
    id: "glitter-candles",
    name_en: "Glitter Sparkle Candles",
    name_cn: "闪粉亮片蜡烛",
    description_en: "Dazzling glitter-coated candles that catch the light beautifully",
    description_cn: "闪闪发光的闪粉蜡烛，光彩璀璨",
    price: 11,
    color: "#87CEEB",
  },
];

export default function CakeAccessoriesPage() {
  const [lang, setLang] = useState<"en" | "zh">("en");

  useEffect(() => {
    // Get initial language from URL or localStorage
    const getInitialLang = () => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get("lang") as "en" | "zh" | null;
        const stored = localStorage.getItem("lang") as "en" | "zh" | null;
        return urlLang || stored || "en";
      }
      return "en";
    };

    const initialLang = getInitialLang();
    setLang(initialLang);

    // Listen for storage changes (from other tabs or when localStorage is updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lang") {
        const newLang = e.newValue as "en" | "zh" | null;
        if (newLang === "en" || newLang === "zh") {
          setLang(newLang);
        }
      }
    };

    // Poll localStorage for changes (handles same-tab updates)
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("lang") as "en" | "zh" | null;
        if (stored === "en" || stored === "zh") {
          setLang(stored);
        }
      }
    }, 100);

    window.addEventListener("storage", handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const copy = {
    cakeAccessories: lang === "zh" ? "蛋糕配件" : "Cake Accessories",
    candleCollection: lang === "zh" ? "蜡烛系列" : "Candle Collection",
    selectCandles: lang === "zh" ? "选择您喜爱的蜡烛来装饰蛋糕" : "Select your favorite candles to decorate your cake",
    addToOrder: lang === "zh" ? "在下单时添加" : "Add when ordering",
    pricePrefix: lang === "zh" ? "S$" : "S$",
    back: lang === "zh" ? "返回" : "Back",
  };

  return (
    <section>
      {/* Header Card */}
      <div className="card-lux atelier-frame px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex items-start justify-between gap-3">
          <p className="text-2xl">🕯️</p>
          <BackButton lang={lang} fallbackHref="/" className="whitespace-nowrap" />
        </div>
        <h1 className="heading-serif text-[1.9rem] sm:text-5xl leading-tight">
          {copy.cakeAccessories}
        </h1>
        <p className="text-[color:var(--ink-soft)] mt-2 text-base sm:text-lg">
          {copy.candleCollection}
        </p>
        <p className="text-[0.9rem] text-[color:var(--ink-faint)] mt-4">
          {copy.selectCandles}
        </p>
      </div>

      {/* Candles Grid */}
      <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CANDLES.map((candle) => (
          <div
            key={candle.id}
            className="group card-lux flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(23,61,115,0.14)] active:scale-[0.995] transition-all duration-300"
          >
            {/* Image Container - SVG Candle Graphic */}
            <div 
              className="relative h-44 sm:h-52 w-full overflow-hidden flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${candle.color}20, ${candle.color}05)`
              }}
            >
              <svg
                viewBox="0 0 100 150"
                className="w-24 h-32 opacity-80"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }}
              >
                {/* Candle Wax */}
                <rect x="20" y="40" width="60" height="80" rx="4" fill={candle.color} />
                
                {/* Candle Wick */}
                <line x1="50" y1="35" x2="50" y2="45" stroke="#333" strokeWidth="2" strokeLinecap="round" />
                
                {/* Flame */}
                <ellipse cx="50" cy="30" rx="5" ry="8" fill="#FFA500" opacity="0.8" />
                <path d="M 50 25 Q 47 20 48 15 Q 50 22 52 15 Q 53 20 50 25" fill="#FFD700" opacity="0.9" />
              </svg>
              
              {/* Price Badge */}
              <div className="absolute top-3 right-3 bg-[color:var(--primary)] text-white rounded-full px-3 py-1 text-sm font-bold shadow-lg">
                {copy.pricePrefix}{candle.price.toFixed(2)}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h2 className="heading-serif text-[1.3rem] sm:text-xl leading-tight text-[color:var(--ink)]">
                {lang === "zh" ? candle.name_cn : candle.name_en}
              </h2>
              <p className="mt-2 text-[0.92rem] text-[color:var(--ink-faint)] line-clamp-3">
                {lang === "zh" ? candle.description_cn : candle.description_en}
              </p>

              {/* Footer */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-[0.75rem] uppercase tracking-[0.15em] text-[color:var(--primary)] font-semibold">
                  {copy.addToOrder}
                </span>
                <div 
                  className="w-6 h-6 rounded-full border-2 border-[color:var(--primary)]/30 shadow-sm"
                  style={{ backgroundColor: candle.color || "#588cd9" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className="mt-12 card-lux bg-gradient-to-br from-[color:var(--secondary)]/5 to-[color:var(--primary)]/5 rounded-2xl p-6 sm:p-8 border border-[color:var(--primary)]/20">
        <h3 className="text-lg font-semibold text-[color:var(--ink)] mb-3">
          {lang === "zh" ? "💡 提示" : "💡 Tips"}
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-[color:var(--ink-soft)]">
          {lang === "zh"
            ? "这些精美蜡烛可以在下单时作为添加项目选择。联系我们的团队，我们可以为您的蛋糕定制任何风格的蜡烛。"
            : "These beautiful candles can be selected as add-ons when placing your order. Contact our team and we can customize any style of candles for your cake."}
        </p>
      </div>
    </section>
  );
}
