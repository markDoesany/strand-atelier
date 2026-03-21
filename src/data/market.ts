/** Illustrative market data for portfolio demo — not live MLS. */

export const kpis = [
  { id: "med", label: "Median closed · SF metro", value: "$1.42M", delta: "+4.2%", positive: true },
  { id: "dom", label: "Median days on market", value: "24", delta: "−3", positive: true },
  { id: "inv", label: "Active inventory index", value: "0.82", delta: "+0.06", positive: false },
  { id: "cap", label: "Luxury tier absorption", value: "1.14", delta: "+0.11", positive: true },
] as const;

export type SeriesPoint = { x: string; y: number; y2?: number };

export const priceTrendPrimary: SeriesPoint[] = [
  { x: "Jan", y: 1.28 },
  { x: "Feb", y: 1.3 },
  { x: "Mar", y: 1.31 },
  { x: "Apr", y: 1.29 },
  { x: "May", y: 1.33 },
  { x: "Jun", y: 1.35 },
  { x: "Jul", y: 1.34 },
  { x: "Aug", y: 1.36 },
  { x: "Sep", y: 1.38 },
  { x: "Oct", y: 1.39 },
  { x: "Nov", y: 1.41 },
  { x: "Dec", y: 1.42 },
];

/** Secondary trace: prior-year implied (normalized). */
export const priceTrendSecondary: SeriesPoint[] = priceTrendPrimary.map((p, i) => ({
  x: p.x,
  y: p.y * (0.94 + (i % 4) * 0.008),
}));

export const areaInsights = [
  {
    id: "sf",
    name: "San Francisco",
    median: "$1.55M",
    yoy: "+3.1%",
    inventory: "Tight",
    note: "Elevated off-market activity; bidding depth in prime corridors.",
  },
  {
    id: "marin",
    name: "Marin County",
    median: "$1.82M",
    yoy: "+5.4%",
    inventory: "Balanced",
    note: "Water-view inventory moving faster than hillside stock.",
  },
  {
    id: "pen",
    name: "Peninsula",
    median: "$1.68M",
    yoy: "+2.8%",
    inventory: "Constrained",
    note: "School-adjacent pockets absorbing within two weeks median.",
  },
  {
    id: "eb",
    name: "East Bay",
    median: "$985K",
    yoy: "+1.9%",
    inventory: "Expanding",
    note: "Relative value draw; watch rate sensitivity on jumbo tranche.",
  },
] as const;

export const investmentHighlights = [
  {
    title: "Yield on quality",
    body: "Trophy assets in supply-constrained micro-markets continue to compress cap equivalents versus income property benchmarks.",
  },
  {
    title: "Off-market velocity",
    body: "Private introductions now represent a double-digit share of closed volume above $4M—relationship and timing edge matter more than list price.",
  },
  {
    title: "Renovation arbitrage",
    body: "Well-documented cosmetic and systems upgrades still pencil to 12–18% realized premium when paired with architectural narrative.",
  },
] as const;

export const dashboardMeta = {
  title: "Market Intelligence",
  eyebrow: "Strand Intelligence · Q4 snapshot",
  subtitle:
    "Curated signals across the Bay Area luxury residential market—median trajectory, regional dispersion, and positioning notes for principal decision-makers.",
  chartTitle: "Median closed price trajectory",
  chartSubtitle: "SF metro · $M · trailing twelve months · illustrative",
  updated: "Updated weekly · demo data",
};

export const marketSignals = [
  { id: "rates", label: "Jumbo spreads", detail: "Tightening vs. conforming; watch refi windows." },
  { id: "supply", label: "Supply pulse", detail: "New listings −8% YoY in prime SF corridors." },
  { id: "demand", label: "Demand depth", detail: "Multiple-offer share stable on $3M+ inventory." },
  { id: "fx", label: "Capital flows", detail: "Cross-border interest up modestly on trophy stock." },
] as const;
