import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeamForm from "@/components/admin/TeamForm";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } }).catch(() => null);
  if (!member) notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
      <div className="mt-10">
        <TeamForm member={member} />
      </div>
    </div>
  );
}
