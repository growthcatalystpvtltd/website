"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileText, Tags, Settings, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-white">
      <div className="border-b border-border px-6 py-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase">Admin</p>
        <p className="mt-0.5 text-[10px] text-muted">Growth Catalyst</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-wide uppercase transition-colors ${
              pathname === href
                ? "bg-black text-white"
                : "text-muted hover:bg-neutral-100 hover:text-black"
            }`}
          >
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="m-4 flex items-center gap-3 border border-border px-3 py-2.5 text-xs tracking-wide text-muted uppercase hover:border-black hover:text-black"
      >
        <LogOut size={14} />
        Sign Out
      </button>
    </aside>
  );
}
