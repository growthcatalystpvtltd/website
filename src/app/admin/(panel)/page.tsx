import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();

  const [postCount, categoryCount, messageCount] = await Promise.all([
    prisma.blogPost.count().catch(() => 0),
    prisma.blogCategory.count().catch(() => 0),
    prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
  ]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Welcome back, {session?.user?.name ?? "Admin"}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          { label: "Blog Posts", value: postCount, href: "/admin/blogs" },
          { label: "Categories", value: categoryCount, href: "/admin/categories" },
          { label: "Unread Messages", value: messageCount, href: "/admin/settings" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-border bg-white p-6 transition-colors hover:border-black"
          >
            <p className="text-3xl font-light">{stat.value}</p>
            <p className="mt-2 text-xs tracking-widest text-muted uppercase">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 border border-border bg-white p-8">
        <h2 className="text-sm font-medium tracking-widest uppercase">Quick Actions</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/admin/blogs/new" className="border border-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-black hover:text-white">
            New Blog Post
          </Link>
          <Link href="/admin/categories" className="border border-border px-6 py-2 text-xs tracking-widest uppercase hover:border-black">
            Manage Categories
          </Link>
          <Link href="/admin/settings" className="border border-border px-6 py-2 text-xs tracking-widest uppercase hover:border-black">
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
