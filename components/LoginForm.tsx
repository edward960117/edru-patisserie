"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";

export default function LoginForm({ lang }: { lang: Lang }) {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const copy = t(lang);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setError(result.error ?? copy.loginFailed);
        setLoading(false);
        return;
      }

      const nextPath = searchParams.get("next");
      const safePath = nextPath && nextPath.startsWith("/") ? nextPath : "/admin";
      window.location.assign(safePath);
    } catch {
      setError(copy.loginUnexpectedError);
      setLoading(false);
    }
  }

  return (
    <section className="max-w-md card-lux p-7 sm:p-9 mx-auto">
      <h1 className="heading-serif text-4xl">{copy.loginTitle}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">{copy.username}</label>
          <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required />
        </div>
        <div>
          <label className="block text-sm mb-1">{copy.password}</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required />
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button disabled={loading} className="w-full rounded-xl bg-[#2f2419] text-white py-2.5 disabled:opacity-70">
          {loading ? copy.signingIn : copy.loginButton}
        </button>
      </form>
    </section>
  );
}
