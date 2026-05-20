const steps = [
  {
    number: "01",
    title: "Discovery & Alignment",
    description:
      "We map your business objectives, stakeholders, and constraints. Every engagement begins with clarity — not assumptions.",
  },
  {
    number: "02",
    title: "Architecture & Planning",
    description:
      "Technical architecture, sprint planning, and milestone definitions. Transparent roadmaps with measurable deliverables.",
  },
  {
    number: "03",
    title: "Iterative Development",
    description:
      "Agile sprints with continuous integration, code reviews, and regular demos. You see progress at every stage.",
  },
  {
    number: "04",
    title: "Quality Assurance",
    description:
      "Automated testing, security audits, and performance benchmarks. Nothing ships without passing our quality gates.",
  },
  {
    number: "05",
    title: "Deployment & Handover",
    description:
      "Production deployment, documentation, and team training. Your team owns the solution from day one.",
  },
  {
    number: "06",
    title: "Growth & Optimization",
    description:
      "Post-launch monitoring, analytics, and iterative improvements. We stay as your catalyst for sustained growth.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="border-t border-border bg-white px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">
            Our Process
          </p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
            Six disciplined steps to deliver excellence
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Growth Catalyst is strictly process-oriented. Our methodology eliminates ambiguity and ensures predictable, high-quality outcomes for every project.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute top-0 bottom-0 left-4 hidden w-px bg-border md:left-1/2 md:block md:-translate-x-px" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col gap-6 md:flex-row md:items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div
                  className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                >
                  <span className="text-xs font-medium tracking-widest text-muted">
                    Step {step.number}
                  </span>
                  <h3 className="mt-2 text-xl font-medium">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
                <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-black bg-white md:left-1/2">
                  <span className="text-[10px] font-medium">{step.number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
