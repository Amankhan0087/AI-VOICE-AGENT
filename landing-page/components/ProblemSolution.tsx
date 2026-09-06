"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/motion/FadeIn";
import { painPoints, siteConfig, solutions } from "@/lib/site-config";

export function ProblemSolution() {
  return (
    <section className="container-page py-20 sm:py-28">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Every unanswered call is a customer you already paid to acquire.
        </h2>
        <p className="mt-4 text-lg text-muted">
          Here&rsquo;s what that costs you today — and what changes the moment{" "}
          <span className="font-medium text-foreground">{siteConfig.shortName}</span> answers instead.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <FadeInStagger className="rounded-3xl border border-border-subtle bg-surface p-8">
          <motion.h3 variants={fadeInItem} className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <XCircle className="text-red-500" size={20} /> Without an AI voice agent
          </motion.h3>
          <div className="mt-6 space-y-6">
            {painPoints.map((point) => (
              <motion.div key={point.title} variants={fadeInItem}>
                <p className="font-medium text-foreground">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.detail}</p>
              </motion.div>
            ))}
          </div>
        </FadeInStagger>

        <FadeInStagger
          staggerDelay={0.1}
          className="rounded-3xl border border-brand-200 bg-brand-50 p-8 dark:border-brand-300/20"
        >
          <motion.h3
            variants={fadeInItem}
            className="flex items-center gap-2 text-lg font-semibold text-brand-800 dark:text-brand-700"
          >
            <CheckCircle2 className="text-brand-500" size={20} /> With {siteConfig.shortName}
          </motion.h3>
          <div className="mt-6 space-y-6">
            {solutions.map((point) => (
              <motion.div key={point.title} variants={fadeInItem}>
                <p className="font-medium text-brand-900 dark:text-brand-800">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-brand-800/80 dark:text-brand-700/80">
                  {point.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
