import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "gold" | "dark";
  onClick?: () => void;
}

export default function GlassCard({ children, className, variant = "default", onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border overflow-hidden",
        variant === "default" && "bg-white/5 backdrop-blur-md border-white/10 shadow-glass",
        variant === "elevated" && "bg-white/8 backdrop-blur-lg border-white/15 shadow-glass-lg",
        variant === "gold" && "bg-amber-950/40 backdrop-blur-md border-gold/25 shadow-gold",
        variant === "dark" && "bg-black/30 backdrop-blur-md border-white/5",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
