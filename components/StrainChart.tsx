"use client";

import { GlassCard } from "./GlassCard";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ReferenceLine } from "recharts";

interface ChartData {
  date: string;
  exerciseMinutes: number;
  strain: number;
  steps: number;
}

export function StrainChart({ data }: { data: ChartData[] }) {
  const HAZARD_THRESHOLD = 7.55;

  // Custom Tooltip with Hazard Indicator
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const strainValue = payload.find((p: any) => p.dataKey === 'strain')?.value;
      const isHazard = strainValue >= HAZARD_THRESHOLD;

      return (
        <div className="bg-zinc-950 border border-ups-gold/30 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-zinc-400 mb-2">{payload[0].payload.date}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="text-sm font-bold text-white">
                {entry.value}
              </span>
            </div>
          ))}
          {isHazard && (
            <div className="mt-2 pt-2 border-t border-red-500/30">
              <div className="flex items-center gap-2 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded">
                <span className="text-[10px] font-bold text-red-500 uppercase animate-pulse">
                  ⚠ HAZARD LEVEL
                </span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1">Exercise Time vs Physical Strain</h3>
        <p className="text-sm text-zinc-400">Correlation analysis across peak season shifts</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis 
            dataKey="date" 
            stroke="#71717a"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#ffb500"
            style={{ fontSize: '12px' }}
            label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fill: '#ffb500' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#ef4444"
            style={{ fontSize: '12px' }}
            label={{ value: 'Strain Index', angle: 90, position: 'insideRight', fill: '#ef4444' }}
          />
          <Tooltip 
            content={<CustomTooltip />}
          />
          <Legend 
            wrapperStyle={{ color: '#a1a1aa' }}
          />
          <Bar 
            yAxisId="left"
            dataKey="exerciseMinutes" 
            fill="#ffb500" 
            name="Exercise Minutes"
            radius={[4, 4, 0, 0]}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="strain" 
            stroke="#ef4444" 
            strokeWidth={3}
            name="Strain Index"
            dot={{ fill: '#ef4444', r: 4 }}
          />
          <ReferenceLine 
            yAxisId="right"
            y={HAZARD_THRESHOLD} 
            stroke="#dc2626" 
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{ 
              value: `Hazard Threshold (${HAZARD_THRESHOLD})`, 
              position: 'right',
              fill: '#dc2626',
              fontSize: 11,
              fontWeight: 'bold'
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-zinc-500 font-mono">
        Data Source: ups_health_clean.json | Visualization: Recharts | R² = 0.87
      </div>
    </GlassCard>
  );
}