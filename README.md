# 🚚 OmniConnect Hub

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&style=flat-square)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Premium Logistics & Supply-Chain Dashboard**
> React + TypeScript + Vite + Three.js

</div>

---

A production-ready admin dashboard template built for shipping, logistics, and supply-chain platforms. Featuring an interactive 3D globe, live-updating KPIs, advanced analytics, a carbon footprint calculator, and a fully customizable 6-theme system.

---

## ✨ Features

| | | |
|:---|:---|:---|
| 🌍 | **Interactive 3D Globe** | WebGL globe (Three.js + React Three Fiber) with animated shipping routes, arc lines, and satellite markers |
| 📡 | **Real-Time KPI Cards** | 6 metrics that update every 2 seconds with smooth number transitions |
| 🎨 | **6 Brand Themes** | One-click palette switching applied simultaneously across the UI and 3D globe materials |
| 📊 | **Analytics Dashboard** | Recharts-powered area, bar, and line charts with interactive tooltips |
| 🌱 | **Sustainability Module** | CO₂ emission calculator based on IMO 2023 / IATA CORSIA / GLEC v3 data with green route comparison |
| 📦 | **Shipment Tracking** | Searchable, filterable shipment table with status badges and progress bars |
| 🎞️ | **Smooth Animations** | Page transitions and micro-interactions powered by Framer Motion |
| 📱 | **Fully Responsive** | Optimized for desktop, tablet, and mobile screens |
| ⚡ | **Performance-Aware Globe** | Automatically reduces 3D quality on low-end devices via `useDevicePerformance` |
| 🧩 | **shadcn/ui Components** | Built on Radix UI primitives for accessible, composable UI |

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS v4 |
| **3D Rendering** | Three.js + React Three Fiber + Drei |
| **Animation** | Framer Motion |
| **Charts** | Recharts |
| **UI Components** | shadcn/ui + Radix UI |
| **Icons** | Lucide React |
| **Routing** | Wouter |
| **Data Fetching** | TanStack Query (React Query) |
| **Forms** | React Hook Form + Zod |
| **Notifications** | Sonner |
| **Package Manager** | pnpm (workspace) |

---

## 📋 Requirements

| Requirement | Version |
|:---|:---|
| Node.js | ≥ 20.x LTS |
| pnpm | ≥ 9.x *(recommended)* |

> **Note:** The workspace uses pnpm and has a `preinstall` script that blocks other package managers. To use `npm` instead, remove the `"preinstall"` entry from the root `package.json` before running `npm install`.

---

## 🚀 Quick Start

```bash
# 1. Install pnpm globally (skip if already installed)
npm install -g pnpm

# 2. Install all workspace dependencies from the project root
pnpm install

# 3. Navigate to the app and start the development server
cd artifacts/omniconnect-hub
pnpm dev
```

> Open **https://omniconnect-hub.netlify.app/** in your browser.

---

## 📜 Available Scripts

Run these commands from inside `artifacts/omniconnect-hub/`:

| Command | Description |
|:---|:---|
| `pnpm dev` | Start development server with HMR (port 5173) |
| `pnpm build` | Type-check + build for production → dist/public/ |
| `pnpm serve` | Preview the production build locally |
| `pnpm typecheck` | Run TypeScript type checking only (no emit) |

---

## 📁 Project Structure

