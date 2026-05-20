import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const products = await prisma.product
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">Products</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
          Solutions built for real business needs
        </h1>
        <p className="mt-6 max-w-xl text-sm text-muted">
          Our product portfolio spans industry-specific platforms managed and updated through our admin panel.
        </p>

        {products.length === 0 ? (
          <div className="mt-20 border border-dashed border-border p-16 text-center">
            <p className="text-sm text-muted">Products will appear here once added via the admin panel.</p>
          </div>
        ) : (
          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="border border-border p-8">
                <h2 className="text-lg font-medium">{product.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-4">
                  {product.description}
                </p>
                {product.features.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {product.features.slice(0, 4).map((f) => (
                      <li key={f} className="text-xs text-muted">— {f}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link href="/contact" className="inline-block border border-black px-10 py-4 text-xs font-medium tracking-widest uppercase hover:bg-black hover:text-white">
            Request a Demo
          </Link>
        </div>
      </div>
    </div>
  );
}

