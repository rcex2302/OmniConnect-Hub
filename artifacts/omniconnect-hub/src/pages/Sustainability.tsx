import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Award,
  Wind,
  Cloud,
  TrendingDown,
  Sparkles,
  Globe2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Trees,
  Factory,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { PORTS } from "@/lib/mockData";
import {
  EMISSION_FACTORS,
  TRANSPORT_LABELS,
  CARBON_PRICE_PER_TON,
  calculateEmissions,
  haversineKm,
  type TransportMode,
} from "@/lib/themes";

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(16, 227, 174, 0.3)",
  borderRadius: "12px",
  padding: "10px 14px",
  fontSize: "12px",
  color: "white",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
};

const monthlyEmissions = [
  { month: "Jan", standard: 1840, green: 1160 },
  { month: "Feb", standard: 1620, green: 1020 },
  { month: "Mar", standard: 2010, green: 1265 },
  { month: "Apr", standard: 1920, green: 1210 },
  { month: "May", standard: 2240, green: 1410 },
  { month: "Jun", standard: 2080, green: 1310 },
  { month: "Jul", standard: 2510, green: 1580 },
  { month: "Aug", standard: 2390, green: 1505 },
  { month: "Sep", standard: 2640, green: 1663 },
  { month: "Oct", standard: 2880, green: 1814 },
  { month: "Nov", standard: 2710, green: 1707 },
  { month: "Dec", standard: 3150, green: 1985 },
];

