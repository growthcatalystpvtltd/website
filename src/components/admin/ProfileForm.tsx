"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileForm({
  user,
}: {
  user: { id: string; email: string; name: string | null };
}) {
  const router = useRouter();
  const [form, setForm] = useState({ name: user.name ?? "", email: user.email });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) router.refresh();
  }

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-black bg-black px-6 py-2.5 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50"
      >
        {status === "loading" ? "Saving..." : "Save Profile"}
      </button>
      {status === "success" && <p className="text-xs text-neutral-700">Profile updated.</p>}
      {status === "error" && <p className="text-xs text-red-600">Update failed.</p>}
    </form>
  );
}
