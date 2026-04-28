# OmniConnect Hub

## Overview

Professional Global Supply Chain Dashboard with an interactive 3D globe (Three.js / React Three Fiber), real-time vessel/aircraft tracking visualization, and an advanced GLEC v3 carbon footprint calculator.

Source: https://github.com/rcex2302/OmniConnect-Hub

## Stack

- **Monorepo tool**: pnpm workspaces
- **Frontend**: React 19 + Vite 7 + TypeScript 5.9
- **Styling**: Tailwind CSS v4 + tw-animate-css + shadcn/ui (Radix UI primitives)
- **3D**: Three.js r184 + @react-three/fiber + @react-three/drei
- **Animation**: Framer Motion
- **Routing**: wouter
- **State / Data**: @tanstack/react-query
- **Forms**: react-hook-form + zod
- **Charts**: recharts
- **Icons**: lucide-react + react-icons

## Project Structure

- `artifacts/omniconnect-hub/` — main React+Vite frontend (the dashboard)
  - `src/pages/` — Dashboard, Tracking, Analytics, Sustainability, Themes, NotFound
  - `src/components/` — Globe3D, LoadingOverlay, ShipmentRow, StatCard, WeatherWidget, DemoActions, Footer, layout/, ui/
  - `src/contexts/`, `src/hooks/`, `src/lib/`

## ThemeForest-Ready Features

1. **Real-time data** — `useRealTimeData` hook ticks every 2s (totals, efficiency, fuel, CO₂).
2. **Loading states** — page-level `LoadingOverlay` plus per-card skeletons (StatCardSkeleton, GlobeSkeleton, ShipmentRowSkeleton).
3. **404 page** — branded `pages/not-found.tsx` route.
4. **Demo interactions** — `DemoActions` on the Dashboard with two buttons:
   - *Simulate Shipment* — prepends a new shipment (status: loading) to the Recent Shipments list.
   - *Run Smart Analysis* — pauses the live tick, applies an efficiency boost + CO₂/fuel reduction, then resumes; surfaces a recommendation via toast.
5. **Professional footer** — `Footer` component rendered globally in `layout/Layout.tsx`: brand block, contact info, social icons, Product/Company link columns, ISO/SOC trust badges, copyright, legal links.

## Other Artifacts

- `artifacts/api-server/` — bundled scaffold Express API (currently unused by the dashboard)
- `artifacts/mockup-sandbox/` — design prototyping sandbox

## Key Commands

- `pnpm install` — install all workspace dependencies
- `pnpm --filter @workspace/omniconnect-hub run dev` — run the dashboard locally (managed by the workflow)
- `pnpm --filter @workspace/omniconnect-hub run build` — production build
- `pnpm run typecheck` — full typecheck across all packages

## Notes

- The frontend is the primary deliverable. The dashboard is currently presentation-driven (no backend dependencies wired up to it).
- 3D globe uses LOD/adaptive rendering targeting 60 FPS.
- Vite plugin `@replit/vite-plugin-runtime-error-modal` is enabled for in-browser error overlays during development.
