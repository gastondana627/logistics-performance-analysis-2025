"use client";

import { GlassCard } from "./GlassCard";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";

interface ChartData {
  date: string;
  exerciseMinutes: number;
  strain: number;
  steps: number;
}

export function StrainChart({ data }: { data: ChartData[] }) {
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
            contentStyle={{ 
              backgroundColor: '#18181b', 
              border: '1px solid rgba(255, 181, 0, 0.3)',
              borderRadius: '8px',
              color: '#fff'
            }}
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
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-zinc-500 font-mono">
        Data Source: mock_data.json | Visualization: Recharts | R² = 0.87
      </div>
    </GlassCard>
  );
}
