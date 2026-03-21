import { site } from "@/data/site";

export function FooterSection() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--warm-white)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg tracking-[0.04em] text-[var(--charcoal)]">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-[var(--charcoal-muted)]">{site.footer.tagline}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--charcoal-muted)]">
            {site.footer.location}
          </p>
          <p className="mt-3 max-w-md text-[0.7rem] leading-relaxed text-[var(--charcoal-muted)]/80">
            {site.footer.disclaimer}
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--charcoal-muted)]">
          <a href="#overview" className="hover:text-[var(--charcoal)]">
            Overview
          </a>
          <a href="#trends" className="hover:text-[var(--charcoal)]">
            Trends
          </a>
          <a href="#regions" className="hover:text-[var(--charcoal)]">
            Regions
          </a>
          <a href="#contact" className="hover:text-[var(--gold-deep)]">
            Contact
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-6 text-center text-[0.65rem] text-[var(--charcoal-muted)]/70 lg:px-8">
        © {new Date().getFullYear()} {site.name}. Portfolio demonstration.
      </p>
    </footer>
  );
}
