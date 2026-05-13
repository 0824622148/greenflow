"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-[#050A09] flex items-center justify-center p-8 hidden md:flex">
      {/* Outer glow */}
      <div className="relative">
        <div className="absolute inset-0 rounded-[54px] bg-forest/20 blur-3xl scale-110 pointer-events-none" />

        {/* Phone body */}
        <div
          className={cn(
            "relative w-[390px] h-[844px] rounded-[54px] overflow-hidden",
            "border-[10px] border-[#1C1C1E]",
            "shadow-[0_50px_100px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.08)]",
            className
          )}
          style={{ background: "#0D2420" }}
        >
          {/* Screen content */}
          <div className="relative w-full h-full overflow-hidden bg-app-gradient">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-[#1C1C1E] rounded-b-[20px] z-50 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2A2A2A] border border-[#3A3A3A]" />
              <div className="w-12 h-[5px] rounded-full bg-[#2A2A2A]" />
            </div>

            {/* Content area */}
            <div className="w-full h-full phone-scroll overflow-y-auto overflow-x-hidden pt-[34px]">
              {children}
            </div>
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute left-[-12px] top-[140px] w-[4px] h-[36px] bg-[#2A2A2A] rounded-l-sm" />
        <div className="absolute left-[-12px] top-[188px] w-[4px] h-[64px] bg-[#2A2A2A] rounded-l-sm" />
        <div className="absolute left-[-12px] top-[264px] w-[4px] h-[64px] bg-[#2A2A2A] rounded-l-sm" />
        <div className="absolute right-[-12px] top-[196px] w-[4px] h-[100px] bg-[#2A2A2A] rounded-r-sm" />
      </div>
    </div>
  );
}

export function MobileWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-dvh bg-app-gradient overflow-x-hidden">
      {children}
    </div>
  );
}
