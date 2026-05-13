import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = "sm",
  showValue = false,
  className,
}: StarRatingProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: maxStars }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const partial = !filled && i < rating;
        return (
          <span key={i} className="relative inline-block">
            <Star className={cn(iconSize, "text-white/15")} fill="currentColor" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
              >
                <Star className={cn(iconSize, "text-gold")} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="ml-1 text-xs text-white/60 font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
