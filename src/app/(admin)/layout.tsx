"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, Package, Users, Settings, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard", icon: Package, label: "Inventory" },
  { href: "/dashboard", icon: Users, label: "Customers" },
  { href: "/dashboard", icon: Settings, label: "Settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#080F0D] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0D1F1A] border-r border-white/5 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-forest-gradient flex items-center justify-center">
              <Leaf className="w-4 h-4 text-accent" />
            </div>
            <div>
              <span className="text-soft font-bold text-sm">GreenFlow</span>
              <p className="text-white/30 text-[10px]">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-forest text-soft"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Back to app */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/home"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to App
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
