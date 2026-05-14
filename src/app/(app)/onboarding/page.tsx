"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap, Package, Shield } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const slides = [
  { id: 0, icon: Zap, title: "Lightning Fast\nDelivery", subtitle: "Get premium cannabis delivered to your door in under 45 minutes. Track your order in real-time.", bg: "/images/splash-lightning-fast.png", accent: "#9FC490" },
  { id: 1, icon: Package, title: "Premium\nProducts", subtitle: "Curated selection of lab-tested flower, edibles, concentrates, and more from top-tier producers.", bg: "/images/splash-premium-products.png", accent: "#D4AF37" },
  { id: 2, icon: Shield, title: "100% Secure\nOrdering", subtitle: "Discreet packaging, encrypted payments, and age-verified delivery by our trusted team.", bg: "/images/splash-secure.png", accent: "#7EB8C9" },
];

export default function OnboardingScreen() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  const handleNext = () => {
    if (current < slides.length - 1) { setCurrent(current + 1); }
    else { completeOnboarding(); router.push("/auth"); }
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={`bg-${current}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slide.bg})` }} />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex justify-end p-4 pt-6">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => { completeOnboarding(); router.push("/auth"); }} className="text-white/40 text-sm font-medium px-3 py-1">
          Skip
        </motion.button>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 gap-8 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={`icon-${current}`} initial={{ scale: 0.5, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.5, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative">
            <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full blur-2xl" style={{ background: `${slide.accent}40` }} />
            <div className="relative w-36 h-36 rounded-[36px] flex items-center justify-center border"
              style={{ background: `linear-gradient(135deg, ${slide.accent}20, ${slide.accent}08)`, borderColor: `${slide.accent}30`, boxShadow: `0 20px 60px ${slide.accent}30` }}>
              <Icon className="w-16 h-16" style={{ color: slide.accent }} strokeWidth={1.5} />
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div key={`text-${current}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.4 }} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-soft leading-tight whitespace-pre-line mb-4">{slide.title}</h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-[320px] mx-auto">{slide.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 pb-10 px-6 flex flex-col items-center gap-6 max-w-lg mx-auto w-full">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <motion.button key={i} onClick={() => setCurrent(i)}
              animate={{ width: i === current ? 24 : 6, opacity: i === current ? 1 : 0.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-1.5 rounded-full" style={{ background: i === current ? slide.accent : "#ffffff" }} />
          ))}
        </div>

        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={handleNext}
          className="w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-semibold text-base"
          style={{ background: `linear-gradient(135deg, ${slide.accent}dd, ${slide.accent}99)`, color: current === 1 ? "#1E3A34" : "#0D2420", boxShadow: `0 8px 32px ${slide.accent}40` }}>
          {current === slides.length - 1 ? "Get Started" : "Continue"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
