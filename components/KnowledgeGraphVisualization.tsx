"use client";

import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { Database, Shield, Zap, Award, Globe, Users, Activity, GitBranch, Maximize2 } from "lucide-react";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  icon: any;
  color: string;
  textColor: string;
  x: number;
  y: number;
  layer: number;
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

export function KnowledgeGraphVisualization() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Define nodes with positions (x, y as percentages)
  const nodes: Node[] = [
    // Layer 1: Data Sources
    {
      id: "parcel",
      label: "Parcel Field",
      sublabel: "Biometrics",
      icon: Activity,
      color: "#4b2c20",
      textColor: "#fff",
      x: 15,
      y: 20,
      layer: 1
    },
    {
      id: "osha",
      label: "OSHA Injury",
      sublabel: "Data",
      icon: Shield,
      color: "#1e40af",
      textColor: "#fff",
      x: 15,
      y: 60,
      layer: 1
    },
    // Layer 2: Processing
    {
      id: "engine",
      label: "Kinetic Logic",
      sublabel: "Engine",
      icon: GitBranch,
      color: "#ffb500",
      textColor: "#000",
      x: 40,
      y: 40,
      layer: 2
    },
    {
      id: "protocol",
      label: "V4-Hard",
      sublabel: "Protocol",
      icon: Zap,
      color: "#7c3aed",
      textColor: "#fff",
      x: 60,
      y: 25,
      layer: 2
    },
    {
      id: "canary",
      label: "Canary",
      sublabel: "Bench",
      icon: Database,
      color: "#f59e0b",
      textColor: "#000",
      x: 60,
      y: 55,
      layer: 2
    },
    // Layer 3: Output
    {
      id: "orcid",
      label: "ORCID",
      sublabel: "DOI",
      icon: Award,
      color: "#10b981",
      textColor: "#fff",
      x: 85,
      y: 30,
      layer: 3
    },
    {
      id: "vercel",
      label: "Vercel",
      sublabel: "Dashboard",
      icon: Globe,
      color: "#000",
      textColor: "#fff",
      x: 85,
      y: 50,
      layer: 3
    },
    // Layer 4: Impact
    {
      id: "recruiter",
      label: "Strategic",
      sublabel: "Recruiter",
      icon: Users,
      color: "#ef4444",
      textColor: "#fff",
      x: 95,
      y: 70,
      layer: 4
    },
    {
      id: "community",
      label: "AI Safety",
      sublabel: "Community",
      icon: Users,
      color: "#10b981",
      textColor: "#fff",
      x: 95,
      y: 35,
      layer: 4
    }
  ];

  // Define edges (connections)
  const edges: Edge[] = [
    { from: "parcel", to: "engine", label: "7.55 SI" },
    { from: "osha", to: "engine", label: "93k+" },
    { from: "engine", to: "protocol", label: "Benchmark" },
    { from: "protocol", to: "canary", label: "Validate" },
    { from: "canary", to: "orcid", label: "Cite" },
    { from: "canary", to: "vercel", label: "Track" },
    { from: "vercel", to: "recruiter", label: "Showcase" },
    { from: "orcid", to: "community", label: "Align" }
  ];

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (nodeId === hoveredNode) return true;
    return edges.some(
      e => (e.from === hoveredNode && e.to === nodeId) || 
           (e.to === hoveredNode && e.from === nodeId)
    );
  };

  const GraphContent = () => (
    <div className="relative w-full h-full min-h-[600px]">
      {/* SVG for edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#ffb500" />
          </marker>
        </defs>
        {edges.map((edge, idx) => {
          const fromNode = getNodeById(edge.from);
          const toNode = getNodeById(edge.to);
          if (!fromNode || !toNode) return null;

          const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
          const opacity = !hoveredNode || isHighlighted ? 1 : 0.2;

          return (
            <g key={idx}>
              <line
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="#ffb500"
                strokeWidth={isHighlighted ? "3" : "2"}
                strokeDasharray={isHighlighted ? "0" : "5,5"}
                opacity={opacity}
                markerEnd="url(#arrowhead)"
                className="transition-all duration-300"
              />
              {edge.label && (
                <text
                  x={`${(fromNode.x + toNode.x) / 2}%`}
                  y={`${(fromNode.y + toNode.y) / 2}%`}
                  fill="#ffb500"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  opacity={opacity}
                  className="transition-all duration-300"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isActive = isConnected(node.id);
        const isHovered = hoveredNode === node.id;

        return (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              opacity: isActive ? 1 : 0.3,
              zIndex: isHovered ? 10 : 2,
              transform: isHovered ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)'
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className="relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 shadow-lg cursor-pointer"
              style={{
                backgroundColor: node.color,
                borderColor: isHovered ? '#ffb500' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isHovered ? '0 0 30px rgba(255, 181, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Icon className="w-6 h-6" style={{ color: node.textColor }} />
              <div className="text-center">
                <div className="text-xs font-bold whitespace-nowrap" style={{ color: node.textColor }}>
                  {node.label}
                </div>
                <div className="text-[10px] whitespace-nowrap" style={{ color: node.textColor, opacity: 0.8 }}>
                  {node.sublabel}
                </div>
              </div>
              {isHovered && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap border border-ups-gold/30">
                  Layer {node.layer}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Layer Labels */}
      <div className="absolute top-4 left-4 text-xs text-zinc-500 font-mono space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4b2c20]"></div>
          <span>Data Layer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ffb500]"></div>
          <span>Logic Layer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
          <span>Impact Layer</span>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 right-4 bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-ups-gold">{nodes.length}</div>
            <div className="text-zinc-500 uppercase text-[10px]">Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-ups-gold">{edges.length}</div>
            <div className="text-zinc-500 uppercase text-[10px]">Edges</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-zinc-950 p-8">
        <div className="relative w-full h-full">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 px-4 py-2 bg-ups-gold text-zinc-950 font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Exit Fullscreen
          </button>
          <div className="w-full h-full">
            <GraphContent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <GlassCard className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">System Architecture Graph</h2>
          <p className="text-zinc-400">
            Interactive knowledge graph showing data flow from field sensors to impact
          </p>
        </div>
        <button
          onClick={() => setIsFullscreen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-ups-gold/10 border border-ups-gold/30 text-ups-gold rounded-lg hover:bg-ups-gold/20 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="text-sm font-semibold">Fullscreen</span>
        </button>
      </div>

      <GraphContent />

      <div className="mt-6 pt-6 border-t border-white/5 text-center">
        <p className="text-xs text-zinc-500">
          Hover over nodes to highlight connections • Click fullscreen for detailed view
        </p>
      </div>
    </GlassCard>
  );
}
