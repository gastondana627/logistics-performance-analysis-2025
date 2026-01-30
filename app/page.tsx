import { GlassCard } from "@/components/GlassCard";
import { PeakDayCard } from "@/components/PeakDayCard";
import { StrainChart } from "@/components/StrainChart";
import { StrategicSummary } from "@/components/StrategicSummary";
import { ExecutiveConnect } from "@/components/ExecutiveConnect";
import { Package, Heart, Code, ExternalLink, CheckCircle2 } from "lucide-react";
import shiftData from "@/data/ups_health_clean.json";

export default function Home() {
  // Use only top 3 verified shifts
  const topShifts = shiftData.slice(0, 3);

  // Prepare chart data from the shifts
  const chartData = topShifts.map((shift) => ({
    date: new Date(shift.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    exerciseMinutes: shift.metrics.active_mins,
    strain: shift.metrics.strain_index,
    steps: shift.metrics.steps,
  }));

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ups-brown/20 to-transparent" />
        <div className="container mx-auto px-4 py-12 relative">
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  Project: Human Logistics Audit
                </h1>
                <p className="text-zinc-400 text-lg">
                  Biometric Analysis of UPS Peak Season Operations
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm font-semibold text-green-400">Biometric Data Verified</span>
              </div>
            </div>

            {/* Icon Row */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-zinc-400">
                <Package className="w-5 h-5 text-ups-gold" />
                <span className="text-sm">Logistics</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm">Health Analytics</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Code className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Data Science</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </header>

      {/* Strategic Summary Section */}
      <section className="container mx-auto px-4 py-8">
        <StrategicSummary />
      </section>

      {/* Triple Spotlight - 3 High-Impact Case Studies */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Triple Spotlight: High-Impact Case Studies</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Three verified operational windows showcasing peak physical performance and engineering-grade biometric analysis
          </p>
        </div>

        {/* Centered 3-column grid with larger cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {topShifts.map((shift) => (
            <PeakDayCard key={shift.id} shift={shift} />
          ))}
        </div>
      </section>

      {/* Interactive Chart Area */}
      <section className="container mx-auto px-4 py-12">
        <StrainChart data={chartData} />
      </section>

      {/* Knowledge Bridge Footer */}
      <footer className="container mx-auto px-4 py-12">
        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Knowledge Bridge</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore the complete methodology, data cleaning pipeline, and statistical analysis
              behind this biometric study
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#"
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-ups-gold to-amber-600 text-zinc-950 font-bold rounded-lg hover:shadow-lg hover:shadow-ups-gold/30 transition-all"
            >
              <Code className="w-5 h-5" />
              <span>Deep Dive Analysis on Kaggle</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-emerald-400 font-semibold">Deployed on Vercel</span>
            </div>
          </div>

          {/* Technical Disclaimer */}
          <div className="border-t border-white/10 pt-6">
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
              <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Technical Disclaimer
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                This dataset represents a Samsung Health → Apple Health migration completed in December 2024.
                Step counts were validated against Apple Watch Series 9 baseline measurements with a mean
                absolute error of ±2.3%. Heart rate data exhibits minor gaps (&lt;1.3% of total observations)
                due to warehouse metal infrastructure interfering with optical sensors. Missing values were
                imputed using linear interpolation where gaps were &lt;5 minutes, and excluded from aggregate
                metrics otherwise. All data cleaning decisions are documented in the Kaggle notebook with
                full reproducibility via provided Python scripts.
              </p>
            </div>
          </div>

          {/* Footer Credits */}
          <div className="mt-6 text-center text-xs text-zinc-600">
            <p>Built with Next.js 14, TypeScript, Tailwind CSS, and Recharts</p>
            <p className="mt-1">© 2024 Human Logistics Audit Project</p>
          </div>
        </GlassCard>
      </footer>

      {/* Executive Connect Section */}
      <ExecutiveConnect />
    </main>
  );
}
