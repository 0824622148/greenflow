"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin, CreditCard, Bell, ChevronRight, Gift, Star,
  Package, Settings, LogOut, Shield, HelpCircle, Award
} from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import { mockUser } from "@/data/user";
import { mockOrderHistory } from "@/data/orders";
import { useAppStore } from "@/store/appStore";
import { staggerContainer, cardReveal } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { LOYALTY_TIERS } from "@/lib/constants";

const tierColors: Record<string, string> = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#D4AF37",
  Platinum: "#E5E4E2",
};

export default function ProfileScreen() {
  const router = useRouter();
  const logout = useAppStore((s) => s.logout);
  const user = mockUser;

  const tierColor = tierColors[user.loyaltyTier];
  const tierInfo = LOYALTY_TIERS[user.loyaltyTier];
  const progressPct = tierInfo.max === Infinity
    ? 100
    : ((user.loyaltyPoints - tierInfo.min) / (tierInfo.max - tierInfo.min)) * 100;

  const settingsRows = [
    { icon: MapPin, label: "Saved Addresses", value: `${user.savedAddresses.length} addresses`, href: "/profile" },
    { icon: CreditCard, label: "Payment Methods", value: `${user.savedPaymentMethods.length} methods`, href: "/profile" },
    { icon: Bell, label: "Notifications", value: "Enabled", href: "/profile" },
    { icon: Shield, label: "Privacy & Security", value: "", href: "/profile" },
    { icon: HelpCircle, label: "Help & Support", value: "", href: "/profile" },
  ];

  return (
    <div className="w-full h-full overflow-y-auto phone-scroll bg-app-gradient pb-6">
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-soft text-xl font-bold">Profile</h1>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center"
        >
          <Settings className="w-4 h-4 text-white/60" />
        </motion.button>
      </div>

      <div className="px-4 space-y-4">
        {/* User info card */}
        <GlassCard variant="elevated" className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: `${tierColor}60` }}
                  unoptimized
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-forest-gradient flex items-center justify-center">
                  <span className="text-2xl font-bold text-soft">{user.name[0]}</span>
                </div>
              )}
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border-2 border-[#0f2820]"
                style={{ background: tierColor, color: "#0D2420" }}
              >
                {user.loyaltyTier[0]}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-soft text-lg font-bold">{user.name}</h2>
              <p className="text-white/40 text-xs">{user.phone}</p>
              <p className="text-white/30 text-xs">Member since {user.memberSince}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/8">
            {[
              { label: "Orders", value: user.totalOrders },
              { label: "Spent", value: formatPrice(user.totalSpent) },
              { label: "Points", value: user.loyaltyPoints.toLocaleString() },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-soft font-bold text-base">{stat.value}</p>
                <p className="text-white/30 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Loyalty card */}
        <div
          className="rounded-3xl p-4 overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, ${tierColor}22, ${tierColor}08)`,
            border: `1px solid ${tierColor}30`,
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-20"
            style={{ background: tierColor }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: tierColor }} />
                <span className="font-bold text-sm" style={{ color: tierColor }}>
                  {user.loyaltyTier} Member
                </span>
              </div>
              <span className="text-white/40 text-xs font-medium">{user.loyaltyPoints} pts</span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/40">{user.loyaltyTier}</span>
                <span className="text-white/40">{user.nextTier}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPct, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${tierColor}aa, ${tierColor})` }}
                />
              </div>
              {user.nextTier && (
                <p className="text-white/30 text-[10px] mt-1">
                  {user.pointsToNextTier} pts to {user.nextTier}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 h-9 rounded-xl text-xs font-semibold"
                style={{ background: `${tierColor}25`, color: tierColor, border: `1px solid ${tierColor}40` }}
              >
                <Gift className="w-3.5 h-3.5 inline mr-1" />
                Redeem Rewards
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 h-9 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-white/50"
              >
                Refer a Friend
              </motion.button>
            </div>
          </div>
        </div>

        {/* Order history */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-soft font-semibold text-sm">Recent Orders</h3>
            <button className="text-accent text-xs font-medium flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {mockOrderHistory.slice(0, 2).map((order) => (
              <motion.div
                key={order.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/tracking")}
              >
                <GlassCard className="p-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest/40 flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-soft text-xs font-semibold">#{order.orderNumber}</p>
                        <span className="text-[10px] text-green-400 bg-green-900/30 border border-green-700/30 px-2 py-0.5 rounded-full font-medium capitalize">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs mt-0.5">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} · {formatPrice(order.total)}
                      </p>
                      <p className="text-white/25 text-[10px]">{new Date(order.placedAt).toLocaleDateString()}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Settings rows */}
        <GlassCard className="divide-y divide-white/5">
          {settingsRows.map((row, i) => {
            const Icon = row.icon;
            return (
              <motion.button
                key={row.label}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-white/50" />
                </div>
                <div className="flex-1">
                  <p className="text-soft text-sm font-medium">{row.label}</p>
                  {row.value && <p className="text-white/30 text-xs">{row.value}</p>}
                </div>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </motion.button>
            );
          })}
        </GlassCard>

        {/* Future features */}
        <GlassCard variant="gold" className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-gold" />
            <h3 className="text-gold text-sm font-bold">VIP Membership</h3>
            <span className="ml-auto text-[10px] text-gold/60 border border-gold/30 px-2 py-0.5 rounded-full">COMING SOON</span>
          </div>
          <p className="text-white/40 text-xs">Free delivery, early access, exclusive drops, and 2× loyalty points.</p>
        </GlassCard>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { logout(); router.push("/auth"); }}
          className="w-full h-12 rounded-2xl bg-red-950/30 border border-red-900/30 text-red-400 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </div>
    </div>
  );
}
