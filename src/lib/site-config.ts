export const siteConfig = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Growth Catalyst",
  legalName:
    process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME ?? "Growth Catalyst Pvt. Ltd.",
  tagline:
    process.env.NEXT_PUBLIC_COMPANY_TAGLINE ?? "Accelerate · Enhance · Grow",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+977 9849242008",
  email:
    process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "info@growthcatalyst.com.np",
  address:
    process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "Imadol, Lalitpur, Nepal",
  website:
    process.env.NEXT_PUBLIC_COMPANY_WEBSITE ?? "https://growthcatalyst.com.np",
  logoUrl: process.env.NEXT_PUBLIC_LOGO_URL ?? "/logo.svg",
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL ?? "",
  },
};

export function getTelHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
