import type { Metadata } from "next";
import { Target, Eye, Sparkles, Award, Users, Lightbulb } from "lucide-react";
import { getSiteSetting } from "@/lib/site-settings";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.legalName} — Nepal's process-oriented software and IT consulting firm helping enterprises and SMEs accelerate growth.`,
};

export default async function AboutPage() {
  const [headline, intro, mission, vision, values] = await Promise.all([
    getSiteSetting("about_headline", "Growth is not accidental — it is engineered."),
    getSiteSetting(
      "about_intro",
      "Growth Catalyst Pvt. Ltd. is a software and IT consulting firm headquartered in Imadol, Lalitpur. We serve corporate enterprises and growing SMEs across Nepal with solutions spanning eCommerce, IoT, FinTech, accounting systems, ERP, CMS, and bespoke business platforms.\n\nOur name reflects our mission: to be the catalyst that accelerates and enhances your business growth. We do not chase trends — we follow disciplined processes that deliver predictable, measurable outcomes.\n\nEvery engagement is structured around transparency, iterative delivery, and long-term partnership. From discovery to post-launch optimization, our six-step methodology ensures nothing is left to chance."
    ),
    getSiteSetting(
      "about_mission",
      "Accelerate and enhance client business growth through process excellence."
    ),
    getSiteSetting(
      "about_vision",
      "Become Nepal's most trusted process-oriented technology partner."
    ),
    getSiteSetting(
      "about_values",
      "Discipline · Transparency · Quality · Partnership"
    ),
  ]);

  const pillars = [
    { icon: Target, title: "Mission", text: mission },
    { icon: Eye, title: "Vision", text: vision },
    { icon: Sparkles, title: "Values", text: values },
  ];

  const stats = [
    { icon: Award, label: "Industries Served", value: "10+" },
    { icon: Users, label: "Active Engagements", value: "25+" },
    { icon: Lightbulb, label: "Solutions Delivered", value: "50+" },
  ];

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">About Us</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {headline}
        </h1>
        <div className="mt-12 space-y-6 text-base font-medium leading-relaxed text-neutral-800 whitespace-pre-line">
          {intro}
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white p-8">
              <pillar.icon size={22} className="text-black" />
              <h3 className="mt-4 text-sm font-bold tracking-widest uppercase">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <stat.icon size={20} className="text-black" />
                <p className="mt-4 text-4xl font-bold tracking-tight">{stat.value}</p>
                <p className="mt-1 text-[10px] font-bold tracking-widest text-neutral-600 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
