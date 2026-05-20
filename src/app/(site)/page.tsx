import Hero from "@/components/home/Hero";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ClientSlider from "@/components/home/ClientSlider";
import { getSiteSetting } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function HomePage() {
  const [
    eyebrow,
    headline,
    subheadline,
    ctaPrimary,
    ctaSecondary,
    ctaHeadline,
    ctaSubheadline,
    clients,
  ] = await Promise.all([
    getSiteSetting("hero_eyebrow", "Software & IT Consulting · Nepal"),
    getSiteSetting("hero_headline", "We catalyze growth through disciplined process."),
    getSiteSetting(
      "hero_subheadline",
      "Growth Catalyst delivers software & IT consulting — from eCommerce and FinTech to ERP and AI — with a rigorous, process-first methodology that accelerates your business."
    ),
    getSiteSetting("hero_cta_primary", "Start a Project"),
    getSiteSetting("hero_cta_secondary", "Our Philosophy"),
    getSiteSetting("cta_headline", "Let's build something exceptional together"),
    getSiteSetting(
      "cta_subheadline",
      "Whether you're an enterprise or a growing SME, our process-driven approach delivers results that scale."
    ),
    prisma.client
      .findMany({ where: { active: true }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  return (
    <>
      <Hero
        eyebrow={eyebrow}
        headline={headline}
        subheadline={subheadline}
        ctaPrimary={ctaPrimary}
        ctaSecondary={ctaSecondary}
      />
      <ProcessTimeline />
      <ClientSlider clients={clients.length > 0 ? clients : undefined} />

      <section className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">
            Ready to grow?
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {ctaHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-medium text-neutral-800">
            {ctaSubheadline}
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 border border-black bg-black px-10 py-4 text-xs font-semibold tracking-widest text-white uppercase transition-opacity hover:opacity-80"
          >
            Contact Us
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
