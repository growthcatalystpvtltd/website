import TeamForm from "@/components/admin/TeamForm";

export default function NewTeamMemberPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
      <div className="mt-10">
        <TeamForm />
      </div>
    </div>
  );
}
