"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";

export default function CustomerLoginForm({ lang }: { lang: Lang }) {
  const searchParams = useSearchParams();
  const copy = t(lang);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || !password || loading) return;

    setLoading(true);
    setError(null);

    try {
      const endpoint = mode === "login" ? "/api/customer/login" : "/api/customer/register";
      const payload = mode === "login" ? { email, password } : { email, password, name };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setError(result.error ?? (mode === "login" ? copy.customerLoginFailed : copy.customerRegisterFailed));
        setLoading(false);
        return;
      }

      const nextPath = searchParams.get("next");
      const safePath = nextPath && nextPath.startsWith("/") ? nextPath : "/account";
      window.location.assign(safePath);
    } catch {
      setError(copy.loginUnexpectedError);
      setLoading(false);
    }
  }

  return (
    <section className="form-container animate-fade-in-up">
      <div className="mb-8">
        <h1 className="heading-serif text-[2.2rem] leading-[1.1] text-[color:var(--ink)]">
          {mode === "login" ? copy.customerLoginTitle : copy.customerRegisterTitle}
        </h1>
        <p className="mt-2 text-[0.95rem] text-[color:var(--ink-soft)] leading-[1.6]">
          {copy.customerLoginSubtitle}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {mode === "register" && (
          <div className="form-group">
            <label htmlFor="customer-name" className="form-label">
              {copy.customerNameLabel}
            </label>
            <input
              id="customer-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-lux"
              disabled={loading}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="customer-email" className="form-label">
            {copy.customerEmailLabel}
            <span className="required-indicator">*</span>
          </label>
          <input
            id="customer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-lux"
            required
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customer-password" className="form-label">
            {copy.customerPasswordLabel}
            <span className="required-indicator">*</span>
          </label>
          <input
            id="customer-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-lux"
            required
            minLength={mode === "register" ? 8 : undefined}
            disabled={loading}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </div>

        {error && (
          <div className="rounded-[12px] bg-[color:var(--accent-red)]/10 border border-[color:var(--accent-red)]/30 p-4 animate-fade-in-up">
            <p className="text-sm text-[color:var(--accent-red)] font-medium">{error}</p>
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-lux w-full disabled:opacity-60">
          {loading
            ? mode === "login"
              ? copy.customerSigningIn
              : copy.customerCreatingAccount
            : mode === "login"
              ? copy.customerSignIn
              : copy.customerSignUp}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
          }}
          className="w-full text-center text-sm text-[color:var(--primary)] hover:underline"
          disabled={loading}
        >
          {mode === "login" ? copy.customerNoAccount : copy.customerHaveAccount}
        </button>
      </form>
    </section>
  );
}
