import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSessionToken, getSessionCookieName } from "@/lib/auth/session";
import { verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  if (!body.username || !body.password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  let userId: number | null = null;

  try {
    const user = await prisma.user.findUnique({ where: { username: body.username } });
    if (!user || !user.active || user.role !== "staff") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await verifyPassword(user.password_hash, body.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    userId = user.id;
  } catch {
    const hostHeader = request.headers.get("host")?.toLowerCase() ?? "";
    const isLocalHost =
      hostHeader.startsWith("localhost:") ||
      hostHeader === "localhost" ||
      hostHeader.startsWith("127.0.0.1:") ||
      hostHeader === "127.0.0.1" ||
      hostHeader.startsWith("[::1]:") ||
      hostHeader === "[::1]";

    // Keep strict behavior on deployed production, but allow localhost fallback
    // because local machines may fail TLS to remote DB.
    const allowLocalFallback = isLocalHost && process.env.ALLOW_LOCAL_AUTH_FALLBACK !== "false";
    if (process.env.NODE_ENV === "production" && !allowLocalFallback) {
      return NextResponse.json({ error: "Authentication service unavailable" }, { status: 503 });
    }

    const fallbackUsername = process.env.DEV_STAFF_USERNAME || "0001";
    const fallbackPassword = process.env.DEV_STAFF_PASSWORD || "990207";
    if (body.username !== fallbackUsername || body.password !== fallbackPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    userId = 1;
  }

  const token = createSessionToken(userId, "staff");
  const response = NextResponse.json({ ok: true });
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttps = forwardedProto === "https" || request.url.startsWith("https://");
  response.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: isHttps,
    maxAge: 60 * 60 * 8,
  });

  return response;
}
