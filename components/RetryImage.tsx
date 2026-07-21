"use client";

import { useState, useCallback, useEffect, useRef } from "react";

function getProxyUrl(url: string): string {
  if (typeof window === "undefined") return url;
  const envApi = process.env.NEXT_PUBLIC_API_URL;
  const apiBase =
    envApi && !envApi.includes("localhost") ? envApi : "http://localhost:4000";
  return `${apiBase}/proxy-image?url=${encodeURIComponent(url)}`;
}

interface Props {
  src: string;
  alt: string;
  className?: string;
  retryDelay?: number;
  maxRetries?: number;
}

export default function RetryImage({
  src,
  alt,
  className = "",
  retryDelay = 4000,
  maxRetries = 5,
}: Props) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleError = useCallback(() => {
    if (attempt < maxRetries) {
      timerRef.current = setTimeout(() => {
        setAttempt((a) => a + 1);
      }, retryDelay);
    } else if (!useProxy) {
      // After all direct retries exhausted, try proxy
      setUseProxy(true);
      setAttempt(0);
      setFailed(false);
    } else {
      setFailed(true);
    }
  }, [attempt, maxRetries, retryDelay, useProxy]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setFailed(false);
  }, []);

  const currentSrc = useProxy ? getProxyUrl(src) : src;

  if (failed) {
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
      {!loaded && (
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
      <img
        key={`${src}-${useProxy ? "proxy" : "direct"}-${attempt}`}
        src={currentSrc}
        alt={alt}
        className={`${className} relative z-10 transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onError={handleError}
        onLoad={handleLoad}
        loading="eager"
      />
    </>
  );
}
