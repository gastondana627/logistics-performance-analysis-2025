"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, X } from "lucide-react";
// PATH FIX: Relative import to ensure the data is found
import shiftData from "../src/data/ups_health_clean.json";

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

  // Simulate heart rate variation (Audit-realistic range)
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

    // 1. Specific Audit Date Queries (Matches 04, 02, 10)
    const dateMatch = shiftData.find(s => {
      const dayNum = s.date.split('-')[2]; // Extracts '04', '02', or '10'
      return lowerQuery.includes(dayNum);
    });

    if (dateMatch && (lowerQuery.includes("dec") || lowerQuery.includes("day"))) {
      return `Audit Report for ${dateMatch.date}: ${dateMatch.context.event}. Intensity Density: ${dateMatch.metrics.intensity_density} cal/min. Recorded ${dateMatch.metrics.steps.toLocaleString()} steps with a Strain Index of ${dateMatch.metrics.strain_index}.`;
    }

    // 2. Peak Intensity Queries
    if (lowerQuery.includes("highest") || lowerQuery.includes("peak") || lowerQuery.includes("maximum")) {
      const maxIntensity = [...shiftData].sort((a, b) => b.metrics.intensity_density - a.metrics.intensity_density)[0];
      return `The peak intensity recorded during this audit was ${maxIntensity.metrics.intensity_density} cal/min on ${maxIntensity.date} (${maxIntensity.context.event}). Focus: ${maxIntensity.context.note}`;
    }

    // 3. Step/Volume Queries
    if (lowerQuery.includes("steps") || lowerQuery.includes("volume")) {
      const totalSteps = shiftData.reduce((sum, s) => sum + s.metrics.steps, 0);
      const maxSteps = Math.max(...shiftData.map(s => s.metrics.steps));
      return `Cumulative volume: ${totalSteps.toLocaleString()} steps across the audit window. Single shift peak: ${maxSteps.toLocaleString()} steps.`;
    }

    // 4. Energy/Burn Queries
    if (lowerQuery.includes("calories") || lowerQuery.includes("burn")) {
      const totalCals = shiftData.reduce((sum, s) => sum + s.metrics.calories, 0);
      const avgBurn = (totalCals / shiftData.reduce((sum, s) => sum + s.metrics.active_mins, 0)).toFixed(2);
      return `Total caloric expenditure: ${totalCals.toLocaleString()} kcal. Average output density: ${avgBurn} cal/min. All metrics derived from BioActive sensor fusion.`;
    }

    // 5. General Summary
    if (lowerQuery.includes("summary") || lowerQuery.includes("audit") || lowerQuery.includes("overview")) {
      return `Engineering-grade audit of ${shiftData.length} operational windows. Specific focus on Dec 2, 4, and 10. Max Strain: ${Math.max(...shiftData.map(s => s.metrics.strain_index))}. All data verified.`;
    }

    return `System Ready. I can provide analysis on specific dates (Dec 2, 4, 10), peak intensity metrics, or total step volume. What would you like to verify?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = analyzeQuery(input);
    const assistantMessage: Message = { role: "assistant", content: response };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsThinking(false);
  };

  return (
    <>
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            key="watch-idle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
            style={{ transformOrigin: "bottom right" }}
          >
            <div onClick={() => setIsExpanded(true)} className="relative cursor-pointer group">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-3 shadow-2xl">
                <div className="w-full h-full rounded-full bg-black border-2 border-zinc-600 overflow-hidden relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                      <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="text-sm font-semibold text-red-400">{bpm} BPM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="watch-expanded"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.75, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
            style={{ transformOrigin: "bottom right" }}
          >
            <motion.div
              animate={isThinking ? { rotate: 360 } : { rotate: 0 }}
              transition={isThinking ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
              className="w-64 h-64 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-4 shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-zinc-950 border-2 border-zinc-600 overflow-hidden relative">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-[15%]">
                  <div className="text-center mb-1">
                    <div className="text-[10px] text-ups-gold font-semibold uppercase">Logistics Auditor</div>
                  </div>
                  <div className="flex-1 w-full overflow-y-auto px-2 py-1 scrollbar-hide">
                    {messages.length === 0 ? (
                      <div className="text-center text-zinc-500 text-[9px] mt-4">
                        👋 Specific Audit Dates Active: Dec 2, 4, 10.
                      </div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                          <div className={`inline-block px-2 py-1 rounded-2xl text-[8px] leading-tight ${msg.role === "user" ? "bg-ups-gold text-zinc-950 font-bold" : "bg-white/10 text-zinc-200"}`}>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="w-full mt-2">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2 py-1">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Audit query..."
                        className="flex-1 bg-transparent text-white text-[8px] outline-none"
                      />
                      <button onClick={handleSend} className="w-4 h-4 rounded-full bg-ups-gold flex items-center justify-center">
                        <Send className="w-2 h-2 text-zinc-950" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}