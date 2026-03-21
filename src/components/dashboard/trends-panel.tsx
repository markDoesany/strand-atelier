"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PriceTrendChart } from "@/components/dashboard/price-trend-chart";
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

export function TrendsPanel({ title, subtitle, updated, primary, secondary, highlights }: Props) {
  const reduce = useReducedMotion();

  return (
    <section id="trends" className="scroll-mt-24 border-b border-[var(--line)] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--charcoal-muted)]">
              Price dynamics
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.02em] text-[var(--charcoal)] md:text-[2rem]">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--charcoal-muted)] md:text-base">
              {subtitle}
            </p>
          </div>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--charcoal-muted)]">
            {updated}
          </p>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:items-start lg:gap-12">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 rounded-sm border border-[var(--line)] bg-[var(--warm-white)] p-6 shadow-[0_1px_0_rgba(26,25,23,0.04)] md:p-10"
          >
            <div className="mb-6 flex flex-wrap items-center gap-6 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--charcoal-muted)]">
              <span className="flex items-center gap-2">
                <span
                  className="h-px w-6 bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold)]"
                  aria-hidden
                />
                TTM median
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-px w-6 border-t border-dashed border-[var(--charcoal-muted)]/40"
                  aria-hidden
                />
                Prior-year implied
              </span>
            </div>
            <PriceTrendChart primary={primary} secondary={secondary} />
          </motion.div>

          <InvestmentSection items={highlights} />
        </div>
      </div>
    </section>
  );
}
