"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";
import { markSessionActivityNow } from "@/lib/session-idle";

export default function LoginForm({ lang }: { lang: Lang }) {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const copy = t(lang);

  // Simple validation
  const usernameError = touched.username && !username ? (lang === "zh" ? "用户名不能为空" : "Username required") : null;
  const passwordError = touched.password && !password ? (lang === "zh" ? "密码不能为空" : "Password required") : null;
  const isFormValid = username && password && !usernameError && !passwordError && !loading;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    // Mark fields as touched
    setTouched({ username: true, password: true });
    
    if (!isFormValid) return;

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
      // Reset the idle clock so a stale timestamp from a prior session doesn't
      // immediately re-trigger the idle-timeout modal right after logging in.
      markSessionActivityNow();
      window.location.assign(safePath);
    } catch {
      setError(copy.loginUnexpectedError);
      setLoading(false);
    }
  }

  return (
    <section className="form-container animate-fade-in-up">
      <div className="mb-8 text-center">
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white"
          style={{
            background: "linear-gradient(135deg, #588cd9 0%, #7ba3e5 100%)",
            boxShadow: "0 12px 28px rgba(88, 140, 217, 0.32)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <p className="lux-kicker mb-1">{lang === "zh" ? "员工专区" : "STAFF PORTAL"}</p>
        <h1 className="heading-serif text-[2.2rem] leading-[1.1] text-[color:var(--ink)]">
          {copy.loginTitle}
        </h1>
        <p className="mt-2 text-[0.95rem] text-[color:var(--ink-soft)] leading-[1.6]">
          {lang === "zh" ? "欢迎回来，请登录以管理店铺" : "Welcome back — sign in to manage your store"}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            {copy.username}
            <span className="required-indicator">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--ink-faint)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
              placeholder={lang === "zh" ? "输入用户名" : "Enter your username"}
              aria-invalid={!!usernameError}
              className={`
                input-lux
                ${usernameError ? 'input-error' : ''}
              `}
              style={{ paddingLeft: "2.75rem" }}
              required
              disabled={loading}
            />
            {/* Validation indicator */}
            {!usernameError && touched.username && username && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold">
                ✓
              </div>
            )}
            {usernameError && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--accent-red)]">
                ⚠
              </div>
            )}
          </div>
          {usernameError && (
            <p className="input-error-message">{usernameError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            {copy.password}
            <span className="required-indicator">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[color:var(--ink-faint)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </span>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              placeholder={lang === "zh" ? "输入密码" : "Enter your password"}
              aria-invalid={!!passwordError}
              className={`
                input-lux
                ${passwordError ? 'input-error' : ''}
              `}
              style={{ paddingLeft: "2.75rem", paddingRight: "2.75rem" }}
              required
              disabled={loading}
            />
            {/* Show/hide password toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? (lang === "zh" ? "隐藏密码" : "Hide password") : (lang === "zh" ? "显示密码" : "Show password")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--ink-faint)] hover:text-[color:var(--primary)] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-10-8-10-8a18.5 18.5 0 0 1 4.22-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {passwordError && (
            <p className="input-error-message">{passwordError}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-[12px] bg-[color:var(--accent-red)]/10 border border-[color:var(--accent-red)]/30 p-4 animate-fade-in-up">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[color:var(--accent-red)]" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-[color:var(--accent-red)] font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`
            ${isFormValid ? 'btn-lux-primary' : 'btn-base bg-[color:var(--primary)]/50 text-white/70 cursor-not-allowed'}
            w-full font-semibold text-base
            transition-all duration-300 ease-out
            focus:ring-2 focus:ring-[color:var(--primary)]/30 focus:ring-offset-2
          `}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              {copy.signingIn}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
              </svg>
              {copy.loginButton}
            </span>
          )}
        </button>
      </form>

      {/* Help text */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-[color:var(--ink-faint)] leading-[1.6]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 2-3 4" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span>
          {lang === "zh"
            ? "需要帮助？请联系网站管理员"
            : "Need help? Contact the website administrator"
          }
        </span>
      </div>
    </section>
  );
}
