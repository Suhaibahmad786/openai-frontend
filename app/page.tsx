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
  const [lastPrompt, setLastPrompt] = useState("");
  const cancelRef = useRef<(() => void) | null>(null);

  const handleGenerate = useCallback((prompt: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    setCurrentStep(null);
    setCompletedSteps([]);
    setStepTimings([]);
    setLastPrompt(prompt);

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
    if (lastPrompt) handleGenerate(lastPrompt);
  }, [lastPrompt, handleGenerate]);

  const handleCancel = useCallback(() => {
    cancelRef.current?.();
    setLoading(false);
    setCurrentStep(null);
  }, []);

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Header />

        <div className="mt-6 sm:mt-8">
          <PromptInput onGenerate={handleGenerate} loading={loading} />
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 text-center"
            >
              <button
                onClick={handleCancel}
                className="text-[12px] text-[#3d4059] hover:text-[#6b7094] transition-colors font-medium"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <ErrorCard message={error} onRetry={handleRetry} />
            </motion.div>
          )}
        </AnimatePresence>

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
              className="mt-8"
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {result && result.error && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <ErrorCard message={result.error} onRetry={handleRetry} />
            </motion.div>
          )}

          {result && result.bestImageUrl && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <ResultCard result={result} onImageClick={setLightbox} />
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-24 pb-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2a2d40] font-medium">
            <span>Built by</span>
            <span className="text-[#4a4e63]">Sohaib Ahmad</span>
            <span>with</span>
            <span className="text-[#4a4e63]">LangGraphJS</span>
            <span>+</span>
            <span className="text-[#4a4e63]">FLUX</span>
          </div>
        </footer>
      </div>

      <Lightbox
        src={lightbox || ""}
        alt="Full size image"
        open={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </main>
  );
}
