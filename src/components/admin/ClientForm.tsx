"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  order: number;
  active: boolean;
}

export default function ClientForm({ client }: { client?: Client }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: client?.name ?? "",
    logoUrl: client?.logoUrl ?? "",
    order: client?.order ?? 0,
    active: client?.active ?? true,
  });

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const url = client ? `/api/clients/${client.id}` : "/api/clients";
    const method = client ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, order: Number(form.order) }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/clients");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Name *</label>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Logo URL</label>
        <input value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="/clients/logo.svg" className={inputClass} />
        <p className="mt-1 text-xs text-neutral-600">Leave blank to show client name as text logo.</p>
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Order</label>
        <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className={inputClass} />
      </div>
      <label className="flex items-center gap-3 text-sm font-medium">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="h-4 w-4" />
        Active
      </label>
      <button type="submit" disabled={loading} className="border border-black bg-black px-8 py-3 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50">
        {loading ? "Saving..." : client ? "Update Client" : "Add Client"}
      </button>
    </form>
  );
}
