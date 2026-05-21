import type { Metadata } from "next";
import Link from "next/link";
import { Package, Check, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getProductIcon } from "@/lib/product-icons";
import { getSiteSetting } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Growth Catalyst's products — industry-specific platforms and tools for businesses operating in Nepal.",
};

export default async function ProductsPage() {
  const [headline, intro, products] = await Promise.all([
    getSiteSetting("products_headline", "Solutions built for real business needs"),
    getSiteSetting(
      "products_intro",
      "Our product portfolio spans industry-specific platforms managed and updated through our admin panel."
    ),
    prisma.product
      .findMany({ where: { published: true }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">Products</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl text-base font-medium text-neutral-800">{intro}</p>

        {products.length === 0 ? (
          <div className="mt-20 border border-dashed border-border bg-neutral-50 p-16 text-center">
            <Package size={32} className="mx-auto text-neutral-400" />
            <p className="mt-4 text-sm font-medium text-neutral-700">
              Products will appear here once added via the admin panel.
            </p>
          </div>
        ) : (
          <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const Icon = getProductIcon(product.slug);
              return (
              <article key={product.id} className="group bg-white p-8 transition-colors hover:bg-neutral-50">
                <span className="inline-flex h-12 w-12 items-center justify-center border border-black bg-black text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <Icon size={20} />
                </span>
                <h2 className="mt-6 text-lg font-bold">{product.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700 line-clamp-4">
                  {product.description}
                </p>
                {product.features.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {product.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-neutral-800">
                        <Check size={14} className="mt-0.5 shrink-0 text-black" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
            })}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-black px-10 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white"
          >
            Request a Demo
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
