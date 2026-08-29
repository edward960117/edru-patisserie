import { createSign } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/auth/session";
import { getCustomerSessionCookieName } from "@/lib/auth/customer-session";
import { hashPassword } from "@/lib/auth/password";

const callbackSchema = z.object({
  provider: z.enum(["google", "apple"]),
  code: z.string().optional(),
  state: z.string().optional(),
});

function getBaseUrl(requestUrl?: URL | string) {
  const requestOrigin = typeof requestUrl === "string"
    ? (() => {
        try {
          return new URL(requestUrl).origin;
        } catch {
          return null;
        }
      })()
    : requestUrl?.origin ?? null;

  if (requestOrigin && ["localhost", "127.0.0.1", "0.0.0.0"].includes(new URL(requestOrigin).hostname)) {
    return requestOrigin;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (requestOrigin) {
    return requestOrigin;
  }

  return "http://127.0.0.1:3010";
}

function decodeState(state: string | undefined) {
  if (!state) {
    return "/account";
  }

  try {
    const decoded = JSON.parse(Buffer.from(state, "base64url").toString("utf8")) as { next?: string; provider?: string };
    if (decoded.next && decoded.next.startsWith("/")) {
      return decoded.next;
    }
  } catch {
    // ignore invalid state and fall back to account page
  }

  return "/account";
}

function decodeJwtPayload(jwt: string) {
  const parts = jwt.split(".");
  if (parts.length < 2) {
    throw new Error("Invalid JWT payload");
  }

  return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as Record<string, unknown>;
}

function createAppleClientSecret() {
  const appleClientId = process.env.APPLE_CLIENT_ID;
  const appleTeamId = process.env.APPLE_TEAM_ID;
  const appleKeyId = process.env.APPLE_KEY_ID;
  const applePrivateKey = process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!appleClientId || !appleTeamId || !appleKeyId || !applePrivateKey) {
    throw new Error("Apple OAuth configuration is incomplete.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "ES256", kid: appleKeyId })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: appleTeamId,
    iat: now,
    exp: now + 15777000,
    aud: "https://appleid.apple.com",
    sub: appleClientId,
  })).toString("base64url");

  const sign = createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  sign.end();

  const signature = sign.sign(applePrivateKey, "base64url");
  return `${header}.${payload}.${signature}`;
}

async function exchangeGoogleUser(code: string, redirectUri: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth configuration is incomplete.");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Google token exchange failed: ${tokenResponse.status}`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string; id_token?: string };

  if (!tokenData.access_token) {
    throw new Error("Google access token missing from OAuth response.");
  }

  const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userInfoResponse.ok) {
    throw new Error(`Google user profile fetch failed: ${userInfoResponse.status}`);
  }

  const profile = (await userInfoResponse.json()) as { email?: string; name?: string; given_name?: string; family_name?: string };
  return {
    email: (profile.email || "").trim().toLowerCase(),
    name: profile.name || `${profile.given_name ?? ""} ${profile.family_name ?? ""}`.trim() || "Google Member",
  };
}

async function exchangeAppleUser(code: string, redirectUri: string) {
  const clientId = process.env.APPLE_CLIENT_ID;
  const clientSecret = createAppleClientSecret();

  if (!clientId) {
    throw new Error("APPLE_CLIENT_ID is not configured.");
  }

  const tokenResponse = await fetch("https://appleid.apple.com/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`Apple token exchange failed: ${tokenResponse.status}`);
  }

  const tokenData = (await tokenResponse.json()) as { id_token?: string };
  if (!tokenData.id_token) {
    throw new Error("Apple ID token missing from OAuth response.");
  }

  const claims = decodeJwtPayload(tokenData.id_token);
  return {
    email: String(claims.email || "").trim().toLowerCase(),
    name: "Apple Member",
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = callbackSchema.safeParse({
    provider: url.searchParams.get("provider"),
    code: url.searchParams.get("code") || undefined,
    state: url.searchParams.get("state") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.redirect(new URL("/login/customer?error=oauth_invalid", getBaseUrl(url)));
  }

  const { provider, code, state } = parsed.data;
  const safeNextPath = decodeState(state);
  const redirectUri = new URL(`/api/customer/social-auth/callback?provider=${provider}`, getBaseUrl(url)).toString();

  if (!code) {
    return NextResponse.redirect(new URL(`/login/customer?error=${provider}_missing_code`, getBaseUrl(url)));
  }

  try {
    const profile = provider === "google"
      ? await exchangeGoogleUser(code, redirectUri)
      : await exchangeAppleUser(code, redirectUri);

    if (!profile.email) {
      return NextResponse.redirect(new URL(`/login/customer?error=${provider}_missing_email`, getBaseUrl(url)));
    }

    let customer = await prisma.customer.findUnique({ where: { email: profile.email } });
    const status = customer ? "signed_in" : "registered";

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: profile.email,
          name: profile.name || "Member",
          password_hash: await hashPassword(`${provider}-social-${profile.email}-${Date.now()}`),
          phone: "",
        },
      });
    }

    const token = createSessionToken(customer.id, "customer");
    const response = NextResponse.redirect(new URL(`${safeNextPath}?social=${provider}&status=${status}`, getBaseUrl(url)));
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const isHttps = forwardedProto === "https" || request.url.startsWith("https://");
    response.cookies.set(getCustomerSessionCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isHttps,
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error(`OAuth callback failed for ${provider}:`, error);
    return NextResponse.redirect(new URL(`/login/customer?error=oauth_failed&provider=${provider}`, getBaseUrl(url)));
  }
}
