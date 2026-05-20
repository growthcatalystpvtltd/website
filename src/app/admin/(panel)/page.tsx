import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  FileText,
  Tags,
  Inbox,
  Package,
  Users,
  Building2,
  Mail,
  UserCog,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  const [
    postCount,
    categoryCount,
    messageCount,
    productCount,
    teamCount,
    clientCount,
    subscriberCount,
    userCount,
  ] = await Promise.all([
    prisma.blogPost.count().catch(() => 0),
    prisma.blogCategory.count().catch(() => 0),
    prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
    prisma.product.count().catch(() => 0),
    prisma.teamMember.count().catch(() => 0),
    prisma.client.count().catch(() => 0),
    prisma.newsletterSubscriber.count().catch(() => 0),
    prisma.user.count().catch(() => 0),
  ]);

  const stats = [
    { label: "Blog Posts", value: postCount, href: "/admin/blogs", icon: FileText },
    { label: "Categories", value: categoryCount, href: "/admin/categories", icon: Tags },
    { label: "Unread Messages", value: messageCount, href: "/admin/messages", icon: Inbox },
    { label: "Products", value: productCount, href: "/admin/products", icon: Package },
    { label: "Team Members", value: teamCount, href: "/admin/team", icon: Users },
    { label: "Clients", value: clientCount, href: "/admin/clients", icon: Building2 },
    { label: "Subscribers", value: subscriberCount, href: "/admin/newsletter", icon: Mail },
    { label: "Users", value: userCount, href: "/admin/users", icon: UserCog },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-neutral-700">
        Welcome back, <span className="font-semibold text-black">{session?.user?.name ?? "Admin"}</span>
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group border border-border bg-white p-6 transition-colors hover:border-black"
          >
            <div className="flex items-start justify-between">
              <stat.icon size={18} className="text-neutral-500 group-hover:text-black" />
              <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
            </div>
            <p className="mt-4 text-[10px] font-semibold tracking-widest text-neutral-600 uppercase">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 border border-border bg-white p-8">
        <h2 className="text-sm font-bold tracking-widest uppercase">Quick Actions</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/admin/blogs/new" className="border border-black bg-black px-6 py-2.5 text-[11px] font-semibold tracking-widest text-white uppercase hover:opacity-80">
            New Blog Post
          </Link>
          <Link href="/admin/products/new" className="border border-black px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:bg-black hover:text-white">
            New Product
          </Link>
          <Link href="/admin/team/new" className="border border-black px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:bg-black hover:text-white">
            Add Team Member
          </Link>
          <Link href="/admin/clients/new" className="border border-black px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:bg-black hover:text-white">
            Add Client
          </Link>
          <Link href="/admin/settings" className="border border-border px-6 py-2.5 text-[11px] font-semibold tracking-widest uppercase hover:border-black">
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
