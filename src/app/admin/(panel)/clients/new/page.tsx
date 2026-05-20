import ClientForm from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Add Client</h1>
      <div className="mt-10">
        <ClientForm />
      </div>
    </div>
  );
}
