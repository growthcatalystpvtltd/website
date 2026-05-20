"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  imageUrl: string | null;
  published: boolean;
  order: number;
}

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    features: product?.features?.join("\n") ?? "",
    imageUrl: product?.imageUrl ?? "",
    published: product?.published ?? true,
    order: product?.order ?? 0,
  });

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      ...form,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      order: Number(form.order),
    };
    const url = product ? `/api/products/${product.id}` : "/api/products";
    const method = product ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError("Failed to save product.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Field label="Name *">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Slug">
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated if empty" className={inputClass} />
      </Field>
      <Field label="Description *">
        <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Features (one per line)">
        <textarea rows={5} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Real-time sync&#10;Custom reports&#10;Multi-user" className={inputClass} />
      </Field>
      <Field label="Image URL">
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="/products/example.jpg or https://..." className={inputClass} />
      </Field>
      <Field label="Order">
        <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputClass} />
      </Field>
      <label className="flex items-center gap-3 text-sm font-medium">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="h-4 w-4" />
        Published
      </label>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="border border-black bg-black px-8 py-3 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50">
        {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">{label}</label>
      {children}
    </div>
  );
}
