import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Anchor, Activity } from "lucide-react";
import { Globe3D } from "@/components/Globe3D";
import { ShipmentRow } from "@/components/ShipmentRow";
import { WeatherWidget } from "@/components/WeatherWidget";
import { generateShipments, PORTS } from "@/lib/mockData";

const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "in-transit", label: "In Transit" },
  { id: "loading", label: "Loading" },
  { id: "delivered", label: "Delivered" },
  { id: "delayed", label: "Delayed" },
] as const;

export default function Tracking() {
  const allShipments = useMemo(() => generateShipments(20), []);
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]["id"]>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allShipments.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (
        q &&
        !s.trackingNumber.toLowerCase().includes(q) &&
        !s.vessel.toLowerCase().includes(q) &&
        !s.cargo.toLowerCase().includes(q) &&
        !s.origin.name.toLowerCase().includes(q) &&
        !s.destination.name.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [allShipments, filter, search]);

  const selected = filtered.find((s) => s.id === selectedId) ?? filtered[0];

  const statusCounts = useMemo(() => {
    const counts = { "in-transit": 0, loading: 0, delivered: 0, delayed: 0 };
    allShipments.forEach((s) => counts[s.status]++);
    return counts;
  }, [allShipments]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Status overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "In Transit",
            value: statusCounts["in-transit"],
            color: "from-cyan-500/20 to-blue-500/20",
            text: "text-cyan-400",
            icon: Activity,
          },
          {
            label: "Loading",
            value: statusCounts.loading,
            color: "from-amber-500/20 to-orange-500/20",
            text: "text-amber-400",
            icon: Anchor,
          },
          {
            label: "Delivered",
            value: statusCounts.delivered,
            color: "from-green-500/20 to-emerald-500/20",
            text: "text-green-400",
            icon: MapPin,
          },
          {
            label: "Delayed",
            value: statusCounts.delayed,
            color: "from-red-500/20 to-rose-500/20",
            text: "text-red-400",
            icon: Activity,
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
                className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}
              />
              <div className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.text} shrink-0`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                    {item.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-3 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-[420px] sm:h-[560px] xl:h-[700px] relative"
        >
          <div className="absolute top-4 start-4 z-10 max-w-[60%]">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Live Tracking Map
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
              {filtered.length} shipments shown on the globe
            </p>
          </div>
          <div className="absolute bottom-4 start-4 end-4 z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur rounded-full border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold tracking-wider whitespace-nowrap">
                LIVE ·{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            {selected && (
              <div className="px-3 py-1.5 bg-black/60 backdrop-blur rounded-full border border-cyan-500/30 text-[10px] text-cyan-400 font-mono truncate max-w-[60%]">
                {selected.trackingNumber}
              </div>
            )}
          </div>
          <Globe3D
            key={tick}
            showRoutes
            routeCount={Math.min(filtered.length, 15)}
            showSatellites
            className="absolute inset-0"
          />
        </motion.div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col h-[600px] xl:h-[700px]"
        >
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl focus-within:border-cyan-500/50 transition-colors">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by tracking number, vessel..."
                className="bg-transparent outline-none text-sm text-white placeholder:text-slate-500 flex-1 min-w-0"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              <Filter className="w-4 h-4 text-slate-500 shrink-0" />
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFilter(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filter === s.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pe-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center px-4">
                <Search className="w-10 h-10 mb-3 opacity-50" />
                <p className="text-sm">No shipments match your search</p>
              </div>
            ) : (
              filtered.map((s, i) => (
                <ShipmentRow
                  key={s.id}
                  shipment={s}
                  delay={i * 0.03}
                  isSelected={selected?.id === s.id}
                  onClick={() => setSelectedId(s.id)}
                />
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Weather at active route ports */}
      {selected && (
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-3">
            Weather along route{" "}
            <span className="text-cyan-400 font-mono">
              {selected.trackingNumber}
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <WeatherWidget port={selected.origin} delay={0} />
            <WeatherWidget port={selected.destination} delay={0.1} />
            {PORTS.filter(
              (p) => p.id !== selected.origin.id && p.id !== selected.destination.id,
            )
              .slice(0, 2)
              .map((p, i) => (
                <WeatherWidget key={p.id} port={p} delay={0.2 + i * 0.1} />
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
