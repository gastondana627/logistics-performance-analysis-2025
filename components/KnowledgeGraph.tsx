"use client";

import { GlassCard } from "./GlassCard";
import { Database, Shield, Zap, Award, Globe, Users, Activity, GitBranch } from "lucide-react";

export function KnowledgeGraph() {
  return (
    <GlassCard className="p-8">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold mb-2">System Architecture</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Knowledge graph showing data flow from field biometrics to academic validation
        </p>
      </div>

      {/* Mermaid Diagram Reference */}
      <div className="mb-6 p-4 bg-zinc-900/50 border border-white/5 rounded-lg">
        <p className="text-xs text-zinc-500 font-mono text-center">
          Full interactive diagram available in{" "}
          <span className="text-ups-gold">KNOWLEDGE_GRAPH.md</span>
        </p>
      </div>

      {/* Visual Node Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Layer 1: Data Sources */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ups-gold uppercase tracking-wider mb-3">
            Data Layer
          </h3>
          
          <div className="bg-[#4b2c20] border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">UPS Field Biometrics</span>
            </div>
            <p className="text-xs text-zinc-300">
              7.55 SI Logic | Samsung BioActive
            </p>
          </div>

          <div className="bg-[#1e40af] border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">OSHA Injury Data</span>
            </div>
            <p className="text-xs text-zinc-300">
              93k+ Incident Narratives
            </p>
          </div>
        </div>

        {/* Layer 2: Processing & Monitoring */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ups-gold uppercase tracking-wider mb-3">
            Logic Layer
          </h3>

          <div className="bg-zinc-800 border border-ups-gold/30 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="w-5 h-5 text-ups-gold" />
              <span className="text-sm font-bold text-white">Kinetic Logic Engine</span>
            </div>
            <p className="text-xs text-zinc-400">
              Correlation & Threshold Validation
            </p>
          </div>

          <div className="bg-[#7c3aed] border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">V4-Hard Protocol</span>
            </div>
            <p className="text-xs text-zinc-300">
              Benchmarking Framework
            </p>
          </div>

          <div className="bg-[#f59e0b] border border-black/50 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-black" />
              <span className="text-sm font-bold text-black">Canary Bench</span>
            </div>
            <p className="text-xs text-zinc-800">
              Quota/Latency Monitoring
            </p>
          </div>
        </div>

        {/* Layer 3: Output & Impact */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ups-gold uppercase tracking-wider mb-3">
            Impact Layer
          </h3>

          <div className="bg-[#10b981] border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">ORCID / DOI</span>
            </div>
            <p className="text-xs text-zinc-100">
              Academic Citation Record
            </p>
          </div>

          <div className="bg-black border border-white/20 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Vercel Dashboard</span>
            </div>
            <p className="text-xs text-zinc-400">
              Real-Time Public Showcase
            </p>
          </div>

          <div className="bg-zinc-800 border border-ups-gold/30 rounded-lg p-4 hover:scale-105 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-ups-gold" />
              <span className="text-sm font-bold text-white">Industry Impact</span>
            </div>
            <p className="text-xs text-zinc-400">
              Recruiter + AI Safety Community
            </p>
          </div>
        </div>
      </div>

      {/* Data Flow Arrows (Visual Indicator) */}
      <div className="mt-8 flex items-center justify-center gap-4 text-xs text-zinc-500">
        <span>Data Sources</span>
        <span className="text-ups-gold">→</span>
        <span>Processing</span>
        <span className="text-ups-gold">→</span>
        <span>Validation</span>
        <span className="text-ups-gold">→</span>
        <span>Impact</span>
      </div>

      {/* Technical Summary */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-ups-gold">9</div>
            <div className="text-xs text-zinc-500 uppercase">Nodes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-ups-gold">8</div>
            <div className="text-xs text-zinc-500 uppercase">Edges</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-ups-gold">3</div>
            <div className="text-xs text-zinc-500 uppercase">Layers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-ups-gold">7.55</div>
            <div className="text-xs text-zinc-500 uppercase">SI Threshold</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
