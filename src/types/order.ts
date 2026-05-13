import { CartItem } from "./cart";

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface TrackingStep {
  id: string;
  label: string;
  sublabel: string;
  completedAt?: string;
  status: "completed" | "active" | "pending";
  icon: string;
}

export interface Driver {
  name: string;
  rating: number;
  phone: string;
  vehicle: string;
  licensePlate: string;
  avatarUrl: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  status: "processing" | "confirmed" | "preparing" | "out-for-delivery" | "delivered";
  placedAt: string;
  estimatedDelivery: string;
  driver?: Driver;
  trackingSteps: TrackingStep[];
  deliveryAddress: Address;
  notes?: string;
}
