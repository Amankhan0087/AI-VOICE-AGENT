"use client";

import { FadeInStagger, fadeInItem } from "@/components/motion/FadeIn";
import { motion } from "framer-motion";
import { trustStats } from "@/lib/site-config";

export function TrustBar() {
  return (
    <section className="border-y border-border-subtle bg-surface" aria-label="Key stats">
      <FadeInStagger className="container-page grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
        {trustStats.map((stat) => (
          <motion.div key={stat.label} variants={fadeInItem} className="text-center">
            <p className="text-2xl font-semibold text-brand-600 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted sm:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </FadeInStagger>
    </section>
  );
}
