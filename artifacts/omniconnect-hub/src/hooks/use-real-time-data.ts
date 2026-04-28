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
  systemEfficiency: 96.8
});

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>(getInitialData());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    // مساعد لتغيّرات صغيرة وناعمة (احتمال كبير لعدم التغيير)
    const tinyDelta = (max: number) => {
      // 60% من الوقت: لا تغيير، 40%: تغيير صغير ±max
      if (Math.random() < 0.6) return 0;
      return Math.round((Math.random() * 2 - 1) * max);
    };

    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setData(prevData => ({
        // الشحنات الإجمالية: غالباً تزداد ببطء
        totalShipments:
          prevData.totalShipments + (Math.random() < 0.7 ? 1 : 0),
        // الشحنات النشطة: تذبذب صغير ±1
        activeShipments: prevData.activeShipments + tinyDelta(1),
        // الشحنات المتأخرة: تتغير بشكل نادر فقط
        delayedShipments: Math.max(
          0,
          prevData.delayedShipments + (Math.random() < 0.1 ? (Math.random() < 0.5 ? -1 : 1) : 0),
        ),
        totalPorts: prevData.totalPorts,
        // الوقود: تغيّرات بسيطة على رقم بآلاف اللترات (غير محسوسة بصرياً)
        fuelConsumption: prevData.fuelConsumption + tinyDelta(3),
        // الانبعاثات: تغيّرات بسيطة جداً
        co2Emission: prevData.co2Emission + tinyDelta(2),
        // الكفاءة: تغيّر دقيق جداً (±0.05%)
        systemEfficiency: Math.min(
          99.9,
          Math.max(92, prevData.systemEfficiency + (Math.random() * 0.1 - 0.05)),
        ),
      }));
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
