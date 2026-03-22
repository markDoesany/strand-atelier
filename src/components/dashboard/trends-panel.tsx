"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PriceTrendChartExperience } from "@/components/dashboard/price-trend-chart-experience";
import { InvestmentSection } from "@/components/dashboard/investment-section";
import type { SeriesPoint } from "@/data/market";

type Props = {
  title: string;
  subtitle: string;
  updated: string;
  primary: SeriesPoint[];
  secondary: SeriesPoint[];
  highlights: readonly { title: string; body: string }[];
};

/** Split title into words for staggered “beautiful chaos” motion */
function ChaoticTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h2 className="relative mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(1.75rem,4.5vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--charcoal)]">
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, y: 18, rotate: (i % 2 === 0 ? -1 : 1) * 2.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: (i % 3) - 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 28,
            delay: i * 0.04,
          }}
          className="mr-[0.2em] inline-block origin-left"
          style={{
            marginTop: i % 4 === 1 ? "-0.04em" : i % 4 === 3 ? "0.06em" : undefined,
          }}
        >
          {w}
        </motion.span>
      ))}
    </h2>
  );
}

export function TrendsPanel({ title, subtitle, updated, primary, secondary, highlights }: Props) {
  const reduce = useReducedMotion();

  return (
    <section id="trends" className="scroll-mt-24 border-b border-[var(--line)] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -left-2 top-0 hidden font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.3em] text-[var(--gold-deep)]/90 md:block md:-rotate-90 md:whitespace-nowrap">
            [ 02 — trends ]
          </div>

          <div className="md:pl-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="relative max-w-2xl">
                <p
                  className="inline-block -rotate-1 font-[family-name:var(--font-mono)] text-[0.58rem] font-medium uppercase tracking-[0.32em] text-[var(--charcoal-muted)]"
                  style={{ transform: "rotate(-0.8deg) translateX(-2px)" }}
                >
                  Price dynamics / / volatile calm
                </p>
                <ChaoticTitle text={title} />
                <motion.p
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-5 max-w-lg border-l-2 border-[var(--gold)]/35 pl-5 text-sm leading-[1.75] text-[var(--charcoal-muted)] md:text-base"
                >
                  <span
                    className="absolute -left-px top-0 block h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--gold)]/25"
                    aria-hidden
                  />
                  {subtitle}
                </motion.p>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, rotate: 1.5, y: 8 }}
                whileInView={{ opacity: 1, rotate: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="shrink-0 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-[var(--charcoal-muted)] lg:max-w-[12rem] lg:text-right"
              >
                <span className="block text-[var(--gold-deep)]">[ feed status ]</span>
                <span className="mt-2 block opacity-80">{updated}</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:items-start lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="chaos-chart-panel relative min-w-0 overflow-visible border border-[var(--line)] bg-[var(--warm-white)]/90 p-6 shadow-[8px_12px_0_rgba(26,25,23,0.04)] md:p-10 md:shadow-[12px_16px_0_rgba(26,25,23,0.035)]"
          >
            <div
              className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 border-r-2 border-t-2 border-[var(--gold)]/25"
              aria-hidden
            />
            <div className="mb-8 flex flex-wrap items-end gap-x-8 gap-y-3">
              <span className="inline-flex -rotate-1 flex-col gap-1 font-[family-name:var(--font-mono)] text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[var(--charcoal)]">
                <span className="flex items-center gap-2 text-[var(--charcoal-muted)]">
                  <span className="h-px w-8 bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold)]" />
                  TTM median
                </span>
                <span className="text-[0.55rem] tracking-[0.28em] text-[var(--gold-deep)]">3d ribbon</span>
              </span>
              <span className="inline-flex rotate-1 flex-col gap-1 font-[family-name:var(--font-mono)] text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[var(--charcoal-muted)]">
                <span className="flex items-center gap-2">
                  <span className="h-px w-8 border-t border-dashed border-[var(--charcoal-muted)]/45" />
                  Prior-year implied
                </span>
                <span className="text-[0.55rem] tracking-[0.26em] opacity-70">trace · dashed</span>
              </span>
            </div>
            <PriceTrendChartExperience primary={primary} secondary={secondary} />
          </motion.div>

          <InvestmentSection items={highlights} />
        </div>
      </div>
    </section>
  );
}
