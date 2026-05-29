"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/icons/SocialIcons";
import { siteConfig, getTelHref } from "@/lib/site-config";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  // { href: "/products", label: "Products" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const socials = [
    { url: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { url: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    // { url: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
    // { url: siteConfig.social.twitter, label: "Twitter", Icon: TwitterIcon },
  ].filter((s) => s.url);

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-sm font-bold tracking-[0.2em] uppercase">{siteConfig.name}</p>
            <p className="mt-1 text-[10px] font-medium tracking-widest text-neutral-600 uppercase">
              {siteConfig.legalName.replace(siteConfig.name, "").trim() || "Pvt. Ltd."}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-neutral-700">
              Process-oriented software & IT consulting accelerating business growth across Nepal and beyond.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase">Navigate</p>
            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-neutral-700 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase">Contact</p>
            <address className="mt-6 space-y-3 text-sm not-italic text-neutral-700">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-black" />
                <span>{siteConfig.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-black" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-black">
                  {siteConfig.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-black" />
                <a href={getTelHref(siteConfig.phone)} className="hover:text-black">
                  {siteConfig.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Globe size={14} className="shrink-0 text-black" />
                <a
                  href={siteConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  {siteConfig.website.replace(/^https?:\/\//, "")}
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase">Newsletter</p>
            <p className="mt-6 text-sm text-neutral-700">
              Insights on technology, process, and growth.
            </p>
            <form onSubmit={handleNewsletter} className="mt-4 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-black bg-black px-4 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
              {status === "success" && (
                <p className="text-xs font-medium text-neutral-700">Thank you for subscribing.</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
              )}
            </form>
            {socials.length > 0 && (
              <div className="mt-8 flex gap-4">
                {socials.map(({ url, label, Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-neutral-700 transition-colors hover:text-black"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs font-medium text-neutral-700">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs font-medium tracking-widest text-neutral-700 uppercase">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
