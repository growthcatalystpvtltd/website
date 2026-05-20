import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export default function Hero({
  eyebrow = "Software & IT Consulting · Nepal",
  headline = "We catalyze growth through disciplined process.",
  subheadline = "Growth Catalyst delivers software & IT consulting — from eCommerce and FinTech to ERP and AI — with a rigorous, process-first methodology that accelerates your business.",
  ctaPrimary = "Start a Project",
  ctaSecondary = "Our Philosophy",
}: HeroProps) {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">
          <Sparkles size={14} className="text-black" />
          {eyebrow}
        </p>
        <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-black md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-neutral-800 md:text-lg">
          {subheadline}
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-black bg-black px-8 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-80"
          >
            {ctaPrimary}
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border border-black px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
          >
            {ctaSecondary}
          </Link>
        </div>
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
          {[
            { label: "Domains", value: "eCommerce · IoT · FinTech" },
            { label: "Solutions", value: "ERP · CMS · Custom" },
            { label: "Clients", value: "Enterprise & SME" },
            { label: "Approach", value: "Process-First" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] font-bold tracking-widest text-neutral-600 uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-black">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
