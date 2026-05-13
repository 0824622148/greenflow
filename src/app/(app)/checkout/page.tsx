"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, CreditCard, ChevronRight, Check, ChevronDown, Tag, FileText } from "lucide-react";
import GlassCard from "@/components/common/GlassCard";
import TopBar from "@/components/layout/TopBar";
import { useCartStore } from "@/store/cartStore";
import { mockUser } from "@/data/user";
import { DELIVERY_FEE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, subtotal, tax, total, couponCode, couponDiscount, clearCart } = useCartStore();
  const [selectedAddress, setSelectedAddress] = useState(mockUser.savedAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState(mockUser.savedPaymentMethods[0]);
  const [notes, setNotes] = useState("");
  const [promo, setPromo] = useState(couponCode);
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      clearCart();
      router.push("/tracking");
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-app-gradient">
      <TopBar title="Checkout" showBack backHref="/cart" />

      <div className="flex-1 overflow-y-auto phone-scroll px-4 pb-4 space-y-3">
        {/* Delivery address */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <h3 className="text-soft text-sm font-semibold">Delivery Address</h3>
            </div>
            <span className="text-accent text-xs font-medium">Change</span>
          </div>
          <div className="space-y-2">
            {mockUser.savedAddresses.map((addr) => (
              <motion.div
                key={addr.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAddress(addr)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedAddress.id === addr.id
                    ? "bg-forest/30 border-sage/30"
                    : "bg-white/3 border-white/8"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAddress.id === addr.id ? "border-accent bg-accent" : "border-white/20"
                  }`}
                >
                  {selectedAddress.id === addr.id && <Check className="w-2.5 h-2.5 text-forest" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-soft text-xs font-semibold">{addr.label}</p>
                  <p className="text-white/40 text-xs truncate">{addr.street}, {addr.city}, {addr.state}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Payment method */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-accent" />
              <h3 className="text-soft text-sm font-semibold">Payment Method</h3>
            </div>
            <span className="text-accent text-xs font-medium">Add New</span>
          </div>
          <div className="space-y-2">
            {mockUser.savedPaymentMethods.map((pm) => (
              <motion.div
                key={pm.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPayment(pm)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedPayment.id === pm.id
                    ? "bg-forest/30 border-sage/30"
                    : "bg-white/3 border-white/8"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedPayment.id === pm.id ? "border-accent bg-accent" : "border-white/20"
                  }`}
                >
                  {selectedPayment.id === pm.id && <Check className="w-2.5 h-2.5 text-forest" />}
                </div>
                <div className="flex-1">
                  <p className="text-soft text-xs font-semibold">{pm.label}</p>
                </div>
                {pm.type === "card" && (
                  <div className="w-8 h-5 rounded bg-blue-600/80 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">VISA</span>
                  </div>
                )}
                {pm.type === "apple-pay" && (
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                    <rect width="32" height="20" rx="3" fill="black" />
                    <text x="50%" y="14" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif"> Pay</text>
                  </svg>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Promo */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-accent" />
            <h3 className="text-soft text-sm font-semibold">Promo Code</h3>
          </div>
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="flex-1 h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-soft text-sm placeholder-white/25 focus:outline-none"
            />
            <button className="h-10 px-4 rounded-xl bg-forest text-soft text-xs font-semibold">Apply</button>
          </div>
        </GlassCard>

        {/* Delivery notes */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-accent" />
            <h3 className="text-soft text-sm font-semibold">Delivery Notes</h3>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any instructions for your delivery driver..."
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-soft text-sm placeholder-white/25 focus:outline-none resize-none"
          />
        </GlassCard>

        {/* Order summary */}
        <GlassCard className="p-4">
          <h3 className="text-soft text-sm font-semibold mb-3">Order Summary</h3>

          {/* Items */}
          <div className="space-y-2 mb-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-xs">
                <span className="text-white/50">{item.product.name} × {item.quantity}</span>
                <span className="text-soft">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-white/8 mb-3" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/50">Subtotal</span>
              <span className="text-soft">{formatPrice(subtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Delivery</span>
              <span className="text-soft">{formatPrice(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Tax</span>
              <span className="text-soft">{formatPrice(tax())}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-accent">Discount</span>
                <span className="text-accent">-{formatPrice(couponDiscount)}</span>
              </div>
            )}
            <div className="h-px bg-white/8 my-1" />
            <div className="flex justify-between font-bold">
              <span className="text-soft">Total</span>
              <span className="text-soft text-lg">{formatPrice(total())}</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Place order CTA */}
      <div className="px-4 pb-8 pt-3 bg-gradient-to-t from-[#0D2420] to-transparent">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handlePlaceOrder}
          disabled={placing}
          className="w-full h-14 rounded-2xl bg-forest-gradient text-soft font-bold text-base shadow-green flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {placing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-soft/30 border-t-soft rounded-full"
            />
          ) : (
            <>
              Place Order — {formatPrice(total())}
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
        <p className="text-center text-white/25 text-[10px] mt-2">
          By placing your order, you confirm you are 21+
        </p>
      </div>
    </div>
  );
}
