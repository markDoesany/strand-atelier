"use client";

import { motion, useReducedMotion } from "framer-motion";

export function InvestmentSection({
  items,
}: {
  items: ReadonlyArray<{ title: string; body: string }>;
}) {
  const reduce = useReducedMotion();

  return (
    <aside aria-label="Investment highlights" className="lg:sticky lg:top-28 lg:self-start">
      <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--charcoal-muted)]">
        Positioning
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--charcoal)]">
        Investment highlights
      </h2>
      <ul className="mt-8 space-y-0 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={reduce ? false : { opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.07 }}
            className="py-7 first:pt-6 last:pb-6"
          >
            <p className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--charcoal)]">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal-muted)]">{item.body}</p>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
}
