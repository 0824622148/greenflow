"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Star, ShoppingCart, ChevronLeft, Check } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/common/GlassCard";
import StarRating from "@/components/common/StarRating";
import THCBadge from "@/components/common/THCBadge";
import QuantityControl from "@/components/common/QuantityControl";
import { getProductById, products } from "@/data/products";
import { getReviewsByProductId } from "@/data/reviews";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { staggerContainer, cardReveal, slideUp } from "@/lib/animations";

export default function ProductDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id);
  const reviews = getReviewsByProductId(id);
  const addItem = useCartStore((s) => s.addItem);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "effects" | "reviews">("details");

  if (!product) {
    router.push("/products");
    return null;
  }

  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const strainColors: Record<string, string> = {
    Sativa: "#9FC490",
    Indica: "#9B8FD4",
    Hybrid: "#7EB8C9",
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-app-gradient">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto phone-scroll">
        {/* Hero section */}
        <div className="relative min-h-[320px] overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: product.isPremium
                ? "linear-gradient(135deg, #1a1200 0%, #2a1e00 100%)"
                : "linear-gradient(135deg, #0D2420 0%, #1a3830 100%)",
            }}
          />

          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-48 h-48 rounded-full blur-3xl opacity-30"
              style={{ background: product.isPremium ? "#D4AF37" : "#5F8D6B" }}
            />
          </div>

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-soft" />
            </motion.button>
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.85 }}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"
              >
                <Share2 className="w-4 h-4 text-soft" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setLiked(!liked)}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-red-400 text-red-400" : "text-soft"}`} />
              </motion.button>
            </div>
          </div>

          {/* Product image */}
          <div className="relative z-10 flex justify-center py-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={180}
                height={180}
                className="w-44 h-44 object-cover rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                unoptimized
              />
              {product.isPremium && (
                <div className="absolute -top-2 -right-2 text-[10px] bg-gold-gradient text-forest px-2.5 py-1 rounded-full font-bold shadow-gold">
                  ✦ PREMIUM
                </div>
              )}
            </motion.div>
          </div>

          {/* Tags */}
          <div className="relative z-10 flex gap-2 px-4 pb-4 flex-wrap justify-center">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                background: `${strainColors[product.strainType]}20`,
                color: strainColors[product.strainType],
                borderColor: `${strainColors[product.strainType]}40`,
              }}
            >
              {product.strainType}
            </span>
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/8 text-white/50 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Info section */}
        <div className="px-4 -mt-2">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <p className="text-white/40 text-xs font-medium mb-1">{product.brand}</p>
              <h1 className="text-soft text-2xl font-bold leading-tight">{product.name}</h1>
            </div>
            <div className="text-right">
              <div className="text-soft text-2xl font-bold">{formatPrice(product.price)}</div>
              {product.originalPrice && (
                <div className="text-white/30 text-sm line-through">{formatPrice(product.originalPrice)}</div>
              )}
            </div>
          </div>

          {/* Rating row */}
          <div className="flex items-center gap-3 mb-4 mt-2">
            <StarRating rating={product.rating} size="md" showValue />
            <span className="text-white/30 text-xs">({product.reviewCount} reviews)</span>
            <span className="text-white/30">·</span>
            <span className="text-white/40 text-xs">{product.weight}</span>
          </div>

          {/* THC/CBD row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <GlassCard className="p-3 text-center">
              <p className="text-white/40 text-[10px] mb-1">THC Content</p>
              <p className="text-accent text-2xl font-black">{product.thcPercent}%</p>
            </GlassCard>
            <GlassCard className="p-3 text-center">
              <p className="text-white/40 text-[10px] mb-1">CBD Content</p>
              <p className="text-sage text-2xl font-black">{product.cbdPercent}%</p>
            </GlassCard>
          </div>

          {/* Tabs */}
          <div className="flex rounded-2xl bg-white/5 border border-white/10 p-1 mb-4">
            {(["details", "effects", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${
                  activeTab === tab ? "bg-forest text-soft shadow-green" : "text-white/40"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 mb-4"
              >
                <p className="text-white/60 text-sm leading-relaxed">{product.description}</p>

                {product.bestFor && (
                  <div>
                    <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.bestFor.map((b) => (
                        <span key={b} className="px-3 py-1.5 rounded-full text-xs bg-forest/40 text-accent border border-sage/20 font-medium">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Flavor Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavorNotes.map((f) => (
                      <span key={f} className="px-3 py-1.5 rounded-full text-xs bg-white/5 text-white/50 border border-white/10 font-medium">
                        🍃 {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "effects" && (
              <motion.div
                key="effects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 mb-4"
              >
                {product.effects.map((effect, i) => (
                  <div key={effect} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/60 text-sm">{effect}</span>
                        <span className="text-accent text-xs font-semibold">{Math.round(80 - i * 12)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.round(80 - i * 12)}%` }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-accent to-sage"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 mb-4"
              >
                {reviews.length === 0 && (
                  <p className="text-white/30 text-sm text-center py-4">No reviews yet.</p>
                )}
                {reviews.map((review) => (
                  <GlassCard key={review.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-soft text-sm font-semibold">{review.author}</p>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          {review.verified && (
                            <span className="text-[10px] text-accent font-medium flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-white/25 text-[10px]">{review.date}</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed">{review.body}</p>
                  </GlassCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Similar products */}
          {similar.length > 0 && (
            <div className="mb-6">
              <h3 className="text-soft font-semibold text-sm mb-3">You May Also Like</h3>
              <div className="flex gap-3 overflow-x-auto phone-scroll">
                {similar.map((p) => (
                  <motion.div
                    key={p.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/products/${p.id}`)}
                    className="flex-shrink-0 w-32 cursor-pointer"
                  >
                    <GlassCard className="p-2.5">
                      <Image src={p.imageUrl} alt={p.name} width={80} height={80} className="w-full h-20 object-cover rounded-xl mb-2" unoptimized />
                      <p className="text-soft text-xs font-semibold truncate">{p.name}</p>
                      <p className="text-accent text-xs font-bold mt-1">{formatPrice(p.price)}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="h-32" />
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
        className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-4 bg-gradient-to-t from-[#0D2420] to-transparent"
      >
        <div className="flex items-center gap-3">
          <QuantityControl value={qty} onChange={setQty} className="flex-shrink-0" />
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
              added
                ? "bg-green-700 text-soft"
                : "bg-forest-gradient text-soft shadow-green"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart — {formatPrice(product.price * qty)}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
