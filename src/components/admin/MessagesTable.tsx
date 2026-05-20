"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: Date | string;
}

export default function MessagesTable({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  async function toggleRead(id: string, read: boolean) {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (messages.length === 0) {
    return (
      <div className="border border-dashed border-border bg-white p-16 text-center">
        <p className="text-sm text-neutral-700">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`border bg-white transition-colors ${m.read ? "border-border" : "border-black"}`}
        >
          <button
            type="button"
            onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
          >
            <div className="flex items-start gap-4">
              {m.read ? (
                <MailOpen size={16} className="mt-1 shrink-0 text-neutral-500" />
              ) : (
                <Mail size={16} className="mt-1 shrink-0 text-black" />
              )}
              <div>
                <p className={`text-sm ${m.read ? "font-medium" : "font-bold"}`}>
                  {m.name} <span className="text-neutral-600">·</span> {m.email}
                </p>
                <p className="mt-1 text-sm text-neutral-700">
                  {m.subject ?? m.message.slice(0, 80) + (m.message.length > 80 ? "…" : "")}
                </p>
                <p className="mt-1 text-[10px] tracking-widest text-neutral-500 uppercase">
                  {new Date(m.createdAt).toLocaleString()}
                  {m.company ? ` · ${m.company}` : ""}
                </p>
              </div>
            </div>
          </button>
          {expanded === m.id && (
            <div className="border-t border-border px-6 py-5">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
                {m.message}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject ?? "Your enquiry")}`}
                  className="border border-black bg-black px-4 py-2 text-[10px] font-semibold tracking-widest text-white uppercase"
                >
                  Reply via Email
                </a>
                <button
                  type="button"
                  onClick={() => toggleRead(m.id, m.read)}
                  className="text-[10px] font-semibold tracking-widest uppercase hover:underline"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(m.id)}
                  className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-red-600 hover:underline"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
