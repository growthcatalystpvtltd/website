"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date | string;
}

export default function UserManager({
  users,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setForm({ name: "", email: "", password: "" });
      setShowForm(false);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to create user");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this user?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    router.refresh();
  }

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  return (
    <div className="space-y-6">
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 border border-black bg-black px-6 py-2.5 text-[11px] font-semibold tracking-widest text-white uppercase hover:opacity-80"
        >
          <UserPlus size={14} />
          Add User
        </button>
      ) : (
        <form onSubmit={handleCreate} className="border border-border bg-white p-6">
          <h3 className="text-sm font-bold tracking-widest uppercase">New Admin User</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <input
              required
              type="password"
              minLength={8}
              placeholder="Password (min 8 chars)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`${inputClass} sm:col-span-2`}
            />
          </div>
          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="border border-black bg-black px-6 py-2.5 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-border px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:border-black"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-neutral-50 text-left text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-6 py-4 font-semibold">
                  {u.name ?? "—"}
                  {u.id === currentUserId && (
                    <span className="ml-2 text-[10px] font-medium tracking-widest text-neutral-500 uppercase">
                      (you)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-neutral-700">{u.email}</td>
                <td className="px-6 py-4 text-[10px] tracking-widest text-neutral-700 uppercase">{u.role}</td>
                <td className="px-6 py-4 text-neutral-700">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    {u.id !== currentUserId && (
                      <button
                        type="button"
                        onClick={() => handleDelete(u.id)}
                        className="text-neutral-600 hover:text-red-600"
                        title="Delete user"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
