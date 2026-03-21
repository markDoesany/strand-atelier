"use client";

import { motion, useReducedMotion } from "framer-motion";
import { marketSignals } from "@/data/market";

type Signal = (typeof marketSignals)[number];

export function SignalsStrip({ signals }: { signals: readonly Signal[] }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="signals"
      aria-label="Market signals"
      className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--charcoal)] py-10 text-[var(--warm-white)]"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--cream)]/55">
          Live tape · illustrative
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((s, i) => (
            <motion.div
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
              className="border-l border-[var(--gold)]/35 pl-4"
            >
              <p className="font-[family-name:var(--font-mono)] text-[0.65rem] font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
                {s.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--cream)]/85">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
