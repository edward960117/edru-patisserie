import type { Metadata } from "next";
import CustomerLoginForm from "@/components/CustomerLoginForm";
import { getLang } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();

  if (lang === "zh") {
    return {
      title: "会员登录 | BLUE ISLET",
      description: "会员登录与注册页面",
    };
  }

  return {
    title: "Member Login | BLUE ISLET",
    description: "Customer member login and registration page",
  };
}

export default async function CustomerLoginPage() {
  const lang = await getLang();
  return <CustomerLoginForm lang={lang} />;
}
