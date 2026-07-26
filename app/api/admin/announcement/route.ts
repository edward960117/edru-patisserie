import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSessionCookieName, verifySessionToken } from "@/lib/auth/session";
import { readSiteAnnouncement, writeSiteAnnouncement } from "@/lib/announcement";

async function requireStaff() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(getSessionCookieName())?.value);
  return session?.role === "staff";
}

export async function GET() {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const announcement = await readSiteAnnouncement();
  return NextResponse.json({ announcement });
}

export async function PUT(request: Request) {
  const isStaff = await requireStaff();
  if (!isStaff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      enabled?: boolean;
      messageEn?: string;
      messageZh?: string;
    };

    const next = {
      enabled: Boolean(body.enabled),
      messageEn: body.messageEn?.trim() || "Free shipping for cake orders above S$60.",
      messageZh: body.messageZh?.trim() || "蛋糕订单满 S$60 免运费。",
    };

    await writeSiteAnnouncement(next);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, announcement: next });
  } catch {
    return NextResponse.json({ error: "Failed to update announcement. Please try again." }, { status: 500 });
  }
}
