import Hero from "@/components/home/Hero";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ClientSlider from "@/components/home/ClientSlider";
import { getSiteSetting } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const [headline, subheadline, clients] = await Promise.all([
    getSiteSetting(
      "hero_headline",
      "We catalyze growth through disciplined process."
    ),
    getSiteSetting(
      "hero_subheadline",
      "Growth Catalyst delivers software & IT consulting — from eCommerce and FinTech to ERP and AI — with a rigorous, process-first methodology that accelerates your business."
    ),
    prisma.client
      .findMany({ where: { active: true }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  return (
    <>
      <Hero headline={headline} subheadline={subheadline} />
      <ProcessTimeline />
      <ClientSlider clients={clients.length > 0 ? clients : undefined} />

      <section className="border-t border-border px-6 py-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
            Ready to grow?
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
            Let&apos;s build something exceptional together
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted">
            Whether you&apos;re an enterprise or a growing SME, our process-driven approach delivers results that scale.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block border border-black bg-black px-10 py-4 text-xs font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-80"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
