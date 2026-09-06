"use client";

import { ArrowUpRight, Download, Phone } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Placeholder dashboard mockup built in CSS/HTML.
 * Swap this component's contents for a next/image screenshot of the real
 * Streamlit dashboard (see /public/images) once one is available.
 */
const recentCalls = [
  { name: "Sarah M.", intent: "Booked appointment", time: "2 min ago", status: "Booked" },
  { name: "James O.", intent: "Rescheduled to Fri 2:00 PM", time: "14 min ago", status: "Rescheduled" },
  { name: "Anita R.", intent: "Cancelled Tue visit", time: "41 min ago", status: "Cancelled" },
  { name: "Devon K.", intent: "Booked appointment", time: "1 hr ago", status: "Booked" },
];

const statusColor: Record<string, string> = {
  Booked: "bg-brand-100 text-brand-700",
  Rescheduled: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function DashboardPreview() {
  return (
    <section className="border-t border-border-subtle bg-surface py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            One dashboard for every call, booking, and change
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            No more guessing what happened on the phone. Every conversation is transcribed,
            categorized, and reflected in your schedule the moment the call ends — visible
            from any device, for any team member you give access to.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground/80">
            <li className="flex items-center gap-2">
              <ArrowUpRight size={16} className="text-brand-500" /> Live call feed with transcripts
            </li>
            <li className="flex items-center gap-2">
              <ArrowUpRight size={16} className="text-brand-500" /> One-click CSV export for reporting
            </li>
            <li className="flex items-center gap-2">
              <ArrowUpRight size={16} className="text-brand-500" /> Server & call-line status at a glance
            </li>
          </ul>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-3xl border border-border-subtle bg-background p-5 shadow-xl shadow-brand-900/5 sm:p-6">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Call Activity</p>
                <p className="text-xs text-muted">Today, live</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 dark:bg-brand-100">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Line active
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {recentCalls.map((call) => (
                <div
                  key={call.name}
                  className="flex items-center justify-between rounded-xl border border-border-subtle px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-muted">
                      <Phone size={15} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{call.name}</p>
                      <p className="text-xs text-muted">{call.intent}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColor[call.status]}`}
                    >
                      {call.status}
                    </span>
                    <p className="mt-1 text-[11px] text-muted">{call.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              <Download size={15} /> Export as CSV
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
