"use client";

import { motion, useReducedMotion } from "framer-motion";
import { areaInsights } from "@/data/market";

type Area = (typeof areaInsights)[number];

export function AreaInsightsSection({ areas }: { areas: readonly Area[] }) {
  const reduce = useReducedMotion();

  return (
    <section id="regions" className="scroll-mt-24 border-b border-[var(--line)] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--charcoal-muted)]">
          Regional lens
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.02em] text-[var(--charcoal)] md:text-[2rem]">
          Area insights
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--charcoal-muted)] md:text-base">
          Dispersion across corridors—median, momentum, and inventory posture. Illustrative for positioning
          conversations.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {areas.map((a, i) => (
            <motion.article
              key={a.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden border border-[var(--line)] bg-[var(--warm-white)] p-8 transition-shadow duration-300 hover:shadow-[0_12px_40px_-24px_rgba(26,25,23,0.12)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--charcoal)]">
                  {a.name}
                </h3>
                <span className="rounded-sm border border-[var(--line)] px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-[var(--charcoal-muted)]">
                  {a.inventory}
                </span>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--charcoal-muted)]">
                    Median
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-mono)] text-lg tabular-nums text-[var(--charcoal)]">
                    {a.median}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--charcoal-muted)]">
                    YoY
                  </dt>
                  <dd className="mt-1 font-[family-name:var(--font-mono)] text-lg tabular-nums text-[var(--gold-deep)]">
                    {a.yoy}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 border-t border-[var(--line)] pt-6 text-sm leading-relaxed text-[var(--charcoal-muted)]">
                {a.note}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
