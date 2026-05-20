"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/team", label: "Team" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">
            Growth Catalyst
          </span>
          <span className="mt-0.5 text-[10px] tracking-widest text-muted uppercase">
            Pvt. Ltd.
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs font-medium tracking-widest uppercase transition-colors hover:text-black ${
                  pathname === link.href
                    ? "text-black"
                    : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden border border-black px-5 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors hover:bg-black hover:text-white md:inline-block"
        >
          Get Started
        </Link>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
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
                  className={`block py-3 text-xs font-medium tracking-widest uppercase ${
                    pathname === link.href ? "text-black" : "text-muted"
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
                className="block border border-black px-5 py-3 text-center text-xs font-medium tracking-widest uppercase"
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
