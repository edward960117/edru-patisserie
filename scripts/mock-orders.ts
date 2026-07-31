import "dotenv/config";
import { prisma } from "../lib/prisma";

const MOCK_MARKER = "[MOCK]";

async function ensureOrderTable() {
  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "OrderChannel" AS ENUM ('whatsapp', 'wechat', 'handwritten', 'other');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    DO $$ BEGIN
      CREATE TYPE "OrderStatus" AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Order" (
      "id" SERIAL PRIMARY KEY,
      "customer_name" TEXT NOT NULL DEFAULT '',
      "customer_phone" TEXT NOT NULL DEFAULT '',
      "cake_name" TEXT NOT NULL DEFAULT '',
      "size" TEXT NOT NULL DEFAULT '',
      "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "quantity" INTEGER NOT NULL DEFAULT 1,
      "fulfillment" TEXT NOT NULL DEFAULT '',
      "event_date" TIMESTAMPTZ NOT NULL,
      "channel" "OrderChannel" NOT NULL DEFAULT 'other',
      "status" "OrderStatus" NOT NULL DEFAULT 'pending',
      "notes" TEXT NOT NULL DEFAULT '',
      "source_image_url" TEXT NOT NULL DEFAULT '',
      "raw_extracted_text" TEXT NOT NULL DEFAULT '',
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function main() {
  await ensureOrderTable();

  // Clear previously seeded mock orders so this script can be re-run safely.
  await prisma.order.deleteMany({ where: { notes: { contains: MOCK_MARKER } } });

  const mockOrders = [
    {
      customer_name: "Tan Mei Ling",
      customer_phone: "91234567",
      cake_name: "Lemon Cheesecake Flower",
      size: '8"',
      price: 92,
      quantity: 1,
      fulfillment: "delivery",
      event_date: new Date("2026-08-03T14:00:00+08:00"),
      channel: "whatsapp" as const,
      status: "confirmed" as const,
      notes: `${MOCK_MARKER} Birthday cake, please write "Happy Birthday Mei Ling" on top.`,
    },
    {
      customer_name: "Wong Jia Hui",
      customer_phone: "98765432",
      cake_name: "Chocolate Truffle Delight",
      size: '6"',
      price: 68,
      quantity: 2,
      fulfillment: "pickup",
      event_date: new Date("2026-08-08T11:30:00+08:00"),
      channel: "wechat" as const,
      status: "pending" as const,
      notes: `${MOCK_MARKER} 客户要求少甜，微信下单。`,
    },
    {
      customer_name: "Nur Aisyah",
      customer_phone: "96543210",
      cake_name: "Custom Cake",
      size: '10"',
      price: 128,
      quantity: 1,
      fulfillment: "delivery",
      event_date: new Date("2026-08-15T10:00:00+08:00"),
      channel: "handwritten" as const,
      status: "pending" as const,
      notes: `${MOCK_MARKER} Handwritten note left at counter, engagement party theme, gold accents.`,
    },
    {
      customer_name: "Rachel Lim",
      customer_phone: "93334444",
      cake_name: "Strawberry Shortcake",
      size: '8"',
      price: 88,
      quantity: 1,
      fulfillment: "pickup",
      event_date: new Date("2026-08-21T16:00:00+08:00"),
      channel: "whatsapp" as const,
      status: "confirmed" as const,
      notes: `${MOCK_MARKER} Anniversary order, requested extra strawberries on top.`,
    },
    {
      customer_name: "Chen Wei",
      customer_phone: "90001111",
      cake_name: "Blue Ocean Mousse",
      size: '8"',
      price: 98,
      quantity: 1,
      fulfillment: "delivery",
      event_date: new Date("2026-08-28T13:00:00+08:00"),
      channel: "other" as const,
      status: "completed" as const,
      notes: `${MOCK_MARKER} Corporate order, already delivered and paid.`,
    },
  ];

  for (const order of mockOrders) {
    await prisma.order.create({ data: order });
  }

  console.log(`Seeded ${mockOrders.length} mock orders for August 2026.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
