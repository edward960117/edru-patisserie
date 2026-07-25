import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import { getLang } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();

  if (lang === "zh") {
    return {
      title: "员工登录 | EDRU Patisserie",
      description: "员工后台登录页面",
    };
  }

  return {
    title: "Staff Login | EDRU Patisserie",
    description: "Staff admin login page",
  };
}

export default async function LoginPage() {
  const lang = await getLang();
  return <LoginForm lang={lang} />;
}
