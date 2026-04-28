import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  BarChart3,
  Settings,
  HelpCircle,
  X,
  Activity,
  Leaf,
  Palette,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "System overview",
  },
  {
    name: "Live Tracking",
    href: "/tracking",
    icon: Map,
    description: "Real-time shipment map",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Reports & KPIs",
  },
  {
    name: "Sustainability",
    href: "/sustainability",
    icon: Leaf,
    description: "Carbon & ESG report",
  },
  {
    name: "Brand Themes",
    href: "/themes",
    icon: Palette,
    description: "Customize your colors",
  },
];

const secondaryNav = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { theme } = useTheme();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950/95 backdrop-blur-xl border-e border-white/10">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              boxShadow: `0 8px 24px ${theme.glow}`,
            }}
          >
            <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-white tracking-wider truncate">
              OmniConnect
            </h1>
            <p
              className="text-[10px] tracking-widest font-semibold transition-colors duration-500"
              style={{ color: theme.primary }}
            >
              GLOBAL HUB
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Status indicator */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/30 rounded-xl">
          <span className="text-xs font-semibold text-green-400">
            All systems online
          </span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-white shadow-lg shadow-cyan-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute start-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-e-full"
                    />
                  )}
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 shrink-0 ${
                      isActive ? "text-cyan-400" : ""
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="px-3 mt-8 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          More
        </p>
        <ul className="space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a
                  href="#"
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User card */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              Admin User
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              Dashboard Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed top-0 start-0 bottom-0 w-72 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 start-0 bottom-0 w-72 max-w-[85vw] z-50"
              style={{ direction: "ltr" }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
