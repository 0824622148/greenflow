"use client";

import { motion } from "framer-motion";
import { TrendingUp, Package, Users, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { staggerContainer, cardReveal } from "@/lib/animations";

const kpis = [
  { label: "Revenue Today", value: "$4,821", change: "+18.2%", positive: true, icon: DollarSign, color: "#9FC490" },
  { label: "Orders Today", value: "94", change: "+12%", positive: true, icon: Package, color: "#D4AF37" },
  { label: "Active Customers", value: "1,247", change: "+4.5%", positive: true, icon: Users, color: "#7EB8C9" },
  { label: "Avg. Delivery Time", value: "38 min", change: "-3 min", positive: true, icon: Clock, color: "#C4A882" },
];

const recentOrders = [
  { id: "ORD-18641", customer: "Alex Rivera", items: 2, total: 138.36, status: "out-for-delivery", time: "14:30" },
  { id: "ORD-18640", customer: "Jasmine L.", items: 1, total: 52.00, status: "delivered", time: "14:18" },
  { id: "ORD-18639", customer: "Marcus T.", items: 3, total: 165.50, status: "delivered", time: "13:55" },
  { id: "ORD-18638", customer: "Sara K.", items: 2, total: 96.00, status: "delivered", time: "13:40" },
  { id: "ORD-18637", customer: "Kevin M.", items: 1, total: 58.00, status: "preparing", time: "13:25" },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  "out-for-delivery": { bg: "bg-blue-900/30", text: "text-blue-400", label: "Out for Delivery" },
  delivered: { bg: "bg-green-900/30", text: "text-green-400", label: "Delivered" },
  preparing: { bg: "bg-amber-900/30", text: "text-amber-400", label: "Preparing" },
};

export default function DashboardPage() {
  const lowStock = products.filter((_, i) => i % 3 === 0).slice(0, 3);

  return (
    <div className="p-6 text-soft">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-soft">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Tuesday, May 13, 2025</p>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-4 gap-4 mb-6"
      >
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              variants={cardReveal}
              className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${kpi.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    kpi.positive ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-soft">{kpi.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{kpi.label}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {/* Orders table */}
        <div className="col-span-2 bg-[#0D1F1A] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-soft font-semibold">Recent Orders</h2>
            <button className="text-accent text-xs font-medium">View All</button>
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => {
              const s = statusColors[order.status];
              return (
                <div key={order.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-soft text-sm font-semibold">{order.id}</p>
                    <p className="text-white/40 text-xs">{order.customer}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-xs">{order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-soft text-sm font-semibold">{formatPrice(order.total)}</p>
                    <p className="text-white/30 text-xs">{order.time}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Revenue chart placeholder */}
          <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-soft font-semibold text-sm">Revenue Trend</h2>
              <TrendingUp className="w-4 h-4 text-accent" />
            </div>
            <div className="h-32 flex items-end gap-1.5">
              {[40, 65, 50, 80, 70, 95, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                  className="flex-1 rounded-t-lg"
                  style={{
                    background: i === 6
                      ? "linear-gradient(to top, #1E3A34, #9FC490)"
                      : "rgba(159,196,144,0.2)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-[10px] text-white/30 flex-1 text-center">{d}</span>
              ))}
            </div>
          </div>

          {/* Low stock alerts */}
          <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-soft font-semibold text-sm">Stock Alerts</h2>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="space-y-3">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  <p className="text-white/60 text-xs flex-1 truncate">{p.name}</p>
                  <span className="text-amber-400 text-xs font-semibold">Low</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="bg-[#0D1F1A] border border-white/5 rounded-2xl p-5">
            <h2 className="text-soft font-semibold text-sm mb-4">Top Categories</h2>
            <div className="space-y-3">
              {[
                { label: "Flower", pct: 42, color: "#9FC490" },
                { label: "Vapes", pct: 28, color: "#7EB8C9" },
                { label: "Edibles", pct: 18, color: "#D4AF37" },
                { label: "Other", pct: 12, color: "#C4A882" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/50 text-xs">{item.label}</span>
                    <span className="text-white/40 text-xs">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
