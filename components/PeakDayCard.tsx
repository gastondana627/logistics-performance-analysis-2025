"use client";

import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { ChevronDown, ChevronUp, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShiftData {
  id: string;
  date: string;
  day_type: string;
  metrics: {
    steps: number;
    calories: number;
    active_mins: number;
    intensity_density: number;
    strain_index: number;
  };
  context: {
    event: string;
    note: string;
  };
  metadata: {
    is_estimated: boolean;
    sensor_quality: string;
    img_url: string;
  };
}

export function PeakDayCard({ shift }: { shift: ShiftData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard hover className="p-6 flex flex-col h-full">
      {/* Shift Photo Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-md mb-4 flex items-center justify-center border border-white/5">
        <Activity className="w-12 h-12 text-ups-gold/40" />
      </div>

      {/* Date & Day Type */}
      <div className="mb-2">
        <div className="text-sm text-zinc-400">{new Date(shift.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        <div className="text-xs text-ups-gold font-semibold">{shift.day_type}</div>
      </div>

      {/* Event Title */}
      <h3 className="text-lg font-bold text-white mb-3">{shift.context.event}</h3>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-2xl font-bold text-white">{shift.metrics.steps.toLocaleString()}</div>
          <div className="text-xs text-zinc-500">Steps</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="text-2xl font-bold text-ups-gold">{shift.metrics.calories.toLocaleString()}</div>
          <div className="text-xs text-zinc-500">Calories</div>
        </div>
      </div>

      {/* Intensity Density Highlight */}
      <div className="bg-gradient-to-r from-ups-gold/10 to-amber-600/10 border border-ups-gold/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-ups-gold" />
          <span className="text-xs font-semibold text-ups-gold">Intensity Density</span>
        </div>
        <div className="text-xl font-bold text-white">{shift.metrics.intensity_density}</div>
        <div className="text-xs text-zinc-400">cal/min</div>
      </div>

      {/* Tech Note Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-ups-gold hover:text-ups-gold/80 transition-colors mt-auto"
      >
        <span className="font-mono">Developer Insights</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {/* Expanded Tech Note */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-64 mt-3" : "max-h-0"
        )}
      >
        <div className="text-xs text-zinc-400 font-mono bg-black/30 p-3 rounded border border-ups-gold/20 space-y-2">
          <div>
            <span className="text-ups-gold">Context:</span> {shift.context.note}
          </div>
          <div>
            <span className="text-ups-gold">Active Duration:</span> {shift.metrics.active_mins} minutes
          </div>
          <div>
            <span className="text-ups-gold">Strain Index:</span> {shift.metrics.strain_index}
          </div>
          <div>
            <span className="text-ups-gold">Sensor Quality:</span> {shift.metadata.sensor_quality}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
