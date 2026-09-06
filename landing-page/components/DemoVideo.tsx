"use client";

import { PlayCircle } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/FadeIn";

/**
 * Swap YOUTUBE_ID with the real demo video ID, or replace the <iframe>
 * below with a <video src="/videos/demo.mp4" controls /> tag for a
 * self-hosted file.
 */
const YOUTUBE_ID = "REPLACE_WITH_DEMO_VIDEO_ID";

export function DemoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="demo-video" className="container-page py-20 sm:py-28">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          See it answer a real call
        </h2>
        <p className="mt-4 text-lg text-muted">
          A two-minute walkthrough of a booking, a cancellation, and the dashboard update that follows.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mx-auto mt-12 max-w-4xl">
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-border-subtle bg-black shadow-xl">
          {playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1`}
              title={`${"Product"} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-700 via-brand-900 to-black"
              aria-label="Play demo video"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                <PlayCircle size={44} />
              </span>
            </button>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
