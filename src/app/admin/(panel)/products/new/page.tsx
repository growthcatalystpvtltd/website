import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">New Product</h1>
      <p className="mt-1 text-sm text-neutral-700">Add a new product to the public Products page.</p>
      <div className="mt-10">
        <ProductForm />
      </div>
    </div>
  );
}
