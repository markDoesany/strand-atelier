"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSculptureSelection } from "@/context/sculpture-selection-context";
import { resolveSculptureInsight } from "@/data/market";

export function InsightDock() {
  const { selectedId, clearSelection } = useSculptureSelection();
  const insight = selectedId ? resolveSculptureInsight(selectedId) : null;

  return (
    <div
      data-insight-dock
      className="pointer-events-auto relative z-20 w-full max-w-md lg:max-w-[26rem]"
    >
      <div className="insight-dock-glass rounded-sm border border-[var(--line)] bg-[var(--warm-white)]/72 p-6 shadow-[0_24px_80px_-32px_rgba(26,25,23,0.18)] backdrop-blur-xl md:p-8">
        <AnimatePresence mode="wait">
          {insight ? (
            <motion.div
              key={insight.nodeId}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-[family-name:var(--font-mono)] text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[var(--gold-deep)]">
                {insight.eyebrow}
              </p>
              <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--charcoal-muted)]">
                {insight.facetLabel}
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium leading-tight tracking-[-0.02em] text-[var(--charcoal)]">
                {insight.title}
              </h3>
              {insight.metrics.length > 0 ? (
                <dl className="mt-6 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
                  {insight.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[var(--charcoal-muted)]">
                        {m.label}
                      </dt>
                      <dd className="mt-1 font-[family-name:var(--font-mono)] text-lg tabular-nums text-[var(--charcoal)]">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <p className="mt-6 text-sm leading-relaxed text-[var(--charcoal-muted)]">{insight.body}</p>
              <button
                type="button"
                onClick={clearSelection}
                className="mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--charcoal-muted)] underline-offset-4 transition-colors hover:text-[var(--charcoal)]"
              >
                Dismiss
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="py-2"
            >
              <p className="font-[family-name:var(--font-mono)] text-[0.6rem] font-medium uppercase tracking-[0.24em] text-[var(--gold-deep)]">
                Interactive model
              </p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-medium tracking-[-0.02em] text-[var(--charcoal)]">
                Explore the sculpture
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal-muted)]">
                Each facet binds to a live slice of the demo dataset—median pulse, corridors, thesis, and tape.
                Click a form in the scene to surface the card. Press{" "}
                <kbd className="rounded border border-[var(--line)] bg-[var(--cream)] px-1.5 py-0.5 font-mono text-[0.65rem]">
                  Esc
                </kbd>{" "}
                or click away to clear.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
