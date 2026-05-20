import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.legalName} | Software & IT Consulting in Nepal`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Process-oriented software & IT consulting in Nepal. Web, mobile, AI, eCommerce, FinTech, ERP, and enterprise solutions from ${siteConfig.address}.`,
  keywords: [
    "software company Nepal",
    "IT consulting Nepal",
    "web development Nepal",
    "mobile app development Nepal",
    "AI solutions Nepal",
    "ERP Nepal",
    "FinTech Nepal",
    "Growth Catalyst",
    "Imadol Lalitpur",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.website }],
  metadataBase: new URL(siteConfig.website),
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: siteConfig.website,
    siteName: siteConfig.name,
  },
  icons: {
    icon: siteConfig.logoUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
