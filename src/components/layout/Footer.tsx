"use client";

import Link from "next/link";
import { useState } from "react";
import { Share2, Globe, Mail } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
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

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase">
              Growth Catalyst
            </p>
            <p className="mt-1 text-[10px] tracking-widest text-muted uppercase">
              Pvt. Ltd.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Process-oriented software & IT consulting accelerating business growth across Nepal and beyond.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest uppercase">Navigate</p>
            <ul className="mt-6 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest uppercase">Contact</p>
            <address className="mt-6 space-y-3 text-sm not-italic text-muted">
              <p>Imadol, Lalitpur</p>
              <p>
                <a href="mailto:info@growthcatalyst.com.np" className="hover:text-black">
                  info@growthcatalyst.com.np
                </a>
              </p>
              <p>
                <a href="tel:+9779849242008" className="hover:text-black">
                  +977 984-9242008
                </a>
              </p>
              <p>
                <a
                  href="https://growthcatalyst.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black"
                >
                  growthcatalyst.com.np
                </a>
              </p>
            </address>
          </div>

          <div>
            <p className="text-xs font-medium tracking-widest uppercase">Newsletter</p>
            <p className="mt-6 text-sm text-muted">
              Insights on technology, process, and growth.
            </p>
            <form onSubmit={handleNewsletter} className="mt-4 flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="border border-black bg-black px-4 py-3 text-xs font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
              {status === "success" && (
                <p className="text-xs text-muted">Thank you for subscribing.</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
              )}
            </form>
            <div className="mt-8 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-black"
              >
                <Share2 size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted transition-colors hover:text-black"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted transition-colors hover:text-black"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Growth Catalyst Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted tracking-widest uppercase">
            Accelerate · Enhance · Grow
          </p>
        </div>
      </div>
    </footer>
  );
}
