"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  url: string;
  confirmText?: string;
  label?: string;
  iconOnly?: boolean;
}

export default function DeleteButton({
  url,
  confirmText = "Are you sure you want to delete this item?",
  label = "Delete",
  iconOnly = false,
}: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(confirmText)) return;
    setLoading(true);
    await fetch(url, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        title={label}
        className="text-neutral-600 hover:text-red-600 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-red-600 hover:underline disabled:opacity-50"
    >
      <Trash2 size={12} />
      {loading ? "..." : label}
    </button>
  );
}
