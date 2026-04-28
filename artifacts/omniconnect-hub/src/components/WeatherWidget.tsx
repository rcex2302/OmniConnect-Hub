import { motion } from "framer-motion";
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Zap } from "lucide-react";
import type { Port } from "@/lib/mockData";

const icons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
  stormy: Zap,
};

const colors = {
  sunny: "text-yellow-400",
  cloudy: "text-slate-300",
  rainy: "text-blue-400",
  snowy: "text-cyan-200",
  stormy: "text-purple-400",
};

const labels = {
  sunny: "Sunny",
  cloudy: "Cloudy",
  rainy: "Rainy",
  snowy: "Snow",
  stormy: "Storm",
};

export function WeatherWidget({ port, delay = 0 }: { port: Port; delay?: number }) {
  const Icon = icons[port.weather.condition];
  const color = colors[port.weather.condition];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 overflow-hidden group"
    >
      <div className="absolute -top-10 -start-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors" />

      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{port.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{port.country}</p>
          </div>
          <Icon
            className={`w-7 h-7 sm:w-9 sm:h-9 ${color} shrink-0`}
            strokeWidth={1.5}
          />
        </div>

        <div className="flex items-baseline gap-1 mb-3 flex-wrap">
          <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
            {port.weather.temp}
          </span>
          <span className="text-sm text-slate-400">°C</span>
          <span className={`text-[11px] sm:text-xs ${color} ms-1`}>
            {labels[port.weather.condition]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 min-w-0">
            <Wind className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="font-mono">{port.weather.windSpeed}</span>
            <span className="text-[10px] truncate">km/h</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 min-w-0">
            <Droplets className="w-3 h-3 text-blue-400 shrink-0" />
            <span className="font-mono">{port.weather.humidity}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
