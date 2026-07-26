import { cookies } from "next/headers";
import { type Lang, t } from "@/lib/i18n-shared";

export { t, type Lang };

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const value = cookieStore.get("blue_islet_lang")?.value;
  return value === "en" ? "en" : "zh";
}
