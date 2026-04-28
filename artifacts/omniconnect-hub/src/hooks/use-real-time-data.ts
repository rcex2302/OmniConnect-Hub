import { useState, useEffect } from 'react';

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

// البيانات الأساسية مع قيم ابتدائية
const getInitialData = (): RealTimeData => ({
  totalShipments: 12480,
  activeShipments: 3250,
  delayedShipments: 12,
  totalPorts: 342,
  fuelConsumption: 12450,
  co2Emission: 8720,
  systemEfficiency: 96.8
});

// Hook للبيانات المتغيرة في الوقت الفعلي
export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>(getInitialData());

  useEffect(() => {
    // تحديث كل 2 ثانية
    const interval = setInterval(() => {
      setData(prevData => ({
        totalShipments: prevData.totalShipments + Math.floor(Math.random() * 3) - 1, // زيادة أو نقصان 0-2
        activeShipments: prevData.activeShipments + Math.floor(Math.random() * 5) - 2,
        delayedShipments: Math.max(0, prevData.delayedShipments + Math.floor(Math.random() * 3) - 1), // لا تقل عن صفر
        totalPorts: prevData.totalPorts, // ثابت
        fuelConsumption: prevData.fuelConsumption + Math.floor(Math.random() * 20) - 5,
        co2Emission: prevData.co2Emission + Math.floor(Math.random() * 15) - 3,
        // الكفاءة تتغير ببطء وتبقى ضمن نطاق جيد
        systemEfficiency: Math.min(99.9, Math.max(92, prevData.systemEfficiency + (Math.random() * 0.4 - 0.2)))
      }));
    }, 2000); // كل 2000 مللي ثانية = 2 ثانية

    return () => clearInterval(interval); // إيقاف التحديث عند إغلاق المكون
  }, []);

  return data;
};