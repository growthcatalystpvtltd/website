import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Clients"
        description="Logos shown in the homepage client slider"
        actionLabel="Add Client"
        actionHref="/admin/clients/new"
      />

      <div className="mt-10 overflow-x-auto border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-neutral-50 text-left text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Logo</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Active</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-600">No clients yet.</td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-semibold">{c.name}</td>
                  <td className="px-6 py-4">
                    {c.logoUrl ? (
                      <div className="flex h-12 w-28 items-center justify-center border border-border bg-neutral-50 p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.logoUrl}
                          alt={`${c.name} logo`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-500">No logo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-neutral-700">{c.order}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold tracking-widest uppercase ${c.active ? "text-black" : "text-neutral-500"}`}>
                      {c.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/clients/${c.id}`} className="text-[11px] font-semibold tracking-widest uppercase hover:underline">
                        Edit
                      </Link>
                      <DeleteButton url={`/api/clients/${c.id}`} confirmText="Remove this client?" />
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
