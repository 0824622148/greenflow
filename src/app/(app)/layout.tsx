"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";
import DesktopNav from "@/components/layout/DesktopNav";
import { HIDE_NAV_PATHS } from "@/lib/constants";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showNav = !HIDE_NAV_PATHS.some((p) => pathname.startsWith(p));

  return (
    <div className="min-h-screen bg-app-gradient">
      {/* Desktop sidebar nav */}
      {showNav && <DesktopNav />}

      {/* Main content area */}
      <div className={`relative ${showNav ? "md:pl-64" : ""} min-h-screen`}>
        {/* Mobile: full screen | Desktop: constrained max-width centered */}
        <div className="relative w-full min-h-screen">
          <AnimatePresence mode="wait" initial={false}>
            <div key={pathname} className="absolute inset-0 overflow-y-auto phone-scroll">
              {children}
            </div>
          </AnimatePresence>
        </div>

        {/* Mobile bottom nav */}
        {showNav && (
          <div className="md:hidden">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
