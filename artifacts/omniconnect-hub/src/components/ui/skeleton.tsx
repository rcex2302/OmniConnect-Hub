import { cn } from "@/lib/utils"

// ==========================================
// 🦴 مكونات الهياكل العظمية (Skeleton UI)
// ==========================================

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

// هيكل عظمي محسن مع تأثير متحرك
export const SkeletonLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "skeleton bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-loading rounded-lg",
        className
      )}
    />
  );
};

// هيكل عظمي لبطاقة الإحصائيات
export const StatCardSkeleton = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <SkeletonLoader className="h-5 w-24" />
        <SkeletonLoader className="h-6 w-6 rounded-full" />
      </div>
      <SkeletonLoader className="h-8 w-16 mb-2" />
      <SkeletonLoader className="h-4 w-32" />
    </div>
  );
};

// هيكل عظمي للشحنة
export const ShipmentRowSkeleton = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <SkeletonLoader className="h-10 w-10 rounded-full" />
        <div className="flex-1">
          <SkeletonLoader className="h-4 w-32 mb-1" />
          <SkeletonLoader className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <SkeletonLoader className="h-3 w-20" />
          <SkeletonLoader className="h-3 w-16" />
        </div>
        <SkeletonLoader className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
};

// هيكل عظمي للكرة الأرضية
export const GlobeSkeleton = () => {
  return (
    <div className="relative w-full h-96 bg-slate-800/50 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <SkeletonLoader className="h-16 w-16 rounded-full mx-auto mb-4" />
          <SkeletonLoader className="h-6 w-32 mx-auto mb-2" />
          <SkeletonLoader className="h-4 w-48 mx-auto" />
        </div>
      </div>
      {/* محاكاة نقاط الموانئ */}
      <div className="absolute top-1/4 left-1/4">
        <SkeletonLoader className="h-3 w-3 rounded-full animate-pulse" />
      </div>
      <div className="absolute top-1/3 right-1/3">
        <SkeletonLoader className="h-3 w-3 rounded-full animate-pulse" />
      </div>
      <div className="absolute bottom-1/4 left-1/2">
        <SkeletonLoader className="h-3 w-3 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

// هيكل عظمي للرسم البياني
export const ChartSkeleton = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <SkeletonLoader className="h-6 w-32 mb-4" />
      <div className="space-y-3">
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-4 w-2/3" />
        <SkeletonLoader className="h-4 w-4/5" />
      </div>
    </div>
  );
};

export { Skeleton }
