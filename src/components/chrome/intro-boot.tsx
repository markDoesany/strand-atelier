"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "strand_intel_boot_v1";

export function IntroBoot() {
  const reduce = useReducedMotion();
  const [present, setPresent] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* private mode */
    }
    setPresent(true);
  }, [reduce]);

  useEffect(() => {
    if (!present || reduce) return;
    document.body.style.overflow = "hidden";
    return () => {
      if (!present) document.body.style.overflow = "";
    };
  }, [present, reduce]);

  useEffect(() => {
    if (!present || reduce) return;
    const start = performance.now();
    const duration = 2200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 2.2;
      setProgress(Math.min(100, Math.floor(eased * 100)));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPresent(false), 200);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [present, reduce]);

  const finishBoot = () => {
    setPresent(false);
  };

  const onExitComplete = () => {
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (reduce) return null;

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {present && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--charcoal)] text-[var(--cream)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Loading"
          aria-busy="true"
        >
          <button
            type="button"
            onClick={finishBoot}
            className="absolute right-6 top-24 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[var(--cream)]/50 underline-offset-4 transition-colors hover:text-[var(--gold)] focus-visible:text-[var(--gold)] focus-visible:outline-none"
          >
            [ skip ]
          </button>

          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.35em] text-[var(--gold)]">
            Strand Intelligence
          </p>
          <p className="mt-10 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.28em] text-[var(--cream)]/90 md:text-base">
            [ Calibrating lenses … ]
          </p>
          <p className="mt-6 font-[family-name:var(--font-mono)] text-lg tabular-nums tracking-[0.12em] md:text-xl">
            [ LOADING … {progress.toString().padStart(2, "0")}% ]
          </p>

          <div className="mt-10 h-px w-[min(18rem,70vw)] overflow-hidden bg-[var(--cream)]/15">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
              style={{ width: `${progress}%` }}
              transition={{ type: "tween", duration: 0.06 }}
            />
          </div>

          <p className="mt-8 max-w-xs text-center font-[family-name:var(--font-mono)] text-[0.6rem] leading-relaxed tracking-[0.12em] text-[var(--cream)]/40">
            Demo dataset · illustrative only
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
