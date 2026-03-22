"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { site } from "@/data/site";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#trends", label: "Trends" },
  { href: "#regions", label: "Regions" },
  { href: "#signals", label: "Signals" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrollPct, setScrollPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrollPct(Math.min(100, Math.max(0, Math.round(v * 100))));
  });
  const bg = useTransform(scrollY, [0, 80], ["rgba(250,248,244,0)", "rgba(250,248,244,0.92)"]);
  const backdropFilter = useTransform(
    scrollY,
    [0, 80],
    reduce ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(12px)"],
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, backdropFilter }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)]"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 lg:h-[4.25rem] lg:px-8">
        <a
          href="#hero"
          className="group shrink-0 font-[family-name:var(--font-display)] text-base tracking-[0.04em] text-[var(--charcoal)] sm:text-lg"
        >
          <span className="block">{site.name}</span>
          <span className="mt-0.5 hidden font-[family-name:var(--font-mono)] text-[0.55rem] font-normal uppercase tracking-[0.24em] text-[var(--charcoal-muted)]/80 lg:block">
            [ intelligence · os ]
          </span>
        </a>
        <nav
          id="site-nav"
          className="hidden items-center gap-8 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--charcoal-muted)] lg:flex xl:gap-10"
          aria-label="Primary"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[var(--charcoal)]">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <span
            className="hidden font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.14em] text-[var(--charcoal-muted)]/70 xl:inline tabular-nums"
            aria-hidden
          >
            [ scroll {scrollPct.toString().padStart(2, "0")}% ]
          </span>
          <a
            href="#contact"
            className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--gold-deep)] underline-offset-4 hover:underline"
          >
            [ brief ]
          </a>
        </div>
      </div>
    </motion.header>
  );
}
