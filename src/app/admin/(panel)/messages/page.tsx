import { prisma } from "@/lib/prisma";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MessagesTable from "@/components/admin/MessagesTable";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage
    .findMany({ orderBy: { createdAt: "desc" } })
    .catch(() => []);

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Contact Messages"
        description="Inbound enquiries submitted via the contact form"
      />
      <div className="mt-10">
        <MessagesTable messages={messages} />
      </div>
    </div>
  );
}
