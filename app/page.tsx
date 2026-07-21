"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ProgressTimeline from "@/components/ProgressTimeline";
import ResultCard from "@/components/ResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorCard from "@/components/ErrorCard";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";
import { generateStream, type GenerateResult, type SSEEvent } from "@/lib/api";

interface StepTiming {
  node: string;
  startTime: number;
  endTime?: number;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stepTimings, setStepTimings] = useState<StepTiming[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  const handleGenerate = useCallback((prompt: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    setCurrentStep(null);
    setCompletedSteps([]);
    setStepTimings([]);
    setStartTime(Date.now());

    const cleanup = generateStream(prompt, (event: SSEEvent) => {
      switch (event.type) {
        case "node_start":
          if (event.node) {
            setCurrentStep(event.node);
            setStepTimings((prev) => [
              ...prev,
              { node: event.node!, startTime: Date.now() },
            ]);
          }
          break;

        case "node_end":
          if (event.node) {
            setCompletedSteps((prev) =>
              prev.includes(event.node!) ? prev : [...prev, event.node!]
            );
            setCurrentStep(null);
            setStepTimings((prev) =>
              prev.map((t) =>
                t.node === event.node && !t.endTime
                  ? { ...t, endTime: Date.now() }
                  : t
              )
            );
          }
          break;

        case "complete":
          if (event.result) {
            if (event.result.iterations && event.result.iterations > 1) {
              setCompletedSteps((prev) =>
                prev.includes("critique_loop")
                  ? prev
                  : [...prev, "critique_loop"]
              );
            }
            setResult(event.result);
          }
          setLoading(false);
          break;

        case "error":
          setError(event.error || "An unexpected error occurred");
          setCurrentStep(null);
          setLoading(false);
          break;
      }
    });

    cancelRef.current = cleanup;
  }, []);

  const handleRetry = useCallback(() => {
    if (result?.bestImageUrl) handleGenerate("");
  }, [result, handleGenerate]);

  const handleCancel = useCallback(() => {
    cancelRef.current?.();
    setLoading(false);
    setCurrentStep(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Workspace */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-10 relative">
        {/* Ambient Background Glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full pointer-events-none z-0" />

        <div className="w-full max-w-4xl workspace-glass rounded-2xl p-6 md:p-10 flex flex-col gap-6 z-10 animate-in fade-in zoom-in-95 duration-700">
          {/* Brand Header */}
          <Header />

          {/* Editor Workspace + Chips + Button */}
          <PromptInput onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Pipeline Progress */}
        <div className="w-full max-w-4xl z-10 mt-6">
          <ProgressTimeline
            currentStep={currentStep}
            completedSteps={completedSteps}
            show={loading}
            stepTimings={stepTimings}
          />

          <AnimatePresence mode="wait">
            {loading && !result && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {result && result.error && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4"
              >
                <ErrorCard
                  message={result.error}
                  onRetry={() => handleGenerate("")}
                />
              </motion.div>
            )}

            {result && result.bestImageUrl && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4"
              >
                <ResultCard
                  result={result}
                  onImageClick={setLightbox}
                  totalTime={
                    startTime ? Date.now() - startTime : undefined
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl z-10 mt-4"
            >
              <ErrorCard
                message={error}
                onRetry={() => handleGenerate("")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <Lightbox
        src={lightbox || ""}
        alt="Full size image"
        open={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
