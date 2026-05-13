export const HIDE_NAV_PATHS = ["/splash", "/onboarding", "/auth", "/checkout", "/tracking"];

export const DELIVERY_FEE = 5.0;
export const TAX_RATE = 0.12;

export const LOYALTY_TIERS = {
  Bronze: { min: 0, max: 499, color: "#CD7F32", nextTier: "Silver" },
  Silver: { min: 500, max: 999, color: "#C0C0C0", nextTier: "Gold" },
  Gold: { min: 1000, max: 1999, color: "#D4AF37", nextTier: "Platinum" },
  Platinum: { min: 2000, max: Infinity, color: "#E5E4E2", nextTier: null },
};

export const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  GREENFLOW20: 20,
  VIP15: 15,
};
