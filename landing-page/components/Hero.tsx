"use client";

import { motion } from "framer-motion";
import { PhoneCall, PlayCircle } from "lucide-react";
import { Waveform } from "@/components/motion/Waveform";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-brand-50 via-background to-background dark:from-brand-100/40"
        aria-hidden="true"
      />
      <div className="container-page grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-300/30 dark:text-brand-600"
          >
            <PhoneCall size={14} /> Built on VAPI voice AI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            Stop losing customers to missed calls and no-shows.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {siteConfig.name} answers every call in seconds, books, cancels, and reschedules
            appointments in plain conversation, and syncs it all to a live dashboard your
            team can see in real time — 24 hours a day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Book a Free Demo
            </a>
            <a
              href="#demo-video"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <PlayCircle size={18} /> Watch Demo
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 text-sm text-muted"
          >
            {siteConfig.demoBookingNote}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface p-8 shadow-2xl shadow-brand-900/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                <span className="text-sm font-medium text-foreground/80">Live call in progress</span>
              </div>
              <span className="text-xs font-medium text-muted">00:14</span>
            </div>

            <Waveform className="my-8 h-24" />

            <div className="space-y-3 rounded-2xl border border-border-subtle bg-background p-4 text-sm">
              <p className="text-muted">Caller</p>
              <p className="text-foreground">
                &ldquo;Hi, can I move my Thursday appointment to Friday afternoon?&rdquo;
              </p>
            </div>
            <div className="mt-3 space-y-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm dark:border-brand-300/20">
              <p className="text-brand-700 dark:text-brand-600">{siteConfig.shortName}</p>
              <p className="text-foreground">
                &ldquo;Of course — I&rsquo;ve moved you to Friday at 2:00 PM and sent a confirmation.&rdquo;
              </p>
            </div>
          </div>

          <div
            className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-brand-300/30 blur-3xl"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
