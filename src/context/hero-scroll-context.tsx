"use client";

import { createContext, useContext, type MutableRefObject } from "react";

export const HeroScrollProgressContext = createContext<MutableRefObject<number> | null>(null);

export function useHeroScrollProgress() {
  const ctx = useContext(HeroScrollProgressContext);
  if (!ctx) {
    throw new Error("useHeroScrollProgress must be used within HeroScrollProgressContext");
  }
  return ctx;
}