export default function Sustainability() {
  const [originId, setOriginId] = useState("singapore");
  const [destinationId, setDestinationId] = useState("rotterdam");
  const [weight, setWeight] = useState(12);
  const [mode, setMode] = useState<TransportMode>("ship");
  const [greenActivated, setGreenActivated] = useState(false);

  const origin = PORTS.find((p) => p.id === originId)!;
  const destination = PORTS.find((p) => p.id === destinationId)!;

  const result = useMemo(
    () =>
      calculateEmissions(
        haversineKm(origin.lat, origin.lng, destination.lat, destination.lng),
        weight,
        mode,
      ),
    [origin, destination, weight, mode],
  );

  const yearTotalStandard = monthlyEmissions.reduce(
    (s, m) => s + m.standard,
    0,
  );
  const yearTotalGreen = monthlyEmissions.reduce((s, m) => s + m.green, 0);
  const yearSaved = yearTotalStandard - yearTotalGreen;

  // Simple bar comparison data
  const comparisonData = [
    { name: "Standard", value: result.standardTons, fill: "#ef4444" },
    { name: "Green", value: result.greenTons, fill: "#10e3ae" },
  ];

  // ESG metrics
  const esgScore = 87;
  const esgBreakdown = [
    { label: "Environmental", value: 92, color: "#10e3ae" },
    { label: "Social", value: 84, color: "#3b82f6" },
    { label: "Governance", value: 86, color: "#a855f7" },
  ];

  // Trees-equivalent (1 mature tree absorbs ~22 kg CO₂ / year)
  const treesEquivalent = Math.round((result.savedTons * 1000) / 22);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-5 sm:p-6"
      >
        <div className="absolute -top-10 -end-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 shrink-0">
              <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Carbon Footprint & ESG Report
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Real-time emissions calculator with EU CSRD &amp; SEC-ready
                reporting
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-[11px] font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              EU CSRD Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 border border-blue-500/30 rounded-full text-[11px] font-semibold text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              SEC Climate Ready
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 border border-purple-500/30 rounded-full text-[11px] font-semibold text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              GLEC v3
            </span>
          </div>
        </div>
      </motion.div>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            icon: Cloud,
            label: "Annual Emissions",
            value: `${(yearTotalStandard / 1000).toFixed(1)} kT`,
            sub: "Ton CO₂e",
            color: "from-red-500/20 to-rose-500/20",
            text: "text-red-300",
          },
          {
            icon: TrendingDown,
            label: "Saved This Year",
            value: `${(yearSaved / 1000).toFixed(1)} kT`,
            sub: `${Math.round((yearSaved / yearTotalStandard) * 100)}% reduction`,
            color: "from-emerald-500/20 to-green-500/20",
            text: "text-emerald-300",
          },
          {
            icon: Award,
            label: "ESG Rating",
            value: `${esgScore}/100`,
            sub: "AA — Excellent",
            color: "from-blue-500/20 to-cyan-500/20",
            text: "text-blue-300",
          },
          {
            icon: Trees,
            label: "Trees Equivalent",
            value: `${(yearSaved * 45).toLocaleString("en-US")}`,
            sub: "Annual absorption",
            color: "from-amber-500/20 to-orange-500/20",
            text: "text-amber-300",
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}
              />
              <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${item.text}`} />
                  <span className="text-[10px] font-mono text-slate-500 truncate">
                    {item.sub}
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {item.value}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                  {item.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Calculator + Report */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Calculator (controls) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 space-y-4"
        >
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Emissions Calculator
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Live calculation using GLEC Framework v3 emission factors
            </p>
          </div>

          {/* Origin / Destination */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                Origin
              </label>
              <select
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition-colors"
              >
                {PORTS.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.id === destinationId}>
                    {p.name}, {p.country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                Destination
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50 transition-colors"
              >
                {PORTS.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.id === originId}>
                    {p.name}, {p.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Weight slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Cargo Weight
              </label>
              <span className="text-sm font-mono font-bold text-emerald-400">
                {weight} Tons
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
              <span>1 T</span>
              <span>50 T</span>
            </div>
          </div>

          {/* Transport mode */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Transport Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(EMISSION_FACTORS) as TransportMode[]).map((m) => {
                const meta = TRANSPORT_LABELS[m];
                const isActive = m === mode;
                return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`relative p-3 rounded-xl border transition-all text-start ${
                      isActive
                        ? "bg-emerald-500/15 border-emerald-500/40"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xl mb-1">{meta.icon}</div>
                    <p
                      className={`text-xs font-semibold ${
                        isActive ? "text-emerald-300" : "text-slate-300"
                      }`}
                    >
                      {meta.label}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {Math.round(EMISSION_FACTORS[m] * 1000)} g/T·km
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live formula breakdown */}
          <div className="bg-slate-950/60 border border-white/5 rounded-xl p-3 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Calculation
            </p>
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
              <span className="text-emerald-400">{result.distanceKm.toLocaleString("en-US")} km</span>{" "}
              ×{" "}
              <span className="text-emerald-400">
                {Math.round(EMISSION_FACTORS[mode] * 1000)} g/T·km
              </span>{" "}
              × <span className="text-emerald-400">{weight} T</span>
            </p>
            <p className="text-sm font-mono text-white pt-1">
              ={" "}
              <span className="text-emerald-400 font-bold">
                {result.standardTons} Ton CO₂e
              </span>
            </p>
          </div>
        </motion.div>

        {/* Report panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-3 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 space-y-5"
        >
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                Carbon Report — Live
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 truncate">
                {origin.name} → {destination.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {result.distanceKm.toLocaleString("en-US")} km · {weight} T ·{" "}
                {TRANSPORT_LABELS[mode].label}
              </p>
            </div>
            <AnimatePresence>
              {greenActivated && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg shadow-emerald-500/40"
                >
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">
                    Green Certified
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Big numbers comparison */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Factory className="w-4 h-4 text-red-400" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-red-300">
                  Standard Route
                </p>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-red-300 font-mono leading-none">
                {result.standardTons}
              </p>
              <p className="text-xs text-slate-400 mt-1">Ton CO₂e</p>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">
                Offset cost: ${result.offsetCostStandard}
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  Green Route
                </p>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-300 font-mono leading-none">
                {result.greenTons}
              </p>
              <p className="text-xs text-slate-400 mt-1">Ton CO₂e</p>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">
                Offset cost: ${result.offsetCostGreen}
              </p>
            </div>
          </div>

          {/* Visual comparison bar */}
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#64748b"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fontSize: 12, fill: "#cbd5e1" }}
                  axisLine={false}
                  tickLine={false}
                  width={70}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  formatter={(v: number) => [`${v} Ton CO₂e`, "Emissions"]}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {comparisonData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Savings summary */}
          <div className="flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400">Potential Savings</p>
                <p className="text-base sm:text-lg font-bold text-emerald-300">
                  {result.savedTons} Ton CO₂e ({result.savedPercent}% lower)
                </p>
              </div>
            </div>
            <div className="text-end shrink-0">
              <p className="text-[10px] text-slate-500">≈ Trees absorbing/yr</p>
              <p className="text-base font-bold text-emerald-300 font-mono">
                {treesEquivalent.toLocaleString("en-US")} 🌳
              </p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setGreenActivated((v) => !v)}
            className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
              greenActivated
                ? "bg-slate-800 border border-emerald-500/30 text-emerald-300 hover:bg-slate-800/80"
                : "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-[1.02]"
            }`}
          >
            {greenActivated ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Green Shipping Activated · Certificate Issued
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5" />
                Activate Green Shipping · +$
                {result.offsetCostGreen + 45}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-[10px] text-slate-500">
            Includes carbon offset purchase ({CARBON_PRICE_PER_TON} USD/ton ·
            EU&nbsp;ETS Q2&nbsp;2026) + green-certified routing
          </p>
        </motion.div>
      </div>

      {/* Annual emissions trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
      >
        <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Annual Emissions Trend
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Standard vs. green-optimized routing across the past 12 months
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-slate-400">Standard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Green</span>
            </div>
          </div>
        </div>
        <div className="h-60 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyEmissions}>
              <defs>
                <linearGradient id="standardGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10e3ae" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#10e3ae" stopOpacity={0} />
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
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number, n: string) => [`${v} Ton`, n]}
              />
              <Area
                type="monotone"
                dataKey="standard"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#standardGrad)"
                name="Standard"
              />
              <Area
                type="monotone"
                dataKey="green"
                stroke="#10e3ae"
                strokeWidth={2.5}
                fill="url(#greenGrad)"
                name="Green"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ESG breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5"
        >
          <div className="flex items-start justify-between mb-5 gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                ESG Score Breakdown
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                Aligned with MSCI &amp; Sustainalytics standards
              </p>
            </div>
            <div className="text-end shrink-0">
              <p className="text-3xl font-bold text-white font-mono leading-none">
                {esgScore}
              </p>
              <p className="text-[10px] text-emerald-400 font-bold mt-1">
                AA · EXCELLENT
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {esgBreakdown.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-mono font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}/100
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`,
                      boxShadow: `0 0 12px ${item.color}66`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Sustainability Initiatives
            </h3>
          </div>
          <div className="space-y-3">
            {[
              {
                icon: Wind,
                title: "Wind-assisted vessels",
                desc: "12 ships retrofitted — saving 8% fuel per voyage",
                progress: 75,
              },
              {
                icon: Sparkles,
                title: "Biofuel adoption",
                desc: "25% of fleet now running on B30 biodiesel blends",
                progress: 25,
              },
              {
                icon: Trees,
                title: "Reforestation offsets",
                desc: "84,000 trees planted across 6 partner regions",
                progress: 92,
              },
              {
                icon: Factory,
                title: "Port shore-power",
                desc: "Cold-ironing at all major ports by Q4 2026",
                progress: 60,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.07 }}
                  className="bg-slate-950/40 border border-white/5 rounded-xl p-3 flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                    <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ delay: 0.9 + i * 0.07, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                    {item.progress}%
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
