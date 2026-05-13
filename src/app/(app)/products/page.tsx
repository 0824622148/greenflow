"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import StarRating from "@/components/common/StarRating";
import THCBadge from "@/components/common/THCBadge";
import TopBar from "@/components/layout/TopBar";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { staggerContainer, cardReveal, sheetVariants } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { Category } from "@/types/product";

type SortOption = "popular" | "price-low" | "price-high" | "thc-high" | "rating";

export default function ProductsScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [priceMax, setPriceMax] = useState(120);
  const [minThc, setMinThc] = useState(0);
  const router = useRouter();

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    list = list.filter((p) => p.price <= priceMax && p.thcPercent >= minThc);
    switch (sortBy) {
      case "price-low": list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "thc-high": list.sort((a, b) => b.thcPercent - a.thcPercent); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return list;
  }, [search, activeCategory, sortBy, priceMax, minThc]);

  const sortLabels: Record<SortOption, string> = {
    popular: "Most Popular", "price-low": "Price: Low→High", "price-high": "Price: High→Low",
    "thc-high": "THC: Highest", rating: "Top Rated",
  };

  return (
    <div className="w-full min-h-screen bg-app-gradient">
      <div className="max-w-5xl mx-auto px-4 pb-24 md:pb-8 md:pt-2">
        {/* Header */}
        <div className="hidden md:block py-6">
          <h1 className="text-2xl font-bold text-soft">Shop</h1>
          <p className="text-white/40 text-sm mt-1">{filtered.length} products available</p>
        </div>
        <div className="md:hidden">
          <TopBar title="Shop" />
        </div>

        {/* Search + controls */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-white/5 border border-white/10">
            <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search strains, products..."
              className="flex-1 bg-transparent text-soft text-sm placeholder-white/25 focus:outline-none"
            />
            {search && <button onClick={() => setSearch("")}><X className="w-4 h-4 text-white/30" /></button>}
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto phone-scroll flex-1">
              <button
                onClick={() => setActiveCategory("All")}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === "All" ? "bg-accent text-forest" : "bg-white/5 text-white/50 border border-white/10"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border`}
                  style={
                    activeCategory === cat.id
                      ? { background: cat.color, borderColor: cat.color, color: "#0D2420" }
                      : { background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }
                  }
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-2 flex-shrink-0 relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { setShowSort(!showSort); setShowFilters(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
              >
                <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
                <ChevronDown className="w-3 h-3" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { setShowFilters(!showFilters); setShowSort(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span className="hidden sm:inline">Filters</span>
              </motion.button>

              {/* Sort dropdown */}
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute right-0 top-10 z-50 rounded-2xl bg-[#1a3530] border border-white/15 overflow-hidden shadow-glass-lg min-w-[180px]"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setShowSort(false); }}
                        className={`w-full px-4 py-3 text-left text-sm hover:bg-white/8 transition-colors ${
                          sortBy === opt ? "text-accent font-semibold" : "text-white/60"
                        }`}
                      >
                        {sortLabels[opt]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Desktop inline filter bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <GlassCard className="p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">Max Price</span>
                      <span className="text-accent text-sm font-semibold">{formatPrice(priceMax)}</span>
                    </div>
                    <input type="range" min={10} max={120} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-accent" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-sm">Min THC %</span>
                      <span className="text-accent text-sm font-semibold">{minThc}%</span>
                    </div>
                    <input type="range" min={0} max={35} value={minThc} onChange={(e) => setMinThc(Number(e.target.value))} className="w-full accent-accent" />
                  </div>
                </div>
                <button onClick={() => setShowFilters(false)} className="mt-3 px-6 py-2 rounded-xl bg-forest text-soft text-sm font-semibold">
                  Apply
                </button>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results count */}
        <p className="text-white/30 text-xs mb-3">{filtered.length} products</p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <span className="text-4xl">🌿</span>
            <p className="text-white/40 text-sm">No products found</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={cardReveal}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(`/products/${product.id}`)}
                className="cursor-pointer"
              >
                <GlassCard variant={product.isPremium ? "gold" : "default"} className="p-3">
                  <div className="relative h-28 md:h-36 flex items-center justify-center mb-2">
                    <Image src={product.imageUrl} alt={product.name} width={110} height={110} className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl" unoptimized />
                    {product.isOnSale && <span className="absolute top-0 right-0 text-[9px] bg-red-500/80 text-white px-1.5 py-0.5 rounded-full font-bold">SALE</span>}
                    {product.isPremium && <span className="absolute top-0 left-0 text-[9px] bg-gold/20 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full font-bold">✦ PREMIUM</span>}
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] text-white/30">{product.strainType}</span>
                    <span className="text-white/15">·</span>
                    <span className="text-[10px] text-white/30">{product.weight}</span>
                  </div>
                  <h3 className="text-soft text-sm font-semibold leading-tight truncate">{product.name}</h3>
                  <p className="text-white/30 text-[10px] truncate">{product.brand}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <StarRating rating={product.rating} />
                    <span className="text-white/30 text-[10px]">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-soft font-bold text-sm">{formatPrice(product.price)}</span>
                      {product.originalPrice && <span className="text-white/25 text-[10px] line-through ml-1">{formatPrice(product.originalPrice)}</span>}
                    </div>
                    <THCBadge type="thc" value={product.thcPercent} />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
