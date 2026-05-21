import {
  Compass,
  LayoutTemplate,
  Code2,
  ShieldCheck,
  Rocket,
  TrendingUp,
} from "lucide-react";
import HomeSection from "@/components/home/HomeSection";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Discovery & Alignment",
    description:
      "We map your business objectives, stakeholders, and constraints. Every engagement begins with clarity — not assumptions.",
  },
  {
    number: "02",
    icon: LayoutTemplate,
    title: "Architecture & Planning",
    description:
      "Technical architecture, sprint planning, and milestone definitions. Transparent roadmaps with measurable deliverables.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Iterative Development",
    description:
      "Agile sprints with continuous integration, code reviews, and regular demos. You see progress at every stage.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Automated testing, security audits, and performance benchmarks. Nothing ships without passing our quality gates.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Deployment & Handover",
    description:
      "Production deployment, documentation, and team training. Your team owns the solution from day one.",
  },
  {
    number: "06",
    icon: TrendingUp,
    title: "Growth & Optimization",
    description:
      "Post-launch monitoring, analytics, and iterative improvements. We stay as your catalyst for sustained growth.",
  },
];

export default function ProcessTimeline() {
  return (
    <HomeSection
      className="border-t border-neutral-800 bg-black px-6 py-32 text-neutral-400"
      lines={[
        { src: "/lines-process.svg", placement: "top-right", speed: 0.3, opacity: 0.85 },
        { src: "/lines-process-accent.svg", placement: "bottom-left", speed: 0.45, opacity: 0.6 },
      ]}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-xs font-bold tracking-[0.3em] text-neutral-400 uppercase">
            Our Process
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Six disciplined steps to deliver excellence
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-400">
            Growth Catalyst is strictly process-oriented. Our methodology eliminates ambiguity and ensures predictable, high-quality outcomes for every project.
          </p>
        </div>

        <div className="mt-20 grid gap-px border border-neutral-800 bg-neutral-800 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="bg-neutral-950 p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center border border-white bg-white text-black">
                  <step.icon size={18} />
                </span>
                <span className="text-3xl font-bold tracking-tight text-neutral-400">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-neutral-400">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
