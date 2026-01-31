# WatchBot Demo Guide

## How to Use the Galaxy Watch 5 Digital Twin

### Getting Started

1. **Visit the Site**: Navigate to `http://localhost:3001`
2. **Locate the Watch**: Look for the circular watch interface in the bottom-right corner
3. **Observe Idle State**: You'll see a live watch face with:
   - Current time
   - Today's date
   - Pulsing heart rate (BPM)
   - Green BioActive sensor glow at bottom

### Activating the Chat

1. **Click the Watch**: Tap anywhere on the watch face
2. **Watch the Animation**: The watch will zoom in and transform into a chat interface
3. **Notice the Details**:
   - Metallic bezel remains visible
   - "LOGISTICS AUDITOR" header appears
   - Chat input field at bottom
   - BioActive sensor continues pulsing

### Example Queries to Try

#### Day-Specific Analysis
```
"Tell me about Tuesday"
"What happened on Tuesday?"
```
**Expected Response**: Intensity density of 9.90 cal/min, event details, steps, and duration

#### Performance Metrics
```
"What was the highest intensity?"
"Show me peak performance"
```
**Expected Response**: Maximum intensity shift with full biometric breakdown

#### Step Analysis
```
"How many steps?"
"Total steps across all shifts"
```
**Expected Response**: Total, average, and maximum step counts

#### Caloric Burn
```
"How many calories burned?"
"What's the burn rate?"
```
**Expected Response**: Total calories and average burn rate per minute

#### Strain Metrics
```
"What's the strain index?"
"Tell me about intensity"
```
**Expected Response**: Average strain and intensity density range

#### Overview
```
"Give me a summary"
"Overview of all shifts"
```
**Expected Response**: Complete biometric audit summary

### Observing AI States

#### Thinking State
When you send a message, watch for:
- ✨ **Rotating Bezel**: The outer ring spins continuously
- 💚 **Bright Sensor**: The green glow intensifies and pulses faster
- 💬 **Status Message**: "Analyzing biometric data..." appears

#### Response State
After ~1.5 seconds:
- Bezel stops rotating
- Sensor returns to normal pulse
- AI response appears in a rounded bubble

### Design Details to Notice

#### Circular Constraints
- All text stays within the circular screen
- No square chat bubbles (all rounded-2xl)
- Messages wrap naturally within the circle

#### Samsung Ecosystem Aesthetic
- Metallic charcoal bezel (Galaxy Watch 5 style)
- UPS Gold accents for user messages
- Glassmorphism effects on screen
- Matches S22 Ultra design language

#### Interactive Elements
- **Close Button**: Top-right X to return to watch face
- **Input Field**: Bottom circular input with send button
- **Scrollable Chat**: Messages scroll smoothly within circular bounds

### Testing the Data Integration

The bot has direct access to `ups_health_clean.json`. Test its knowledge:

1. **Ask about specific metrics**: "What's the intensity density?"
2. **Query specific days**: "Tuesday" → Should return 9.90 cal/min
3. **Request comparisons**: "Highest vs lowest intensity"
4. **Verify data accuracy**: Cross-reference responses with the JSON file

### Closing the Chat

1. **Click the X**: Top-right close button
2. **Watch the Animation**: Chat zooms out and transforms back to watch face
3. **Return to Idle**: Watch face resumes with live clock and BPM

### Mobile Responsiveness

The watch is positioned `fixed bottom-8 right-8`, so it:
- Stays in bottom-right on desktop
- Remains accessible on tablets
- May need adjustment for mobile (consider adding media queries)

### Performance Notes

- **Live Clock**: Updates every second
- **BPM Simulation**: Varies slightly every 2 seconds (realistic heart rate)
- **Smooth Animations**: Framer Motion ensures 60fps transitions
- **Auto-scroll**: Messages automatically scroll into view

### Troubleshooting

**Watch not appearing?**
- Check browser console for errors
- Ensure Framer Motion is installed: `npm install framer-motion`
- Verify `ups_health_clean.json` exists in `/data/`

**Animations stuttering?**
- Check browser performance
- Reduce motion in OS settings may affect animations
- Try in Chrome/Edge for best performance

**AI not responding?**
- Check console for data loading errors
- Verify JSON structure matches expected format
- Ensure query contains recognizable keywords

---

## Advanced Usage

### Customizing Responses

Edit `analyzeQuery()` function in `WatchBot.tsx` to add new query patterns:

```typescript
if (lowerQuery.includes("your-keyword")) {
  // Custom logic here
  return "Your custom response";
}
```

### Styling Adjustments

Key CSS classes to modify:
- Bezel: `bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900`
- Screen: `bg-zinc-950`
- User bubble: `bg-ups-gold text-zinc-950`
- Assistant bubble: `bg-white/10 text-zinc-200`

### Animation Timing

Adjust in component:
- Zoom speed: `transition={{ duration: 0.3 }}`
- Bezel rotation: `transition={{ duration: 2 }}`
- Sensor pulse: `transition={{ duration: 2 }}`
- AI delay: `setTimeout(resolve, 1500)`

---

**Pro Tip**: Try asking compound questions like "What was Tuesday's intensity compared to the peak?" to see how the bot handles complex queries!
