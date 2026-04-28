import { useCallback, useEffect, useRef, useState } from 'react';

// ==========================================
// 📊 نظام البيانات المتغيرة في الوقت الفعلي
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

// تذبذب صغير حول قيمة محورية (لتجنب الانحراف الطويل المدى)
const driftToward = (current: number, anchor: number, drift: number, jitter: number) => {
  const pull = (anchor - current) * 0.04; // قوة سحب نحو القيمة المحورية
  const random = (Math.random() * 2 - 1) * jitter;
  return current + pull + drift + random;
};

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>(getInitialData());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const pausedRef = useRef(false);
  const tickRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      tickRef.current += 1;

      setData(prev => {
        // الشحنات الإجمالية: تنمو دائماً (+1 إلى +4) — كأنها شحنات جديدة تسجَّل
        const totalShipments = prev.totalShipments + 1 + Math.floor(Math.random() * 4);

        // الشحنات النشطة: تتذبذب ±3 حول 3250
        const activeShipments = Math.round(
          driftToward(prev.activeShipments, 3250, 0, 3),
        );

        // الشحنات المتأخرة: تتغير ببطء ±1 كل عدة دورات
        let delayedShipments = prev.delayedShipments;
        if (tickRef.current % 3 === 0) {
          delayedShipments = Math.max(
            5,
            Math.min(28, delayedShipments + (Math.random() < 0.5 ? -1 : 1)),
          );
        }

        // الوقود: يزداد بشكل مستمر (+8 إلى +25 لتر/ثانيتين)
        const fuelConsumption = prev.fuelConsumption + 8 + Math.floor(Math.random() * 18);

        // الانبعاثات: تزداد كذلك (+5 إلى +18 كغم/ثانيتين)
        const co2Emission = prev.co2Emission + 5 + Math.floor(Math.random() * 14);

        // الكفاءة: تتذبذب ±0.3 حول 96.5%
        const systemEfficiency = Math.min(
          99.9,
          Math.max(92, driftToward(prev.systemEfficiency, 96.5, 0, 0.3)),
        );

        return {
          totalShipments,
          activeShipments,
          delayedShipments,
          totalPorts: prev.totalPorts,
          fuelConsumption,
          co2Emission,
          systemEfficiency: +systemEfficiency.toFixed(2),
        };
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
          systemEfficiency: Math.min(99.9, prev.systemEfficiency + efficiencyGain),
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
