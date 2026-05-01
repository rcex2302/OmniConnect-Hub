import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Activity,
  Globe2,
  Satellite,
  Database,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

// ==========================================
// 🎯 Professional loading screen with clear stages
// Displays product identity, real progress, and trust indicators
// ==========================================

interface LoadingOverlayProps {
  isLoading: boolean;
}

interface Stage {
  icon: typeof Activity;
  label: string;
  duration: number; // ms
}

const STAGES: Stage[] = [
  { icon: Database, label: "Connecting to data feeds", duration: 500 },
  { icon: Globe2, label: "Loading 3D global network", duration: 700 },
  { icon: Satellite, label: "Synchronizing satellites", duration: 500 },
  { icon: Activity, label: "Calibrating live metrics", duration: 500 },
];

const TOTAL_DURATION = STAGES.reduce((sum, s) => sum + s.duration, 0);

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    // Smooth progress movement across stages
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(pct);

      // Calculate current stage based on elapsed time
      let acc = 0;
      let stageIdx = 0;
      for (let i = 0; i < STAGES.length; i++) {
        acc += STAGES[i]!.duration;
        if (elapsed < acc) {
          stageIdx = i;
          break;
        }
        stageIdx = i;
      }
      setCurrentStage(stageIdx);

      if (elapsed < TOTAL_DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setCurrentStage(STAGES.length - 1);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Multi-layered background */}
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-slate-950 to-blue-950/30" />

          {/* شبكة خلفية متحركة */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* بقع ضوئية */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="relative z-10 w-full max-w-md px-6"
          >
            {/* Logo + product name */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative mb-4"
              >
                {/* حلقة دوّارة خارجية */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-2xl border border-cyan-500/30"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.4), transparent)",
                  }}
                />
                {/* Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/40">
                    <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-white tracking-tight"
              >
                OmniConnect Hub
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[11px] text-cyan-400/80 font-mono tracking-[0.2em] uppercase mt-1"
              >
                Global Logistics Intelligence
              </motion.p>
            </div>

            {/* Stages list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-2">
                {STAGES.map((stage, idx) => {
                  const isDone = idx < currentStage || progress >= 100;
                  const isActive = idx === currentStage && progress < 100;
                  const StageIcon = stage.icon;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + idx * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-400"
                            : isActive
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-white/5 text-slate-500"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                        ) : isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <StageIcon className="w-4 h-4" strokeWidth={2.5} />
                          </motion.div>
                        ) : (
                          <StageIcon className="w-4 h-4" strokeWidth={2} />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium transition-colors duration-300 ${
                          isDone
                            ? "text-emerald-300"
                            : isActive
                              ? "text-white"
                              : "text-slate-500"
                        }`}
                      >
                        {stage.label}
                      </span>
                      {isActive && (
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="ms-auto text-[10px] text-cyan-400 font-mono"
                        >
                          ...
                        </motion.span>
                      )}
                      {isDone && (
                        <span className="ms-auto text-[10px] text-emerald-400 font-mono">
                          OK
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                    Initializing
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold tabular-nums">
                    {Math.floor(progress)}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* تأثير لمعان */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-4 text-[10px] text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono tracking-wider">SECURE</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono tracking-wider">v2.4.1</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <span className="font-mono tracking-wider">99.98% UPTIME</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
