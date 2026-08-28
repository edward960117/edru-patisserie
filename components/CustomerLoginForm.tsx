"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, type Lang } from "@/lib/i18n-shared";
import { getDefaultPhoneCountryCode, getPhoneCountryOption, normalizeMobilePhone, PHONE_COUNTRIES, type PhoneCountryCode } from "@/lib/phone";

export default function CustomerLoginForm({ lang }: { lang: Lang }) {
  const searchParams = useSearchParams();
  const copy = t(lang);
  const socialStatus = searchParams.get("status");
  const socialProvider = searchParams.get("social");
  const socialSuccessMessage = socialStatus === "registered"
    ? (socialProvider === "google" ? copy.customerSocialRegisterSuccess : copy.customerSocialRegisterSuccess)
    : socialStatus === "signed_in"
      ? (socialProvider === "google" ? copy.customerSocialSignInSuccess : copy.customerSocialSignInSuccess)
      : null;
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<PhoneCountryCode>(getDefaultPhoneCountryCode());
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  async function handleSocialAuth(provider: "google" | "apple") {
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const nextPath = searchParams.get("next");
      const redirectTo = nextPath && nextPath.startsWith("/") ? nextPath : "/account";
      const authUrl = `/api/customer/social-auth?provider=${provider}&next=${encodeURIComponent(redirectTo)}`;
      window.location.assign(authUrl);
    } catch {
      setError(copy.customerSocialSignInFailed);
      setLoading(false);
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || !password || loading) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const endpoint = mode === "login" ? "/api/customer/login" : "/api/customer/register";
      const normalizedPhone = mode === "register" ? normalizeMobilePhone(phoneCountry, phoneNumber) : null;
      if (mode === "register" && !normalizedPhone) {
        setError(lang === "zh" ? "请输入有效的手机号码。" : "Please enter a valid mobile number.");
        setLoading(false);
        return;
      }
      const payload = mode === "login"
        ? { email, password }
        : { email, password, name, phoneCountry, phoneNumber };
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
      const redirectPath = mode === "register" ? `${safePath}?status=registered` : safePath;
      window.location.assign(redirectPath);
    } catch {
      setError(copy.loginUnexpectedError);
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim() || loading) {
      setError(copy.customerForgotPasswordMissingEmail);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/customer/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setError(result.error ?? copy.customerForgotPasswordFailed);
        setLoading(false);
        return;
      }

      setSuccessMessage(result.message ?? copy.customerForgotPasswordSuccess);
      setShowForgotPassword(false);
      setLoading(false);
    } catch {
      setError(copy.customerForgotPasswordFailed);
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
          <>
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

            <div className="form-group">
              <label htmlFor="customer-phone" className="form-label">
                {lang === "zh" ? "联系号码" : "Contact Number"}
                <span className="required-indicator">*</span>
              </label>
              <div className="overflow-hidden rounded-[14px] border border-[color:var(--gold)]/35 bg-white/92 shadow-[0_8px_16px_rgba(36,74,118,0.08)]">
                <div className="grid sm:grid-cols-[220px_1fr]">
                  <div className="border-b border-[color:var(--gold)]/18 bg-[color:var(--bg-soft)]/72 px-3 py-2.5 sm:border-b-0 sm:border-r">
                    <label htmlFor="customer-phone-country" className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                      {lang === "zh" ? "国家 / 地区" : "Country / Region"}
                    </label>
                    <select
                      id="customer-phone-country"
                      value={phoneCountry}
                      onChange={(event) => setPhoneCountry(event.target.value as PhoneCountryCode)}
                      className="w-full bg-transparent text-sm font-medium text-[color:var(--ink)] outline-none"
                      disabled={loading}
                    >
                      {PHONE_COUNTRIES.map((option) => (
                        <option key={option.code} value={option.code}>
                          {`${lang === "zh" ? option.labelZh : option.labelEn} (+${option.dialCode})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="px-3 py-2.5">
                    <label htmlFor="customer-phone" className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                      {lang === "zh" ? "手机号码" : "Mobile Number"}
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[color:var(--primary)]/10 px-2.5 py-1 text-xs font-semibold text-[color:var(--primary)]">
                        +{getPhoneCountryOption(phoneCountry).dialCode}
                      </span>
                      <input
                        id="customer-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel-national"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-transparent text-sm text-[color:var(--ink)] outline-none"
                        required
                        disabled={loading}
                        placeholder={getPhoneCountryOption(phoneCountry).example}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-[color:var(--ink-soft)]">
                {lang === "zh"
                  ? "默认新加坡号码。请选择国家代码并输入当地手机号码。"
                  : "Singapore is selected by default. Choose a country code and enter the local mobile number."}
              </p>
            </div>
          </>
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

        {(error || successMessage || socialSuccessMessage) && (
          <div className={`rounded-[12px] border p-4 animate-fade-in-up ${error ? "bg-[color:var(--accent-red)]/10 border-[color:var(--accent-red)]/30" : "bg-[color:var(--accent-success)]/10 border-[color:var(--accent-success)]/30"}`}>
            <p className={`text-sm font-medium ${error ? "text-[color:var(--accent-red)]" : "text-[color:var(--accent-success)]"}`}>
              {error ?? successMessage ?? socialSuccessMessage}
            </p>
          </div>
        )}

        {mode === "login" && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword((current) => !current);
                setError(null);
                setSuccessMessage(null);
              }}
              className="text-sm font-medium text-[color:var(--primary)] hover:underline disabled:opacity-60"
              disabled={loading}
            >
              {copy.customerForgotPasswordLink}
            </button>
          </div>
        )}

        {showForgotPassword && mode === "login" && (
          <div className="rounded-[12px] border border-[color:var(--gold)]/35 bg-[color:var(--bg-soft)]/80 p-4">
            <p className="mb-3 text-sm text-[color:var(--ink-soft)]">
              {copy.customerForgotPasswordTitle}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-lux flex-1"
                placeholder={copy.customerEmailLabel}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => void handleForgotPassword()}
                disabled={loading}
                className="btn-lux min-w-[150px] disabled:opacity-60"
              >
                {copy.customerForgotPasswordButton}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-1">
          <button
            type="button"
            onClick={() => void handleSocialAuth("google")}
            disabled={loading}
            className="social-button social-button-google w-full disabled:opacity-60"
          >
            <span className="social-button__icon social-button__icon-google" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true" role="img">
                <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.2-.9 2.2-1.8 2.9l2.9 2.2c1.7-1.6 2.7-4 2.7-6.8 0-.6-.1-1.2-.2-1.7H12Z"/>
                <path fill="#34A853" d="M12 20.9c2.5 0 4.6-.8 6.1-2.2L15.1 16.5c-.8.6-1.9 1-3.1 1-2.4 0-4.4-1.6-5.1-3.7H2.8v2.4A9.2 9.2 0 0 0 12 20.9Z"/>
                <path fill="#FBBC05" d="M6.9 13.8A5.4 5.4 0 0 1 6.5 12c0-.6.1-1.2.3-1.8L2.8 7.7A9.1 9.1 0 0 0 2.1 12c0 1.4.3 2.8.9 4.1l3.9-2.3Z"/>
                <path fill="#4285F4" d="M12 4.4c1.4 0 2.7.5 3.7 1.4l2.8-2.7A9.2 9.2 0 0 0 12 2a9.8 9.8 0 0 0-8.8 5.4l3.9 2.3A5.4 5.4 0 0 1 12 4.4Z"/>
              </svg>
            </span>
            <span>{copy.customerContinueGoogle}</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="h-px flex-1 bg-[color:var(--border)]" />
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{lang === "zh" ? "或" : "or"}</span>
          <div className="h-px flex-1 bg-[color:var(--border)]" />
        </div>

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
