import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, DollarSign, Package, Globe2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  monthlyRevenue,
  cargoDistribution,
  efficiencyData,
  regionPerformance,
} from "@/lib/mockData";

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(34, 211, 238, 0.3)",
  borderRadius: "12px",
  padding: "10px 14px",
  fontSize: "12px",
  color: "white",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
};

export default function Analytics() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Revenue"
          value="$76.6M"
          icon={DollarSign}
          trend="up"
          trendValue="+18.4%"
          accentColor="from-green-500/20 to-emerald-500/20"
          delay={0.05}
        />
        <StatCard
          title="Total Shipments"
          value="33,020"
          icon={Package}
          trend="up"
          trendValue="+9.7%"
          accentColor="from-cyan-500/20 to-blue-500/20"
          delay={0.1}
        />
        <StatCard
          title="Average Efficiency"
          value="95.8%"
          icon={TrendingUp}
          trend="up"
          trendValue="+2.1%"
          accentColor="from-purple-500/20 to-pink-500/20"
          delay={0.15}
        />
        <StatCard
          title="Countries Served"
          value="84"
          icon={Globe2}
          trend="up"
          trendValue="+3"
          accentColor="from-amber-500/20 to-orange-500/20"
          delay={0.2}
        />
      </div>

      {/* Revenue + cargo distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Monthly Revenue
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                Revenue vs. shipment volume across the last 12 months
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-slate-400">Revenue (K)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-slate-400">Shipments</span>
              </div>
            </div>
          </div>
          <div className="h-60 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="shipGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="shipments"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fill="url(#shipGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22d3ee"
                  strokeWidth={2.5}
                  fill="url(#revGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
        >
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">
            Cargo Distribution
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mb-4">
            Share of each category across all shipments
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cargoDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {cargoDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(15, 23, 42, 0.8)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {cargoDistribution.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300 truncate">{item.name}</span>
                </div>
                <span className="text-slate-500 font-mono shrink-0">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Efficiency + region performance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Weekly Efficiency
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                Daily success rate of completed operations
              </p>
            </div>
            <div className="text-end shrink-0">
              <p className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">
                95.9%
              </p>
              <p className="text-[10px] text-slate-400">Average</p>
            </div>
          </div>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData}>
                <defs>
                  <linearGradient id="effLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[85, 100]}
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#effLine)"
                  strokeWidth={3}
                  dot={{ fill: "#22d3ee", r: 5, strokeWidth: 2, stroke: "#0c4a6e" }}
                  activeDot={{ r: 7, fill: "#22d3ee" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
        >
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">
            Regional Performance
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mb-4">
            Actual vs. target performance per region
          </p>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionPerformance} layout="vertical">
                <CartesianGrid
                  stroke="rgba(255,255,255,0.05)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="region"
                  stroke="#64748b"
                  tick={{ fontSize: 12, fill: "#cbd5e1" }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }}
                />
                <Bar
                  dataKey="target"
                  fill="rgba(168, 85, 247, 0.4)"
                  radius={[0, 8, 8, 0]}
                  name="Target"
                />
                <Bar
                  dataKey="value"
                  fill="#22d3ee"
                  radius={[0, 8, 8, 0]}
                  name="Actual"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-5 sm:p-6"
      >
        <h3 className="text-base sm:text-lg font-bold text-white mb-4">
          Key Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Accelerated growth in Asia",
              desc: "23% increase in shipment volume from Shanghai and Singapore this quarter. Recommendation: expand fleet capacity.",
              color: "border-s-cyan-400",
            },
            {
              title: "Delays on Europe-Americas lane",
              desc: "Average delay rose by 4 hours. Primary cause: severe weather in the North Atlantic corridor.",
              color: "border-s-amber-400",
            },
            {
              title: "Record efficiency in the Gulf",
              desc: "Jebel Ali achieved 99.2% efficiency — the highest globally. A model for other ports to replicate.",
              color: "border-s-green-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className={`bg-slate-900/60 backdrop-blur border-s-4 ${item.color} border-y border-e border-white/10 rounded-xl p-4`}
            >
              <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
