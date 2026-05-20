import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ClientForm from "@/components/admin/ClientForm";

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } }).catch(() => null);
  if (!client) notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
      <div className="mt-10">
        <ClientForm client={client} />
      </div>
    </div>
  );
}
