"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

  useEffect(() => {
    const parsed = customer.phone ? parseStoredMobilePhone(customer.phone) : { countryCode: getDefaultPhoneCountryCode(), nationalNumber: "" };
    setPhoneCountry(parsed.countryCode);
    setPhoneNumber(parsed.nationalNumber);
  }, [customer.phone]);

  useEffect(() => {
    setStatusMessage(successMessage);
  }, [successMessage]);

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
      router.refresh();
    } catch {
      setError(lang === "zh" ? "更新联系号码失败。" : "Unable to update contact number.");
      setLoading(false);
    }
  }

  return (
    <article className="account-panel detail-card card-lux atelier-frame p-5 sm:p-7">
      <div className="account-panel__top flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(88,140,217,0.14),rgba(123,163,229,0.26))] text-lg font-semibold text-[color:var(--primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
            {customer.name?.trim()?.charAt(0)?.toUpperCase() || customer.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium text-[color:var(--primary)]">
              {copy.customerWelcome}, {customer.name?.trim() || customer.email.split("@")[0]}
            </p>
            <h1 className="heading-serif mt-1 text-3xl sm:text-4xl">{copy.customerAccountTitle}</h1>
          </div>
        </div>
        <CustomerLogoutButton lang={lang} />
      </div>

      {(error || statusMessage) && (
        <div className={`mt-5 rounded-[14px] border p-4 ${error ? "bg-[color:var(--accent-red)]/10 border-[color:var(--accent-red)]/30" : "bg-[color:var(--accent-success)]/10 border-[color:var(--accent-success)]/30"}`}>
          <p className={`text-sm font-medium ${error ? "text-[color:var(--accent-red)]" : "text-[color:var(--accent-success)]"}`}>
            {error ?? statusMessage}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="account-metric rounded-[22px] border border-[color:var(--gold)]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.82))] px-4 py-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.customerEmailLabel}</p>
          <p className="mt-2 break-all text-base font-semibold text-[color:var(--ink)]">{customer.email}</p>
        </div>

        <div className="account-metric rounded-[22px] border border-[color:var(--gold)]/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,246,255,0.82))] px-4 py-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">{copy.customerPointsBalance}</p>
          <p className="mt-2 text-3xl font-bold text-[color:var(--primary)]">{customer.points}</p>
        </div>
      </div>

      <div className="account-field mt-6 rounded-[24px] border border-[color:var(--gold)]/24 bg-[linear-gradient(180deg,rgba(252,253,255,0.98),rgba(239,246,255,0.78))] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
            {lang === "zh" ? "联系号码" : "Contact Number"}
          </h2>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[color:var(--gold)]/35 bg-white/94 shadow-[0_14px_22px_rgba(36,74,118,0.08)]">
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
            className="account-save-btn inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (lang === "zh" ? "保存中…" : "Saving...") : (lang === "zh" ? "保存联系号码" : "Save Contact Number")}
          </button>
        </div>
      </div>
    </article>
  );
}
