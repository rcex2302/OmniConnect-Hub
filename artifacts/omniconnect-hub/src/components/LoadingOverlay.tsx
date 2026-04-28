import { motion } from "framer-motion";

// ==========================================
// 🎯 مؤشر التحميل العام للصفحة
// ==========================================

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-center"
      >
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full mx-auto"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-6 h-6 bg-cyan-500 rounded-full" />
          </motion.div>
        </div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-xl font-bold text-white mb-2"
        >
          Loading OmniConnect Hub
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="text-slate-400 text-sm"
        >
          Initializing global shipping network...
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }}
          className="mt-6 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto max-w-xs"
        />
      </motion.div>
    </motion.div>
  );
};