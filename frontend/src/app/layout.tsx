import type { Metadata } from "next";
import { fetchSiteSettings } from "@/lib/strapi";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "北辰青年发展中心",
    template: "%s | 北辰青年发展中心",
  },
  description: "让青年活成自己想要的模样。通过社群、行动与对话，陪伴你探索成长的可能性。",
  keywords: [
    "青年发展",
    "社群",
    "成长",
    "人生学校",
    "北辰生活",
    "青年活动",
  ],
  authors: [{ name: "北辰青年发展中心" }],
  creator: "北辰青年发展中心",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://beichen.org",
    siteName: "北辰青年发展中心",
    title: "北辰青年发展中心",
    description:
      "让青年活成自己想要的模样。通过社群、行动与对话，陪伴你探索成长的可能性。",
  },
  twitter: {
    card: "summary_large_image",
    title: "北辰青年发展中心",
    description:
      "让青年活成自己想要的模样。通过社群、行动与对话，陪伴你探索成长的可能性。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings for navbar and footer
  let settings;
  try {
    const response = await fetchSiteSettings();
    settings = response.data;
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Navbar settings={settings} />
        {children}
        <Footer footer={settings?.footer} />
      </body>
    </html>
  );
}
