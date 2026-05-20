"use client";

import { useState } from "react";

interface SiteSettingsFormProps {
  initialSettings: Record<string, string>;
}

const settingsSchema: { section: string; fields: { key: string; label: string; type?: "text" | "textarea"; hint?: string }[] }[] = [
  {
    section: "Homepage Hero",
    fields: [
      { key: "hero_eyebrow", label: "Eyebrow Tagline", hint: "Small tagline above headline" },
      { key: "hero_headline", label: "Headline", type: "textarea" },
      { key: "hero_subheadline", label: "Subheadline", type: "textarea" },
      { key: "hero_cta_primary", label: "Primary CTA Text" },
      { key: "hero_cta_secondary", label: "Secondary CTA Text" },
    ],
  },
  {
    section: "Homepage CTA",
    fields: [
      { key: "cta_headline", label: "Bottom CTA Headline", type: "textarea" },
      { key: "cta_subheadline", label: "Bottom CTA Subheadline", type: "textarea" },
    ],
  },
  {
    section: "About Page",
    fields: [
      { key: "about_headline", label: "About Headline" },
      { key: "about_intro", label: "About Intro", type: "textarea" },
      { key: "about_mission", label: "Mission", type: "textarea" },
      { key: "about_vision", label: "Vision", type: "textarea" },
      { key: "about_values", label: "Values", type: "textarea" },
    ],
  },
  {
    section: "Services Intro",
    fields: [
      { key: "services_headline", label: "Services Headline" },
      { key: "services_intro", label: "Services Intro", type: "textarea" },
    ],
  },
  {
    section: "Products Intro",
    fields: [
      { key: "products_headline", label: "Products Headline" },
      { key: "products_intro", label: "Products Intro", type: "textarea" },
    ],
  },
  {
    section: "Team Intro",
    fields: [
      { key: "team_headline", label: "Team Headline" },
      { key: "team_intro", label: "Team Intro", type: "textarea" },
      { key: "careers_headline", label: "Careers Headline" },
      { key: "careers_intro", label: "Careers Intro", type: "textarea" },
    ],
  },
  {
    section: "Footer",
    fields: [
      { key: "footer_about", label: "Footer About Text", type: "textarea" },
    ],
  },
  {
    section: "SEO",
    fields: [
      { key: "seo_title", label: "Default Title" },
      { key: "seo_description", label: "Default Description", type: "textarea" },
      { key: "seo_keywords", label: "Keywords (comma separated)", type: "textarea" },
    ],
  },
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
    "w-full border border-border bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-black";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {settingsSchema.map((section) => (
        <div key={section.section} className="border border-border bg-white p-6">
          <h2 className="text-sm font-bold tracking-widest uppercase">{section.section}</h2>
          <div className="mt-6 space-y-5">
            {section.fields.map((field) => (
              <div key={field.key}>
                <label className="mb-2 block text-[10px] font-semibold tracking-widest uppercase">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={settings[field.key] ?? ""}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <input
                    value={settings[field.key] ?? ""}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                    className={inputClass}
                  />
                )}
                {field.hint && <p className="mt-1 text-xs text-neutral-600">{field.hint}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 -mx-8 border-t border-border bg-white px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-black bg-black px-8 py-3 text-[11px] font-semibold tracking-widest text-white uppercase disabled:opacity-50"
          >
            {status === "loading" ? "Saving..." : "Save All Settings"}
          </button>
          {status === "success" && (
            <p className="text-xs text-neutral-700">Settings saved successfully.</p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-600">Failed to save settings.</p>
          )}
        </div>
      </div>
    </form>
  );
}
