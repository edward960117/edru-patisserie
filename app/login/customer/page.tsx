import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CustomerLoginForm from "@/components/CustomerLoginForm";
import { getLang } from "@/lib/i18n";
import { getCustomerSession } from "@/lib/auth/customer-session";

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
  const session = await getCustomerSession();

  if (session) {
    redirect("/account");
  }

  return <CustomerLoginForm lang={lang} />;
}
