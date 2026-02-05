import { KnowledgeGraphVisualization } from "@/components/KnowledgeGraphVisualization";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function KnowledgeGraphPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="container mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-zinc-400 hover:text-ups-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Back to Dashboard</span>
        </Link>

        {/* Knowledge Graph */}
        <KnowledgeGraphVisualization />

        {/* Documentation Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-ups-gold mb-2">Full Documentation</h3>
            <p className="text-xs text-zinc-400">
              See <span className="font-mono text-white">KNOWLEDGE_GRAPH.md</span> for complete Mermaid diagram and architecture breakdown
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-ups-gold mb-2">Quick Reference</h3>
            <p className="text-xs text-zinc-400">
              See <span className="font-mono text-white">KNOWLEDGE_GRAPH_QUICK_REF.md</span> for presentation guide and usage examples
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-xl">
            <h3 className="text-sm font-bold text-ups-gold mb-2">Implementation</h3>
            <p className="text-xs text-zinc-400">
              See <span className="font-mono text-white">KNOWLEDGE_GRAPH_IMPLEMENTATION_SUMMARY.md</span> for technical details
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
