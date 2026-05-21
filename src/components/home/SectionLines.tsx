"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type LinesVariant = "light" | "dark";
export type LinesPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

const PLACEMENT_CLASS: Record<LinesPlacement, string> = {
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
};

const VARIANT_SRC: Record<LinesVariant, string> = {
  light: "/lines-light.svg",
  dark: "/process-lines.svg",
};

interface SectionLinesProps {
  variant?: LinesVariant;
  placement?: LinesPlacement;
  src?: string;
  speed?: number;
  opacity?: number;
}

export default function SectionLines({
  variant = "light",
  placement = "top-right",
  src,
  speed = 0.28,
  opacity = 0.6,
}: SectionLinesProps) {
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
      setOffsetY((sectionCenter - viewportCenter) * speed);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute z-0 ${PLACEMENT_CLASS[placement]}`}
      style={{ opacity }}
    >
      <Image
        src={src ?? VARIANT_SRC[variant]}
        alt=""
        width={480}
        height={360}
        className="w-[min(52vw,440px)] max-w-none select-none transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
        draggable={false}
      />
    </div>
  );
}
