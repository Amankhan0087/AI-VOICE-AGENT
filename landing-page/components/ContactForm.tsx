"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="border-t border-border-subtle bg-surface py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Book your free demo
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Tell us a bit about your business and we&rsquo;ll walk you through {siteConfig.shortName}{" "}
            live on your own phone line — most demos take about 20 minutes.
          </p>
          <p className="mt-6 text-sm text-muted">
            Prefer email? Reach us directly at{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="font-medium text-brand-600 hover:underline">
              {siteConfig.contactEmail}
            </a>
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          {status === "success" ? (
            <div className="flex flex-col items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-8 dark:border-brand-300/20">
              <CheckCircle2 className="text-brand-500" size={32} />
              <h3 className="text-lg font-semibold text-brand-800 dark:text-brand-700">
                Thanks — request received.
              </h3>
              <p className="text-sm text-brand-800/80 dark:text-brand-700/80">
                A member of our team will reach out shortly to schedule your demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-border-subtle bg-background p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground/80">
                    Full name
                  </label>
                  <input id="name" name="name" type="text" required className={inputClasses} placeholder="Jamie Rivera" />
                </div>
                <div>
                  <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-foreground/80">
                    Business name
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Riverside Dental"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground/80">
                    Phone number
                  </label>
                  <input id="phone" name="phone" type="tel" required className={inputClasses} placeholder="(555) 123-4567" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground/80">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="jamie@riversidedental.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="useCase" className="mb-1.5 block text-sm font-medium text-foreground/80">
                  What would you like the AI agent to handle?
                </label>
                <textarea
                  id="useCase"
                  name="useCase"
                  rows={3}
                  className={inputClasses}
                  placeholder="Booking new patients, rescheduling, after-hours calls..."
                />
              </div>

              <div>
                <label htmlFor="preferredCallTime" className="mb-1.5 block text-sm font-medium text-foreground/80">
                  Preferred call time
                </label>
                <input
                  id="preferredCallTime"
                  name="preferredCallTime"
                  type="text"
                  className={inputClasses}
                  placeholder="Weekdays, 2–4 PM EST"
                />
              </div>

              {status === "error" && <p className="text-sm text-red-500">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" && <Loader2 className="animate-spin" size={16} />}
                {status === "submitting" ? "Sending..." : "Book a Free Demo"}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
