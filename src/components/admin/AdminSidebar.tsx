"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Settings,
  LogOut,
  Package,
  Users,
  Building2,
  Mail,
  Inbox,
  UserCog,
  CircleUserRound,
} from "lucide-react";

const groups: { label: string; items: { href: string; label: string; icon: React.ComponentType<{ size?: number }> }[] }[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blogs", label: "Blogs", icon: FileText },
      { href: "/admin/categories", label: "Categories", icon: Tags },
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/clients", label: "Clients", icon: Building2 },
    ],
  },
  {
    label: "Inbox",
    items: [
      { href: "/admin/messages", label: "Messages", icon: Inbox },
      { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
      { href: "/admin/users", label: "Users", icon: UserCog },
      { href: "/admin/profile", label: "My Profile", icon: CircleUserRound },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border bg-white">
      <div className="border-b border-border px-6 py-6">
        <p className="text-xs font-bold tracking-[0.2em] uppercase">Admin</p>
        <p className="mt-0.5 text-[10px] text-neutral-600">Growth Catalyst</p>
      </div>
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active =
                  href === "/admin"
                    ? pathname === "/admin"
                    : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-xs font-medium tracking-wide uppercase transition-colors ${
                      active
                        ? "bg-black text-white"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="m-4 flex items-center gap-3 border border-border px-3 py-2.5 text-xs font-medium tracking-wide text-neutral-700 uppercase hover:border-black hover:text-black"
      >
        <LogOut size={14} />
        Sign Out
      </button>
    </aside>
  );
}
