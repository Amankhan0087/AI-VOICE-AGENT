"use client";

import { motion } from "framer-motion";
import { CalendarCheck, PhoneIncoming, RadioTower, Sparkles } from "lucide-react";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/motion/FadeIn";
import { howItWorks } from "@/lib/site-config";

const icons = [PhoneIncoming, Sparkles, CalendarCheck, RadioTower];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border-subtle bg-surface py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted">
            From a ringing phone to a confirmed booking, with nobody at the front desk lifting a finger.
          </p>
        </FadeIn>

        <FadeInStagger className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute top-8 left-0 right-0 hidden h-px bg-border-subtle lg:block"
            aria-hidden="true"
          />
          {howItWorks.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={item.step} variants={fadeInItem} className="relative">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border-subtle bg-background shadow-sm">
                  <Icon className="text-brand-500" size={26} />
                </div>
                <p className="mt-5 text-xs font-semibold tracking-wide text-brand-500">
                  STEP {item.step}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
              </motion.div>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
