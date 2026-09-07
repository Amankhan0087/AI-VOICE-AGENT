"use client";

import type Vapi from "@vapi-ai/web";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CallStatus = "idle" | "connecting" | "active" | "ended" | "error";

interface VapiCallState {
  status: CallStatus;
  errorMessage: string | null;
  volumeLevel: number;
  isConfigured: boolean;
  startCall: () => void;
  endCall: () => void;
}

const VapiCallContext = createContext<VapiCallState | null>(null);

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
const isConfigured = Boolean(PUBLIC_KEY && ASSISTANT_ID);

function describeVapiError(err: unknown): string {
  const message = err instanceof Error ? err.message : typeof err === "string" ? err : "";

  if (/permission|notallowed|denied/i.test(message)) {
    return "Microphone access was denied. Please allow microphone access in your browser and try again.";
  }
  if (/notfound|no microphone|no audio/i.test(message)) {
    return "No microphone was found on this device.";
  }
  return "Something went wrong starting the demo call. Please try again in a moment.";
}

export function VapiCallProvider({ children }: { children: ReactNode }) {
  const vapiRef = useRef<Vapi | null>(null);
  const [status, setStatus] = useState<CallStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  const startCall = useCallback(() => {
    if (!isConfigured) {
      setStatus("error");
      setErrorMessage("Live demo isn't configured yet — missing VAPI keys.");
      return;
    }

    setStatus((current) => {
      if (current === "connecting" || current === "active") return current;
      return "connecting";
    });
    setErrorMessage(null);

    (async () => {
      try {
        if (!vapiRef.current) {
          const { default: VapiClient } = await import("@vapi-ai/web");
          const client = new VapiClient(PUBLIC_KEY!);

          client.on("call-start", () => setStatus("active"));
          client.on("call-end", () => {
            setStatus("ended");
            setVolumeLevel(0);
          });
          client.on("volume-level", (level: number) => setVolumeLevel(level));
          client.on("error", (err: unknown) => {
            setStatus("error");
            setErrorMessage(describeVapiError(err));
          });

          vapiRef.current = client;
        }

        await vapiRef.current.start(ASSISTANT_ID!);
      } catch (err) {
        setStatus("error");
        setErrorMessage(describeVapiError(err));
      }
    })();
  }, []);

  const endCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  return (
    <VapiCallContext.Provider
      value={{ status, errorMessage, volumeLevel, isConfigured, startCall, endCall }}
    >
      {children}
    </VapiCallContext.Provider>
  );
}

export function useVapiCall() {
  const ctx = useContext(VapiCallContext);
  if (!ctx) throw new Error("useVapiCall must be used within VapiCallProvider");
  return ctx;
}
