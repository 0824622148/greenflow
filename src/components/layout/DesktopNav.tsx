"use client";

import { motion } from "framer-motion";
import { Home, Search, ShoppingCart, User, Leaf, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/products", icon: Search, label: "Shop" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function DesktopNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-[#0D1F1A]/95 backdrop-blur-xl border-r border-white/5 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[14px] bg-forest-gradient flex items-center justify-center shadow-green">
            <svg width="22" height="22" viewBox="0 0 52 52" fill="none">
              <path d="M26 6C26 6 12 16 12 28C12 35.732 18.268 42 26 42C33.732 42 40 35.732 40 28C40 16 26 6 26 6Z" fill="url(#deskLg)" />
              <line x1="26" y1="30" x2="26" y2="44" stroke="rgba(159,196,144,0.7)" strokeWidth="2.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="deskLg" x1="26" y1="6" x2="26" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9FC490" /><stop offset="1" stopColor="#5F8D6B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1 className="text-soft font-bold text-base leading-tight">GreenFlow</h1>
            <p className="text-white/30 text-[10px] tracking-wider uppercase">Premium Cannabis</p>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer relative",
                  isActive
                    ? "bg-forest text-soft"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                )}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.href === "/cart" && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-bold text-forest">{itemCount > 9 ? "9+" : itemCount}</span>
                    </span>
                  )}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="desktopNavActive"
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Admin link */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link href="/dashboard">
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/25 hover:text-white/50 hover:bg-white/5 transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-xs font-medium">Admin Dashboard</span>
          </motion.div>
        </Link>
        <div className="px-4 py-3 rounded-2xl bg-forest/20 border border-sage/15">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5 font-medium">Delivery Zone</p>
          <p className="text-soft text-xs font-semibold">Portland, OR</p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-[10px] font-medium">Open · Closes 10 PM</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
