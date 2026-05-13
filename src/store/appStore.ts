"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppStore {
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  login: () => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasSeenOnboarding: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
    }),
    { name: "greenflow-app" }
  )
);
