import { NextResponse } from "next/server";
import { z } from "zod";

const socialAuthSchema = z.object({
  provider: z.enum(["google", "apple"]),
  next: z.string().optional().default("/account"),
});

function getBaseUrl(requestUrl: URL | string) {
  return process.env.NEXT_PUBLIC_SITE_URL || (typeof requestUrl === "string" ? new URL(requestUrl).origin : requestUrl.origin) || "http://127.0.0.1:3010";
}

function getRedirectUri(provider: "google" | "apple") {
  return new URL(`/api/customer/social-auth/callback?provider=${provider}`, getBaseUrl("http://127.0.0.1:3010")).toString();
}

function ensureSafeNextPath(next: string | undefined) {
  if (!next || !next.startsWith("/")) {
    return "/account";
  }
  return next;
}

function buildState(next: string, provider: "google" | "apple") {
  return Buffer.from(JSON.stringify({ next: ensureSafeNextPath(next), provider })).toString("base64url");
}

function buildProviderRedirectUrl(provider: "google" | "apple", next: string) {
  const baseUrl = getBaseUrl("http://127.0.0.1:3010");
  const redirectUri = new URL(`/api/customer/social-auth/callback?provider=${provider}`, baseUrl).toString();

  if (provider === "google") {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    if (!googleClientId) {
      throw new Error("GOOGLE_CLIENT_ID is not configured.");
    }

    const params = new URLSearchParams({
      client_id: googleClientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "online",
      prompt: "select_account",
      state: buildState(next, provider),
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  const appleClientId = process.env.APPLE_CLIENT_ID;
  if (!appleClientId) {
    throw new Error("APPLE_CLIENT_ID is not configured.");
  }

  const params = new URLSearchParams({
    client_id: appleClientId,
    redirect_uri: redirectUri,
    response_type: "code",
    response_mode: "form_post",
    scope: "name email",
    state: buildState(next, provider),
    nonce: Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64url"),
  });

  return `https://appleid.apple.com/auth/authorize?${params.toString()}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = socialAuthSchema.safeParse({
    provider: url.searchParams.get("provider"),
    next: url.searchParams.get("next") ?? "/account",
  });

  if (!parsed.success) {
    const base = getBaseUrl(url);
    return NextResponse.redirect(new URL(`/login/customer?error=oauth_invalid`, base));
  }

  const { provider, next } = parsed.data;
  const base = getBaseUrl(url);

  try {
    const redirectUrl = buildProviderRedirectUrl(provider, next);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error(`Social auth redirect setup failed for ${provider}:`, error);
    return NextResponse.redirect(new URL(`/login/customer?error=${provider}_missing_credentials`, base));
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = socialAuthSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid social auth request." }, { status: 400 });
  }

  const { provider, next } = parsed.data;

  try {
    const authUrl = buildProviderRedirectUrl(provider, next);
    return NextResponse.json({ ok: true, authUrl });
  } catch (error) {
    console.error(`Social auth setup failed for ${provider}:`, error);
    return NextResponse.json({ error: `The ${provider} login provider is not configured.` }, { status: 503 });
  }
}
