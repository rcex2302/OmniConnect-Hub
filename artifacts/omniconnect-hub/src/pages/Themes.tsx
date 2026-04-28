import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Check,
  Sparkles,
  Eye,
  RefreshCw,
  Building2,
  Image as ImageIcon,
  Type,
  CheckCircle2,
} from "lucide-react";
import { Globe3D } from "@/components/Globe3D";
import { useTheme } from "@/contexts/ThemeContext";
import { BRAND_THEMES, type BrandTheme } from "@/lib/themes";

function ThemeSwatch({
  theme,
  active,
  onClick,
}: {
  theme: BrandTheme;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative w-full text-start rounded-2xl p-4 border transition-all overflow-hidden ${
        active
          ? "border-white/30 bg-white/5"
          : "border-white/10 bg-slate-900/40 hover:border-white/20"
      }`}
    >
      {/* Color preview strip */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-12 h-12 rounded-xl shrink-0 border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
            boxShadow: `0 4px 16px ${theme.glow}`,
          }}
        />
        <div className="flex flex-col gap-1.5">
          <div
            className="w-7 h-3 rounded-full border border-white/10"
            style={{ background: theme.primary }}
          />
          <div
            className="w-7 h-3 rounded-full border border-white/10"
            style={{ background: theme.secondary }}
          />
          <div
            className="w-7 h-3 rounded-full border border-white/10"
            style={{ background: theme.accent }}
          />
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="text-sm font-bold text-white truncate">{theme.name}</p>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: theme.primary }}
            >
              <Check className="w-3 h-3 text-slate-950" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
        {theme.description}
      </p>
      <p className="text-[10px] text-slate-600 font-mono mt-2">
        {theme.primary} · {theme.secondary}
      </p>
    </motion.button>
  );
}

export default function Themes() {
  const { theme, setTheme } = useTheme();
  const [companyName, setCompanyName] = useState("OmniConnect Hub");
  const [tagline, setTagline] = useState("Global Supply Chain Intelligence");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden border border-white/10 rounded-3xl p-5 sm:p-6"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}15 0%, ${theme.secondary}15 100%)`,
        }}
      >
        <div
          className="absolute -top-10 -end-10 w-48 h-48 rounded-full blur-3xl opacity-30 transition-all duration-700"
          style={{ background: theme.primary }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                boxShadow: `0 8px 28px ${theme.glow}`,
              }}
            >
              <Palette className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Brand Themes Studio
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                White-label your dashboard — instant brand previews on every
                surface, including the 3D globe
              </p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-950 shrink-0"
            style={{ background: theme.primary }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {theme.name} Active
          </span>
        </div>
      </motion.div>

      {/* Live preview + theme picker */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
        {/* Live globe preview — re-themes instantly */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="xl:col-span-3 relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden h-[420px] sm:h-[520px] xl:h-[640px]"
        >
          <div className="absolute top-4 start-4 z-10 max-w-[60%]">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-white" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/80">
                Live Preview
              </p>
            </div>
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-white">
              {companyName}
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-300 mt-1">
              {tagline}
            </p>
          </div>
          <div
            className="absolute bottom-4 start-4 z-10 flex items-center gap-2 px-3 py-1.5 backdrop-blur rounded-full border transition-all duration-500"
            style={{
              background: "rgba(0,0,0,0.5)",
              borderColor: `${theme.primary}50`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: theme.primary }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: theme.primary }}
              />
            </span>
            <span
              className="text-[10px] font-semibold tracking-wider transition-colors duration-500"
              style={{ color: theme.primary }}
            >
              LIVE · {theme.name.toUpperCase()}
            </span>
          </div>
          <Globe3D
            // Force re-mount when theme changes so palette refresh is instant
            key={theme.id}
            showRoutes
            routeCount={9}
            showSatellites
            themeColor={theme.primary}
            themeSecondary={theme.secondary}
            className="absolute inset-0"
          />
        </motion.div>

        {/* Theme picker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Choose a Brand Theme
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Saved automatically to your browser
              </p>
            </div>
            <button
              onClick={() => setTheme("techBlue")}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 overflow-y-auto pe-1">
            {BRAND_THEMES.map((t) => (
              <ThemeSwatch
                key={t.id}
                theme={t}
                active={t.id === theme.id}
                onClick={() => setTheme(t.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand identity controls */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <Building2
              className="w-5 h-5 transition-colors duration-500"
              style={{ color: theme.primary }}
            />
            <h2 className="text-base sm:text-lg font-bold text-white">
              Brand Identity
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Type className="w-3 h-3" />
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors"
                  style={{
                    boxShadow: `0 0 0 1px transparent`,
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.primary}40`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors"
                  onFocus={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 2px ${theme.primary}40`)
                  }
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </div>
            </div>

            {/* Logo placeholder */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3 h-3" />
                Logo Upload
              </label>
              <div className="border-2 border-dashed border-white/10 hover:border-white/20 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary}30, ${theme.secondary}30)`,
                    border: `1px solid ${theme.primary}40`,
                  }}
                >
                  <ImageIcon
                    className="w-6 h-6 transition-colors duration-500"
                    style={{ color: theme.primary }}
                  />
                </div>
                <p className="text-sm font-semibold text-white">
                  Drop your logo here
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  SVG, PNG · Max 2 MB · Transparent background recommended
                </p>
              </div>
            </div>

            {/* Custom domain */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                Custom Subdomain
              </label>
              <div className="flex items-stretch rounded-xl overflow-hidden border border-white/10 focus-within:border-white/30 transition-colors">
                <input
                  type="text"
                  defaultValue="acme"
                  className="flex-1 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none min-w-0"
                />
                <span className="px-3 py-2.5 bg-white/5 text-slate-400 text-sm font-mono whitespace-nowrap border-s border-white/10">
                  .omniconnect.app
                </span>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                boxShadow: `0 8px 24px ${theme.glow}`,
              }}
            >
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.span
                    key="saved"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Saved · Live across all devices
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    Save Brand Configuration
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* Live UI samples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5"
        >
          <h2 className="text-base sm:text-lg font-bold text-white mb-1">
            Component Preview
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-400 mb-4">
            How elements look with the active theme
          </p>

          <div className="space-y-4">
            {/* Sample button */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">
                Primary Button
              </p>
              <button
                className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 transition-all hover:scale-[1.01]"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  boxShadow: `0 4px 16px ${theme.glow}`,
                }}
              >
                Track Shipment
              </button>
            </div>

            {/* Sample badge */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">
                Status Badge
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-500"
                  style={{
                    background: `${theme.primary}15`,
                    color: theme.primary,
                    borderColor: `${theme.primary}40`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: theme.primary }}
                  />
                  Active
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-500"
                  style={{
                    background: `${theme.secondary}15`,
                    color: theme.secondary,
                    borderColor: `${theme.secondary}40`,
                  }}
                >
                  Premium
                </span>
              </div>
            </div>

            {/* Sample progress */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">
                Progress Bar
              </p>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  key={theme.id}
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full transition-colors duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                    boxShadow: `0 0 12px ${theme.primary}80`,
                  }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-1.5">
                72% · 1,245 of 1,728 km
              </p>
            </div>

            {/* Sample card */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-bold">
                Accent Card
              </p>
              <div
                className="p-4 rounded-xl border transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}10, ${theme.secondary}10)`,
                  borderColor: `${theme.primary}30`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500"
                    style={{
                      background: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">
                      Theme switching is instant
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Choose a swatch and every accent — including the 3D globe
                      — re-skins live.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
