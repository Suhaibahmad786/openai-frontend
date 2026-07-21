"use client";

import { useState, useCallback, useEffect, useRef } from "react";

function getApiBase(): string {
  if (typeof window === "undefined") return "http://localhost:4000";
  const envApi = process.env.NEXT_PUBLIC_API_URL;
  return envApi && !envApi.includes("localhost") ? envApi : "http://localhost:4000";
}

function getProxyUrl(url: string): string {
  return `${getApiBase()}/proxy-image?url=${encodeURIComponent(url)}`;
}

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function RetryImage({ src, alt, className = "" }: Props) {
  const [phase, setPhase] = useState<"loading" | "ready" | "failed">("loading");
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleError = useCallback(() => {
    setAttempts((a) => a + 1);
  }, []);

  const handleLoad = useCallback(() => {
    setPhase("ready");
  }, []);

  if (phase === "failed") {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center bg-surface-container-lowest text-[11px] text-outline-variant gap-2`}
      >
        <span className="material-symbols-outlined text-[24px] opacity-30">
          broken_image
        </span>
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {/* Loading shimmer */}
      {phase === "loading" && (
        <div
          className={`${className} absolute inset-0 z-0`}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(208,188,255,0.04) 50%, transparent 100%)",
            backgroundSize: "300% 100%",
            animation: "shimmer 2.5s infinite linear",
          }}
        />
      )}

      {/* Try direct first (fast if already cached) */}
      {attempts === 0 && (
        <img
          key={`direct-${src}`}
          src={src}
          alt={alt}
          className={`${className} relative z-10 transition-opacity duration-300 ${
            phase === "ready" ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
          onError={handleError}
          onLoad={handleLoad}
          loading="eager"
        />
      )}

      {/* Switch to proxy — it waits up to 120s server-side */}
      {attempts > 0 && (
        <img
          key={`proxy-${src}-${attempts}`}
          src={getProxyUrl(src)}
          alt={alt}
          className={`${className} relative z-10 transition-opacity duration-300 ${
            phase === "ready" ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
          onError={() => setPhase("failed")}
          onLoad={handleLoad}
          loading="eager"
        />
      )}
    </>
  );
}
