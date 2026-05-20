import SiteSettingsForm from "@/components/admin/SiteSettingsForm";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const rows = await prisma.siteSetting.findMany().catch(() => []);
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light">Site Settings</h1>
      <p className="mt-1 text-sm text-muted">Update homepage copy and core website content</p>
      <div className="mt-10">
        <SiteSettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
