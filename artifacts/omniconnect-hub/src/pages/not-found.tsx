import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Globe2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] overflow-hidden px-4 py-12">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center text-center"
      >
        <div className="mb-8 flex items-center justify-center text-center">
          <h1 className="text-[clamp(6rem,18vw,14rem)] font-black leading-none bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-center gap-3 text-cyan-400">
            <Globe2 className="h-10 w-10" />
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Page Not Found</p>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-7 max-w-xl mx-auto">
            يبدو أن المسار الذي تبحث عنه غير موجود أو ربما تم نقله. لا تقلق، يمكنك العودة إلى الصفحة الرئيسية والمتابعة من هناك.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-1 hover:shadow-cyan-500/40"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
