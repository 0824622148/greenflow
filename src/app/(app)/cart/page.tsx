"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Tag, ChevronRight, Clock, Truck } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import QuantityControl from "@/components/common/QuantityControl";
import TopBar from "@/components/layout/TopBar";
import { useCartStore } from "@/store/cartStore";
import { DELIVERY_FEE, TAX_RATE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function CartScreen() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, applyCoupon, removeCoupon, couponCode, couponDiscount, subtotal, tax, total } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = () => {
    const ok = applyCoupon(couponInput);
    if (ok) { setCouponError(false); } else { setCouponError(true); }
  };

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-app-gradient">
        <div className="max-w-2xl mx-auto px-4 pb-24 md:pb-8">
          <div className="md:hidden"><TopBar title="Cart" showBack backHref="/home" /></div>
          <div className="hidden md:block py-6"><h1 className="text-2xl font-bold text-soft">Cart</h1></div>
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}
              className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-white/20" />
            </motion.div>
            <h2 className="text-soft text-xl font-bold">Your cart is empty</h2>
            <p className="text-white/40 text-sm text-center">Add some premium products and they&apos;ll appear here.</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => router.push("/products")}
              className="mt-2 h-12 px-8 rounded-2xl bg-forest-gradient text-soft font-semibold">
              Browse Products
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-app-gradient">
      <div className="max-w-2xl mx-auto px-4 pb-32 md:pb-12">
        <div className="md:hidden"><TopBar title={`Cart (${items.length})`} showBack backHref="/home" /></div>
        <div className="hidden md:block py-6"><h1 className="text-2xl font-bold text-soft">Cart ({items.length})</h1></div>

        {/* Estimated delivery */}
        <div className="flex items-center gap-2 bg-forest/20 border border-sage/20 rounded-2xl px-4 py-3 mb-4">
          <Clock className="w-4 h-4 text-accent" />
          <div className="flex-1">
            <p className="text-soft text-xs font-semibold">Estimated Delivery</p>
            <p className="text-white/50 text-xs">30–45 minutes · 2847 Maple Grove Dr</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/30" />
        </div>

        {/* Cart items */}
        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div key={item.product.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }} transition={{ duration: 0.25 }}>
                <GlassCard className="p-3">
                  <div className="flex items-center gap-3">
                    <Image src={item.product.imageUrl} alt={item.product.name} width={64} height={64} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" unoptimized />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-soft text-sm font-semibold truncate">{item.product.name}</h3>
                      <p className="text-white/40 text-xs">{item.product.brand} · {item.product.weight}</p>
                      <p className="text-soft font-bold text-sm mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <motion.button whileTap={{ scale: 0.8 }} onClick={() => removeItem(item.product.id)}
                        className="w-7 h-7 rounded-full bg-red-900/30 border border-red-500/20 flex items-center justify-center">
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </motion.button>
                      <QuantityControl value={item.quantity} onChange={(q) => updateQuantity(item.product.id, q)} size="sm" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Coupon */}
        <GlassCard className="p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-accent" />
            <h3 className="text-soft text-sm font-semibold">Promo Code</h3>
          </div>
          {couponCode ? (
            <div className="flex items-center justify-between bg-forest/30 border border-sage/25 rounded-xl px-4 py-3">
              <div>
                <p className="text-accent text-sm font-bold">{couponCode}</p>
                <p className="text-white/40 text-xs">-{formatPrice(couponDiscount)} applied</p>
              </div>
              <button onClick={removeCoupon} className="text-white/30 text-xs underline">Remove</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input value={couponInput} onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(false); }}
                placeholder="Try WELCOME10, GREENFLOW20, VIP15"
                className={`flex-1 h-11 px-4 rounded-xl bg-white/5 border text-soft text-sm placeholder-white/25 focus:outline-none transition-all ${couponError ? "border-red-500/50" : "border-white/10 focus:border-accent/50"}`} />
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleApplyCoupon} className="h-11 px-4 rounded-xl bg-forest text-soft text-sm font-semibold">Apply</motion.button>
            </div>
          )}
          {couponError && <p className="text-red-400 text-xs mt-1.5">Invalid code. Try WELCOME10</p>}
        </GlassCard>

        {/* Order summary */}
        <GlassCard className="p-4 mb-6">
          <h3 className="text-soft text-sm font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between text-sm"><span className="text-white/50">Subtotal</span><span className="text-soft">{formatPrice(subtotal())}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/50 flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Delivery</span><span className="text-soft">{formatPrice(DELIVERY_FEE)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/50">Tax (12%)</span><span className="text-soft">{formatPrice(tax())}</span></div>
            {couponDiscount > 0 && <div className="flex justify-between text-sm"><span className="text-accent">Promo ({couponCode})</span><span className="text-accent">-{formatPrice(couponDiscount)}</span></div>}
            <div className="h-px bg-white/8" />
            <div className="flex justify-between"><span className="text-soft font-bold">Total</span><span className="text-soft font-bold text-lg">{formatPrice(total())}</span></div>
          </div>
        </GlassCard>

        <motion.button whileTap={{ scale: 0.97 }} onClick={() => router.push("/checkout")}
          className="w-full h-14 rounded-2xl bg-forest-gradient text-soft font-bold text-base shadow-green flex items-center justify-center gap-2">
          Proceed to Checkout <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
