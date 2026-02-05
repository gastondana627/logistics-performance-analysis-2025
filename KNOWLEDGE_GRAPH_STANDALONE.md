# Knowledge Graph - Standalone Visualization

**Component**: `KnowledgeGraphVisualization.tsx`  
**Standalone Page**: `/knowledge-graph`  
**Status**: ✅ LIVE

---

## Access the Knowledge Graph

### Option 1: Standalone Page
Visit: **http://localhost:3001/knowledge-graph**

This dedicated page shows only the knowledge graph with:
- Full-screen capability
- Back button to main dashboard
- Documentation links
- Clean, focused view

### Option 2: Main Dashboard
Visit: **http://localhost:3001**

Scroll down to the "System Architecture Graph" section after the strain chart.

---

## Features

### Interactive Graph Visualization
- **9 Nodes**: Positioned as an actual graph (not a grid)
- **8 Edges**: Animated connecting lines with arrows
- **Hover Effects**: Highlight connected nodes and edges
- **Fullscreen Mode**: Click "Fullscreen" button for expanded view
- **Layer Labels**: Color-coded legend in top-left
- **Stats Display**: Node/edge count in bottom-right

### Node Details

#### Layer 1: Data Sources (Left)
1. **Parcel Field Biometrics** (Deep Brown #4b2c20)
   - Position: Top-left
   - Icon: Activity
   - Connection: → Kinetic Logic Engine (7.55 SI)

2. **OSHA Injury Data** (Blue #1e40af)
   - Position: Bottom-left
   - Icon: Shield
   - Connection: → Kinetic Logic Engine (93k+)

#### Layer 2: Processing (Center)
3. **Kinetic Logic Engine** (UPS Gold #ffb500)
   - Position: Center-left
   - Icon: GitBranch
   - Connections: From Data → To Protocol

4. **V4-Hard Protocol** (Purple #7c3aed)
   - Position: Center-top
   - Icon: Zap
   - Connection: → Canary Bench

5. **Canary Bench** (Amber #f59e0b)
   - Position: Center-bottom
   - Icon: Database
   - Connections: → ORCID, → Vercel

#### Layer 3: Output (Right)
6. **ORCID/DOI** (Green #10b981)
   - Position: Right-top
   - Icon: Award
   - Connection: → AI Safety Community

7. **Vercel Dashboard** (Black #000)
   - Position: Right-center
   - Icon: Globe
   - Connection: → Strategic Recruiter

#### Layer 4: Impact (Far Right)
8. **Strategic Recruiter** (Red #ef4444)
   - Position: Far right-bottom
   - Icon: Users
   - Terminal node

9. **AI Safety Community** (Green #10b981)
   - Position: Far right-top
   - Icon: Users
   - Terminal node

---

## Edge Labels

| From | To | Label | Meaning |
|------|-----|-------|---------|
| Parcel Field | Logic Engine | 7.55 SI | Hazard threshold |
| OSHA Data | Logic Engine | 93k+ | Incident count |
| Logic Engine | V4-Hard | Benchmark | Validation |
| V4-Hard | Canary | Validate | Testing |
| Canary | ORCID | Cite | Academic record |
| Canary | Vercel | Track | Real-time monitoring |
| Vercel | Recruiter | Showcase | Portfolio display |
| ORCID | Community | Align | Research contribution |

---

## Interaction Guide

### Hover Over Nodes
- Node scales up (1.2x)
- Connected edges highlight (solid lines)
- Unconnected nodes fade (30% opacity)
- Layer number displays below node

### Fullscreen Mode
1. Click "Fullscreen" button (top-right)
2. Graph expands to full viewport
3. All interactions remain active
4. Click "Exit Fullscreen" to return

### Visual Feedback
- **Solid lines**: Active/hovered connections
- **Dashed lines**: Inactive connections
- **Arrow markers**: Data flow direction
- **Edge labels**: Connection metadata

---

## Technical Implementation

### SVG Layer (z-index: 1)
- Draws all connecting lines
- Arrow markers for directionality
- Dynamic opacity based on hover state
- Smooth transitions (300ms)

### Node Layer (z-index: 2-10)
- Absolute positioning with percentages
- Transform-based centering
- Scale animations on hover
- Color-coded by function

### Positioning System
```typescript
x: number  // Horizontal position (0-100%)
y: number  // Vertical position (0-100%)
```

Example:
- Parcel Field: x=15%, y=20% (top-left)
- Logic Engine: x=40%, y=40% (center)
- ORCID: x=85%, y=30% (right-top)

---

## Color Coding

| Color | Hex | Layer | Purpose |
|-------|-----|-------|---------|
| Deep Brown | #4b2c20 | Data | Parcel operations |
| Blue | #1e40af | Data | Public safety |
| UPS Gold | #ffb500 | Logic | Central processing |
| Purple | #7c3aed | Logic | Validation protocol |
| Amber | #f59e0b | Logic | Monitoring |
| Green | #10b981 | Impact | Academic/Community |
| Black | #000 | Output | Production |
| Red | #ef4444 | Impact | Industry validation |

---

## Changes from Original

### Updated Terminology
- ✅ Changed "UPS Field Biometrics" → "Parcel Field Biometrics"
- ✅ Updated all documentation references
- ✅ Maintained 7.55 SI threshold logic
- ✅ Preserved OSHA data integration

### Visual Improvements
- ✅ True graph layout (not grid)
- ✅ SVG-based edge rendering
- ✅ Interactive hover states
- ✅ Fullscreen capability
- ✅ Layer-based positioning
- ✅ Animated transitions

---

## Usage Scenarios

### For Presentations
1. Navigate to `/knowledge-graph`
2. Click "Fullscreen"
3. Hover over nodes to demonstrate connections
4. Explain data flow from left to right

### For Documentation
- Screenshot the graph for reports
- Reference node IDs in technical docs
- Use edge labels to explain relationships
- Cite layer structure for architecture discussions

### For Interviews
- Show system thinking and architecture design
- Demonstrate data pipeline understanding
- Explain validation and monitoring layers
- Highlight dual output paths (academic + industry)

---

## File Structure

```
human-logistics-audit/
├── components/
│   ├── KnowledgeGraphVisualization.tsx  # Main graph component
│   └── KnowledgeGraph.tsx               # Old grid version (deprecated)
├── app/
│   ├── knowledge-graph/
│   │   └── page.tsx                     # Standalone page
│   └── page.tsx                         # Main dashboard (includes graph)
└── KNOWLEDGE_GRAPH.md                   # Full documentation
```

---

## Performance Notes

- **Render Time**: < 100ms
- **Hover Response**: Instant (CSS transitions)
- **Fullscreen Toggle**: Smooth (React state)
- **Node Count**: 9 (optimal for readability)
- **Edge Count**: 8 (clear data flow)

---

## Future Enhancements

1. **Animated Data Flow**
   - Particles moving along edges
   - Pulsing nodes during "data transfer"
   - Timed sequences showing pipeline stages

2. **Node Details Panel**
   - Click node to open side panel
   - Show full specifications
   - Link to related documentation

3. **Export Functionality**
   - Download as PNG/SVG
   - Generate PDF report
   - Copy Mermaid syntax

4. **Time-Based Animation**
   - Show graph building over time
   - Highlight nodes in sequence
   - Demonstrate data flow progression

---

**Last Updated**: February 4, 2026  
**Version**: 2.0 (Graph Visualization)  
**Status**: Production Ready ✅

---

## Quick Start

```bash
# Start dev server
cd human-logistics-audit
npm run dev

# Visit standalone graph
open http://localhost:3001/knowledge-graph

# Or view on main dashboard
open http://localhost:3001
```
