"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

export function DashboardCtaSection() {
  const reduce = useReducedMotion();
  const { cta } = site;

  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-[var(--line)] bg-[var(--warm-white)] px-8 py-14 md:px-14 md:py-16"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[var(--gold)]/10 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-[var(--charcoal-muted)]">
              Intelligence desk
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.02em] text-[var(--charcoal)] md:text-[2.25rem]">
              {cta.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal-muted)] md:text-base">
              {cta.subtitle}
            </p>
            <a
              href={`mailto:${cta.email}?subject=Market%20brief%20request`}
              className="mt-10 inline-flex min-h-12 items-center justify-center border border-[var(--charcoal)] bg-[var(--charcoal)] px-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--warm-white)] transition-opacity hover:opacity-90"
            >
              {cta.button}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
