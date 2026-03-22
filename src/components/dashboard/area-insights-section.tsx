"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { areaInsights } from "@/data/market";

const RegionMap3D = dynamic(
  () =>
    import("@/components/dashboard/region-map-3d").then((m) => m.RegionMap3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(340px,50vw)] min-h-[260px] w-full items-center justify-center rounded-sm bg-[var(--stone)]/30 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[var(--charcoal-muted)]">
        [ loading map … ]
      </div>
    ),
  },
);

type Area = (typeof areaInsights)[number];

export function AreaInsightsSection({ areas }: { areas: readonly Area[] }) {
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [allow3d, setAllow3d] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setAllow3d(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selected = selectedId ? areas.find((a) => a.id === selectedId) : null;

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
          Dispersion across corridors—median, momentum, and inventory posture. Click a region on the
          map or cards below.
        </p>

        {allow3d && !reduce ? (
          <div className="mt-12">
            <div className="overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--warm-white)]/80 p-4 shadow-[0_1px_0_rgba(26,25,23,0.04)] md:p-6">
              <RegionMap3D
                areas={areas}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {areas.map((a, i) => (
            <motion.article
              key={a.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedId((cur) => (cur === a.id ? null : a.id))}
              className={`group relative cursor-pointer overflow-hidden border bg-[var(--warm-white)] p-8 transition-shadow duration-300 hover:shadow-[0_12px_40px_-24px_rgba(26,25,23,0.12)] ${
                selectedId === a.id
                  ? "border-[var(--gold)] shadow-[0_0_0_2px_rgba(196,165,116,0.3)]"
                  : "border-[var(--line)]"
              }`}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
              {selectedId === a.id ? (
                <div
                  className="pointer-events-none absolute right-4 top-4 h-2 w-2 rounded-full bg-[var(--gold)]"
                  aria-hidden
                />
              ) : null}
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
