"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs tracking-widest uppercase">
            Name *
          </label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs tracking-widest uppercase">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="mb-2 block text-xs tracking-widest uppercase">
          Company
        </label>
        <input
          id="company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-xs tracking-widest uppercase">
          Subject
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs tracking-widest uppercase">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full border border-black bg-black py-4 text-xs font-medium tracking-widest text-white uppercase disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-center text-sm text-muted">Thank you. We&apos;ll be in touch shortly.</p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-red-600">Failed to send. Please try again or email us directly.</p>
      )}
    </form>
  );
}
