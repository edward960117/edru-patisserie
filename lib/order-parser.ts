// Best-effort heuristics to pre-fill an order form from OCR text (WhatsApp/WeChat
// screenshots or handwritten notes). Staff always reviews/edits the result before saving.

export interface ParsedOrderFields {
  customerName: string;
  customerPhone: string;
  cakeName: string;
  size: string;
  price: number | null;
  quantity: number;
  eventDate: string; // YYYY-MM-DD, or "" if not found
  fulfillment: string; // "pickup" | "delivery" | ""
  notes: string;
}

const MONTH_NAMES: Record<string, number> = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function guessYear(month: number, day: number, referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const candidate = new Date(year, month - 1, day);
  // If the date already passed by more than a month, assume next year.
  if (candidate.getTime() < referenceDate.getTime() - 31 * 24 * 60 * 60 * 1000) {
    return year + 1;
  }
  return year;
}

function findDate(text: string): string {
  // dd/mm/yyyy or dd-mm-yyyy (also accepts yyyy at 2 digits)
  const numeric = text.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})\b/);
  if (numeric) {
    const day = Number(numeric[1]);
    const month = Number(numeric[2]);
    let year = Number(numeric[3]);
    if (year < 100) year += 2000;
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
      return `${year}-${pad(month)}-${pad(day)}`;
    }
  }

  // "15 Aug" / "15 August 2026" / "Aug 15"
  const dayMonth = text.match(/\b(\d{1,2})\s+([A-Za-z]{3,9})\b(?:\s+(\d{4}))?/);
  if (dayMonth) {
    const month = MONTH_NAMES[dayMonth[2].toLowerCase()];
    const day = Number(dayMonth[1]);
    if (month && day >= 1 && day <= 31) {
      const year = dayMonth[3] ? Number(dayMonth[3]) : guessYear(month, day);
      return `${year}-${pad(month)}-${pad(day)}`;
    }
  }
  const monthDay = text.match(/\b([A-Za-z]{3,9})\s+(\d{1,2})\b(?:,?\s+(\d{4}))?/);
  if (monthDay) {
    const month = MONTH_NAMES[monthDay[1].toLowerCase()];
    const day = Number(monthDay[2]);
    if (month && day >= 1 && day <= 31) {
      const year = monthDay[3] ? Number(monthDay[3]) : guessYear(month, day);
      return `${year}-${pad(month)}-${pad(day)}`;
    }
  }

  // Chinese: 8月15日 / 8月15号
  const chineseDate = text.match(/(\d{1,2})\s*月\s*(\d{1,2})\s*[日号]/);
  if (chineseDate) {
    const month = Number(chineseDate[1]);
    const day = Number(chineseDate[2]);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return `${guessYear(month, day)}-${pad(month)}-${pad(day)}`;
    }
  }

  return "";
}

function findPhone(text: string): string {
  const match = text.match(/(?:\+?65[\s-]?)?\b[689]\d{3}[\s-]?\d{4}\b/);
  return match ? match[0].replace(/[\s-]/g, "") : "";
}

function findPrice(text: string): number | null {
  const match = text.match(/(?:S\$|SGD|RM|\$)\s?(\d{1,4}(?:\.\d{1,2})?)/i);
  if (match) {
    const value = Number.parseFloat(match[1]);
    return Number.isFinite(value) ? value : null;
  }
  return null;
}

function findSize(text: string): string {
  const match = text.match(/\b(6|8|10)\s*(?:"|inch|寸)/i);
  return match ? `${match[1]}"` : "";
}

function findQuantity(text: string): number {
  const match = text.match(/(?:x|数量[:：]?|qty[:：]?)\s*(\d{1,2})\b/i);
  const value = match ? Number.parseInt(match[1], 10) : 1;
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function findFulfillment(text: string): string {
  const lower = text.toLowerCase();
  if (/deliver|配送|送货/.test(lower)) return "delivery";
  if (/pick\s*-?up|自取|取货/.test(lower)) return "pickup";
  return "";
}

function findCustomerName(text: string): string {
  const labelMatch = text.match(/(?:name|姓名|客户)\s*[:：]\s*([^\n,，]{2,20})/i);
  return labelMatch ? labelMatch[1].trim() : "";
}

function findCakeName(text: string, knownCakeNames: string[]): string {
  const lower = text.toLowerCase();
  for (const name of knownCakeNames) {
    if (name && name.length >= 2 && lower.includes(name.toLowerCase())) {
      return name;
    }
  }
  return "";
}

export function parseOrderText(text: string, knownCakeNames: string[] = []): ParsedOrderFields {
  return {
    customerName: findCustomerName(text),
    customerPhone: findPhone(text),
    cakeName: findCakeName(text, knownCakeNames),
    size: findSize(text),
    price: findPrice(text),
    quantity: findQuantity(text),
    eventDate: findDate(text),
    fulfillment: findFulfillment(text),
    notes: text.trim().slice(0, 500),
  };
}

// Best-effort guess only — UI apps look too similar across devices/themes to detect reliably,
// so this just pre-selects a channel toggle that staff can still override.
export function guessChannel(text: string): "whatsapp" | "wechat" | "handwritten" | null {
  if (/whatsapp/i.test(text)) return "whatsapp";
  if (/wechat|微信|朋友圈/i.test(text)) return "wechat";

  const chatTimestamps = text.match(/\b\d{1,2}:\d{2}\s?(am|pm)?\b/gi) ?? [];
  const chineseChars = text.match(/[\u4e00-\u9fff]/g) ?? [];
  const letters = text.match(/[a-zA-Z\u4e00-\u9fff]/g) ?? [];

  if (letters.length < 15 || chatTimestamps.length === 0) {
    // Little recognizable structured text and no chat timestamps — likely a photographed
    // handwritten note rather than a messaging app screenshot.
    return "handwritten";
  }

  if (chineseChars.length / Math.max(letters.length, 1) > 0.3) {
    return "wechat";
  }

  if (chatTimestamps.length >= 2) {
    return "whatsapp";
  }

  return null;
}
