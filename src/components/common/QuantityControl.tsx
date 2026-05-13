"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export default function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantityControlProps) {
  const btnSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  const textSize = size === "sm" ? "text-sm w-6" : "text-base w-8";

  return (
    <div className={cn("flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10", className)}>
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className={cn(
          btnSize,
          "rounded-full flex items-center justify-center transition-colors",
          value <= min
            ? "text-white/20 cursor-not-allowed"
            : "bg-white/8 text-soft hover:bg-white/15"
        )}
      >
        <Minus className={iconSize} />
      </motion.button>

      <motion.span
        key={value}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(textSize, "font-bold text-soft text-center")}
      >
        {value}
      </motion.span>

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className={cn(
          btnSize,
          "rounded-full flex items-center justify-center transition-colors",
          value >= max
            ? "text-white/20 cursor-not-allowed"
            : "bg-forest text-soft hover:bg-forest-light"
        )}
      >
        <Plus className={iconSize} />
      </motion.button>
    </div>
  );
}
