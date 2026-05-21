"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeroGraphic() {
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
      <Image
        src="/hero-growth-graphic.svg"
        alt=""
        width={560}
        height={720}
        priority
        className="h-[min(78vh,720px)] w-auto max-w-none select-none transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate3d(0, ${offsetY}px, 0)` }}
        draggable={false}
      />
    </div>
  );
}
