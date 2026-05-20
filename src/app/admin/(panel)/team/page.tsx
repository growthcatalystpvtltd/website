import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTeamPage() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } }).catch(() => []);

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Team Members"
        description="Manage who appears on the public Team page"
        actionLabel="Add Member"
        actionHref="/admin/team/new"
      />

      <div className="mt-10 overflow-x-auto border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-neutral-50 text-left text-[10px] font-semibold tracking-widest text-neutral-700 uppercase">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-600">
                  No team members yet.
                </td>
              </tr>
            ) : (
              team.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-semibold">{m.name}</td>
                  <td className="px-6 py-4 text-neutral-700">{m.role}</td>
                  <td className="px-6 py-4 text-neutral-700">{m.order}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold tracking-widest uppercase ${m.published ? "text-black" : "text-neutral-500"}`}>
                      {m.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link href={`/admin/team/${m.id}`} className="text-[11px] font-semibold tracking-widest uppercase hover:underline">
                        Edit
                      </Link>
                      <DeleteButton url={`/api/team/${m.id}`} confirmText="Remove this team member?" />
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
