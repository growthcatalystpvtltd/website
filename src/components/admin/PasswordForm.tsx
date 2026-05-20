"use client";

import { useState } from "react";

export default function PasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match.");
      setStatus("error");
      return;
    }
    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      }),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to update password.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Current Password</label>
        <input
          required
          type="password"
          value={form.currentPassword}
          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">New Password</label>
        <input
          required
          type="password"
          minLength={8}
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">Confirm New Password</label>
        <input
          required
          type="password"
          minLength={8}
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-black bg-black px-6 py-2.5 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50"
      >
        {status === "loading" ? "Updating..." : "Change Password"}
      </button>
      {status === "success" && <p className="text-xs text-neutral-700">Password updated successfully.</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
}
