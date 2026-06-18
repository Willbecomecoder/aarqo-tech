import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import{ GoogleAnalytics } from '@next/third-parties/google'
export const metadata = {
  title: "AarqoTech | AI Automation, Websites & AI UGC Ads",
  description:
    "AarqoTech helps businesses with AI Automation, Modern Websites, AI Bots and High-Converting AI UGC Ads.",

  openGraph: {
    title: "AarqoTech",
    description:
      "AI Automation, Websites, AI Bots and AI UGC Ads.",
    url: "https://www.aarqotech.com",
    siteName: "AarqoTech",
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <GoogleAnalytics gaId="G-3RQRYW2BT0" />
    </html>
  );
}
