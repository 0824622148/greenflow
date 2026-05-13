import { Address } from "./order";

export type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Platinum";

export interface PaymentMethod {
  id: string;
  type: "card" | "apple-pay" | "google-pay" | "cash";
  label: string;
  last4?: string;
  brand?: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
  pointsToNextTier: number;
  nextTier: LoyaltyTier | null;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  savedAddresses: Address[];
  savedPaymentMethods: PaymentMethod[];
}
