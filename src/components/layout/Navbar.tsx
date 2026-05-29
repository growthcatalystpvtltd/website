"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  // { href: "/products", label: "Products" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3">
          {siteConfig.logoUrl && (
            <span className="relative inline-flex h-9 w-9 items-center justify-center">
              {siteConfig.logoUrl.startsWith("/") || siteConfig.logoUrl.startsWith("http") ? (
                <Image
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-sm font-bold">GC</span>
              )}
            </span>
          )}
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-[0.2em] uppercase">
              {siteConfig.name}
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-widest text-neutral-600 uppercase">
              Pvt. Ltd.
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                    active ? "text-black" : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          className="hidden items-center gap-1.5 border border-black bg-black px-5 py-2.5 text-xs font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-80 md:inline-flex"
        >
          Get Started
          <ArrowUpRight size={14} />
        </Link>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-white md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-xs font-semibold tracking-widest uppercase ${
                    pathname === link.href ? "text-black" : "text-neutral-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block border border-black bg-black px-5 py-3 text-center text-xs font-semibold tracking-widest text-white uppercase"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
