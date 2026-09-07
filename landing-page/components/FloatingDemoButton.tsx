"use client";

import { Loader2, Mic, PhoneOff } from "lucide-react";
import { CallWaveform } from "@/components/motion/CallWaveform";
import { useVapiCall } from "@/lib/vapi-context";
import { cn } from "@/lib/utils";

export function FloatingDemoButton() {
  const { status, volumeLevel, isConfigured, startCall, endCall } = useVapiCall();

  if (!isConfigured) return null;

  const isBusy = status === "connecting" || status === "active";

  return (
    <button
      type="button"
      onClick={isBusy ? endCall : startCall}
      aria-label={
        status === "active"
          ? "End live demo call"
          : status === "connecting"
            ? "Connecting to the AI agent"
            : "Talk to the AI agent"
      }
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-colors",
        isBusy ? "bg-red-500 hover:bg-red-600" : "bg-brand-500 hover:bg-brand-600"
      )}
    >
      {status === "active" ? (
        <>
          <CallWaveform level={volumeLevel} bars={5} className="h-5 w-10 text-white" />
          <PhoneOff size={16} />
        </>
      ) : status === "connecting" ? (
        <>
          <Loader2 className="animate-spin" size={16} /> Connecting…
        </>
      ) : (
        <>
          <Mic size={16} /> Talk to AI
        </>
      )}
    </button>
  );
}
