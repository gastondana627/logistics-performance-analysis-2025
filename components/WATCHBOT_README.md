# WatchBot - Galaxy Watch 5 Digital Twin

A sophisticated React component that creates a digital twin of the Samsung Galaxy Watch 5, serving as an AI-powered Logistics Performance Auditor.

## Features

### 1. Visual Design
- **Circular UI**: Authentic watch form factor with metallic charcoal bezel
- **Glassmorphism Screen**: Subtle curved glass effect with backdrop blur
- **BioActive Sensor**: Pulsing green glow indicator at bottom (simulates real Galaxy Watch sensor)
- **S22 Ultra Ecosystem**: Matches Samsung design language with UPS Gold accents

### 2. Interactive States

#### Idle State (Watch Face)
- Live digital clock with real-time updates
- Current date display
- Pulsing heart rate (BPM) complication with animated heart icon
- Subtle "Tap to Audit" hint on hover
- Continuous BioActive sensor pulse (green glow)

#### Wake State (Chat Interface)
- Framer Motion zoom animation (scale 0.5 → 1.0)
- Watch complications clear to reveal circular chat UI
- Close button (top-right)
- Header: "LOGISTICS AUDITOR" with Galaxy Watch 5 branding

#### Thinking State
- Outer bezel rotates continuously (360° loop)
- BioActive sensor glow intensifies (brighter, faster pulse)
- "Analyzing biometric data..." message with fade animation

### 3. AI Logic - Logistics Performance Auditor

The bot references `ups_health_clean.json` and can answer:

**Day-Specific Queries:**
- "Tell me about Tuesday" → Returns intensity density (9.90), event type, steps, duration
- Automatically finds shifts by day type

**Performance Metrics:**
- "What was the highest intensity?" → Peak intensity shift with full metrics
- "How many steps?" → Total, average, and max step counts
- "Calories burned?" → Total expenditure and burn rate
- "Strain index?" → Average strain and intensity density range

**Summary:**
- "Give me an overview" → Complete biometric audit summary

**Default:**
- Provides guidance on available queries

### 4. Technical Implementation

#### Dependencies
- `framer-motion`: Animations and transitions
- `lucide-react`: Icons (Heart, Send, X)
- `ups_health_clean.json`: Data source

#### State Management
- `isExpanded`: Toggle between watch face and chat
- `messages`: Chat history (user/assistant)
- `input`: Current user input
- `isThinking`: AI processing state
- `bpm`: Simulated heart rate (varies 70-75 BPM)
- `time`: Live clock

#### Key Animations
```typescript
// Idle → Expanded
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 1.5, opacity: 0 }}

// Bezel rotation (thinking)
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity }}

// Sensor pulse
animate={{ opacity: [0.3, 0.8, 0.3] }}
transition={{ duration: 2, repeat: Infinity }}
```

### 5. Design Constraints

✅ **No Square Bubbles**: All chat messages use rounded-2xl borders
✅ **Centered Text**: All content aligned within circular screen
✅ **Circular Form Factor**: 384px × 384px (24rem) expanded size
✅ **Samsung Ecosystem**: Matches Galaxy Watch 5 + S22 Ultra aesthetic

### 6. Usage

```tsx
import { WatchBot } from "@/components/WatchBot";

export default function Page() {
  return (
    <main>
      {/* Your content */}
      <WatchBot />
    </main>
  );
}
```

The component is positioned `fixed bottom-8 right-8` and appears as a floating watch.

### 7. Customization

**Colors:**
- Bezel: `from-zinc-700 via-zinc-800 to-zinc-900`
- Screen: `bg-zinc-950`
- User messages: `bg-ups-gold text-zinc-950`
- Assistant messages: `bg-white/10 text-zinc-200`
- Sensor: `bg-green-400`

**Sizing:**
- Idle: `w-64 h-64` (256px)
- Expanded: `w-96 h-96` (384px)

**Timing:**
- Zoom animation: 0.3s
- Bezel rotation: 2s per revolution
- Sensor pulse: 2s cycle
- AI response delay: 1.5s

### 8. Data Integration

The bot directly imports and analyzes `ups_health_clean.json`:

```typescript
import shiftData from "@/data/ups_health_clean.json";

const analyzeQuery = (query: string): string => {
  // Natural language processing
  // Returns contextual responses based on shift data
};
```

### 9. Accessibility

- ✅ `aria-label` on all icon buttons
- ✅ Keyboard support (Enter to send)
- ✅ Disabled states for buttons
- ✅ Smooth scroll for messages
- ✅ Focus management

### 10. Future Enhancements

- [ ] Voice input (Web Speech API)
- [ ] Export chat transcript
- [ ] Real-time data sync with live shifts
- [ ] Multi-language support
- [ ] Custom watch face themes
- [ ] Haptic feedback simulation

---

**Design Philosophy**: This component bridges the gap between wearable tech and web interfaces, creating an immersive experience that feels like interacting with an actual Galaxy Watch 5 while maintaining the sophistication of a data science portfolio.
