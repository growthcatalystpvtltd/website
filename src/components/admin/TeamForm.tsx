"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  linkedin: string | null;
  order: number;
  published: boolean;
}

export default function TeamForm({ member }: { member?: TeamMember }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: member?.name ?? "",
    role: member?.role ?? "",
    bio: member?.bio ?? "",
    imageUrl: member?.imageUrl ?? "",
    linkedin: member?.linkedin ?? "",
    order: member?.order ?? 0,
    published: member?.published ?? true,
  });

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, order: Number(form.order) };
    const url = member ? `/api/team/${member.id}` : "/api/team";
    const method = member ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/team");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Field label="Name *">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Role *">
        <input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Bio">
        <textarea rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Image URL">
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className={inputClass} />
      </Field>
      <Field label="LinkedIn URL">
        <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Order">
        <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputClass} />
      </Field>
      <label className="flex items-center gap-3 text-sm font-medium">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="h-4 w-4" />
        Published
      </label>
      <button type="submit" disabled={loading} className="border border-black bg-black px-8 py-3 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50">
        {loading ? "Saving..." : member ? "Update Member" : "Add Member"}
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
