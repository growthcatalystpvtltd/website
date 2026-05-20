"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBlogButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this blog post?")) return;
    setLoading(true);
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="text-xs uppercase text-red-600 hover:underline disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
