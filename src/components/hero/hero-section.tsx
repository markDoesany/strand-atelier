"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { HeroScrollProgressContext } from "@/context/hero-scroll-context";
import { SculptureSelectionProvider } from "@/context/sculpture-selection-context";
import { HeroCanvasDynamic } from "./hero-canvas-dynamic";
import { HeroFallback } from "./hero-fallback";
import { InsightDock } from "./insight-dock";
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
      <SculptureSelectionProvider>
        <section
          ref={sectionRef}
          id="hero"
          className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[var(--cream)]"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <div data-sculpture-canvas className="pointer-events-auto h-full min-h-[100svh] w-full opacity-95">
              {useWebGL ? (
                <HeroCanvasDynamic />
              ) : (
                <div className="h-full min-h-[100svh] w-full">
                  <HeroFallback />
                </div>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[var(--cream)] via-[var(--cream)]/82 to-transparent max-lg:via-[var(--cream)]/90" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[var(--cream)]/35 to-transparent" />

          {/*
            pointer-events-none on this layer so clicks pass through to the WebGL canvas (right / behind copy).
            Re-enable hits only on the copy column and the insight dock (both use pointer-events-auto).
          */}
          <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:flex lg:min-h-[100svh] lg:items-center lg:py-0 lg:pl-8 lg:pr-10">
            <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,24rem)] lg:items-center lg:gap-10 xl:gap-14">
              <div className="pointer-events-auto max-w-xl">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[var(--charcoal-muted)]">
                  {dashboardMeta.eyebrow}
                </p>
                <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.22em] text-[var(--charcoal-muted)]/55">
                  [ scene · hero · live signal ]
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

              <div className="pointer-events-none flex justify-end lg:justify-end">
                <InsightDock />
              </div>
            </div>
          </div>
        </section>
      </SculptureSelectionProvider>
    </HeroScrollProgressContext.Provider>
  );
}
