import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  delay?: number;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: LucideIcon;
  accentColor?: string;
  isLoading?: boolean;
  formatNumber?: boolean;
}

export function StatCard({
  title,
  value,
  delay = 0,
  trend,
  trendValue,
  icon: Icon,
  accentColor = "from-cyan-500/20 to-blue-500/20",
  isLoading = false,
  formatNumber = false,
}: StatCardProps) {
  // وميض خفيف عندما تتغير القيمة (بدون تأثير عدّ متحرك)
  const prevValue = useRef(value);
  const [justChanged, setJustChanged] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value && !isLoading) {
      setJustChanged(true);
      const t = setTimeout(() => setJustChanged(false), 600);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
    prevValue.current = value;
    return undefined;
  }, [value, isLoading]);

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  const trendColor =
    trend === "up"
      ? "text-green-400 bg-green-500/10"
      : trend === "down"
        ? "text-red-400 bg-red-500/10"
        : "text-blue-400 bg-blue-500/10";

  const formatValue = (val: string | number) => {
    if (typeof val === 'number' && formatNumber) {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${accentColor} rounded-2xl blur-xl transition-opacity duration-500 ${
          justChanged ? "opacity-100" : "opacity-60"
        } group-hover:opacity-100`}
      />
      <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.37)] overflow-hidden h-full">
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out pointer-events-none" />

        <div className="flex items-start justify-between mb-4">
          <p className="text-slate-400 text-xs font-semibold tracking-wider uppercase">
            {title}
          </p>
          {Icon && (
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all">
              <Icon className="w-4 h-4" strokeWidth={2} />
            </div>
          )}
        </div>

        <h3
          className={`text-2xl sm:text-3xl font-bold mb-2 font-mono tracking-tight transition-colors duration-500 ${
            justChanged ? "text-cyan-300" : "text-white"
          }`}
        >
          {isLoading ? "..." : formatValue(value)}
        </h3>

        {trend && trendValue && !isLoading && (
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${trendColor}`}
          >
            <TrendIcon className="w-3 h-3" />
            <span className="font-mono">{trendValue}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
