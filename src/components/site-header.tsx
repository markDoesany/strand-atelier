"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
  const { scrollY } = useScroll();
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
          className="shrink-0 font-[family-name:var(--font-display)] text-base tracking-[0.04em] text-[var(--charcoal)] sm:text-lg"
        >
          {site.name}
        </a>
        <nav className="hidden items-center gap-8 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--charcoal-muted)] lg:flex xl:gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[var(--charcoal)]">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[var(--gold-deep)] underline-offset-4 hover:underline"
        >
          Brief
        </a>
      </div>
    </motion.header>
  );
}
