"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Star, ChevronLeft, MapPin, Clock, CheckCircle, Package, Truck, Home, MessageCircle } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import { mockCurrentOrder } from "@/data/orders";
import { staggerContainer, cardReveal } from "@/lib/animations";

const stepIcons: Record<string, React.FC<{ className?: string }>> = {
  "check-circle": CheckCircle,
  package: Package,
  truck: Truck,
  home: Home,
};

export default function TrackingScreen() {
  const router = useRouter();
  const order = mockCurrentOrder;
  const activeStep = order.trackingSteps.find((s) => s.status === "active");

  const eta = new Date("2025-05-13T15:45:00");
  const etaStr = eta.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-app-gradient">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => router.push("/home")}
          className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-soft" />
        </motion.button>
        <h1 className="text-soft text-sm font-semibold">Track Order</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto phone-scroll px-4 pb-6 space-y-4">
        {/* Map placeholder */}
        <div className="relative h-44 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f1a] to-[#142e24]" />
          {/* Grid lines (fake map) */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div key={`h${i}`} className="absolute w-full h-px bg-sage/40" style={{ top: `${i * 14}%` }} />
            ))}
            {[...Array(8)].map((_, i) => (
              <div key={`v${i}`} className="absolute h-full w-px bg-sage/40" style={{ left: `${i * 14}%` }} />
            ))}
          </div>

          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 390 176">
            <path
              d="M 80 140 Q 150 80 220 100 Q 280 120 310 60"
              stroke="#9FC490"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              opacity="0.8"
            />
            {/* Driver dot */}
            <circle cx="220" cy="100" r="6" fill="#9FC490" />
            <circle cx="220" cy="100" r="12" fill="#9FC490" fillOpacity="0.25" />
            {/* Destination */}
            <circle cx="80" cy="140" r="5" fill="#D4AF37" />
          </svg>

          {/* ETA overlay */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span className="text-soft text-xs font-semibold">ETA {etaStr}</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span className="text-soft text-xs">1.2 mi away</span>
            </div>
          </div>

          {/* Live badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-xl px-3 py-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-red-400"
            />
            <span className="text-white/70 text-xs font-medium">Live Tracking</span>
          </div>
        </div>

        {/* Order number & status */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white/40 text-xs">Order #{order.orderNumber}</p>
              <h2 className="text-soft text-base font-bold mt-0.5">
                {activeStep?.label || "Order Delivered"}
              </h2>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(159,196,144,0.15)",
                color: "#9FC490",
                border: "1px solid rgba(159,196,144,0.3)",
              }}
            >
              On the Way
            </div>
          </div>
          <p className="text-white/40 text-xs">{activeStep?.sublabel}</p>
        </GlassCard>

        {/* Tracking steps */}
        <GlassCard className="p-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-0"
          >
            {order.trackingSteps.map((step, i) => {
              const Icon = stepIcons[step.icon] || CheckCircle;
              const isLast = i === order.trackingSteps.length - 1;

              return (
                <motion.div key={step.id} variants={cardReveal} className="flex gap-3">
                  {/* Icon + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10 ${
                        step.status === "completed"
                          ? "bg-accent border-accent"
                          : step.status === "active"
                          ? "bg-forest border-accent"
                          : "bg-white/5 border-white/15"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle className="w-4 h-4 text-forest" fill="currentColor" />
                      ) : (
                        <Icon
                          className={`w-4 h-4 ${
                            step.status === "active" ? "text-accent" : "text-white/20"
                          }`}
                        />
                      )}
                    </div>
                    {!isLast && (
                      <div
                        className={`w-0.5 h-8 ${
                          step.status === "completed" ? "bg-accent/50" : "bg-white/8"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${!isLast ? "pb-4" : ""}`}>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm font-semibold ${
                          step.status === "pending" ? "text-white/30" : "text-soft"
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.completedAt && (
                        <span className="text-white/30 text-xs">{step.completedAt}</span>
                      )}
                      {step.status === "active" && (
                        <motion.div
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-accent"
                        />
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${step.status === "pending" ? "text-white/20" : "text-white/40"}`}>
                      {step.sublabel}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </GlassCard>

        {/* Driver card */}
        {order.driver && (
          <GlassCard variant="elevated" className="p-4">
            <p className="text-white/40 text-xs font-medium mb-3">Your Driver</p>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={order.driver.avatarUrl}
                  alt={order.driver.name}
                  width={52}
                  height={52}
                  className="w-13 h-13 rounded-full object-cover border-2 border-sage/30"
                  unoptimized
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0f2820]" />
              </div>
              <div className="flex-1">
                <h3 className="text-soft text-sm font-bold">{order.driver.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-white/50 text-xs">{order.driver.rating}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-white/40 text-xs">{order.driver.vehicle}</span>
                </div>
                <p className="text-white/30 text-xs">{order.driver.licensePlate}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="w-10 h-10 rounded-full bg-forest border border-sage/25 flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 text-accent" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 text-white/50" />
                </motion.button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Order items summary */}
        <GlassCard className="p-4">
          <p className="text-white/40 text-xs font-medium mb-3">Order Items</p>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-xl object-cover"
                  unoptimized
                />
                <div className="flex-1">
                  <p className="text-soft text-xs font-semibold">{item.product.name}</p>
                  <p className="text-white/30 text-xs">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
