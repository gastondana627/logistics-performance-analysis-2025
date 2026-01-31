"use client";

import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { ChevronDown, ChevronUp, Zap } from "lucide-react";
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

  // UTC Date Correction
  const dateObj = new Date(shift.date);
  const formattedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <GlassCard hover className="p-6 flex flex-col h-full">
      {/* Shift Photo Container */}
      <div className="w-full h-64 bg-zinc-900/50 rounded-md mb-4 flex items-center justify-center border border-white/5 overflow-hidden relative">
        <img
          src={shift.metadata.img_url}
          alt={`${shift.context.event} - ${formattedDate}`}
          /* CHANGES HERE: 
             - object-contain: Shows the whole image without cropping
             - p-2: Adds a small breathing room around the screenshot
          */
          className="max-w-full max-h-full object-contain p-2"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/600x400/18181b/fbbf24?text=Audit+Photo+Missing";
          }}
        />
      </div>

      {/* Date & Day Type */}
      <div className="mb-2">
        <div className="text-sm text-zinc-400">{formattedDate}</div>
        <div className="text-xs text-ups-gold font-semibold uppercase tracking-wider">{shift.day_type}</div>
      </div>

      {/* Event Title */}
      <h3 className="text-lg font-bold text-white mb-3 leading-tight">{shift.context.event}</h3>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-2xl font-bold text-white">{shift.metrics.steps.toLocaleString()}</div>
          <div className="text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">Steps</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-colors">
          <div className="text-2xl font-bold text-ups-gold">{shift.metrics.calories.toLocaleString()}</div>
          <div className="text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">Calories</div>
        </div>
      </div>

      {/* Intensity Density Highlight */}
      <div className="bg-gradient-to-r from-ups-gold/10 to-amber-600/10 border border-ups-gold/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-ups-gold" />
          <span className="text-[10px] font-bold uppercase text-ups-gold">Intensity Density</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-white">{shift.metrics.intensity_density}</span>
          <span className="text-xs text-zinc-400">cal/min</span>
        </div>
      </div>

      {/* Tech Note Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-[10px] font-bold uppercase text-ups-gold hover:text-white transition-colors mt-auto tracking-widest"
      >
        <span>Developer Insights</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      {/* Expanded Tech Note */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-64 mt-3" : "max-h-0"
        )}
      >
        <div className="text-[11px] text-zinc-400 font-mono bg-black/40 p-3 rounded border border-white/5 space-y-2">
          <div>
            <span className="text-ups-gold font-bold mr-1">ANALYSIS:</span> {shift.context.note}
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
            <div>
              <span className="text-ups-gold block mb-0.5">DURATION</span> 
              <span className="text-white">{shift.metrics.active_mins} min</span>
            </div>
            <div>
              <span className="text-ups-gold block mb-0.5">STRAIN IDX</span> 
              <span className="text-white">{shift.metrics.strain_index}</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}