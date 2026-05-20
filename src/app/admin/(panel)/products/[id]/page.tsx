import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } }).catch(() => null);
  if (!product) notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      <p className="mt-1 text-sm text-neutral-700">Update product details and visibility.</p>
      <div className="mt-10">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
