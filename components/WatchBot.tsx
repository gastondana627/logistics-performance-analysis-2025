"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, X } from "lucide-react";
import shiftData from "@/data/ups_health_clean.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function WatchBot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [bpm, setBpm] = useState(72);
  const [time, setTime] = useState(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Live clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate heart rate variation
  useEffect(() => {
    const bpmTimer = setInterval(() => {
      setBpm((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 2000);
    return () => clearInterval(bpmTimer);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const analyzeQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Day-specific queries
    if (lowerQuery.includes("tuesday")) {
      const tuesdayShift = shiftData.find((s) => s.day_type.includes("Tuesday"));
      if (tuesdayShift) {
        return `On Tuesday (${tuesdayShift.date}), the intensity density was ${tuesdayShift.metrics.intensity_density} cal/min during ${tuesdayShift.context.event}. This represented a ${tuesdayShift.metrics.active_mins}-minute operational window with ${tuesdayShift.metrics.steps.toLocaleString()} steps.`;
      }
    }

    if (lowerQuery.includes("highest") || lowerQuery.includes("peak") || lowerQuery.includes("maximum")) {
      const maxIntensity = shiftData.reduce((max, shift) =>
        shift.metrics.intensity_density > max.metrics.intensity_density ? shift : max
      );
      return `Peak intensity was ${maxIntensity.metrics.intensity_density} cal/min on ${maxIntensity.date} during ${maxIntensity.context.event}. This shift burned ${maxIntensity.metrics.calories} calories in ${maxIntensity.metrics.active_mins} minutes.`;
    }

    if (lowerQuery.includes("steps")) {
      const totalSteps = shiftData.reduce((sum, s) => sum + s.metrics.steps, 0);
      const avgSteps = Math.round(totalSteps / shiftData.length);
      return `Across ${shiftData.length} verified shifts, total steps: ${totalSteps.toLocaleString()}. Average per shift: ${avgSteps.toLocaleString()}. Highest single shift: ${Math.max(...shiftData.map((s) => s.metrics.steps)).toLocaleString()} steps.`;
    }

    if (lowerQuery.includes("calories") || lowerQuery.includes("burn")) {
      const totalCals = shiftData.reduce((sum, s) => sum + s.metrics.calories, 0);
      return `Total caloric expenditure: ${totalCals.toLocaleString()} calories across ${shiftData.length} shifts. Average burn rate: ${(totalCals / shiftData.reduce((sum, s) => sum + s.metrics.active_mins, 0)).toFixed(2)} cal/min.`;
    }

    if (lowerQuery.includes("strain") || lowerQuery.includes("intensity")) {
      const avgStrain = (
        shiftData.reduce((sum, s) => sum + s.metrics.strain_index, 0) / shiftData.length
      ).toFixed(2);
      return `Average strain index: ${avgStrain}. Intensity density ranged from ${Math.min(...shiftData.map((s) => s.metrics.intensity_density))} to ${Math.max(...shiftData.map((s) => s.metrics.intensity_density))} cal/min across operational windows.`;
    }

    if (lowerQuery.includes("summary") || lowerQuery.includes("overview")) {
      return `Biometric audit of ${shiftData.length} high-intensity UPS shifts. Total: ${shiftData.reduce((sum, s) => sum + s.metrics.steps, 0).toLocaleString()} steps, ${shiftData.reduce((sum, s) => sum + s.metrics.calories, 0).toLocaleString()} calories. Peak intensity: ${Math.max(...shiftData.map((s) => s.metrics.intensity_density))} cal/min. All data verified via Samsung Health → Apple Watch migration.`;
    }

    // Default response
    return `I'm your Logistics Performance Auditor. I can analyze: intensity density, step counts, caloric burn, strain metrics, or specific shift days. Try asking about "Tuesday" or "peak intensity".`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = analyzeQuery(input);
    const assistantMessage: Message = { role: "assistant", content: response };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsThinking(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isExpanded ? (
          // Idle Watch Face - Fixed bottom-right
          <motion.div
            key="watch-idle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
            style={{ transformOrigin: "bottom right" }}
          >
            <div
              onClick={() => setIsExpanded(true)}
              className="relative cursor-pointer group"
            >
              {/* Metallic Bezel */}
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-3 shadow-2xl">
                {/* Glass Screen */}
                <div className="w-full h-full rounded-full bg-black border-2 border-zinc-600 overflow-hidden relative backdrop-blur-sm">
                  {/* Sapphire Crystal Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />
                  
                  {/* Watch Face Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Time */}
                    <div className="text-4xl font-bold text-white mb-2">
                      {time.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    {/* Date */}
                    <div className="text-xs text-zinc-400 mb-4">
                      {time.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    {/* Heart Rate Complication */}
                    <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                      <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="text-sm font-semibold text-red-400">{bpm} BPM</span>
                    </div>

                    {/* Tap to Open Hint */}
                    <div className="absolute bottom-6 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Tap to Audit
                    </div>
                  </div>

                  {/* BioActive Sensor Glow */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full blur-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Expanded Chat Interface - Stays in bottom-right corner
          <motion.div
            key="watch-expanded"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.75, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-8 right-8 z-50"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* Rotating Bezel (when thinking) */}
            <motion.div
              animate={isThinking ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isThinking
                  ? { duration: 2, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 }
              }
              className="w-64 h-64 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-4 shadow-2xl"
            >
              {/* Glass Screen */}
              <div className="w-full h-full rounded-full bg-zinc-950 border-2 border-zinc-600 overflow-hidden relative backdrop-blur-xl">
                {/* Sapphire Crystal Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-full pointer-events-none z-10" />

                {/* Close Button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close chat"
                  className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                {/* Content Container with Safe Area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-[15%]">
                  {/* Header */}
                  <div className="text-center mb-2">
                    <div className="text-[10px] text-ups-gold font-semibold">LOGISTICS AUDITOR</div>
                    <div className="text-[8px] text-zinc-500">Galaxy Watch 5 • AI</div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 w-full overflow-y-auto px-2 py-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {messages.length === 0 ? (
                      <div className="text-center text-zinc-500 text-[10px] mt-4">
                        <div className="mb-1">👋 Ready to audit</div>
                        <div className="text-[8px]">Ask about intensity or steps</div>
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
                        >
                          <div
                            className={`inline-block max-w-[85%] px-2 py-1 rounded-2xl text-[9px] leading-tight ${
                              msg.role === "user"
                                ? "bg-ups-gold text-zinc-950 font-semibold"
                                : "bg-white/10 text-zinc-200"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    {isThinking && (
                      <div className="text-left mb-2">
                        <div className="inline-block bg-white/10 px-2 py-1 rounded-2xl text-[9px] text-zinc-400">
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Analyzing...
                          </motion.span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="w-full mt-2">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask about performance..."
                        className="flex-1 bg-transparent text-white text-[9px] placeholder-zinc-500 outline-none"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!input.trim() || isThinking}
                        aria-label="Send message"
                        className="w-5 h-5 rounded-full bg-ups-gold hover:bg-ups-gold/80 disabled:bg-zinc-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                      >
                        <Send className="w-2.5 h-2.5 text-zinc-950" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* BioActive Sensor Glow (brighter when thinking) */}
                <motion.div
                  animate={
                    isThinking
                      ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }
                      : { opacity: [0.3, 0.6, 0.3] }
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full blur-md z-10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
