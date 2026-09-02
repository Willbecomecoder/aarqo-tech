import localFont from "next/font/local";
import "./globals.css";
import{ GoogleAnalytics } from '@next/third-parties/google'
export const metadata = {
  title: "AarqoTech | AI Automation for Hospitality and Beauty Business",
  description:
    "AarqoTech builds AI automation for hospitality and beauty businesses — chatbots, AI calling agents, WhatsApp automation and websites for restaurants, salons and nightclubs.",

  openGraph: {
    title: "AarqoTech",
    description:
      "AI automation for hospitality and beauty business — chatbots, AI calling agents, WhatsApp automation and websites.",
    url: "https://www.aarqotech.com",
    siteName: "AarqoTech",
    type: "website",
  },
};

const clashDisplay = localFont({
  variable: "--font-clash-display",
  display: "swap",
  src: [
    { path: "./fonts/ClashDisplay-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
});

const generalSans = localFont({
  variable: "--font-general-sans",
  display: "swap",
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${generalSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <GoogleAnalytics gaId="G-3RQRYW2BT0" />
    </html>
  );
}
