import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Ship,
  Anchor,
  Activity,
  TrendingUp,
  AlertCircle,
  Package,
} from "lucide-react";
import { Globe3D } from "@/components/Globe3D";
import { StatCard } from "@/components/StatCard";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ShipmentRow } from "@/components/ShipmentRow";
import { StatCardSkeleton, GlobeSkeleton, ShipmentRowSkeleton } from "@/components/ui/skeleton";
import { PORTS, generateShipments } from "@/lib/mockData";
import { useRealTimeData } from "@/hooks/use-real-time-data";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const realTimeData = useRealTimeData();

  const recentShipments = useMemo(() => generateShipments(4), []);
  const featuredPorts = useMemo(() => PORTS.slice(0, 6), []);

  // محاكاة وقت التحميل
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Shipments"
              value={realTimeData.totalShipments}
              icon={Ship}
              trend="up"
              trendValue="+2.1%"
              accentColor="from-cyan-500/20 to-blue-500/20"
              delay={0.05}
              formatNumber={true}
            />
            <StatCard
              title="Active Shipments"
              value={realTimeData.activeShipments}
              icon={Anchor}
              trend="up"
              trendValue="+1.8%"
              accentColor="from-blue-500/20 to-indigo-500/20"
              delay={0.1}
              formatNumber={true}
            />
            <StatCard
              title="System Efficiency"
              value={`${realTimeData.systemEfficiency.toFixed(1)}%`}
              icon={Activity}
              trend="up"
              trendValue="+0.3%"
              accentColor="from-green-500/20 to-emerald-500/20"
              delay={0.15}
            />
            <StatCard
              title="Fuel Consumption"
              value={`${realTimeData.fuelConsumption.toLocaleString()}L`}
              icon={TrendingUp}
              trend="down"
              trendValue="-1.2%"
              accentColor="from-purple-500/20 to-pink-500/20"
              delay={0.2}
              formatNumber={true}
            />
            <StatCard
              title="CO₂ Emissions"
              value={`${realTimeData.co2Emission.toLocaleString()}kg`}
              icon={Package}
              trend="down"
              trendValue="-0.8%"
              accentColor="from-amber-500/20 to-orange-500/20"
              delay={0.25}
            />
            <StatCard
              title="Delayed Shipments"
              value={realTimeData.delayedShipments}
              icon={AlertCircle}
              trend={realTimeData.delayedShipments > 15 ? "up" : "down"}
              trendValue={realTimeData.delayedShipments > 15 ? "+2" : "-1"}
              accentColor="from-red-500/20 to-rose-500/20"
              delay={0.3}
            />
          </>
        )}
      </div>

      {/* Globe + Recent shipments */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="xl:col-span-2 relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-[420px] sm:h-[520px] xl:h-[600px]"
        >
          {isLoading ? (
            <GlobeSkeleton />
          ) : (
            <>
              <div className="absolute top-4 start-4 z-10 max-w-[60%]">
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300">
                  Live Global Network
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                  Real-time tracking of active shipping routes worldwide
                </p>
              </div>
              <div className="absolute bottom-4 start-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur rounded-full border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] text-cyan-400 font-semibold tracking-wider">
                  LIVE
                </span>
              </div>
              <Globe3D
                showRoutes
                routeCount={10}
                showSatellites
                className="absolute inset-0 z-0"
              />
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Recent Shipments
            </h2>
            <button className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
              View all →
            </button>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pe-1">
            {isLoading ? (
              <>
                <ShipmentRowSkeleton />
                <ShipmentRowSkeleton />
                <ShipmentRowSkeleton />
                <ShipmentRowSkeleton />
              </>
            ) : (
              recentShipments.map((s, i) => (
                <ShipmentRow key={s.id} shipment={s} delay={0.6 + i * 0.1} />
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Weather across major ports */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Port Weather Status
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Real-time conditions at major global ports
            </p>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredPorts.map((port, i) => (
            <WeatherWidget key={port.id} port={port} delay={0.8 + i * 0.05} />
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} />
    </div>
  );
}
