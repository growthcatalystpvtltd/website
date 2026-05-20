import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
          About Us
        </p>
        <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
          Growth is not accidental — it is engineered.
        </h1>
        <div className="mt-12 space-y-6 text-sm leading-relaxed text-muted">
          <p>
            Growth Catalyst Pvt. Ltd. is a software and IT consulting firm headquartered in Imadol, Lalitpur. We serve corporate enterprises and growing SMEs across Nepal with solutions spanning eCommerce, IoT, FinTech, accounting systems, ERP, CMS, and bespoke business platforms.
          </p>
          <p>
            Our name reflects our mission: to be the catalyst that accelerates and enhances your business growth. We do not chase trends — we follow disciplined processes that deliver predictable, measurable outcomes.
          </p>
          <p>
            Every engagement is structured around transparency, iterative delivery, and long-term partnership. From discovery to post-launch optimization, our six-step methodology ensures nothing is left to chance.
          </p>
        </div>
        <div className="mt-16 grid gap-8 border-t border-border pt-16 sm:grid-cols-3">
          {[
            { title: "Mission", text: "Accelerate and enhance client business growth through process excellence." },
            { title: "Vision", text: "Become Nepal's most trusted process-oriented technology partner." },
            { title: "Values", text: "Discipline · Transparency · Quality · Partnership" },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-xs font-medium tracking-widest uppercase">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
