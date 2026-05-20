"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { slugify } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

export default function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(name) }),
    });
    setName("");
    setLoading(false);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category and all its posts?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreate} className="flex gap-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="flex-1 border border-border px-4 py-3 text-sm outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-black bg-black px-6 py-3 text-xs tracking-widest text-white uppercase disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <ul className="divide-y divide-border border border-border bg-white">
        {initialCategories.length === 0 ? (
          <li className="px-6 py-8 text-center text-sm text-muted">No categories yet.</li>
        ) : (
          initialCategories.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-muted">
                  /{cat.slug} · {cat._count?.posts ?? 0} posts
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(cat.id)}
                className="text-xs uppercase text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
