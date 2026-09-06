"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { FadeIn, FadeInStagger, fadeInItem } from "@/components/motion/FadeIn";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section className="border-t border-border-subtle bg-surface py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trusted by teams who used to dread the phone
          </h2>
          <p className="mt-3 text-sm text-muted">
            Placeholder quotes shown for layout — swap in real customer testimonials in{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5">lib/site-config.ts</code>.
          </p>
        </FadeIn>

        <FadeInStagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={fadeInItem}
              className="flex flex-col rounded-2xl border border-border-subtle bg-background p-7"
            >
              <Quote className="text-brand-400" size={24} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border-subtle pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted">
                  {t.role}, {t.company}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
