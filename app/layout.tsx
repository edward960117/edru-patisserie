import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { getLang } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "EDRU Patisserie",
  description: "Premium cake ordering platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} className={`${cormorant.variable} ${lora.variable}`}>
      <body>
        <AnnouncementBar lang={lang} />
        <Header />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <BackButton lang={lang} />
        </div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
