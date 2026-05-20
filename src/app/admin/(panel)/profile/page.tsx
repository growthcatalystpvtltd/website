import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/admin/ProfileForm";
import PasswordForm from "@/components/admin/PasswordForm";

export default async function AdminProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  if (!user) redirect("/admin/login");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      <p className="mt-1 text-sm text-neutral-700">
        Update your personal information and password.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section className="border border-border bg-white p-8">
          <h2 className="text-sm font-bold tracking-widest uppercase">Profile</h2>
          <p className="mt-1 text-xs text-neutral-600">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          <div className="mt-6">
            <ProfileForm user={user} />
          </div>
        </section>

        <section className="border border-border bg-white p-8">
          <h2 className="text-sm font-bold tracking-widest uppercase">Change Password</h2>
          <p className="mt-1 text-xs text-neutral-600">Choose a strong password with at least 8 characters.</p>
          <div className="mt-6">
            <PasswordForm />
          </div>
        </section>
      </div>
    </div>
  );
}
