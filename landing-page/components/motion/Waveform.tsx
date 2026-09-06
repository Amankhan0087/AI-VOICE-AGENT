"use client";

import { motion } from "framer-motion";

const BAR_HEIGHTS = [18, 32, 48, 64, 44, 58, 36, 52, 28, 40, 60, 46, 30, 54, 20, 38, 50, 26, 42, 34];

export function Waveform({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="flex h-full items-center justify-center gap-[3px]">
        {BAR_HEIGHTS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[4px] rounded-full bg-gradient-to-t from-brand-400 to-brand-600"
            style={{ height: h }}
            animate={{ scaleY: [0.35, 1, 0.35] }}
            transition={{
              duration: 1.1 + (i % 5) * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.06,
            }}
          />
        ))}
      </div>
    </div>
  );
}
