"use client";

import { useState, useCallback } from "react";

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
  retryDelay = 3000,
  maxRetries = 5,
}: Props) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  const currentSrc = attempt === 0 ? src : `${src}&_retry=${attempt}`;

  const handleError = useCallback(() => {
    if (attempt < maxRetries) {
      setTimeout(() => setAttempt((a) => a + 1), retryDelay);
    } else {
      setFailed(true);
    }
  }, [attempt, maxRetries, retryDelay]);

  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#0a0b10] text-[11px] text-[#4a4e63]`}>
        Image unavailable
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="eager"
    />
  );
}
