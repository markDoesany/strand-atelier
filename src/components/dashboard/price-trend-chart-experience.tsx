"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PriceTrendChart } from "@/components/dashboard/price-trend-chart";
import type { SeriesPoint } from "@/data/market";

const PriceTrendChart3D = dynamic(
  () => import("@/components/dashboard/price-trend-chart-3d").then((m) => m.PriceTrendChart3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(360px,55vw)] min-h-[260px] w-full items-center justify-center rounded-sm bg-[var(--stone)]/30 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[var(--charcoal-muted)]">
        [ loading volume … ]
      </div>
    ),
  },
);

type Props = {
  primary: SeriesPoint[];
  secondary: SeriesPoint[];
  className?: string;
};

export function PriceTrendChartExperience(props: Props) {
  const reduce = useReducedMotion();
  const [allow3d, setAllow3d] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setAllow3d(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduce || !allow3d) {
    return <PriceTrendChart {...props} />;
  }

  return <PriceTrendChart3D {...props} />;
}
