"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BAR_WEIGHTS = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.45, 0.65, 1, 0.55, 0.75];

/** Bars driven by a live 0–1 audio level, for the active-call state. */
export function CallWaveform({
  level,
  bars = 12,
  className,
}: {
  level: number;
  bars?: number;
  className?: string;
}) {
  const weights = BAR_WEIGHTS.slice(0, bars);

  return (
    <div className={cn("text-brand-500", className)} aria-hidden="true">
      <div className="flex h-full items-center justify-center gap-[3px]">
        {weights.map((weight, i) => {
          const scale = Math.max(0.12, Math.min(1, level * weight * 1.6));
          return (
            <motion.span
              key={i}
              className="h-full w-[3px] rounded-full bg-current"
              animate={{ scaleY: scale }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            />
          );
        })}
      </div>
    </div>
  );
}
