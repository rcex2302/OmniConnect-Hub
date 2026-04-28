import { motion } from "framer-motion";
import { Ship, Package, MapPin, Clock } from "lucide-react";
import type { Shipment } from "@/lib/mockData";
import { ShipmentRowSkeleton } from "@/components/ui/skeleton";

const statusConfig = {
  "in-transit": {
    label: "In Transit",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    dot: "bg-cyan-400",
  },
  loading: {
    label: "Loading",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    dot: "bg-amber-400",
  },
  delivered: {
    label: "Delivered",
    color: "text-green-400 bg-green-500/10 border-green-500/30",
    dot: "bg-green-400",
  },
  delayed: {
    label: "Delayed",
    color: "text-red-400 bg-red-500/10 border-red-500/30",
    dot: "bg-red-400",
  },
};

export function ShipmentRow({
  shipment,
  delay = 0,
  onClick,
  isSelected = false,
  isLoading = false,
}: {
  shipment: Shipment;
  delay?: number;
  onClick?: () => void;
  isSelected?: boolean;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <ShipmentRowSkeleton />;
  }

  const status = statusConfig[shipment.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onClick}
      className={`relative bg-slate-900/50 backdrop-blur border rounded-2xl p-3 sm:p-4 cursor-pointer transition-all hover:bg-slate-900/80 hover:border-cyan-500/30 ${
        isSelected
          ? "border-cyan-500/50 bg-slate-900/80 shadow-lg shadow-cyan-500/10"
          : "border-white/10"
      }`}
    >
      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Ship className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-slate-500 font-mono truncate">
              {shipment.trackingNumber}
            </p>
            <p className="text-sm font-bold text-white truncate">
              {shipment.vessel}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${status.color} shrink-0`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
          {status.label}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 min-w-0 max-w-[40%]">
          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="truncate font-medium">{shipment.origin.name}</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-cyan-500/20 to-transparent relative overflow-hidden min-w-[20px]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
              delay,
            }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent to-cyan-400"
          />
        </div>
        <div className="flex items-center gap-1.5 text-slate-300 min-w-0 max-w-[40%]">
          <span className="truncate font-medium">
            {shipment.destination.name}
          </span>
          <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
          <span>Progress</span>
          <span className="font-mono text-cyan-400">{shipment.progress}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${shipment.progress}%` }}
            transition={{ delay: delay + 0.2, duration: 0.8 }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 min-w-0">
          <Package className="w-3 h-3 shrink-0" />
          <span className="truncate">{shipment.cargo}</span>
          <span className="text-slate-600">·</span>
          <span className="font-mono whitespace-nowrap">
            {(shipment.weight / 1000).toFixed(1)}t
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Clock className="w-3 h-3" />
          <span className="font-mono">{shipment.eta}</span>
        </div>
      </div>
    </motion.div>
  );
}
