"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toDateInputValue } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface BlogPostFormProps {
  categories: Category[];
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    published: boolean;
    categoryId: string;
    createdAt: string | Date;
  };
}

export default function BlogPostForm({ categories, post }: BlogPostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    published: post?.published ?? false,
    categoryId: post?.categoryId ?? categories[0]?.id ?? "",
    publishedAt: post ? toDateInputValue(post.createdAt) : toDateInputValue(new Date()),
  });

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const url = post ? `/api/blogs/${post.id}` : "/api/blogs";
    const method = post ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/blogs");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="mb-2 block text-xs tracking-widest uppercase">Title *</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs tracking-widest uppercase">Slug</label>
        <input
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          placeholder="auto-generated from title if empty"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs tracking-widest uppercase">Publish Date *</label>
        <input
          type="date"
          required
          value={form.publishedAt}
          onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-neutral-600">
          Shown on the public blog listing and post page.
        </p>
      </div>
      <div>
        <label className="mb-2 block text-xs tracking-widest uppercase">Category *</label>
        <select
          required
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className={inputClass}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-xs tracking-widest uppercase">Excerpt</label>
        <textarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-xs tracking-widest uppercase">Content *</label>
        <textarea
          required
          rows={12}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className={inputClass}
        />
      </div>
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
          className="h-4 w-4 border border-black"
        />
        Publish immediately
      </label>
      <button
        type="submit"
        disabled={loading}
        className="border border-black bg-black px-8 py-3 text-xs tracking-widest text-white uppercase disabled:opacity-50"
      >
        {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
