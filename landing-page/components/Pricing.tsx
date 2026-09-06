"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";
import { pricingTiers, type BillingPeriod } from "@/lib/site-config";

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="container-page py-20 sm:py-28">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Simple pricing, based on call volume
        </h2>
        <p className="mt-4 text-lg text-muted">
          Every plan includes the full booking, cancellation, and rescheduling feature set.
        </p>
      </FadeIn>

      <div className="mt-9 flex items-center justify-center gap-3">
        <span className={cn("text-sm font-medium", period === "monthly" ? "text-foreground" : "text-muted")}>
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={period === "yearly"}
          aria-label="Toggle yearly billing"
          onClick={() => setPeriod((p) => (p === "monthly" ? "yearly" : "monthly"))}
          className="relative h-7 w-13 rounded-full bg-surface-2 transition-colors"
          style={{ width: "3.25rem" }}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="absolute top-1 h-5 w-5 rounded-full bg-brand-500"
            style={{ left: period === "yearly" ? "calc(100% - 1.5rem)" : "0.25rem" }}
          />
        </button>
        <span className={cn("text-sm font-medium", period === "yearly" ? "text-foreground" : "text-muted")}>
          Yearly <span className="text-brand-500">(save ~20%)</span>
        </span>
      </div>

      <FadeInStagger className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const price = period === "monthly" ? tier.monthlyPrice : Math.round(tier.yearlyPrice / 12);
          return (
            <motion.div
              key={tier.name}
              variants={fadeInItem}
              className={cn(
                "flex flex-col rounded-3xl border p-8",
                tier.highlighted
                  ? "border-brand-400 bg-brand-50 shadow-xl shadow-brand-500/10 dark:bg-brand-100/40"
                  : "border-border-subtle bg-surface"
              )}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-foreground">${price}</span>
                <span className="text-sm text-muted">/ month</span>
              </div>
              {period === "yearly" && (
                <p className="mt-1 text-xs text-muted">Billed ${tier.yearlyPrice} / year</p>
              )}

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-foreground/80">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={cn(
                  "mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                  tier.highlighted
                    ? "bg-brand-500 text-white hover:bg-brand-600"
                    : "border border-border-subtle text-foreground hover:border-brand-300 hover:text-brand-600"
                )}
              >
                Book a Demo
              </a>
            </motion.div>
          );
        })}
      </FadeInStagger>
    </section>
  );
}
