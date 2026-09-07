"use client";

import { Loader2, Mic, PhoneOff, Sparkles, ThumbsDown, ThumbsUp, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { CallWaveform } from "@/components/motion/CallWaveform";
import { useVapiCall } from "@/lib/vapi-context";
import { cn } from "@/lib/utils";

export function LiveDemo() {
  const { status, errorMessage, volumeLevel, isConfigured, startCall, endCall } = useVapiCall();
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  return (
    <section id="live-demo" className="border-t border-border-subtle bg-surface py-20 sm:py-28">
      <div className="container-page">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-300/30 dark:text-brand-600">
            <Sparkles size={14} /> Try it live
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Talk to the AI agent right now
          </h2>
          <p className="mt-4 text-lg text-muted">
            No phone call required — have a real conversation with the assistant directly in your
            browser.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-xl">
          <div className="rounded-3xl border border-border-subtle bg-background p-8 text-center shadow-xl shadow-brand-900/5 sm:p-10">
            {status === "active" && (
              <>
                <CallWaveform level={volumeLevel} className="mx-auto h-20" />
                <p className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-brand-600">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" /> Live — listening
                </p>
                <button
                  type="button"
                  onClick={endCall}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                >
                  <PhoneOff size={16} /> End Call
                </button>
              </>
            )}

            {status === "connecting" && (
              <>
                <Loader2 className="mx-auto animate-spin text-brand-500" size={40} />
                <p className="mt-4 text-sm font-medium text-muted">Connecting…</p>
              </>
            )}

            {status === "ended" && (
              <>
                <p className="text-base font-medium text-foreground">How did that go?</p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFeedback("up")}
                    aria-label="Good demo"
                    className={cn(
                      "rounded-full border p-3 transition-colors",
                      feedback === "up"
                        ? "border-brand-400 bg-brand-50 text-brand-600 dark:bg-brand-100"
                        : "border-border-subtle text-muted hover:border-brand-300"
                    )}
                  >
                    <ThumbsUp size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedback("down")}
                    aria-label="Not great"
                    className={cn(
                      "rounded-full border p-3 transition-colors",
                      feedback === "down"
                        ? "border-red-300 bg-red-50 text-red-500"
                        : "border-border-subtle text-muted hover:border-brand-300"
                    )}
                  >
                    <ThumbsDown size={18} />
                  </button>
                </div>
                {feedback && <p className="mt-3 text-xs text-muted">Thanks for the feedback!</p>}
                <button
                  type="button"
                  onClick={startCall}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  <Mic size={16} /> Talk again
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <TriangleAlert className="mx-auto text-red-500" size={32} />
                <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
                {isConfigured && (
                  <button
                    type="button"
                    onClick={startCall}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    <Mic size={16} /> Try Again
                  </button>
                )}
              </>
            )}

            {status === "idle" && (
              <>
                <button
                  type="button"
                  onClick={startCall}
                  disabled={!isConfigured}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-500/25 transition-transform hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Mic size={18} /> Talk to the AI Agent
                </button>
                {!isConfigured && (
                  <p className="mt-3 text-xs text-muted">
                    Live demo is being configured — check back soon.
                  </p>
                )}
              </>
            )}

            <p className="mt-8 border-t border-border-subtle pt-6 text-xs text-muted">
              This is a live AI demo — please don&rsquo;t share real personal appointment details.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
