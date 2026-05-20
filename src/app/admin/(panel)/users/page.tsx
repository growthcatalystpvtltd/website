import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import UserManager from "@/components/admin/UserManager";

export default async function AdminUsersPage() {
  const [users, session] = await Promise.all([
    prisma.user
      .findMany({
        select: { id: true, email: true, name: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
    auth(),
  ]);

  return (
    <div className="p-8">
      <AdminPageHeader
        title="Admin Users"
        description="Manage accounts that can access this dashboard"
      />
      <div className="mt-10">
        <UserManager users={users} currentUserId={session?.user?.id ?? ""} />
      </div>
    </div>
  );
}
