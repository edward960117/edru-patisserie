"use client";

import { useMemo, useState } from "react";
import CustomerLogoutButton from "@/components/CustomerLogoutButton";
import { t, type Lang } from "@/lib/i18n-shared";
import { getDefaultPhoneCountryCode, getPhoneCountryOption, normalizeMobilePhone, parseStoredMobilePhone, PHONE_COUNTRIES, type PhoneCountryCode } from "@/lib/phone";

type CustomerAccountData = {
  email: string;
  name: string;
  phone: string;
  points: number;
  created_at: Date | string;
};

export default function CustomerAccountPanel({
  lang,
  customer,
  successMessage,
}: {
  lang: Lang;
  customer: CustomerAccountData;
  successMessage: string | null;
}) {
  const copy = t(lang);
  const initialPhone = useMemo(
    () => (customer.phone ? parseStoredMobilePhone(customer.phone) : { countryCode: getDefaultPhoneCountryCode(), nationalNumber: "" }),
    [customer.phone]
  );

  const [phoneCountry, setPhoneCountry] = useState<PhoneCountryCode>(initialPhone.countryCode);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone.nationalNumber);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(successMessage);
  const [loading, setLoading] = useState(false);

  async function handleSavePhone() {
    const normalizedPhone = normalizeMobilePhone(phoneCountry, phoneNumber);
    if (!normalizedPhone) {
      setError(lang === "zh" ? "请输入有效的手机号码。" : "Please enter a valid mobile number.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/customer/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizedPhone }),
      });

      const result = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setError(result.error ?? (lang === "zh" ? "更新联系号码失败。" : "Unable to update contact number."));
        setLoading(false);
        return;
      }

      setStatusMessage(result.message ?? (lang === "zh" ? "联系号码已更新。" : "Contact number updated successfully."));
      setLoading(false);
    } catch {
      setError(lang === "zh" ? "更新联系号码失败。" : "Unable to update contact number.");
      setLoading(false);
    }
  }

  return (
    <article className="detail-card card-lux atelier-frame p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[color:var(--primary)]">
            {copy.customerWelcome}, {customer.name?.trim() || customer.email.split("@")[0]}
          </p>
          <h1 className="heading-serif mt-1 text-3xl sm:text-4xl">{copy.customerAccountTitle}</h1>
        </div>
        <CustomerLogoutButton lang={lang} />
      </div>

      {(error || statusMessage) && (
        <div className={`mt-5 rounded-[12px] border p-4 ${error ? "bg-[color:var(--accent-red)]/10 border-[color:var(--accent-red)]/30" : "bg-[color:var(--accent-success)]/10 border-[color:var(--accent-success)]/30"}`}>
          <p className={`text-sm font-medium ${error ? "text-[color:var(--accent-red)]" : "text-[color:var(--accent-success)]"}`}>
            {error ?? statusMessage}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{copy.customerEmailLabel}</p>
          <p className="mt-1 font-medium">{customer.email}</p>
        </div>

        <div className="rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{copy.customerPointsBalance}</p>
          <p className="mt-1 text-2xl font-bold text-[color:var(--primary)]">{customer.points}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-[color:var(--gold)]/28 bg-[color:var(--surface)]/92 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            {lang === "zh" ? "联系号码" : "Contact Number"}
          </h2>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-[color:var(--gold)]/35 bg-white/92 shadow-[0_8px_16px_rgba(36,74,118,0.08)]">
          <div className="grid sm:grid-cols-[220px_1fr]">
            <div className="border-b border-[color:var(--gold)]/18 bg-[color:var(--bg-soft)]/72 px-3 py-2.5 sm:border-b-0 sm:border-r">
              <label htmlFor="account-phone-country" className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                {lang === "zh" ? "国家 / 地区" : "Country / Region"}
              </label>
              <select
                id="account-phone-country"
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
              <label htmlFor="account-phone" className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                {lang === "zh" ? "手机号码" : "Mobile Number"}
              </label>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[color:var(--primary)]/10 px-2.5 py-1 text-xs font-semibold text-[color:var(--primary)]">
                  +{getPhoneCountryOption(phoneCountry).dialCode}
                </span>
                <input
                  id="account-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className="w-full bg-transparent text-sm text-[color:var(--ink)] outline-none"
                  placeholder={getPhoneCountryOption(phoneCountry).example}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => void handleSavePhone()}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(35,80,120,0.2)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (lang === "zh" ? "保存中…" : "Saving...") : (lang === "zh" ? "保存联系号码" : "Save Contact Number")}
          </button>
        </div>
      </div>
    </article>
  );
}
