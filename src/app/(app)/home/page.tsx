"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Star, Flame, ChevronRight, Truck } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import StarRating from "@/components/common/StarRating";
import THCBadge from "@/components/common/THCBadge";
import { products, getFeaturedProducts } from "@/data/products";
import { staggerContainer, cardReveal } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";

const categoryCards = [
  { id: "Flower",       label: "Flower",       tag: "Premium Selection", subtitle: "50+ strains in stock",       bg: "/images/products/og-kush.png",                accent: "#9FC490" },
  { id: "Edibles",      label: "Edibles",      tag: "Lab Tested",        subtitle: "Gummies, chocolates & more", bg: "/images/products/midnight-berry-gummies.png", accent: "#D4AF37" },
  { id: "Vapes",        label: "Vapes",        tag: "Top Shelf",         subtitle: "Distillate & live resin",    bg: "/images/products/pineapple-express.png",       accent: "#7EB8C9" },
  { id: "Concentrates", label: "Concentrates", tag: "Just Dropped",      subtitle: "Live resin & rosin",         bg: "/images/products/live-resin-wedding-cake.png", accent: "#D4AF37" },
  { id: "Pre-Rolls",    label: "Pre-Rolls",    tag: "Ready to Light",    subtitle: "Infused & classic",          bg: "/images/products/infused-pre-roll-pack.png",   accent: "#E07B6A" },
  { id: "Tinctures",    label: "Tinctures",    tag: "Wellness",          subtitle: "Full spectrum CBD",          bg: "/images/products/full-spectrum-cbd-thc.png",   accent: "#9B8FD4" },
];

const banners = [
  { id: 0, title: "25% OFF", subtitle: "All Flower Today", tag: "Daily Deal", bg: "/images/banner-daily-deal.png", accent: "#9FC490" },
  { id: 1, title: "NEW ARRIVALS", subtitle: "Live Resin Collection", tag: "Just Dropped", bg: "/images/banner-new-arrivals.png", accent: "#D4AF37" },
  { id: 2, title: "FREE DELIVERY", subtitle: "On Orders Over $75", tag: "Limited Time", bg: "/images/banner-free-delivery.png", accent: "#7EB8C9" },
];

