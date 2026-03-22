"use client";

import { motion, useReducedMotion } from "framer-motion";
import { kpis } from "@/data/market";

type Kpi = (typeof kpis)[number];

export function KpiStrip({ items }: { items: readonly Kpi[] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="overview"
      aria-label="Key market indicators"
      className="border-b border-[var(--line)] bg-[var(--warm-white)]/80"
    >
      <div className="mx-auto grid max-w-6xl gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((k, i) => (
          <motion.div
            key={k.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={
              reduce
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 420, damping: 32, delay: i * 0.05 }
            }
            className="bg-[var(--warm-white)] px-6 py-8 lg:px-8"
          >
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[var(--charcoal-muted)]">
              {k.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-2xl font-medium tabular-nums tracking-tight text-[var(--charcoal)] md:text-[1.65rem]">
              {k.value}
            </p>
            <p
              className={`mt-2 text-xs font-medium tabular-nums ${
                k.positive ? "text-[var(--gold-deep)]" : "text-[var(--charcoal-muted)]"
              }`}
            >
              {k.delta}
              <span className="ml-1 font-normal text-[var(--charcoal-muted)]">vs. prior</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
