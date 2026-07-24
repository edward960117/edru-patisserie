import { useState } from "react";

/**
 * Pickup date scheduler — recreates the reference site's "Schedule your
 * in-store pickup" control that sits above the product grid, letting
 * shoppers pick a collection date before browsing items.
 */
export default function PickupScheduler() {
  const today = new Date();
  const defaultDate = new Date(today);
  defaultDate.setDate(today.getDate() + 2);

  const [date, setDate] = useState(defaultDate.toISOString().split("T")[0]);
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="bg-cream-dark border border-gold-light/60 rounded-lg px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 max-w-xl mx-auto mb-12">
      <label htmlFor="pickup-date" className="text-sm font-medium whitespace-nowrap">
        I will collect my order on
      </label>
      <input
        id="pickup-date"
        type="date"
        min={minDate}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="flex-1 bg-cream border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
      />
    </div>
  );
}