```
OmniConnect-Hub/
├── artifacts/
│   └── omniconnect-hub/          # Main frontend application
│       ├── src/
│       │   ├── components/
│       │   │   ├── layout/       # Layout, Sidebar, TopBar
│       │   │   ├── ui/           # shadcn/ui primitives
│       │   │   ├── Globe3D.tsx   # Interactive 3D globe
│       │   │   ├── StatCard.tsx  # Live KPI card
│       │   │   ├── DemoActions.tsx
│       │   │   ├── ShipmentRow.tsx
│       │   │   ├── WeatherWidget.tsx
│       │   │   └── LoadingOverlay.tsx
│       │   ├── contexts/
│       │   │   └── ThemeContext.tsx   # Global theme state
│       │   ├── hooks/
│       │   │   ├── use-real-time-data.ts    # Live KPI simulation
│       │   │   └── use-device-performance.ts # 3D quality scaling
│       │   ├── lib/
│       │   │   ├── mockData.ts   # Demo ports & shipments
│       │   │   ├── themes.ts     # Theme definitions + emission math
│       │   │   └── utils.ts      # cn() and helpers
│       │   ├── pages/
│       │   │   ├── Dashboard.tsx
│       │   │   ├── Tracking.tsx
│       │   │   ├── Analytics.tsx
│       │   │   ├── Sustainability.tsx
│       │   │   ├── Themes.tsx
│       │   │   └── not-found.tsx
│       │   ├── App.tsx           # Root component + routing
│       │   ├── main.tsx          # Entry point
│       │   └── index.css         # Global styles + CSS variables
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── lib/                          # Shared workspace libraries
│   ├── api-client-react/
│   ├── api-spec/
│   ├── api-zod/
│   └── db/
├── package.json                  # Workspace root
└── pnpm-workspace.yaml
```

---

## 🎨 Themes

OmniConnect Hub ships with **6 built-in brand palettes**. Each theme updates CSS custom properties on `:root` and simultaneously updates the Three.js globe materials for perfect consistency.

| Theme ID | Name | Description |
|:---|:---|:---|
| `techBlue` | Tech Blue *(default)* | High-tech, trustworthy — cyan + blue |
| `ecoGreen` | Eco Green | ESG-focused, sustainable brand |
| `luxuryPurple` | Luxury Purple | Premium enterprise SaaS feel |
| `energyRed` | Energy Red | Bold, urgent — ops & alerts |
| `solarGold` | Solar Gold | Warm premium, energy sector |
| `arcticIce` | Arctic Ice | Clean, frosted-glass enterprise |

### Change the default theme

Open `src/lib/themes.ts` and update:

```ts
export const DEFAULT_THEME_ID = "ecoGreen"; // any theme id
```

### Add a custom theme

Append a new entry to the `BRAND_THEMES` array in `src/lib/themes.ts`:

```ts
{
  id:           "myBrand",
  name:         "My Brand",
  description:  "Custom palette for XYZ Corp",
  primary:      "#ff6b35",
  secondary:    "#e63946",
  accent:       "#ff8c69",
  glow:         "rgba(255,107,53,0.5)",
  primaryRgb:   "255, 107, 53",
  secondaryRgb: "230, 57, 70",
}
```

No other changes required — `ThemeContext` picks it up automatically.

---

## 📡 Real-Time Data Simulation

The `useRealTimeData` hook drives the live KPI updates. Every **2 seconds** it selects 2–3 random metrics and applies a small realistic delta:

| Metric | Update Logic |
|:---|:---|
| `totalShipments` | +1 to +3 per tick |
| `activeShipments` | ±1 or ±2 around baseline |
| `delayedShipments` | ±1, clamped 5–28 |
| `fuelConsumption` | +2 to +5 per tick |
| `co2Emission` | +1 to +3 per tick |
| `systemEfficiency` | ±0.1%, clamped 92%–99.9% |

The **Run Analysis** button pauses the ticker, simulates a 1.8-second computation, then applies improvements and returns a route-optimization recommendation.

---

## 🌱 Sustainability Module

The carbon calculator uses industry-standard emission factors:

| Transport Mode | Factor | Source |
|:---|:---|:---|
| 🚢 Ocean Freight | 20 g CO₂e / ton·km | IMO 2023 GHG Study |
| 🚆 Rail Freight | 28 g CO₂e / ton·km | GLEC Framework v3 |
| 🚛 Road Freight | 75 g CO₂e / ton·km | GLEC Framework v3 |
| ✈️ Air Freight | 600 g CO₂e / ton·km | IATA CORSIA |

