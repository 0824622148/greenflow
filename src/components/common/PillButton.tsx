"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit";
}

export default function PillButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  fullWidth = false,
  type = "button",
}: PillButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2",
        size === "sm" && "px-4 py-2 text-xs",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        variant === "primary" && "bg-forest-gradient text-soft shadow-green border border-sage/20",
        variant === "secondary" && "bg-white/8 text-soft border border-white/10",
        variant === "ghost" && "bg-transparent text-soft/70 hover:text-soft hover:bg-white/5",
        variant === "gold" && "bg-gold-gradient text-forest font-bold shadow-gold",
        variant === "outline" && "bg-transparent border border-accent text-accent hover:bg-accent/10",
        fullWidth && "w-full",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
