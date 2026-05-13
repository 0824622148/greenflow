import { Category } from "@/types/product";

export interface CategoryInfo {
  id: Category;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
}

export const categories: CategoryInfo[] = [
  { id: "Flower", label: "Flower", emoji: "🌿", color: "#9FC490", bgColor: "rgba(159,196,144,0.15)" },
  { id: "Edibles", label: "Edibles", emoji: "🍬", color: "#D4AF37", bgColor: "rgba(212,175,55,0.15)" },
  { id: "Vapes", label: "Vapes", emoji: "💨", color: "#7EB8C9", bgColor: "rgba(126,184,201,0.15)" },
  { id: "Concentrates", label: "Concentrates", emoji: "💎", color: "#C4A882", bgColor: "rgba(196,168,130,0.15)" },
  { id: "Pre-Rolls", label: "Pre-Rolls", emoji: "🔥", color: "#E07B6A", bgColor: "rgba(224,123,106,0.15)" },
  { id: "Tinctures", label: "Tinctures", emoji: "🧪", color: "#9B8FD4", bgColor: "rgba(155,143,212,0.15)" },
  { id: "Accessories", label: "Accessories", emoji: "⚡", color: "#B0B0B0", bgColor: "rgba(176,176,176,0.15)" },
];
