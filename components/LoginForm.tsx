"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";
import { markSessionActivityNow } from "@/lib/session-idle";

export default function LoginForm({ lang }: { lang: Lang }) {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="mb-8">
        <h1 className="heading-serif text-[2.2rem] leading-[1.1] text-[color:var(--ink)]">
          {copy.loginTitle}
        </h1>
        <p className="mt-2 text-[0.95rem] text-[color:var(--ink-soft)] leading-[1.6]">
          {lang === "zh" ? "请输入您的凭证以访问管理面板" : "Enter your credentials to access the admin panel"}
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
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, username: true }))}
              placeholder={lang === "zh" ? "输入用户名" : "Enter username"}
              aria-invalid={!!usernameError}
              className={`
                input-lux
                ${usernameError ? 'input-error' : ''}
              `}
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
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
              placeholder={lang === "zh" ? "输入密码" : "Enter password"}
              aria-invalid={!!passwordError}
              className={`
                input-lux
                ${passwordError ? 'input-error' : ''}
              `}
              required
              disabled={loading}
            />
            {/* Validation indicator */}
            {!passwordError && touched.password && password && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold">
                ✓
              </div>
            )}
            {passwordError && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--accent-red)]">
                ⚠
              </div>
            )}
          </div>
          {passwordError && (
            <p className="input-error-message">{passwordError}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-[12px] bg-[color:var(--accent-red)]/10 border border-[color:var(--accent-red)]/30 p-4 animate-fade-in-up">
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
            copy.loginButton
          )}
        </button>
      </form>

      {/* Help text */}
      <p className="mt-6 text-center text-xs text-[color:var(--ink-faint)] leading-[1.6]">
        {lang === "zh" 
          ? "需要帮助？请联系网站管理员"
          : "Need help? Contact the website administrator"
        }
      </p>
    </section>
  );
}
