import { GlassCard } from "./GlassCard";
import { Target, Layers } from "lucide-react";

const techStack = [
  "Next.js 14",
  "Python/Pandas (Data Cleaning)",
  "Samsung Health API",
  "Vercel AI SDK",
  "Kaggle (Deep Analysis)",
];

export function StrategicSummary() {
  return (
    <GlassCard className="p-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - The Mission */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-ups-gold" />
            <h3 className="text-xl font-bold text-white">The Mission</h3>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            A high-fidelity analysis of 3 compressed operational windows during the 2025 UPS Peak Season. 
            Powered by the{" "}
            <span className="text-ups-gold font-semibold">Samsung BioActive Sensor</span> suite on the{" "}
            <span className="text-ups-gold font-semibold">Galaxy Watch 5</span>, this study isolates 
            Operational Strain by filtering out non-sortation movement, demonstrating the intersection 
            of industrial logistics and biometric data science through precision measurement and 
            engineering-grade metrics.
          </p>
        </div>

        {/* Right Column - The Methodology */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-ups-gold" />
            <h3 className="text-xl font-bold text-white">The Methodology</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-zinc-400 hover:border-ups-gold/30 hover:text-ups-gold transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
