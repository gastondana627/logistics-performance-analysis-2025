"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, X } from "lucide-react";
import shiftData from "../src/data/ups_health_clean.json";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Expert Knowledge Base - Hardcoded Key Findings
const AUDIT_KNOWLEDGE = {
  dec4_intensity: {
    keywords: ['dec 4', 'hardest', 'intensity', 'dec4', 'december 4', 'toughest'],
    response: "On Dec 4th, we recorded a peak Intensity Density of 8.44 cal/min. Despite not being the longest shift, the volumetric weight made it the most physically taxing window in the audit."
  },
  dec10_paradox: {
    keywords: ['dec 10', 'steps', 'paradox', 'dec10', 'december 10', 'movement'],
    response: "Dec 10th showed a \"Movement Paradox.\" We recorded 8,103 steps—the highest in the audit—yet physiological strain was lower than Dec 4th due to operational delays and belt jams."
  },
  correlation: {
    keywords: ['correlation', 'math', 'logic', 'pearson', 'relationship', 'predictor', 'pace'],
    response: "Our Pearson correlation analysis found a 0.84 relationship between Strain Index and Intensity Density, proving that the pace of work is a higher predictor of fatigue than total shift duration."
  },
  hardware: {
    keywords: ['hardware', 'sensors', 'samsung', 'watch', 'galaxy', 's22', 'bioactive', 'ppg', 'accelerometer'],
    response: "Data was captured using the Samsung BioActive sensor suite (PPG + 3-Axis Accelerometry) on a Galaxy Watch 5, synced with an S22 Ultra."
  },
  offline_fallback: {
    response: "I am in offline mode. Ask me about Dec 4th intensity, Dec 10th steps, or the correlation between strain and work pace."
  }
};

export function WatchBot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [bpm, setBpm] = useState(72);
  const [time, setTime] = useState(new Date());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bpmTimer = setInterval(() => {
      setBpm((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 2000);
    return () => clearInterval(bpmTimer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkExpertKnowledge = (query: string): string | null => {
    const lowerQuery = query.toLowerCase();

    for (const [key, knowledge] of Object.entries(AUDIT_KNOWLEDGE)) {
      if (key === 'offline_fallback') continue;
      
      if ('keywords' in knowledge) {
        const hasKeyword = knowledge.keywords.some((keyword: string) => 
          lowerQuery.includes(keyword.toLowerCase())
        );
        
        if (hasKeyword) {
          return knowledge.response;
        }
      }
    }

    return null;
  };

  const analyzeQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // PRIORITY 1: Check expert knowledge base first
    const expertResponse = checkExpertKnowledge(query);
    if (expertResponse) {
      return expertResponse;
    }

    // PRIORITY 2: Fallback to JSON data analysis
    if (lowerQuery.includes("dec 2") || lowerQuery.includes("december 2")) {
      const shift = shiftData.find((s) => s.date.includes("12-02"));
      if (shift) {
        return `On Dec 2nd (${shift.day_type}), intensity density was ${shift.metrics.intensity_density} cal/min during ${shift.context.event}. This represented a ${shift.metrics.active_mins}-minute operational window with ${shift.metrics.steps.toLocaleString()} steps.`;
      }
    }

    if (lowerQuery.includes("highest") || lowerQuery.includes("peak") || lowerQuery.includes("maximum")) {
      const maxIntensity = shiftData.reduce((max, shift) =>
        shift.metrics.intensity_density > max.metrics.intensity_density ? shift : max
      );
      return `Peak intensity was ${maxIntensity.metrics.intensity_density} cal/min on ${new Date(maxIntensity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} during ${maxIntensity.context.event}.`;
    }

    if (lowerQuery.includes("calories") || lowerQuery.includes("burn")) {
      const totalCals = shiftData.reduce((sum, s) => sum + s.metrics.calories, 0);
      return `Total caloric expenditure: ${totalCals.toLocaleString()} calories across ${shiftData.length} shifts. Average burn rate: ${(totalCals / shiftData.reduce((sum, s) => sum + s.metrics.active_mins, 0)).toFixed(2)} cal/min.`;
    }

    if (lowerQuery.includes("summary") || lowerQuery.includes("overview")) {
      return `Biometric audit of ${shiftData.length} high-intensity UPS shifts. Total: ${shiftData.reduce((sum, s) => sum + s.metrics.steps, 0).toLocaleString()} steps, ${shiftData.reduce((sum, s) => sum + s.metrics.calories, 0).toLocaleString()} calories.`;
    }

    // PRIORITY 3: Offline fallback
    return AUDIT_KNOWLEDGE.offline_fallback.response;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

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
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-3 shadow-2xl">
                <div className="w-full h-full rounded-full bg-black border-2 border-zinc-600 overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-full pointer-events-none" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {time.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    <div className="text-xs text-zinc-400 mb-4">
                      {time.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2">
                      <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="text-sm font-semibold text-red-400">{bpm} BPM</span>
                    </div>

                    <div className="absolute bottom-6 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Tap to Audit
                    </div>
                  </div>

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
          <motion.div
            key="watch-expanded"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.75, opacity: 1 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-8 right-8 z-50"
            style={{ transformOrigin: "bottom right" }}
          >
            <motion.div
              animate={isThinking ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isThinking
                  ? { duration: 2, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 }
              }
              className="w-64 h-64 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 p-4 shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-zinc-950 border-2 border-zinc-600 overflow-hidden relative backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-full pointer-events-none z-10" />

                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label="Close chat"
                  className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>

                <div className="absolute inset-0 flex flex-col items-center justify-center p-[15%]">
                  <div className="text-center mb-2">
                    <div className="text-[10px] text-ups-gold font-semibold">LOGISTICS AUDITOR</div>
                    <div className="text-[8px] text-zinc-500">Galaxy Watch 5 • AI</div>
                  </div>

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
