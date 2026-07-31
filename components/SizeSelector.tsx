"use client";

import Link from "next/link";
import { useState } from "react";
import { type Lang } from "@/lib/i18n-shared";

interface SizeOption {
  id: number;
  size: string;
  price: number;
}

interface Props {
  lang: Lang;
  cakeSlug: string;
  sizes: SizeOption[];
  checkoutLabel: string;
}

export default function SizeSelector({ lang, cakeSlug, sizes, checkoutLabel }: Props) {
  const [selectedId, setSelectedId] = useState(sizes[0]?.id ?? null);
  const selected = sizes.find((size) => size.id === selectedId) ?? sizes[0] ?? null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            type="button"
            onClick={() => setSelectedId(size.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selectedId === size.id
                ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                : "border-[color:var(--gold)]/30 bg-[color:var(--surface)]/92 text-[color:var(--ink)] hover:bg-white"
            }`}
          >
            {size.size}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3">
          <span className="price-callout text-lg text-[color:var(--gold-deep)] font-semibold">S${selected.price.toFixed(2)}</span>
          <Link href={`/checkout?cake=${cakeSlug}&size=${selected.id}`} className="btn-lux text-xs w-full sm:w-auto">
            {checkoutLabel}
          </Link>
        </div>
      ) : (
        <p className="mt-3 text-sm text-[color:var(--ink-faint)]">
          {lang === "zh" ? "暂无可售尺寸。" : "No sizes available right now."}
        </p>
      )}
    </div>
  );
}
