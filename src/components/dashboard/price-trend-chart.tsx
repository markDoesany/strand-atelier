"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SeriesPoint } from "@/data/market";

type Props = {
  primary: SeriesPoint[];
  secondary: SeriesPoint[];
  className?: string;
};

function buildPath(points: SeriesPoint[], width: number, height: number, pad: number) {
  const ys = points.map((p) => p.y);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const range = maxY - minY || 1;
  const innerW = width - 2 * pad;
  const innerH = height - 2 * pad;
  return points
    .map((p, i) => {
      const t = points.length <= 1 ? 0 : i / (points.length - 1);
      const px = pad + t * innerW;
      const val = p.y;
      const py = pad + innerH - ((val - minY) / range) * innerH;
      return `${i === 0 ? "M" : "L"} ${px.toFixed(2)} ${py.toFixed(2)}`;
    })
    .join(" ");
}

function areaPath(linePath: string, width: number, height: number, pad: number) {
  const innerH = height - 2 * pad;
  return `${linePath} L ${width - pad} ${pad + innerH} L ${pad} ${pad + innerH} Z`;
}

export function PriceTrendChart({ primary, secondary, className = "" }: Props) {
  const reduce = useReducedMotion();
  const w = 720;
  const h = 220;
  const pad = 36;

  const { pathPrimary, pathSecondary, areaD } = useMemo(() => {
    const p1 = buildPath(primary, w, h, pad);
    const p2 = buildPath(secondary, w, h, pad);
    return {
      pathPrimary: p1,
      pathSecondary: p2,
      areaD: areaPath(p1, w, h, pad),
    };
  }, [primary, secondary]);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gold-deep)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={pad}
            x2={w - pad}
            y1={pad + t * (h - 2 * pad)}
            y2={pad + t * (h - 2 * pad)}
            stroke="var(--line)"
            strokeWidth={1}
          />
        ))}
        <motion.path
          d={areaD}
          fill="url(#chartFill)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        />
        <motion.path
          d={pathSecondary}
          fill="none"
          stroke="var(--charcoal-muted)"
          strokeWidth={1.5}
          strokeOpacity={0.35}
          strokeDasharray="6 6"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={pathPrimary}
          fill="none"
          stroke="url(#chartLine)"
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        />
      </svg>
      <div className="mt-4 grid grid-cols-6 gap-1 text-[0.55rem] font-medium uppercase tracking-[0.12em] text-[var(--charcoal-muted)] sm:grid-cols-12 sm:tracking-[0.16em]">
        {primary.map((p) => (
          <span key={p.x} className="text-center">
            {p.x}
          </span>
        ))}
      </div>
    </div>
  );
}
