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
  - `src/components/` — Globe3D, LoadingOverlay, ShipmentRow, StatCard, WeatherWidget, layout/, ui/
  - `src/contexts/`, `src/hooks/`, `src/lib/`
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
