export interface Port {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  weather: WeatherInfo;
}

export interface WeatherInfo {
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
  windSpeed: number;
  humidity: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: Port;
  destination: Port;
  status: "in-transit" | "loading" | "delivered" | "delayed";
  progress: number;
  cargo: string;
  weight: number;
  eta: string;
  vessel: string;
}

export const PORTS: Port[] = [
  {
    id: "shanghai",
    name: "Shanghai",
    country: "China",
    lat: 31.2304,
    lng: 121.4737,
    weather: { temp: 22, condition: "cloudy", windSpeed: 14, humidity: 72 },
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    weather: { temp: 31, condition: "sunny", windSpeed: 8, humidity: 84 },
  },
  {
    id: "rotterdam",
    name: "Rotterdam",
    country: "Netherlands",
    lat: 51.9244,
    lng: 4.4777,
    weather: { temp: 12, condition: "rainy", windSpeed: 22, humidity: 78 },
  },
  {
    id: "dubai",
    name: "Jebel Ali",
    country: "UAE",
    lat: 25.0118,
    lng: 55.0618,
    weather: { temp: 34, condition: "sunny", windSpeed: 12, humidity: 45 },
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "USA",
    lat: 33.749,
    lng: -118.19,
    weather: { temp: 24, condition: "sunny", windSpeed: 10, humidity: 62 },
  },
  {
    id: "new-york",
    name: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    weather: { temp: 16, condition: "cloudy", windSpeed: 18, humidity: 65 },
  },
  {
    id: "hamburg",
    name: "Hamburg",
    country: "Germany",
    lat: 53.5511,
    lng: 9.9937,
    weather: { temp: 10, condition: "rainy", windSpeed: 25, humidity: 80 },
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    weather: { temp: 18, condition: "cloudy", windSpeed: 12, humidity: 70 },
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    weather: { temp: 21, condition: "sunny", windSpeed: 15, humidity: 60 },
  },
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    lat: -33.9249,
    lng: 18.4241,
    weather: { temp: 19, condition: "sunny", windSpeed: 28, humidity: 68 },
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    lat: 19.076,
    lng: 72.8777,
    weather: { temp: 29, condition: "stormy", windSpeed: 32, humidity: 88 },
  },
  {
    id: "santos",
    name: "Santos",
    country: "Brazil",
    lat: -23.9608,
    lng: -46.3331,
    weather: { temp: 26, condition: "cloudy", windSpeed: 14, humidity: 75 },
  },
];

const cargoTypes = [
  "Electronics",
  "Textiles",
  "Machinery",
  "Automotive",
  "Chemicals",
  "Food & Beverage",
  "Pharmaceuticals",
  "Steel",
];

const vessels = [
  "MV Atlantica",
  "MV Pacific Star",
  "MV Orion",
  "MV Neptune",
  "MV Triton",
  "MV Poseidon",
  "MV Apollo",
  "MV Andromeda",
];

function pickPair() {
  const a = PORTS[Math.floor(Math.random() * PORTS.length)]!;
  let b = PORTS[Math.floor(Math.random() * PORTS.length)]!;
  while (b.id === a.id) {
    b = PORTS[Math.floor(Math.random() * PORTS.length)]!;
  }
  return [a, b] as const;
}

const STATUSES: Shipment["status"][] = [
  "in-transit",
  "in-transit",
  "in-transit",
  "loading",
  "delivered",
  "delayed",
];

export function generateShipments(count: number): Shipment[] {
  const result: Shipment[] = [];
  for (let i = 0; i < count; i++) {
    const [origin, destination] = pickPair();
    const cargo = cargoTypes[i % cargoTypes.length]!;
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)]!;
    const progress =
      status === "delivered"
        ? 100
        : status === "loading"
          ? Math.floor(Math.random() * 10)
          : Math.floor(Math.random() * 80) + 15;
    const days = Math.floor(Math.random() * 14) + 1;
    const eta = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]!;
    result.push({
      id: `ship-${i + 1}`,
      trackingNumber: `OCH-${String(2026000 + i).padStart(7, "0")}`,
      origin,
      destination,
      status,
      progress,
      cargo,
      weight: Math.floor(Math.random() * 50000) + 5000,
      eta,
      vessel: vessels[i % vessels.length]!,
    });
  }
  return result;
}

export function latLngToVec3(
  lat: number,
  lng: number,
  radius: number,
): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return [x, y, z];
}

export const monthlyRevenue = [
  { month: "Jan", revenue: 4200, shipments: 1820 },
  { month: "Feb", revenue: 3800, shipments: 1650 },
  { month: "Mar", revenue: 5100, shipments: 2240 },
  { month: "Apr", revenue: 4900, shipments: 2100 },
  { month: "May", revenue: 6200, shipments: 2680 },
  { month: "Jun", revenue: 5800, shipments: 2510 },
  { month: "Jul", revenue: 7100, shipments: 3050 },
  { month: "Aug", revenue: 6800, shipments: 2920 },
  { month: "Sep", revenue: 7500, shipments: 3210 },
  { month: "Oct", revenue: 8200, shipments: 3540 },
  { month: "Nov", revenue: 7900, shipments: 3380 },
  { month: "Dec", revenue: 9100, shipments: 3920 },
];

export const cargoDistribution = [
  { name: "Electronics", value: 28, color: "#06b6d4" },
  { name: "Textiles", value: 18, color: "#3b82f6" },
  { name: "Machinery", value: 22, color: "#8b5cf6" },
  { name: "Food", value: 14, color: "#10b981" },
  { name: "Chemicals", value: 10, color: "#f59e0b" },
  { name: "Other", value: 8, color: "#ef4444" },
];

export const efficiencyData = [
  { day: "Mon", value: 94 },
  { day: "Tue", value: 96 },
  { day: "Wed", value: 92 },
  { day: "Thu", value: 97 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 98 },
  { day: "Sun", value: 99 },
];

export const regionPerformance = [
  { region: "Asia", value: 92, target: 95 },
  { region: "Europe", value: 88, target: 90 },
  { region: "Americas", value: 85, target: 88 },
  { region: "Africa", value: 76, target: 80 },
  { region: "Oceania", value: 81, target: 85 },
];
