import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Brain,
  Building2,
  ShoppingCart,
  Compass,
  ArrowUpRight,
} from "lucide-react";
import { getSiteSetting } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, AI solutions, ERP, CMS, eCommerce platforms, and IT consulting services for businesses in Nepal.",
};

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Scalable web applications, portals, and platforms built with modern frameworks and clean architecture.",
    tags: ["Next.js", "React", "Node.js"],
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps for iOS and Android with seamless backend integration.",
    tags: ["React Native", "Flutter", "iOS/Android"],
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description:
      "Intelligent automation, predictive analytics, chatbots, and custom ML models tailored to your domain.",
    tags: ["Machine Learning", "NLP", "Automation"],
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description:
      "ERP, CMS, accounting systems, and custom business software for complex organizational needs.",
    tags: ["ERP", "CMS", "FinTech", "IoT"],
  },
  {
    icon: ShoppingCart,
    title: "eCommerce Platforms",
    description:
      "End-to-end online stores with payment gateways, inventory management, and analytics dashboards.",
    tags: ["B2B", "B2C", "Marketplace"],
  },
  {
    icon: Compass,
    title: "Consulting & Strategy",
    description:
      "Technology audits, digital transformation roadmaps, and process optimization for IT teams.",
    tags: ["Architecture", "DevOps", "Agile"],
  },
];

export default async function ServicesPage() {
  const [headline, intro] = await Promise.all([
    getSiteSetting("services_headline", "Technology solutions engineered for growth"),
    getSiteSetting(
      "services_intro",
      "From startups to enterprise corporations, we deliver web, mobile, AI, and custom business solutions with our proven six-step process."
    ),
  ]);

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">Services</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl text-base font-medium text-neutral-800">{intro}</p>

        <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="group bg-white p-10 transition-colors hover:bg-neutral-50">
              <span className="inline-flex h-12 w-12 items-center justify-center border border-black bg-black text-white transition-colors group-hover:bg-white group-hover:text-black">
                <service.icon size={20} />
              </span>
              <h2 className="mt-6 text-lg font-bold">{service.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-white px-3 py-1 text-[10px] font-semibold tracking-widest uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-black bg-black px-10 py-4 text-xs font-semibold tracking-widest text-white uppercase hover:opacity-80"
          >
            Discuss Your Project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
