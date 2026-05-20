"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export default function BlogFilter({ categories, activeCategory }: BlogFilterProps) {
  const pathname = usePathname();

  return (
    <div className="mt-12 flex flex-wrap gap-3">
      <Link
        href={pathname}
        className={`border px-4 py-2 text-[10px] tracking-widest uppercase transition-colors ${
          !activeCategory ? "border-black bg-black text-white" : "border-border text-muted hover:border-black"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`${pathname}?category=${cat.slug}`}
          className={`border px-4 py-2 text-[10px] tracking-widest uppercase transition-colors ${
            activeCategory === cat.slug
              ? "border-black bg-black text-white"
              : "border-border text-muted hover:border-black"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
