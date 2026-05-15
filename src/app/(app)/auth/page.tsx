"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Image from "next/image";
import PillButton from "@/components/common/PillButton";
import { useAppStore } from "@/store/appStore";
import { staggerContainer, cardReveal } from "@/lib/animations";

export default function AuthScreen() {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  const handleLogin = () => {
    login();
    router.push("/home");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (newOtp.every((d) => d) && index === 5) {
      setTimeout(handleLogin, 300);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D2420] to-[#080F0D]" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-48 h-48 rounded-full bg-forest/20 blur-3xl" />
      <div className="absolute bottom-32 left-0 w-40 h-40 rounded-full bg-sage/15 blur-3xl" />

      <div className="relative z-10 flex flex-col h-full px-6 pt-16 pb-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-10"
        >
          <motion.div variants={cardReveal} className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center p-1 shadow-md">
              <Image src="/images/greenflow-logo.png" alt="GreenFlow" width={36} height={36} className="object-contain" />
            </div>
            <span className="text-lg font-bold text-soft">GreenFlow</span>
          </motion.div>

          <motion.h1 variants={cardReveal} className="text-3xl font-bold text-soft leading-tight">
            {step === "phone" ? "Welcome\nBack" : "Enter\nVerification Code"}
          </motion.h1>
          <motion.p variants={cardReveal} className="text-white/40 mt-2 text-sm">
            {step === "phone"
              ? "Sign in or create your account"
              : `Code sent to ${phone}`}
          </motion.p>
        </motion.div>

        {step === "phone" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 flex-1"
          >
            {/* Phone input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/40" />
                <span className="text-white/40 text-sm font-medium">+1</span>
                <div className="w-px h-4 bg-white/15" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full h-14 pl-20 pr-4 rounded-2xl bg-white/5 border border-white/10 text-soft placeholder-white/25 text-base focus:outline-none focus:border-accent/50 focus:bg-white/8 transition-all"
              />
            </div>

            <PillButton
              onClick={() => phone ? setStep("otp") : null}
              size="lg"
              fullWidth
              className="h-14 rounded-2xl"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </PillButton>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/30 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Social logins */}
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex-1 h-13 py-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-soft text-sm font-medium hover:bg-white/8 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.252-.164-1.84H9v3.48h4.844c-.209 1.125-.843 2.078-1.797 2.717v2.258h2.908c1.702-1.567 2.686-3.874 2.686-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.957-2.185l-2.908-2.259c-.806.54-1.837.86-3.05.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.705C3.786 10.165 3.685 9.590 3.685 9c0-.59.101-1.165.279-1.705V4.963H.957C.347 6.175 0 7.546 0 9s.348 2.825.957 4.037l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.581C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.963L3.964 7.295C4.672 5.169 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Google
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="flex-1 h-13 py-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-soft text-sm font-medium hover:bg-white/8 transition-colors"
              >
                <svg width="16" height="20" viewBox="0 0 16 20" fill="white">
                  <path d="M13.544 10.544c-.022-2.456 2.006-3.644 2.098-3.71-1.144-1.672-2.922-1.9-3.552-1.928-1.506-.154-2.952.888-3.716.888-.764 0-1.936-.868-3.188-.844-1.636.022-3.152.952-3.992 2.41-1.706 2.962-.436 7.34 1.224 9.742.814 1.176 1.78 2.494 3.046 2.446 1.222-.048 1.68-.788 3.158-.788 1.478 0 1.888.788 3.17.764 1.316-.022 2.148-1.192 2.956-2.372.932-1.358 1.316-2.674 1.338-2.74-.028-.014-2.56-1-2.542-3.668zM11.234 3.258c.676-.82 1.132-1.96 1.008-3.094-.974.04-2.152.648-2.85 1.468-.626.724-1.172 1.88-1.026 2.988 1.086.084 2.192-.556 2.868-1.362z"/>
                </svg>
                Apple
              </motion.button>
            </div>

            <p className="text-center text-xs text-white/25 mt-auto leading-relaxed">
              By continuing, you confirm you are 21+ years of age and agree to our{" "}
              <span className="text-accent/60">Terms of Service</span> and{" "}
              <span className="text-accent/60">Privacy Policy</span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 flex-1"
          >
            {/* OTP input */}
            <div className="flex gap-3 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  className="w-12 h-14 rounded-2xl bg-white/5 border border-white/15 text-center text-xl font-bold text-soft focus:outline-none focus:border-accent/60 focus:bg-white/8 transition-all"
                />
              ))}
            </div>

            <PillButton onClick={handleLogin} size="lg" fullWidth className="h-14 rounded-2xl">
              Verify & Sign In
            </PillButton>

            <button
              onClick={() => setStep("phone")}
              className="text-center text-sm text-white/40 hover:text-white/60"
            >
              Use a different number
            </button>

            {/* Demo shortcut */}
            <div className="mt-auto">
              <PillButton
                onClick={handleLogin}
                variant="ghost"
                fullWidth
                className="border border-white/8 text-white/40"
              >
                Demo: Skip Login
              </PillButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
