"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, Star } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { staggerContainer, cardReveal } from "@/lib/animations";

const monthlyRevenue = [48200, 52400, 49800, 61200, 58900, 67300, 72100, 68800, 74500, 81200, 79600, 88400];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const maxRevenue = Math.max(...monthlyRevenue);

export default function AnalyticsPage() {
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <div className="p-6 text-soft">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-soft">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Year-to-date performance</p>
      </div>

      {/* Summary KPIs */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-4 gap-4 mb-6"
      >
        {[
          { label: "YTD Revenue", value: "$802,400", change: "+24.3%", icon: TrendingUp, color: "#9FC490" },
          { label: "Total Customers", value: "8,421", change: "+31.2%", icon: Users, color: "#D4AF37" },
          { label: "Total Orders", value: "12,874", change: "+19.8%", icon: ShoppingBag, color: "#7EB8C9" },
          { label: "Avg. Rating", value: "4.78", change: "+0.12", icon: Star, color: "#C4A882" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              variants={cardReveal}
              className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <span className="text-xs font-semibold bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{kpi.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {/* Monthly revenue chart */}
        <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
          <h2 className="text-soft font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-48 flex items-end gap-2">
            {monthlyRevenue.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxRevenue) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                  className="w-full rounded-t-lg min-h-[4px]"
                  style={{
                    background: i === 4
                      ? "linear-gradient(to top, #1E3A34, #9FC490)"
                      : "rgba(159,196,144,0.2)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {months.map((m, i) => (
              <span key={i} className="text-[9px] text-white/30 flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>

        {/* Customer segments */}
        <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
          <h2 className="text-soft font-semibold mb-4">Customer Segments</h2>
          <div className="space-y-4">
            {[
              { label: "New Customers", value: "2,341", pct: 28, color: "#9FC490" },
              { label: "Returning", value: "4,892", pct: 58, color: "#D4AF37" },
              { label: "VIP Members", value: "1,188", pct: 14, color: "#7EB8C9" },
            ].map((seg) => (
              <div key={seg.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-white/60 text-sm">{seg.label}</span>
                  <div className="text-right">
                    <span className="text-soft text-sm font-semibold">{seg.value}</span>
                    <span className="text-white/30 text-xs ml-2">{seg.pct}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${seg.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: seg.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="text-white/40 text-xs mb-3">Acquisition Channels</p>
            <div className="space-y-2">
              {[
                { label: "Organic Search", pct: 45 },
                { label: "Referral", pct: 30 },
                { label: "Social Media", pct: 15 },
                { label: "Direct", pct: 10 },
              ].map((ch) => (
                <div key={ch.label} className="flex items-center gap-3">
                  <span className="text-white/40 text-xs w-28">{ch.label}</span>
                  <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ch.pct}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full bg-accent/60"
                    />
                  </div>
                  <span className="text-white/30 text-xs w-8 text-right">{ch.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
          <h2 className="text-soft font-semibold mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-white/25 text-sm font-bold w-5 text-right">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-soft text-sm font-medium truncate">{p.name}</p>
                  <p className="text-white/30 text-xs">{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-soft text-sm font-semibold">{formatPrice(p.price)}</p>
                  <p className="text-white/30 text-xs">{p.reviewCount} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future AI features placeholder */}
        <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
          <h2 className="text-soft font-semibold mb-1">AI Insights</h2>
          <p className="text-white/30 text-xs mb-4">Powered by machine learning — coming soon</p>
          <div className="space-y-3">
            {[
              { icon: "🎯", text: "Predict demand spikes for upcoming holidays" },
              { icon: "🤖", text: "Auto-personalize product recommendations" },
              { icon: "📦", text: "Smart inventory reorder suggestions" },
              { icon: "💬", text: "Sentiment analysis from customer reviews" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                <span className="text-lg">{item.icon}</span>
                <p className="text-white/40 text-xs leading-relaxed">{item.text}</p>
                <span className="ml-auto text-[10px] text-gold/50 bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full flex-shrink-0">
                  SOON
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
