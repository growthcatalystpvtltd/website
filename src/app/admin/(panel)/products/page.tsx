import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProductsPage() {
  const products = await prisma.product
    .findMany({ orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Products"
        description="Manage product listings shown on the public Products page"
        actionLabel="New Product"
        actionHref="/admin/products/new"
      />

      <div className="mt-10 overflow-x-auto border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-neutral-50 text-left text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-600">
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-semibold">{p.name}</td>
                  <td className="px-6 py-4 text-neutral-700">/{p.slug}</td>
                  <td className="px-6 py-4 text-neutral-700">{p.order}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold tracking-widest uppercase ${p.published ? "text-black" : "text-neutral-500"}`}>
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/products/${p.id}`} className="text-[11px] font-semibold tracking-widest uppercase hover:underline">
                        Edit
                      </Link>
                      <DeleteButton url={`/api/products/${p.id}`} confirmText="Delete this product?" />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
