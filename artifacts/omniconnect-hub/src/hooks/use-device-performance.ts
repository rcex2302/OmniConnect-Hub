import { useEffect, useState } from "react";

// ==========================================
// 🎛️ Device capability detection for display quality adjustment
// Evaluates: CPU cores, memory, connection type, mobile
// ==========================================

export type PerformanceTier = "low" | "medium" | "high";

interface DevicePerformance {
  tier: PerformanceTier;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  // Ready-to-use settings for Three.js
  globeSegments: number;
  cloudSegments: number;
  starCount: number;
  routeCount: number;
  showSatellites: boolean;
  enableShadows: boolean;
  dpr: [number, number];
}

const detect = (): DevicePerformance => {
  // SSR safety
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      tier: "high",
      isMobile: false,
      prefersReducedMotion: false,
      globeSegments: 48,
      cloudSegments: 32,
      starCount: 2500,
      routeCount: 10,
      showSatellites: true,
      enableShadows: false,
      dpr: [1, 1.5],
    };
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory ?? 4;
  const dpr = window.devicePixelRatio ?? 1;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Slow network connection = low quality
  const conn = (navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  }).connection;
  const slowNetwork =
    conn?.saveData === true ||
    conn?.effectiveType === "slow-2g" ||
    conn?.effectiveType === "2g";

  // Performance classification
  let tier: PerformanceTier = "high";
  if (
    cores < 4 ||
    memory < 4 ||
    isMobile ||
    slowNetwork ||
    prefersReducedMotion
  ) {
    tier = "low";
  } else if (cores < 8 || memory < 8 || dpr < 1.5) {
    tier = "medium";
  }

  // Settings based on classification
  const presets: Record<PerformanceTier, Omit<DevicePerformance, "tier" | "isMobile" | "prefersReducedMotion">> = {
    low: {
      globeSegments: 32,
      cloudSegments: 20,
      starCount: 800,
      routeCount: 4,
      showSatellites: false,
      enableShadows: false,
      dpr: [1, 1],
    },
    medium: {
      globeSegments: 48,
      cloudSegments: 28,
      starCount: 1500,
      routeCount: 7,
      showSatellites: true,
      enableShadows: false,
      dpr: [1, 1.25],
    },
    high: {
      globeSegments: 64,
      cloudSegments: 40,
      starCount: 2500,
      routeCount: 10,
      showSatellites: true,
      enableShadows: false,
      dpr: [1, 1.5],
    },
  };

  return {
    tier,
    isMobile,
    prefersReducedMotion,
    ...presets[tier],
  };
};

export const useDevicePerformance = (): DevicePerformance => {
  const [perf] = useState<DevicePerformance>(() => detect());
  return perf;
};

// ==========================================
// 👁️ Page Visibility API: Stop rendering when tab is hidden
// ==========================================
export const usePageVisible = (): boolean => {
  const [visible, setVisible] = useState(() =>
    typeof document !== "undefined" ? !document.hidden : true,
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
};
