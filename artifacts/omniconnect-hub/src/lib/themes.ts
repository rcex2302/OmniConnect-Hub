// ─────────────────────────────────────────────────────────────────────────
// Brand color themes — single source of truth
// Used by ThemeContext (CSS vars on :root) AND by Globe3D (3D materials)
// ─────────────────────────────────────────────────────────────────────────

export interface BrandTheme {
  id: string;
  name: string;
  description: string;
  // Visible HEX colors used by both CSS and three.js materials
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  // CSS rgba shadow color (computed on apply)
  primaryRgb: string;
  secondaryRgb: string;
}

export const BRAND_THEMES: BrandTheme[] = [
  {
    id: "techBlue",
    name: "Tech Blue",
    description: "Default cyan / blue — high-tech, trustworthy",
    primary: "#22d3ee",
    secondary: "#3b82f6",
    accent: "#06b6d4",
    glow: "rgba(34, 211, 238, 0.5)",
    primaryRgb: "34, 211, 238",
    secondaryRgb: "59, 130, 246",
  },
  {
    id: "ecoGreen",
    name: "Eco Green",
    description: "Sustainable, ESG-focused, eco-friendly brand",
    primary: "#10e3ae",
    secondary: "#059669",
    accent: "#34d399",
    glow: "rgba(16, 227, 174, 0.5)",
    primaryRgb: "16, 227, 174",
    secondaryRgb: "5, 150, 105",
  },
  {
    id: "luxuryPurple",
    name: "Luxury Purple",
    description: "Premium, high-end, enterprise SaaS feel",
    primary: "#c77dff",
    secondary: "#7b2cbf",
    accent: "#a855f7",
    glow: "rgba(199, 125, 255, 0.5)",
    primaryRgb: "199, 125, 255",
    secondaryRgb: "123, 44, 191",
  },
  {
    id: "energyRed",
    name: "Energy Red",
    description: "Bold, urgent, attention-grabbing for ops alerts",
    primary: "#ff4d6d",
    secondary: "#c9184a",
    accent: "#ff758f",
    glow: "rgba(255, 77, 109, 0.5)",
    primaryRgb: "255, 77, 109",
    secondaryRgb: "201, 24, 74",
  },
  {
    id: "solarGold",
    name: "Solar Gold",
    description: "Warm, premium, refinery / energy sector",
    primary: "#fbbf24",
    secondary: "#d97706",
    accent: "#fcd34d",
    glow: "rgba(251, 191, 36, 0.5)",
    primaryRgb: "251, 191, 36",
    secondaryRgb: "217, 119, 6",
  },
  {
    id: "arcticIce",
    name: "Arctic Ice",
    description: "Clean, minimal, frosted-glass enterprise",
    primary: "#7dd3fc",
    secondary: "#0ea5e9",
    accent: "#bae6fd",
    glow: "rgba(125, 211, 252, 0.5)",
    primaryRgb: "125, 211, 252",
    secondaryRgb: "14, 165, 233",
  },
];

export const DEFAULT_THEME_ID = "techBlue";

export function getThemeById(id: string): BrandTheme {
  return BRAND_THEMES.find((t) => t.id === id) ?? BRAND_THEMES[0]!;
}

// ─────────────────────────────────────────────────────────────────────────
// Carbon footprint constants (industry standard values, gCO₂e per ton·km)
// Sources: IMO 2023 GHG Study, IATA CORSIA, GLEC Framework v3
// Stored as kgCO₂e per ton·km for consistent math.
// ─────────────────────────────────────────────────────────────────────────

export type TransportMode = "ship" | "truck" | "rail" | "plane";

export const EMISSION_FACTORS: Record<TransportMode, number> = {
  ship: 0.02, //  20 g CO₂e per ton·km   (large container vessel)
  rail: 0.028, //  28 g CO₂e per ton·km   (electric/diesel freight)
  truck: 0.075, //  75 g CO₂e per ton·km   (heavy-duty diesel truck)
  plane: 0.6, // 600 g CO₂e per ton·km   (long-haul air freight)
};

export const TRANSPORT_LABELS: Record<
  TransportMode,
  { label: string; icon: string }
> = {
  ship: { label: "Ocean Freight", icon: "🚢" },
  rail: { label: "Rail Freight", icon: "🚆" },
  truck: { label: "Road Freight", icon: "🚛" },
  plane: { label: "Air Freight", icon: "✈️" },
};

export const CARBON_PRICE_PER_TON = 85; // USD / ton CO₂e (EU ETS Q2 2026 ref)
export const GREEN_ROUTE_REDUCTION = 0.37; // 37% lower emissions on optimized

// Haversine — great-circle distance in km between two lat/lng points
export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(a)));
}

export interface EmissionResult {
  distanceKm: number;
  weightTons: number;
  mode: TransportMode;
  // Standard route emissions (Ton CO₂e)
  standardTons: number;
  // Green / optimized route emissions (Ton CO₂e)
  greenTons: number;
  // Savings (Ton CO₂e and %)
  savedTons: number;
  savedPercent: number;
  // USD cost to offset the emissions
  offsetCostStandard: number;
  offsetCostGreen: number;
}

export function calculateEmissions(
  distanceKm: number,
  weightTons: number,
  mode: TransportMode,
): EmissionResult {
  const factor = EMISSION_FACTORS[mode];
  // kg CO₂e = factor (kg per ton·km) × distance × weight
  const standardKg = factor * distanceKm * weightTons;
  const greenKg = standardKg * (1 - GREEN_ROUTE_REDUCTION);
  const standardTons = standardKg / 1000;
  const greenTons = greenKg / 1000;
  const savedTons = standardTons - greenTons;
  return {
    distanceKm,
    weightTons,
    mode,
    standardTons: +standardTons.toFixed(2),
    greenTons: +greenTons.toFixed(2),
    savedTons: +savedTons.toFixed(2),
    savedPercent: Math.round(GREEN_ROUTE_REDUCTION * 100),
    offsetCostStandard: Math.round(standardTons * CARBON_PRICE_PER_TON),
    offsetCostGreen: Math.round(greenTons * CARBON_PRICE_PER_TON),
  };
}
