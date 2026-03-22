"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function CursorHud() {
  const reduce = useReducedMotion();
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduce || !mounted) return;
    const onMove = (e: PointerEvent) => {
      setXy({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mounted]);

  if (reduce || !mounted) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-6 z-40 hidden select-none font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.14em] text-[var(--charcoal-muted)]/70 lg:block"
      aria-hidden
    >
      <span className="tabular-nums">
        X : {xy.x.toString().padStart(4, "0")} · Y : {xy.y.toString().padStart(4, "0")}
      </span>
    </div>
  );
}
