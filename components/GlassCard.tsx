import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg",
        "shadow-lg shadow-black/20",
        hover && "transition-all duration-300 hover:bg-white/10 hover:border-ups-gold/30 hover:shadow-ups-gold/10",
        className
      )}
    >
      {children}
    </div>
  );
}
