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

function getAnnouncementPath() {
  return path.join(process.cwd(), "data", "site-announcement.json");
}

export async function readSiteAnnouncement(): Promise<SiteAnnouncement> {
  const filePath = getAnnouncementPath();

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<SiteAnnouncement>;
    return {
      enabled: Boolean(parsed.enabled),
      messageEn: parsed.messageEn?.trim() || DEFAULT_ANNOUNCEMENT.messageEn,
      messageZh: parsed.messageZh?.trim() || DEFAULT_ANNOUNCEMENT.messageZh,
    };
  } catch {
    return DEFAULT_ANNOUNCEMENT;
  }
}

export async function writeSiteAnnouncement(next: SiteAnnouncement) {
  const filePath = getAnnouncementPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(next, null, 2), "utf8");
}