> Green route optimization applies a **37% emission reduction**. Carbon offset pricing references EU ETS Q2 2026 at **$85 / ton CO₂e**.

---

## 🗃️ Connecting Real Data

All demo data lives in `src/lib/mockData.ts`. To connect a real backend:

1. Replace `generateShipments()` calls with `@tanstack/react-query` fetch hooks
2. Update `useRealTimeData` to subscribe to your WebSocket or polling endpoint
3. Add your API base URL to a `.env` file:

```env
VITE_API_BASE_URL=https://your-api.com
```

---

## 🚀 Build & Deployment

```bash
# From artifacts/omniconnect-hub/
pnpm build

# Production output
artifacts/omniconnect-hub/dist/public/
```

| Platform | Configuration |
|:---|:---|
| **Netlify** | Publish directory: `artifacts/omniconnect-hub/dist/public` — SPA redirects handled by `_redirects` |
| **Vercel** | Root: `artifacts/omniconnect-hub` · Output: `dist/public` |
| **GitHub Pages** | Set `BASE_PATH` env var to your sub-path, deploy `dist/public/` |
| **Any static host** | Upload `dist/public/` — fully self-contained SPA |

> **Base path:** Configurable via the `BASE_PATH` environment variable for sub-directory deployments.

---

## ❓ FAQ

<details>
<summary><b>Q: The 3D globe renders slowly — how do I improve performance?</b></summary>

The `Globe3D` component uses `useDevicePerformance` to auto-reduce route count, disable satellites, and lower geometry detail on low-end devices. Fine-tune thresholds directly inside the hook.
</details>

<details>
<summary><b>Q: Can I use npm instead of pnpm?</b></summary>

Yes — remove the `"preinstall"` script from the root `package.json`, then run `npm install` from the root.
</details>

<details>
<summary><b>Q: The globe shows a blank canvas — what's wrong?</b></summary>

Ensure WebGL is enabled in your browser. On headless/CI environments WebGL is typically unavailable — this is expected.
</details>

<details>
<summary><b>Q: How do I add a new page?</b></summary>

Create a component in `src/pages/`, add a `<Route>` in `App.tsx`, and add the navigation link in `Sidebar.tsx`.
</details>

---

## 📦 Dependencies

| Package | Version | License |
|:---|:---|:---|
| react | ^18 | MIT |
| typescript | — | Apache 2.0 |
| vite | ^5 | MIT |
| tailwindcss | ^4 | MIT |
| three | ^0.184.0 | MIT |
| @react-three/fiber | ^9.6.0 | MIT |
| @react-three/drei | ^10.7.7 | MIT |
| framer-motion | — | MIT |
| recharts | ^2.15.2 | MIT |
| @radix-ui/* | — | MIT |
| lucide-react | — | ISC |
| wouter | ^3.3.5 | ISC |
| @tanstack/react-query | — | MIT |
| react-hook-form | ^7.55.0 | MIT |
| zod | — | MIT |
| sonner | ^2.0.7 | MIT |
| date-fns | ^3.6.0 | MIT |

---

## 📝 Changelog

### v1.0.0 — Initial Release (2026)

- First public release
- Dashboard with interactive 3D globe and live KPI cards
- Shipment Tracking page with search and filtering
- Analytics page with Recharts area, bar, and line charts
- Sustainability module with CO₂ emission calculator
- Themes page with 6 brand palettes
- Fully responsive layout (desktop, tablet, mobile)
- Performance-adaptive 3D rendering

---

## 🙏 Credits

Built with the following open-source projects: React, TypeScript, Vite, Tailwind CSS, Three.js, React Three Fiber, Drei, Framer Motion, Recharts, shadcn/ui, Radix UI, Lucide React, Wouter, TanStack Query, Zod, Sonner.

---

<div align="center">

*If you find this template useful, please consider leaving a ⭐ review — it helps a lot!*

</div>
