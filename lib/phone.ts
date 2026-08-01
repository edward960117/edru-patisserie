import { z } from "zod";

export const PHONE_COUNTRY_CODES = ["sg", "my", "id", "hk", "au", "us", "uk", "ph", "cn", "th"] as const;

export type PhoneCountryCode = (typeof PHONE_COUNTRY_CODES)[number];

export type PhoneCountryOption = {
  code: PhoneCountryCode;
  dialCode: string;
  labelEn: string;
  labelZh: string;
  example: string;
  nationalPattern: RegExp;
  stripLeadingZero?: boolean;
};

export const PHONE_COUNTRIES: PhoneCountryOption[] = [
  { code: "sg", dialCode: "65", labelEn: "Singapore", labelZh: "新加坡", example: "9123 4567", nationalPattern: /^[89]\d{7}$/ },
  { code: "my", dialCode: "60", labelEn: "Malaysia", labelZh: "马来西亚", example: "12 345 6789", nationalPattern: /^1\d{8,9}$/, stripLeadingZero: true },
  { code: "id", dialCode: "62", labelEn: "Indonesia", labelZh: "印尼", example: "812 3456 7890", nationalPattern: /^8\d{8,10}$/, stripLeadingZero: true },
  { code: "hk", dialCode: "852", labelEn: "Hong Kong", labelZh: "香港", example: "5123 4567", nationalPattern: /^[456789]\d{7}$/ },
  { code: "au", dialCode: "61", labelEn: "Australia", labelZh: "澳大利亚", example: "412 345 678", nationalPattern: /^4\d{8}$/, stripLeadingZero: true },
  { code: "us", dialCode: "1", labelEn: "United States / Canada", labelZh: "美国 / 加拿大", example: "212 555 1234", nationalPattern: /^[2-9]\d{9}$/ },
  { code: "uk", dialCode: "44", labelEn: "United Kingdom", labelZh: "英国", example: "7123 456789", nationalPattern: /^7\d{9}$/, stripLeadingZero: true },
  { code: "ph", dialCode: "63", labelEn: "Philippines", labelZh: "菲律宾", example: "912 345 6789", nationalPattern: /^9\d{9}$/, stripLeadingZero: true },
  { code: "cn", dialCode: "86", labelEn: "China", labelZh: "中国", example: "138 0013 8000", nationalPattern: /^1\d{10}$/, stripLeadingZero: true },
  { code: "th", dialCode: "66", labelEn: "Thailand", labelZh: "泰国", example: "812 345 678", nationalPattern: /^[689]\d{8}$/, stripLeadingZero: true },
];

export const phoneCountryCodeSchema = z.enum(PHONE_COUNTRY_CODES);

export function getDefaultPhoneCountryCode(): PhoneCountryCode {
  return "sg";
}

export function getPhoneCountryOption(countryCode: PhoneCountryCode | string | undefined) {
  return PHONE_COUNTRIES.find((option) => option.code === countryCode) ?? PHONE_COUNTRIES[0];
}

function normalizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeMobilePhone(countryCode: PhoneCountryCode | string, nationalNumber: string) {
  const country = getPhoneCountryOption(countryCode);
  let digits = normalizeDigits(nationalNumber);
  if (country.stripLeadingZero) {
    digits = digits.replace(/^0+/, "");
  }
  if (!country.nationalPattern.test(digits)) {
    return null;
  }
  return `+${country.dialCode}${digits}`;
}

export function splitMobilePhone(phone: string): { countryCode: PhoneCountryCode; nationalNumber: string } {
  const digits = normalizeDigits(phone);
  if (!digits) {
    return { countryCode: getDefaultPhoneCountryCode(), nationalNumber: "" };
  }

  const options = [...PHONE_COUNTRIES].sort((left, right) => right.dialCode.length - left.dialCode.length);
  for (const option of options) {
    if (digits.startsWith(option.dialCode)) {
      const nationalNumber = digits.slice(option.dialCode.length);
      if (option.nationalPattern.test(nationalNumber)) {
        return { countryCode: option.code, nationalNumber };
      }
    }
  }

  const defaultCountry = getPhoneCountryOption(getDefaultPhoneCountryCode());
  const fallbackNational = digits.replace(/^\+/, "");
  if (defaultCountry.nationalPattern.test(fallbackNational)) {
    return { countryCode: defaultCountry.code, nationalNumber: fallbackNational };
  }

  return { countryCode: defaultCountry.code, nationalNumber: fallbackNational };
}

export function formatMobilePhoneDisplay(countryCode: PhoneCountryCode | string, nationalNumber: string) {
  const country = getPhoneCountryOption(countryCode);
  const raw = normalizeDigits(nationalNumber);

  if (!raw) {
    return `+${country.dialCode}`;
  }

  if (country.code === "sg" && raw.length === 8) {
    return `+65 ${raw.slice(0, 4)} ${raw.slice(4)}`;
  }
  if (country.code === "hk" && raw.length === 8) {
    return `+852 ${raw.slice(0, 4)} ${raw.slice(4)}`;
  }
  if (country.code === "us" && raw.length === 10) {
    return `+1 ${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6)}`;
  }
  if (country.code === "cn" && raw.length === 11) {
    return `+86 ${raw.slice(0, 3)} ${raw.slice(3, 7)} ${raw.slice(7)}`;
  }

  return `+${country.dialCode} ${raw}`;
}

export function parseStoredMobilePhone(phone: string) {
  const split = splitMobilePhone(phone);
  return {
    countryCode: split.countryCode,
    nationalNumber: split.nationalNumber,
    display: split.nationalNumber ? formatMobilePhoneDisplay(split.countryCode, split.nationalNumber) : "",
  };
}