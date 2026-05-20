import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Services" };

const services = [
  {
    title: "Web Development",
    description: "Scalable web applications, portals, and platforms built with modern frameworks and clean architecture.",
    tags: ["Next.js", "React", "Node.js"],
  },
  {
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android with seamless backend integration.",
    tags: ["React Native", "Flutter", "iOS/Android"],
  },
  {
    title: "AI Solutions",
    description: "Intelligent automation, predictive analytics, chatbots, and custom ML models tailored to your domain.",
    tags: ["Machine Learning", "NLP", "Automation"],
  },
  {
    title: "Enterprise Solutions",
    description: "ERP, CMS, accounting systems, and custom business software for complex organizational needs.",
    tags: ["ERP", "CMS", "FinTech", "IoT"],
  },
  {
    title: "eCommerce Platforms",
    description: "End-to-end online stores with payment gateways, inventory management, and analytics dashboards.",
    tags: ["B2B", "B2C", "Marketplace"],
  },
  {
    title: "Consulting & Strategy",
    description: "Technology audits, digital transformation roadmaps, and process optimization for IT teams.",
    tags: ["Architecture", "DevOps", "Agile"],
  },
];

export default function ServicesPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">Services</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-light tracking-tight md:text-5xl">
          Technology solutions engineered for growth
        </h1>
        <p className="mt-6 max-w-xl text-sm text-muted">
          From startups to enterprise corporations, we deliver web, mobile, AI, and custom business solutions with our proven six-step process.
        </p>
        <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="bg-white p-10">
              <h2 className="text-lg font-medium">{service.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span key={tag} className="border border-border px-3 py-1 text-[10px] tracking-widest uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link href="/contact" className="inline-block border border-black bg-black px-10 py-4 text-xs font-medium tracking-widest text-white uppercase">
            Discuss Your Project
          </Link>
        </div>
      </div>
    </div>
  );
}
