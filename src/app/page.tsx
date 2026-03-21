import { HeroSection } from "@/components/hero/hero-section";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { TrendsPanel } from "@/components/dashboard/trends-panel";
import { AreaInsightsSection } from "@/components/dashboard/area-insights-section";
import { SignalsStrip } from "@/components/dashboard/signals-strip";
import { DashboardCtaSection } from "@/components/dashboard/dashboard-cta-section";
import { FooterSection } from "@/components/sections/footer-section";
import {
  kpis,
  areaInsights,
  marketSignals,
  dashboardMeta,
  priceTrendPrimary,
  priceTrendSecondary,
  investmentHighlights,
} from "@/data/market";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <KpiStrip items={kpis} />
      <TrendsPanel
        title={dashboardMeta.chartTitle}
        subtitle={dashboardMeta.chartSubtitle}
        updated={dashboardMeta.updated}
        primary={[...priceTrendPrimary]}
        secondary={[...priceTrendSecondary]}
        highlights={investmentHighlights}
      />
      <AreaInsightsSection areas={areaInsights} />
      <SignalsStrip signals={marketSignals} />
      <DashboardCtaSection />
      <FooterSection />
    </main>
  );
}
