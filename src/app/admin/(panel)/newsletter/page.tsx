import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  const csv = subscribers.map((s) => `${s.email},${new Date(s.createdAt).toISOString()}`).join("\n");
  const csvData = `data:text/csv;charset=utf-8,Email,Subscribed%0A${encodeURIComponent(csv)}`;

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Newsletter Subscribers"
        description={`Total: ${subscribers.length} subscriber${subscribers.length === 1 ? "" : "s"}`}
      />

      <div className="mt-6">
        <a
          href={csvData}
          download="subscribers.csv"
          className="inline-block border border-black px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:bg-black hover:text-white"
        >
          Export CSV
        </a>
      </div>

      <div className="mt-6 overflow-x-auto border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-neutral-50 text-left text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Subscribed On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-neutral-600">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-semibold">{s.email}</td>
                  <td className="px-6 py-4 text-neutral-700">
                    {new Date(s.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <DeleteButton url={`/api/newsletter/${s.id}`} confirmText="Remove this subscriber?" iconOnly />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
