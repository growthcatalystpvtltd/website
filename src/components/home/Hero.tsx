import Link from "next/link";

interface HeroProps {
  headline?: string;
  subheadline?: string;
}

export default function Hero({
  headline = "We catalyze growth through disciplined process.",
  subheadline = "Growth Catalyst delivers software & IT consulting — from eCommerce and FinTech to ERP and AI — with a rigorous, process-first methodology that accelerates your business.",
}: HeroProps) {
  return (
    <section className="flex min-h-screen flex-col justify-center px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
          Software & IT Consulting · Nepal
        </p>
        <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.15] tracking-tight md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {subheadline}
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-black bg-black px-8 py-4 text-xs font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-80"
          >
            Start a Project
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border border-black px-8 py-4 text-xs font-medium tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
          >
            Our Philosophy
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
              <p className="text-[10px] tracking-widest text-muted uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
