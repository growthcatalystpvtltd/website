"use client";

import { useState } from "react";

interface SiteSettingsFormProps {
  initialSettings: Record<string, string>;
}

const defaultFields = [
  { key: "hero_headline", label: "Hero Headline" },
  { key: "hero_subheadline", label: "Hero Subheadline" },
  { key: "about_intro", label: "About Intro (optional)" },
];

export default function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setStatus(res.ok ? "success" : "error");
  }

  const inputClass =
    "w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-black";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {defaultFields.map((field) => (
        <div key={field.key}>
          <label className="mb-2 block text-xs tracking-widest uppercase">{field.label}</label>
          {field.key.includes("subheadline") || field.key.includes("intro") ? (
            <textarea
              rows={4}
              value={settings[field.key] ?? ""}
              onChange={(e) =>
                setSettings({ ...settings, [field.key]: e.target.value })
              }
              className={inputClass}
            />
          ) : (
            <input
              value={settings[field.key] ?? ""}
              onChange={(e) =>
                setSettings({ ...settings, [field.key]: e.target.value })
              }
              className={inputClass}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-black bg-black px-8 py-3 text-xs tracking-widest text-white uppercase disabled:opacity-50"
      >
        {status === "loading" ? "Saving..." : "Save Settings"}
      </button>
      {status === "success" && (
        <p className="text-sm text-muted">Settings saved successfully.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Failed to save settings.</p>
      )}
    </form>
  );
}
