"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  SlidersHorizontal,
  ClipboardList,
  Users,
  Star,
  Percent,
  Image as ImageIcon,
  Wrench,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/brands", label: "Brands", icon: Tag },
  { href: "/admin/attributes", label: "Attributes", icon: SlidersHorizontal },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/promotions", label: "Promotions", icon: Percent },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r border-white/10 bg-ink text-text-onDark min-h-screen">
      <div className="px-5 py-5">
        <Link href="/admin" className="font-display text-base font-semibold">
          ITOLOGY <span className="text-text-onDark/50 font-normal">Admin</span>
        </Link>
      </div>
      <nav className="px-3 space-y-0.5">
        {NAV.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-text-onDark/65 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={16} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
