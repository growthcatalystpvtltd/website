"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: Record<string, string[] | undefined>;
      };
      if (!res.ok) {
        const fieldMsg = data.fields
          ? Object.values(data.fields)
              .flat()
              .filter(Boolean)
              .join(" ")
          : "";
        setErrorMessage(fieldMsg || data.error || "Failed to send. Please try again.");
        setStatus("error");
        return;
      }
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
      setStatus("success");
    } catch {
      setErrorMessage("Failed to send. Please try again or email us directly.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center border border-border bg-white p-12 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center border border-black bg-black text-white">
          <CheckCircle2 size={24} />
        </span>
        <h2 className="mt-6 text-xl font-bold tracking-tight">Message received</h2>
        <p className="mt-3 max-w-sm text-sm font-medium text-neutral-800">
          Thank you for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 border border-black px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:bg-black hover:text-white"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border border-border bg-white p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[10px] font-bold tracking-widest uppercase">
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
          <label htmlFor="email" className="mb-2 block text-[10px] font-bold tracking-widest uppercase">
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
        <label htmlFor="company" className="mb-2 block text-[10px] font-bold tracking-widest uppercase">
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
        <label htmlFor="subject" className="mb-2 block text-[10px] font-bold tracking-widest uppercase">
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
        <label htmlFor="message" className="mb-2 block text-[10px] font-bold tracking-widest uppercase">
          Message *
        </label>
        <textarea
          id="message"
          required
          minLength={10}
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
        />
        <p className="mt-2 text-[10px] text-neutral-600">Minimum 10 characters</p>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 border border-black bg-black py-4 text-xs font-semibold tracking-widest text-white uppercase hover:opacity-80 disabled:opacity-50"
      >
        {status === "loading" ? (
          "Sending..."
        ) : (
          <>
            <Send size={14} />
            Send Message
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          {errorMessage || "Failed to send. Please try again or email us directly."}
        </p>
      )}
    </form>
  );
}
