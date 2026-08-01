type OrderNotificationInput = {
  lang: "zh" | "en";
  orderId: number;
  cakeName: string;
  size: string;
  amountPaid: number;
  fulfillment: string;
  eventDate: Date;
  customerEmail: string | null;
  customerPhone: string;
  notes: string;
};

type NotificationResult = {
  sent: boolean;
  skipped: boolean;
};

function formatDate(date: Date, lang: "zh" | "en") {
  return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-SG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function buildMessage(order: OrderNotificationInput) {
  const dateText = formatDate(order.eventDate, order.lang);

  if (order.lang === "zh") {
    return [
      "【新订单】",
      `订单号：#${order.orderId}`,
      `蛋糕：${order.cakeName}`,
      `尺寸：${order.size}`,
      `金额：S$${order.amountPaid.toFixed(2)}`,
      `取货方式：${order.fulfillment}`,
      `日期：${dateText}`,
      order.customerEmail ? `会员邮箱：${order.customerEmail}` : null,
      order.customerPhone ? `电话：${order.customerPhone}` : null,
      order.notes ? `备注：${order.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "[New Order]",
    `Order ID: #${order.orderId}`,
    `Cake: ${order.cakeName}`,
    `Size: ${order.size}`,
    `Amount: S$${order.amountPaid.toFixed(2)}`,
    `Fulfillment: ${order.fulfillment}`,
    `Date: ${dateText}`,
    order.customerEmail ? `Member email: ${order.customerEmail}` : null,
    order.customerPhone ? `Phone: ${order.customerPhone}` : null,
    order.notes ? `Notes: ${order.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function getConfig() {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID?.trim() || "",
    authToken: process.env.TWILIO_AUTH_TOKEN?.trim() || "",
    from: process.env.TWILIO_WHATSAPP_FROM?.trim() || "",
    to: process.env.TWILIO_WHATSAPP_TO?.trim() || "",
  };
}

export async function sendStaffWhatsAppNotification(order: OrderNotificationInput): Promise<NotificationResult> {
  const config = getConfig();
  if (!config.accountSid || !config.authToken || !config.from || !config.to) {
    return { sent: false, skipped: true };
  }

  const body = new URLSearchParams({
    From: config.from.startsWith("whatsapp:") ? config.from : `whatsapp:${config.from}`,
    To: config.to.startsWith("whatsapp:") ? config.to : `whatsapp:${config.to}`,
    Body: buildMessage(order),
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.accountSid}:${config.authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Failed to send WhatsApp notification: ${response.status} ${errorText}`);
  }

  return { sent: true, skipped: false };
}