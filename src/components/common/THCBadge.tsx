import { cn } from "@/lib/utils";

interface THCBadgeProps {
  type: "thc" | "cbd";
  value: number;
  size?: "sm" | "md";
  className?: string;
}

export default function THCBadge({ type, value, size = "sm", className }: THCBadgeProps) {
  const isThc = type === "thc";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        isThc
          ? "bg-accent/15 text-accent border border-accent/25"
          : "bg-sage/15 text-sage border border-sage/25",
        className
      )}
    >
      <span className="font-bold">{isThc ? "THC" : "CBD"}</span>
      <span>{value}%</span>
    </span>
  );
}
