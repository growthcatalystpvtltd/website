"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroGrowthGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const update = () => {
      const section = node.closest("section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      setOffsetY((sectionCenter - viewportCenter) * 0.18);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative hidden lg:flex lg:items-center lg:justify-end"
    >
      <svg
        viewBox="0 0 520 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[min(78vh,680px)] w-auto max-w-full text-black select-none transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
      >
        {/* Growth curve */}
        <path
          d="M60 600 C160 500 210 360 280 260 C340 170 400 110 460 70"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M60 600 C180 460 240 300 340 180 C400 120 440 80 480 50"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
          strokeDasharray="6 10"
        />

        {/* Process steps */}
        <path d="M180 560 V100" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
        {[
          { y: 560, label: "DISCOVER" },
          { y: 468, label: "PLAN" },
          { y: 376, label: "BUILD" },
          { y: 284, label: "QA" },
          { y: 192, label: "DEPLOY" },
          { y: 100, label: "GROW", accent: true },
        ].map((step) => (
          <g key={step.label}>
            <circle
              cx="180"
              cy={step.y}
              r={step.accent ? 8 : 6}
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.25"
              fill={step.accent ? "currentColor" : "white"}
              fillOpacity={step.accent ? 0.1 : 1}
            />
            <text
              x="204"
              y={step.y + 4}
              fill="currentColor"
              fillOpacity={step.accent ? 0.55 : 0.42}
              style={{ font: `${step.accent ? 700 : 600} 11px system-ui, sans-serif` }}
            >
              {step.label}
            </text>
          </g>
        ))}

        {/* Catalyst hub */}
        <circle cx="360" cy="340" r="110" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
        <circle cx="360" cy="340" r="80" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
        <circle
          cx="360"
          cy="340"
          r="48"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.25"
          fill="currentColor"
          fillOpacity="0.04"
        />
        <circle cx="360" cy="340" r="7" fill="currentColor" fillOpacity="0.35" />
        <text
          x="360"
          y="408"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.5"
          style={{ font: "700 10px system-ui, sans-serif" }}
        >
          CATALYST
        </text>

        {/* Domain branches toward content */}
        <path d="M312 340 H100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <path
          d="M340 280 C280 260 180 240 100 220"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <path
          d="M340 400 C280 420 180 440 100 460"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <path
          d="M388 300 C428 240 450 180 470 120"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        {[
          { y: 220, label: "eCOMMERCE" },
          { y: 340, label: "FINTECH / ERP" },
          { y: 460, label: "IoT / AI" },
        ].map((node) => (
          <g key={node.label}>
            <circle cx="100" cy={node.y} r="4" fill="currentColor" fillOpacity="0.28" />
            <text
              x="114"
              y={node.y + 4}
              fill="currentColor"
              fillOpacity="0.42"
              style={{ font: "600 10px system-ui, sans-serif" }}
            >
              {node.label}
            </text>
          </g>
        ))}

        <circle cx="470" cy="120" r="4" fill="currentColor" fillOpacity="0.22" />
        <text
          x="458"
          y="108"
          textAnchor="end"
          fill="currentColor"
          fillOpacity="0.38"
          style={{ font: "600 10px system-ui, sans-serif" }}
        >
          PROCESS
        </text>
        <text
          x="458"
          y="122"
          textAnchor="end"
          fill="currentColor"
          fillOpacity="0.38"
          style={{ font: "600 10px system-ui, sans-serif" }}
        >
          FIRST
        </text>
      </svg>
    </div>
  );
}
