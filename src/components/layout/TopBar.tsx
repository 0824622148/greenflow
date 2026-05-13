"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Bell, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightSlot?: ReactNode;
  transparent?: boolean;
  className?: string;
}

export default function TopBar({
  title,
  showBack = false,
  backHref,
  rightSlot,
  transparent = false,
  className,
}: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 relative z-20",
        !transparent && "bg-transparent",
        className
      )}
    >
      {/* Left */}
      <div className="w-10">
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-soft" />
          </motion.button>
        )}
      </div>

      {/* Center */}
      {title && (
        <h1 className="text-sm font-semibold text-soft tracking-wide absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
      )}

      {/* Right */}
      <div className="flex items-center gap-2">
        {rightSlot}
      </div>
    </div>
  );
}

export function NotificationButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center relative"
    >
      <Bell className="w-4 h-4 text-soft" />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
    </motion.button>
  );
}

export function FavoriteButton({ active = false }: { active?: boolean }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center"
    >
      <Heart className={cn("w-4 h-4", active ? "fill-red-400 text-red-400" : "text-soft")} />
    </motion.button>
  );
}
