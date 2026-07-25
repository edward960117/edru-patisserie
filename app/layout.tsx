import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import IntroGate from "@/components/IntroGate";
import { getLang } from "@/lib/i18n";
import { readSiteAnnouncement } from "@/lib/announcement";
import SellerNoticeBar from "@/components/SellerNoticeBar";

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
  title: "ÈDRU Patisserie",
  description: "Premium cake ordering platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const announcement = await readSiteAnnouncement();
  const announcementText = lang === "zh" ? announcement.messageZh : announcement.messageEn;

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} className={`${cormorant.variable} ${lora.variable}`}>
      <body>
        <div className="app-shell">
          <div className="app-top">
            <div className="sticky top-0 z-[70]">
              <AnnouncementBar lang={lang} />
              <Header lang={lang} />
            </div>
            <SellerNoticeBar enabled={announcement.enabled} message={announcementText} />
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6">
              <BackButton lang={lang} />
            </div>
          </div>
          <div className="app-scroll">
            <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">{children}</main>
            <Footer lang={lang} />
          </div>
        </div>
        <IntroGate lang={lang} />
      </body>
    </html>
  );
}
