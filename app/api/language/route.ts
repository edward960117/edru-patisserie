import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { lang?: string };
  const lang = body.lang === "en" ? "en" : "zh";

  const response = NextResponse.json({ ok: true });
  response.cookies.set("blue_islet_lang", lang, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
