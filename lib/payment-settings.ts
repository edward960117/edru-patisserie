import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface PaymentSettings {
  bankTransferEnabled: boolean;
}

const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  bankTransferEnabled: true,
};
const SETTING_KEY = "payment_settings";
const PAYMENT_SETTINGS_CACHE_TTL_MS = 60_000;

type PrismaLike = {
  $executeRawUnsafe: (query: string, ...values: unknown[]) => Promise<unknown>;
  $queryRawUnsafe: <T = unknown>(query: string, ...values: unknown[]) => Promise<T>;
};

let ensureTablePromise: Promise<void> | null = null;
let paymentSettingsCache: { value: PaymentSettings; expiresAt: number } | null = null;
let prismaClientPromise: Promise<PrismaLike | null> | null = null;

type DbPaymentSettingsRow = {
  value_json: unknown;
};

function getPaymentSettingsPath() {
  return path.join(process.cwd(), "data", "payment-settings.json");
}

function normalizePaymentSettings(parsed: Partial<PaymentSettings> | null | undefined): PaymentSettings {
  return {
    bankTransferEnabled: parsed?.bankTransferEnabled === undefined ? DEFAULT_PAYMENT_SETTINGS.bankTransferEnabled : Boolean(parsed.bankTransferEnabled),
  };
}

async function ensureSettingsTable() {
  const prisma = await getPrismaClient();
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  if (!ensureTablePromise) {
    ensureTablePromise = prisma
      .$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS app_settings (
          key TEXT PRIMARY KEY,
          value_json JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      .then(() => undefined)
      .catch((error) => {
        ensureTablePromise = null;
        throw error;
      });
  }

  await ensureTablePromise;
}

async function getPrismaClient() {
  if (prismaClientPromise) {
    return prismaClientPromise;
  }

  const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
  if (!connectionString) {
    prismaClientPromise = Promise.resolve(null);
    return prismaClientPromise;
  }

  prismaClientPromise = import("@/lib/prisma")
    .then((module) => module.prisma as unknown as PrismaLike)
    .catch(() => null);

  return prismaClientPromise;
}

async function readFromDb(): Promise<PaymentSettings | null> {
  const prisma = await getPrismaClient();
  if (!prisma) {
    return null;
  }

  await ensureSettingsTable();
  const rows = await prisma.$queryRawUnsafe<DbPaymentSettingsRow[]>(
    "SELECT value_json FROM app_settings WHERE key = $1 LIMIT 1",
    SETTING_KEY
  );

  if (!rows.length) {
    return null;
  }

  const value = rows[0].value_json as Partial<PaymentSettings> | null | undefined;
  return normalizePaymentSettings(value);
}

async function writeToDb(next: PaymentSettings) {
  const prisma = await getPrismaClient();
  if (!prisma) {
    throw new Error("Database unavailable");
  }

  await ensureSettingsTable();
  await prisma.$executeRawUnsafe(
    "INSERT INTO app_settings (key, value_json, updated_at) VALUES ($1, $2::jsonb, NOW()) ON CONFLICT (key) DO UPDATE SET value_json = EXCLUDED.value_json, updated_at = NOW()",
    SETTING_KEY,
    JSON.stringify(next)
  );
}

export async function readPaymentSettings(): Promise<PaymentSettings> {
  if (paymentSettingsCache && paymentSettingsCache.expiresAt > Date.now()) {
    return paymentSettingsCache.value;
  }

  try {
    const fromDb = await readFromDb();
    if (fromDb) {
      paymentSettingsCache = { value: fromDb, expiresAt: Date.now() + PAYMENT_SETTINGS_CACHE_TTL_MS };
      return fromDb;
    }
  } catch {
    // Fall back to local file when DB is unavailable.
  }

  const filePath = getPaymentSettingsPath();

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<PaymentSettings>;
    const normalized = normalizePaymentSettings(parsed);
    paymentSettingsCache = { value: normalized, expiresAt: Date.now() + PAYMENT_SETTINGS_CACHE_TTL_MS };
    return normalized;
  } catch {
    return DEFAULT_PAYMENT_SETTINGS;
  }
}

export async function writePaymentSettings(next: PaymentSettings) {
  const normalized = normalizePaymentSettings(next);

  try {
    await writeToDb(normalized);
    paymentSettingsCache = { value: normalized, expiresAt: Date.now() + PAYMENT_SETTINGS_CACHE_TTL_MS };
    return;
  } catch {
    // Fall back to file write when DB write is unavailable.
  }

  const filePath = getPaymentSettingsPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(normalized, null, 2), "utf8");
  paymentSettingsCache = { value: normalized, expiresAt: Date.now() + PAYMENT_SETTINGS_CACHE_TTL_MS };
}
