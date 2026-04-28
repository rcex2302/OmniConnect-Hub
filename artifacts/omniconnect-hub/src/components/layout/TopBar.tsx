import { useState, useEffect } from "react";
import { Menu, Search, Bell } from "lucide-react";
import { useLocation } from "wouter";

interface TopBarProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Dashboard",
    subtitle: "Supply chain operations overview",
  },
  "/tracking": {
    title: "Live Tracking",
    subtitle: "Interactive map of all active shipments",
  },
  "/analytics": {
    title: "Analytics & Reports",
    subtitle: "Performance metrics and detailed insights",
  },
  "/sustainability": {
    title: "Sustainability & ESG",
    subtitle: "Carbon footprint, ESG compliance and green routing",
  },
  "/themes": {
    title: "Brand Themes",
    subtitle: "White-label your dashboard with live previews",
  },
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const [location] = useLocation();
  const page = pageTitles[location] ?? pageTitles["/"]!;

  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -m-2 text-slate-400 hover:text-white transition-colors shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">
              {page.title}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate hidden sm:block">
              {page.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:border-cyan-500/30 transition-colors w-[200px] lg:w-[260px]">
            <Search className="w-4 h-4 shrink-0" />
            <input
              type="text"
              placeholder="Search shipments, ports..."
              className="bg-transparent outline-none text-sm text-white placeholder:text-slate-500 flex-1 min-w-0"
            />
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10 rounded shrink-0">
              ⌘K
            </kbd>
          </div>

          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            className="relative p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1 end-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-950" />
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <div className="text-end">
              <p className="text-[10px] text-cyan-400 font-semibold tracking-wider">
                UTC
              </p>
              <p className="text-xs text-white font-mono">
                {time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
