import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig, getTelHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.legalName} for web, mobile, AI, and IT consulting services in Nepal. Located in ${siteConfig.address}.`,
};

const contactInfo = [
  { icon: MapPin, label: "Location", value: siteConfig.address, href: 'https://maps.app.goo.gl/1HVVKFbeKEn5BXzR7' },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: getTelHref(siteConfig.phone) },
  // { icon: Clock, label: "Hours", value: "Sun–Fri · 9:00 AM – 6:00 PM", href: undefined },
];

export default function ContactPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">Contact</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Let&apos;s start the conversation
          </h1>
          <p className="mt-6 text-base font-medium text-neutral-800">
            Tell us about your project. We typically respond within one business day.
          </p>
          <div className="mt-12 space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-black bg-black text-white">
                  <item.icon size={16} />
                </span>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-neutral-600 uppercase">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href} target="_blank"
                      className="mt-1 text-sm font-semibold text-black hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-black">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
