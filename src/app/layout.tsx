import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Growth Catalyst Pvt. Ltd. | Software & IT Consulting",
    template: "%s | Growth Catalyst",
  },
  description:
    "Process-oriented software & IT consulting in Nepal. Web, mobile, AI, eCommerce, FinTech, ERP, and enterprise solutions.",
  metadataBase: new URL("https://growthcatalyst.com.np"),
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
