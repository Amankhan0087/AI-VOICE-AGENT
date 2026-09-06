"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Signal,
} from "lucide-react";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/motion/FadeIn";
import { features } from "@/lib/site-config";

const icons = [
  MessageSquareText,
  CalendarClock,
  LayoutDashboard,
  FileSpreadsheet,
  Signal,
  ShieldCheck,
];

export function Features() {
  return (
    <section id="features" className="container-page py-20 sm:py-28">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Everything a front desk does on the phone — automated
        </h2>
        <p className="mt-4 text-lg text-muted">
          Built on production-grade voice AI, with the operational details handled.
        </p>
      </FadeIn>

      <FadeInStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={feature.title}
              variants={fadeInItem}
              className="group rounded-2xl border border-border-subtle bg-surface p-7 transition-colors hover:border-brand-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-100">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.detail}</p>
            </motion.div>
          );
        })}
      </FadeInStagger>
    </section>
  );
}
