import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IntroGate from "@/components/IntroGate";
import { getLang } from "@/lib/i18n";
import { readSiteAnnouncement } from "@/lib/announcement";
import { getCustomerDisplayName } from "@/lib/auth/customer-display";
import SellerNoticeBar from "@/components/SellerNoticeBar";
import ProgressBar from "@/components/ProgressBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blue-islet.com"),
  title: {
    default: "BLUE ISLET",
    template: "%s · BLUE ISLET",
  },
  description: "Handcrafted premium cakes and desserts for modern celebrations. Order online for pickup or delivery.",
  openGraph: {
    title: "BLUE ISLET",
    description: "Handcrafted premium cakes and desserts for modern celebrations.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#588cd9",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const announcement = await readSiteAnnouncement();
  const announcementText = lang === "zh" ? announcement.messageZh : announcement.messageEn;
  const customerName = await getCustomerDisplayName();

  return (
    <html lang={lang === "zh" ? "zh-CN" : "en"} className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <ProgressBar />
        <div className="app-shell">
          <div className="app-top">
            <div className="sticky top-0 z-[70]">
              <AnnouncementBar lang={lang} />
              <Header lang={lang} customerName={customerName} />
            </div>
            <SellerNoticeBar enabled={announcement.enabled} message={announcementText} />
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
