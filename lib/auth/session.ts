import { createHmac, timingSafeEqual } from "crypto";
import type { UserRole } from "@prisma/client";
import { SESSION_COOKIE } from "@/lib/auth/constants";

interface SessionPayload {
  sub: number;
  role: UserRole;
  exp: number;
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (secret) {
    return secret;
  }

  return "blue-islet-local-dev-secret";
}

function sign(data: string) {
  return createHmac("sha256", getSecret()).update(data).digest("base64url");
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export function createSessionToken(userId: number, role: UserRole) {
  const payload: SessionPayload = {
    sub: userId,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null;

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  const expected = sign(payloadPart);
  if (signaturePart.length !== expected.length) return null;
  const isValidSignature = timingSafeEqual(Buffer.from(signaturePart), Buffer.from(expected));
  if (!isValidSignature) return null;

  const payload = JSON.parse(Buffer.from(payloadPart, "base64url").toString("utf8")) as SessionPayload;
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;

  return payload;
}
