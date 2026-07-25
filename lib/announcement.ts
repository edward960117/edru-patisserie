import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export interface SiteAnnouncement {
  enabled: boolean;
  messageEn: string;
  messageZh: string;
}

const DEFAULT_ANNOUNCEMENT: SiteAnnouncement = {
  enabled: false,
  messageEn: "Free shipping for cake orders above S$60.",
  messageZh: "蛋糕订单满 S$60 免运费。",
};
const SETTING_KEY = "site_announcement";
const ANNOUNCEMENT_CACHE_TTL_MS = 60_000;

type PrismaLike = {
  $executeRawUnsafe: (query: string, ...values: unknown[]) => Promise<unknown>;
  $queryRawUnsafe: <T = unknown>(query: string, ...values: unknown[]) => Promise<T>;
};

let ensureTablePromise: Promise<void> | null = null;
let announcementCache: { value: SiteAnnouncement; expiresAt: number } | null = null;
let prismaClientPromise: Promise<PrismaLike | null> | null = null;

type DbAnnouncementRow = {
  value_json: unknown;
};

function getAnnouncementPath() {
  return path.join(process.cwd(), "data", "site-announcement.json");
}

function normalizeAnnouncement(parsed: Partial<SiteAnnouncement> | null | undefined): SiteAnnouncement {
  return {
    enabled: Boolean(parsed?.enabled),
    messageEn: parsed?.messageEn?.trim() || DEFAULT_ANNOUNCEMENT.messageEn,
    messageZh: parsed?.messageZh?.trim() || DEFAULT_ANNOUNCEMENT.messageZh,
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

async function readFromDb(): Promise<SiteAnnouncement | null> {
  const prisma = await getPrismaClient();
  if (!prisma) {
    return null;
  }

  await ensureSettingsTable();
  const rows = await prisma.$queryRawUnsafe<DbAnnouncementRow[]>(
    "SELECT value_json FROM app_settings WHERE key = $1 LIMIT 1",
    SETTING_KEY
  );

  if (!rows.length) {
    return null;
  }

  const value = rows[0].value_json as Partial<SiteAnnouncement> | null | undefined;
  return normalizeAnnouncement(value);
}

async function writeToDb(next: SiteAnnouncement) {
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

export async function readSiteAnnouncement(): Promise<SiteAnnouncement> {
  if (announcementCache && announcementCache.expiresAt > Date.now()) {
    return announcementCache.value;
  }

  try {
    const fromDb = await readFromDb();
    if (fromDb) {
      announcementCache = { value: fromDb, expiresAt: Date.now() + ANNOUNCEMENT_CACHE_TTL_MS };
      return fromDb;
    }
  } catch {
    // Fall back to local file when DB is unavailable.
  }

  const filePath = getAnnouncementPath();

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteAnnouncement>;
    const normalized = normalizeAnnouncement(parsed);
    announcementCache = { value: normalized, expiresAt: Date.now() + ANNOUNCEMENT_CACHE_TTL_MS };
    return normalized;
  } catch {
    return DEFAULT_ANNOUNCEMENT;
  }
}

export async function writeSiteAnnouncement(next: SiteAnnouncement) {
  const normalized = normalizeAnnouncement(next);

  try {
    await writeToDb(normalized);
    announcementCache = { value: normalized, expiresAt: Date.now() + ANNOUNCEMENT_CACHE_TTL_MS };
    return;
  } catch {
    // Fall back to file write when DB write is unavailable.
  }

  const filePath = getAnnouncementPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(normalized, null, 2), "utf8");
  announcementCache = { value: normalized, expiresAt: Date.now() + ANNOUNCEMENT_CACHE_TTL_MS };
}
