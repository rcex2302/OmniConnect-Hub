import { useCallback, useEffect, useRef, useState } from 'react';

// ==========================================
// 📊 Real-time data fluctuation system
// Every 2 seconds: update 2 to 3 numbers with tiny changes
// ==========================================

export interface RealTimeData {
  totalShipments: number;
  activeShipments: number;
  delayedShipments: number;
  totalPorts: number;
  fuelConsumption: number;
  co2Emission: number;
  systemEfficiency: number;
}

export interface AnalysisResult {
  recommendation: string;
  efficiencyGain: number;
  co2Reduction: number;
  fuelReduction: number;
}

const RECOMMENDATIONS = [
  "Switching 12% of routes to the Northern Corridor reduces emissions by 18%.",
  "Optimizing vessel speeds during off-peak windows can save up to 9% fuel.",
  "Consolidating low-volume shipments at Singapore HUB cuts costs by 14%.",
  "Adopting wind-assisted propulsion on Atlantic routes lowers CO₂ by 11%.",
  "Re-routing through the Suez night-window saves 6 hours per voyage.",
];

const getInitialData = (): RealTimeData => ({
  totalShipments: 12480,
  activeShipments: 3250,
  delayedShipments: 12,
  totalPorts: 342,
  fuelConsumption: 12450,
  co2Emission: 8720,
  systemEfficiency: 96.8,
});

// Updatable keys (totalPorts is static)
const UPDATABLE_KEYS = [
  'totalShipments',
  'activeShipments',
  'delayedShipments',
  'fuelConsumption',
  'co2Emission',
  'systemEfficiency',
] as const;

type UpdatableKey = (typeof UPDATABLE_KEYS)[number];

  // Apply tiny change only to the selected key
const applyTinyChange = (key: UpdatableKey, current: number): number => {
  switch (key) {
    case 'totalShipments':
      // +1 to +3 (shipments registered)
      return current + 1 + Math.floor(Math.random() * 3);
    case 'activeShipments':
      // ±1 or ±2 around 3250
      return current + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 2));
    case 'delayedShipments':
      // ±1 within range 5..28
      return Math.max(5, Math.min(28, current + (Math.random() < 0.5 ? -1 : 1)));
    case 'fuelConsumption':
      // +2 to +5
      return current + 2 + Math.floor(Math.random() * 4);
    case 'co2Emission':
      // +1 to +3
      return current + 1 + Math.floor(Math.random() * 3);
    case 'systemEfficiency':
      // ±0.1
      return Math.min(99.9, Math.max(92, +(current + (Math.random() < 0.5 ? -0.1 : 0.1)).toFixed(1)));
  }
};

// Select 2 or 3 keys randomly without repetition
const pickKeys = (count: number): UpdatableKey[] => {
  const pool = [...UPDATABLE_KEYS];
  const result: UpdatableKey[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool[idx]!);
    pool.splice(idx, 1);
  }
  return result;
};

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>(getInitialData());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;

      // Only 2 or 3 numbers per cycle
      const count = Math.random() < 0.5 ? 2 : 3;
      const keysToUpdate = pickKeys(count);

      setData(prev => {
        const next = { ...prev };
        for (const key of keysToUpdate) {
          next[key] = applyTinyChange(key, prev[key]);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const runAnalysis = useCallback((): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
      pausedRef.current = true;
      setIsAnalyzing(true);

      setTimeout(() => {
        const efficiencyGain = +(Math.random() * 1.4 + 0.8).toFixed(1);
        const co2Reduction = Math.floor(Math.random() * 250) + 180;
        const fuelReduction = Math.floor(Math.random() * 320) + 220;
        const recommendation =
          RECOMMENDATIONS[Math.floor(Math.random() * RECOMMENDATIONS.length)]!;

        setData(prev => ({
          ...prev,
          systemEfficiency: Math.min(99.9, +(prev.systemEfficiency + efficiencyGain).toFixed(1)),
          co2Emission: Math.max(0, prev.co2Emission - co2Reduction),
          fuelConsumption: Math.max(0, prev.fuelConsumption - fuelReduction),
        }));

        const result: AnalysisResult = {
          recommendation,
          efficiencyGain,
          co2Reduction,
          fuelReduction,
        };
        setLastAnalysis(result);
        setIsAnalyzing(false);
        pausedRef.current = false;
        resolve(result);
      }, 1800);
    });
  }, []);

  return { data, isAnalyzing, lastAnalysis, runAnalysis };
};