export default function HomeScreen() {
  const [activeBanner, setActiveBanner] = useState(0);
  const router = useRouter();
  const featured = getFeaturedProducts();
  const onSale = products.filter((p) => p.isOnSale);
  const displayProducts = products.slice(0, 8);

  useEffect(() => {
    const t = setInterval(() => setActiveBanner((b) => (b + 1) % banners.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full min-h-screen bg-app-gradient">
      <div className="max-w-5xl mx-auto px-4 pb-24 md:pb-8 md:pt-6">
        {/* Header */}
        <div className="pt-4 pb-4 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs font-medium">Welcome back,</p>
            <h1 className="text-soft text-xl font-bold">What are you feeling today?</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center relative"
          >
            <Bell className="w-4 h-4 text-soft" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
          </motion.button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <motion.div
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push("/products")}
            className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer"
          >
            <Search className="w-4 h-4 text-white/30" />
            <span className="text-white/30 text-sm">Search products, strains...</span>
          </motion.div>
        </div>

        {/* Delivery badge */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-forest/30 border border-sage/20 rounded-xl px-3 py-2 w-fit">
            <Truck className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-accent font-medium">Delivering to</span>
            <span className="text-xs text-white/60">2847 Maple Grove Dr</span>
            <ChevronRight className="w-3 h-3 text-white/30" />
          </div>
        </div>

        {/* Hero Banner Carousel */}
        <div className="mb-6">
          <div className="relative h-40 md:h-52 rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              {banners.map((banner, i) =>
                i === activeBanner ? (
                  <motion.div
                    key={banner.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center px-6 md:px-10"
                    style={{ backgroundImage: `url(${banner.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  >
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="flex-1 relative z-10">
                      <span
                        className="text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                        style={{ background: `${banner.accent}25`, color: banner.accent, border: `1px solid ${banner.accent}40` }}
                      >
                        {banner.tag}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: banner.accent }}>
                        {banner.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-1">{banner.subtitle}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => router.push("/products")}
                      className="relative z-10 h-10 px-5 rounded-full text-sm font-semibold flex-shrink-0"
                      style={{ background: banner.accent, color: "#0D2420" }}
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{ width: i === activeBanner ? 16 : 5, background: i === activeBanner ? "#9FC490" : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-soft font-semibold text-base mb-3">Categories</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Row 1: large left + tall right */}
            {[
              { ...categoryCards[0], span: "col-span-2", h: "h-52" },
              { ...categoryCards[1], span: "col-span-1", h: "h-52" },
              /* Row 2: small left + wide right */
              { ...categoryCards[2], span: "col-span-1", h: "h-36" },
              { ...categoryCards[3], span: "col-span-2", h: "h-36" },
              /* Row 3: wide left + small right */
              { ...categoryCards[4], span: "col-span-2", h: "h-44" },
              { ...categoryCards[5], span: "col-span-1", h: "h-44" },
            ].map((cat) => (
              <motion.div
                key={cat.id}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2 }}
                onClick={() => router.push("/products")}
                className={`relative ${cat.h} ${cat.span} rounded-2xl overflow-hidden cursor-pointer border border-white/15`}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cat.bg})` }} />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(13,36,32,0.15) 40%, rgba(13,36,32,0.95) 100%)" }} />
                <div className="relative z-10 flex flex-col justify-end p-3 h-full">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1.5 w-fit"
                    style={{ background: `${cat.accent}25`, color: cat.accent, border: `1px solid ${cat.accent}40` }}
                  >
                    {cat.tag}
                  </span>
                  <h3 className="text-white font-black text-base leading-tight">{cat.label}</h3>
                  <p className="text-white/50 text-[10px] mt-0.5">{cat.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured — horizontal scroll */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-soft font-semibold text-base">Featured</h2>
            <button onClick={() => router.push("/products")} className="text-accent text-xs font-medium flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto phone-scroll pb-2">
            {featured.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(`/products/${product.id}`)}
                className="flex-shrink-0 w-44 md:w-52 cursor-pointer"
              >
                <GlassCard variant={product.isPremium ? "gold" : "default"} className="p-3">
                  <div className="relative h-32 md:h-40 mb-3 flex items-center justify-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={140}
                      height={140}
                      className="object-cover w-28 h-28 md:w-36 md:h-36 rounded-xl"
                      unoptimized
                    />
                    {product.isOnSale && (
                      <span className="absolute top-0 right-0 text-[9px] bg-red-500/80 text-white px-1.5 py-0.5 rounded-full font-bold">SALE</span>
                    )}
                    {product.isPremium && (
                      <span className="absolute top-0 left-0 text-[9px] bg-gold/20 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full font-bold">PREMIUM</span>
                    )}
                  </div>
                  <h3 className="text-soft text-sm font-semibold leading-tight truncate">{product.name}</h3>
                  <p className="text-white/40 text-[10px] mt-0.5">{product.brand}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <THCBadge type="thc" value={product.thcPercent} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="text-soft font-bold text-sm">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-white/30 text-xs line-through ml-1">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <span className="text-white/50 text-xs">{product.rating}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        {onSale.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-400" />
                <h2 className="text-soft font-semibold text-base">Daily Deals</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {onSale.map((product) => (
                <motion.div
                  key={product.id}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ y: -2 }}
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="cursor-pointer"
                >
                  <GlassCard className="flex items-center gap-3 p-3">
                    <Image src={product.imageUrl} alt={product.name} width={64} height={64} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" unoptimized />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-soft text-sm font-semibold truncate">{product.name}</h3>
                      <p className="text-white/40 text-xs">{product.weight}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-soft font-bold text-sm">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-white/30 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                            <span className="text-red-400 text-xs font-bold">
                              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 flex-shrink-0" />
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-soft font-semibold text-base">Recommended</h2>
            <button onClick={() => router.push("/products")} className="text-accent text-xs font-medium flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {displayProducts.map((product) => (
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
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={110}
                      height={110}
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl"
                      unoptimized
                    />
                  </div>
                  <p className="text-white/40 text-[10px] font-medium">{product.category}</p>
                  <h3 className="text-soft text-sm font-semibold leading-tight mt-0.5 truncate">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-white/40 text-[10px]">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-soft font-bold text-sm">{formatPrice(product.price)}</span>
                    <THCBadge type="thc" value={product.thcPercent} />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Membership CTA */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative h-44 rounded-3xl overflow-hidden cursor-pointer border border-white/15 mb-6"
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/images/banner-free-delivery.png)` }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.68) 100%)" }} />
          <div className="relative z-10 flex items-end justify-between h-full p-5">
            <div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full inline-block"
                style={{ background: "rgba(212,175,55,0.2)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.4)" }}
              >
                MEMBERS CLUB
              </span>
              <h3 className="text-2xl font-black leading-tight mt-1.5" style={{ color: "#D4AF37" }}>Become a BUDdy</h3>
              <p className="text-white/60 text-xs mt-1">Free delivery · Member pricing · Priority drops</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="h-10 px-5 rounded-full text-sm font-semibold flex-shrink-0"
              style={{ background: "#D4AF37", color: "#0D2420" }}
            >
              Join Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
