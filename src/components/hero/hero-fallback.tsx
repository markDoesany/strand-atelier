/**
 * Static hero backdrop when WebGL is skipped (reduced motion / narrow perf path).
 */
export function HeroFallback() {
  return (
    <div
      className="absolute inset-0 bg-[var(--cream)]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--stone)] via-[var(--cream)] to-[var(--warm-white)]" />
      <div className="absolute -right-1/4 top-1/4 h-[min(80vw,640px)] w-[min(80vw,640px)] rounded-full bg-[var(--gold)]/8 blur-3xl" />
      <div className="absolute -left-1/4 bottom-0 h-[min(60vw,480px)] w-[min(60vw,480px)] rounded-full bg-[var(--charcoal)]/5 blur-3xl" />
      <svg
        className="absolute bottom-0 right-0 w-[min(55vw,420px)] text-[var(--charcoal)]/[0.06]"
        viewBox="0 0 400 320"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20 280 L120 120 L200 180 L280 80 L380 200 L380 280 Z" />
      </svg>
    </div>
  );
}
