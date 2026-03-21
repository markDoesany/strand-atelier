"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { HeroScrollProgressContext } from "@/context/hero-scroll-context";
import { HeroCanvasDynamic } from "./hero-canvas-dynamic";
import { HeroFallback } from "./hero-fallback";
import { site } from "@/data/site";
import { dashboardMeta } from "@/data/market";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  const useWebGL = !reduceMotion && !narrow;

  return (
    <HeroScrollProgressContext.Provider value={progressRef}>
      <section
        ref={sectionRef}
        id="hero"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--cream)]"
      >
        <div className="absolute inset-0 z-0">
          {useWebGL ? (
            <div className="h-full min-h-[100svh] w-full opacity-90">
              <HeroCanvasDynamic />
            </div>
          ) : (
            <HeroFallback />
          )}
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--cream)] via-[var(--cream)]/88 to-transparent max-lg:via-[var(--cream)]/92" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--cream)]/30 to-transparent" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:py-0 lg:pl-8 lg:pr-12">
          <div className="max-w-xl">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[var(--charcoal-muted)]">
              {dashboardMeta.eyebrow}
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--charcoal)]"
            >
              {dashboardMeta.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lg leading-relaxed text-[var(--charcoal-muted)] md:text-xl"
            >
              {dashboardMeta.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#trends"
                className="inline-flex min-h-12 items-center justify-center border border-[var(--charcoal)] bg-[var(--charcoal)] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--warm-white)] transition-opacity hover:opacity-90"
              >
                View price trends
              </a>
              <a
                href="#regions"
                className="inline-flex min-h-12 items-center justify-center border border-[var(--charcoal)]/20 px-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-deep)]"
              >
                Regional insights
              </a>
            </motion.div>
            <p className="mt-8 font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.14em] text-[var(--charcoal-muted)]">
              {site.name} · {dashboardMeta.updated}
            </p>
          </div>
        </div>
      </section>
    </HeroScrollProgressContext.Provider>
  );
}
