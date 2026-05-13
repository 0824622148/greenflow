export type Category =
  | "Flower"
  | "Edibles"
  | "Concentrates"
  | "Vapes"
  | "Pre-Rolls"
  | "Tinctures"
  | "Accessories";

export type StrainType = "Sativa" | "Indica" | "Hybrid";

export type Effect =
  | "Relaxed"
  | "Happy"
  | "Euphoric"
  | "Creative"
  | "Focused"
  | "Sleepy"
  | "Uplifted"
  | "Energetic"
  | "Calm"
  | "Pain Relief";

export type FlavorNote =
  | "Earthy"
  | "Pine"
  | "Citrus"
  | "Berry"
  | "Spicy"
  | "Sweet"
  | "Diesel"
  | "Herbal"
  | "Tropical"
  | "Floral"
  | "Mint"
  | "Chocolate"
  | "Vanilla"
  | "Woody";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  strainType: StrainType;
  thcPercent: number;
  cbdPercent: number;
  weight: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  description: string;
  effects: Effect[];
  flavorNotes: FlavorNote[];
  isPremium: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  inStock: boolean;
  tags: string[];
  bestFor?: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatarUrl?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
}
