"use client";

import { motion } from "framer-motion";
import { Home, Search, ShoppingCart, User, Leaf } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/products", icon: Search, label: "Shop" },
  { href: "/", icon: Leaf, label: "GreenFlow", isCenter: true },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2420]/95 to-transparent backdrop-blur-xl border-t border-white/5" />

      <div className="relative flex items-center justify-around px-2 pb-4 pt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link key={item.href} href="/home" className="relative -mt-6">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full bg-forest-gradient flex items-center justify-center shadow-[0_8px_24px_rgba(30,58,52,0.6)] border border-sage/30"
                >
                  <Icon className="w-6 h-6 text-accent" />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center gap-1 px-3 py-1">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="relative"
              >
                {item.href === "/cart" && itemCount > 0 && (
                  <motion.div
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent rounded-full flex items-center justify-center z-10"
                  >
                    <span className="text-[9px] font-bold text-forest">{itemCount > 9 ? "9+" : itemCount}</span>
                  </motion.div>
                )}
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors duration-200",
                    isActive ? "text-accent" : "text-white/40"
                  )}
                />
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="w-1 h-1 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {!isActive && <div className="w-1 h-1" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
