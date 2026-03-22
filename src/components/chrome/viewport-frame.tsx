"use client";

import { useReducedMotion } from "framer-motion";

/** Subtle corner brackets + hairline frame — Studio-style chrome without blocking UI. */
export function ViewportFrame() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const corner =
    "pointer-events-none absolute border-[var(--charcoal)]/12 max-md:hidden";
  const arm = "h-7 w-7";

  return (
    <div className="pointer-events-none fixed inset-0 z-[24]" aria-hidden>
      <div className={`${corner} ${arm} left-5 top-20 border-l border-t lg:left-8 lg:top-24`} />
      <div className={`${corner} ${arm} right-5 top-20 border-r border-t lg:right-8 lg:top-24`} />
      <div className={`${corner} ${arm} bottom-8 left-5 border-b border-l lg:left-8`} />
      <div className={`${corner} ${arm} bottom-8 right-5 border-b border-r lg:right-8`} />
      <div className="absolute inset-x-8 top-20 border-t border-[var(--charcoal)]/6 max-md:hidden lg:inset-x-10" />
      <div className="absolute inset-x-8 bottom-8 border-b border-[var(--charcoal)]/6 max-md:hidden lg:inset-x-10" />
    </div>
  );
}
