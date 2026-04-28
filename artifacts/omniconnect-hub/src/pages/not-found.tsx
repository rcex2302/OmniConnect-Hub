import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  Globe2,
  Home,
  LifeBuoy,
  Map as MapIcon,
  BarChart3,
  Leaf,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Dashboard", Icon: Home },
  { href: "/tracking", label: "Live Tracking", Icon: MapIcon },
  { href: "/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/sustainability", label: "Sustainability", Icon: Leaf },
];

export default function NotFound() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-5xl"
      >
        {/* Hero */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[clamp(5rem,16vw,12rem)] font-black leading-none bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            404
          </motion.h1>
          <div className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
            <Globe2 className="h-3.5 w-3.5" />
            Page Not Found
          </div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 rounded-3xl border border-white/10 bg-slate-900/60 p-8 sm:p-10 shadow-[0_30px_80px_rgba(15,23,42,0.4)] backdrop-blur-xl"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                The route you’re looking for doesn’t exist
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-7 text-slate-400">
                The shipment you tried to track may have been re-routed, the
                page may have been moved, or the link could simply be broken.
                Let’s get you back on course.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 hover:shadow-cyan-500/40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
                <a
                  href="mailto:hello@omniconnect.io"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <LifeBuoy className="h-4 w-4" />
                  Contact Support
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Or jump to a section
              </p>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-500/10"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-300 transition-transform group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-white">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
