import { motion } from "framer-motion";
import { Sparkles, Ship, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DemoActionsProps {
  onSimulateShipment: () => void;
  onRunAnalysis: () => Promise<{
    recommendation: string;
    efficiencyGain: number;
    co2Reduction: number;
    fuelReduction: number;
  }>;
  isAnalyzing: boolean;
}

export function DemoActions({
  onSimulateShipment,
  onRunAnalysis,
  isAnalyzing,
}: DemoActionsProps) {
  const { toast } = useToast();

  const handleSimulate = () => {
    onSimulateShipment();
    toast({
      title: "🚢 Shipment dispatched",
      description:
        "A new shipment has been added to the live network and is now in transit.",
    });
  };

  const handleAnalysis = async () => {
    if (isAnalyzing) return;
    toast({
      title: "🧠 Smart analysis started",
      description:
        "Optimizing routes, fuel usage and emissions across the fleet…",
    });

    try {
      const result = await onRunAnalysis();
      toast({
        title: "✨ Analysis complete",
        description: `${result.recommendation} (+${result.efficiencyGain.toFixed(
          1,
        )}% efficiency, −${result.co2Reduction}kg CO₂)`,
      });
    } catch {
      toast({
        title: "Analysis failed",
        description: "Something went wrong while running the analysis.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="flex flex-wrap items-center gap-3"
    >
      <button
        onClick={handleSimulate}
        className="group inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-200 shadow-lg shadow-emerald-500/10 transition-all hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-500/20 hover:shadow-emerald-500/20 active:translate-y-0"
        data-testid="button-simulate-shipment"
      >
        <Ship className="h-4 w-4 transition-transform group-hover:rotate-6" />
        Simulate Shipment
      </button>

      <button
        onClick={handleAnalysis}
        disabled={isAnalyzing}
        className="group inline-flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-200 shadow-lg shadow-cyan-500/10 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:from-cyan-500/25 hover:to-blue-500/25 hover:shadow-cyan-500/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        data-testid="button-run-analysis"
      >
        {isAnalyzing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
        )}
        {isAnalyzing ? "Analyzing…" : "Run Smart Analysis"}
      </button>
    </motion.div>
  );
}
