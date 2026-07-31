"use client";

import { useMemo, useState } from "react";

export interface OrderRecord {
  id: number;
  customer_name: string;
  customer_phone: string;
  cake_name: string;
  size: string;
  price: number;
  quantity: number;
  fulfillment: string;
  event_date: string; // ISO
  channel: "whatsapp" | "wechat" | "handwritten" | "other";
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes: string;
}

interface Props {
  lang: "zh" | "en";
  orders: OrderRecord[];
  disabled?: boolean;
  onUpdateStatus: (id: number, status: OrderRecord["status"]) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const CHANNEL_ICON: Record<string, string> = {
  whatsapp: "💬",
  wechat: "🟢",
  handwritten: "✍️",
  other: "📝",
};

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isoToDateKey(iso: string) {
  return iso.slice(0, 10);
}

export default function OrderCalendar({ lang, orders, disabled = false, onUpdateStatus, onDelete }: Props) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-based
  const [selectedDateKey, setSelectedDateKey] = useState<string>(toDateKey(today));

  const ordersByDate = useMemo(() => {
    const map = new Map<string, OrderRecord[]>();
    for (const order of orders) {
      const key = isoToDateKey(order.event_date);
      const list = map.get(key) ?? [];
      list.push(order);
      map.set(key, list);
    }
    return map;
  }, [orders]);

  const upcoming = useMemo(() => {
    const todayKey = toDateKey(today);
    return orders
      .filter((order) => isoToDateKey(order.event_date) >= todayKey && order.status !== "completed" && order.status !== "cancelled")
      .sort((a, b) => a.event_date.localeCompare(b.event_date))
      .slice(0, 5);
  }, [orders, today]);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: Array<{ key: string; day: number } | null> = [];
  for (let i = 0; i < startWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ key: `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`, day });
  }

  function goToMonth(offset: number) {
    const next = new Date(viewYear, viewMonth + offset, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  const weekdayLabels = lang === "zh"
    ? ["日", "一", "二", "三", "四", "五", "六"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedOrders = ordersByDate.get(selectedDateKey) ?? [];
  const todayKey = toDateKey(today);

  const statusStyles: Record<OrderRecord["status"], string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusLabels: Record<OrderRecord["status"], string> = {
    pending: lang === "zh" ? "待确认" : "Pending",
    confirmed: lang === "zh" ? "已确认" : "Confirmed",
    completed: lang === "zh" ? "已完成" : "Completed",
    cancelled: lang === "zh" ? "已取消" : "Cancelled",
  };

  return (
    <section className="card-lux p-6">
      <h2 className="heading-serif mb-4 text-2xl">{lang === "zh" ? "订单日历" : "Order Calendar"}</h2>

      {upcoming.length > 0 ? (
        <div className="mb-5 rounded-xl border border-[color:var(--gold)]/25 bg-[color:var(--bg-soft)] p-4">
          <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
            {lang === "zh" ? "即将到期的订单" : "Upcoming orders"}
          </p>
          <div className="flex flex-wrap gap-2">
            {upcoming.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedDateKey(isoToDateKey(order.event_date))}
                className={`rounded-full px-3 py-1 text-xs ${isoToDateKey(order.event_date) === todayKey ? "bg-red-600 text-white" : "bg-white text-[color:var(--ink-soft)] border border-[color:var(--gold)]/30"}`}
              >
                {isoToDateKey(order.event_date)} · {order.cake_name || (lang === "zh" ? "未命名" : "Unnamed")}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => goToMonth(-1)} className="rounded-lg border border-[color:var(--gold)]/30 px-3 py-1.5 text-sm hover:bg-white/60">‹</button>
        <p className="font-medium">{monthLabel}</p>
        <button type="button" onClick={() => goToMonth(1)} className="rounded-lg border border-[color:var(--gold)]/30 px-3 py-1.5 text-sm hover:bg-white/60">›</button>
      </div>

      <div className="mb-2 flex items-center gap-1.5 text-[0.7rem] text-[color:var(--ink-soft)]">
        <span className="h-2.5 w-2.5 rounded-sm bg-amber-200 border border-amber-400" />
        {lang === "zh" ? "该日期已有订单" : "Has order(s)"}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[color:var(--ink-soft)]">
        {weekdayLabels.map((label) => <div key={label} className="py-1">{label}</div>)}
        {cells.map((cell, index) => {
          if (!cell) return <div key={`empty-${index}`} />;
          const dayOrders = ordersByDate.get(cell.key) ?? [];
          const hasOrders = dayOrders.length > 0;
          const isToday = cell.key === todayKey;
          const isSelected = cell.key === selectedDateKey;
          return (
            <button
              key={cell.key}
              type="button"
              onClick={() => setSelectedDateKey(cell.key)}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border text-sm transition-colors ${
                isSelected
                  ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                  : hasOrders
                  ? "border-amber-400 bg-amber-100 hover:bg-amber-200"
                  : isToday
                  ? "border-[color:var(--primary)]/60 bg-white"
                  : "border-transparent bg-white/60 hover:bg-white"
              }`}
            >
              {cell.day}
              {hasOrders ? (
                <span className={`mt-0.5 rounded-full px-1.5 text-[0.62rem] ${isSelected ? "bg-white/25" : "bg-amber-500/90 text-white"}`}>
                  {dayOrders.length}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium">
          {selectedDateKey} {selectedDateKey === todayKey ? `· ${lang === "zh" ? "今天" : "Today"}` : ""}
        </p>
        {selectedOrders.length === 0 ? (
          <p className="rounded-xl border border-[color:var(--gold)]/20 bg-white/70 px-4 py-3 text-sm text-[color:var(--ink-soft)]">
            {lang === "zh" ? "这一天没有订单。" : "No orders on this day."}
          </p>
        ) : (
          <div className="space-y-3">
            {selectedOrders.map((order) => (
              <article key={order.id} className="rounded-xl border border-[color:var(--gold)]/20 bg-white/80 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">
                      <span aria-hidden="true">{CHANNEL_ICON[order.channel]}</span> {order.cake_name || (lang === "zh" ? "未命名蛋糕" : "Unnamed cake")}
                      {order.size ? ` · ${order.size}` : ""}
                    </p>
                    <p className="text-sm text-[color:var(--ink-soft)]">
                      {order.customer_name} {order.customer_phone ? `· ${order.customer_phone}` : ""}
                    </p>
                    <p className="text-xs text-[color:var(--ink-soft)]">
                      {order.quantity > 1 ? `x${order.quantity} · ` : ""}
                      {order.price ? `S$${order.price.toFixed(2)}` : ""}
                      {order.fulfillment ? ` · ${order.fulfillment === "pickup" ? (lang === "zh" ? "自取" : "Pickup") : (lang === "zh" ? "配送" : "Delivery")}` : ""}
                    </p>
                    {order.notes ? <p className="mt-1 text-xs text-[color:var(--ink-soft)]">{order.notes}</p> : null}
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}>
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["pending", "confirmed", "completed", "cancelled"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      disabled={disabled || order.status === status}
                      onClick={() => void onUpdateStatus(order.id, status)}
                      className="rounded-lg border border-[color:var(--gold)]/30 px-2.5 py-1 text-xs text-[color:var(--ink-soft)] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {statusLabels[status]}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => void onDelete(order.id)}
                    className="rounded-lg bg-red-700 px-2.5 py-1 text-xs text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {lang === "zh" ? "删除" : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
