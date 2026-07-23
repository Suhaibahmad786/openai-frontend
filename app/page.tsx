"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ResultCard from "@/components/ResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorCard from "@/components/ErrorCard";
import Lightbox from "@/components/Lightbox";
import Footer from "@/components/Footer";
import { generateStream, proxyImageUrl, type GenerateResult, type SSEEvent } from "@/lib/api";

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
  const [lastPrompt, setLastPrompt] = useState<string>("");
  const [resetKey, setResetKey] = useState(0);
  const cancelRef = useRef<(() => void) | null>(null);

  const handleGenerate = useCallback((prompt: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    if (prompt) setLastPrompt(prompt);
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
            const r = event.result;
            r.bestImageUrl = proxyImageUrl(r.bestImageUrl);
            if (r.allCandidates) {
              r.allCandidates = r.allCandidates.map((c) => ({
                ...c,
                url: proxyImageUrl(c.url),
              }));
            }
            setResult(r);
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

  const handleNewDesign = useCallback(() => {
    setResult(null);
    setError(null);
    setCurrentStep(null);
    setCompletedSteps([]);
    setStepTimings([]);
    setLastPrompt("");
    setResetKey((k) => k + 1);
  }, []);

  const handleCancel = useCallback(() => {
    cancelRef.current?.();
    setLoading(false);
    setCurrentStep(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[400px] bg-secondary/[0.02] blur-[100px] rounded-full" />
      </div>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center p-5 md:p-8 relative z-10">
        <div className="w-full max-w-5xl flex flex-col gap-5">
          {/* Input Workspace */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="workspace-card rounded-2xl p-5 md:p-7"
          >
            <Header />
            <PromptInput
              onGenerate={handleGenerate}
              loading={loading}
              currentStep={currentStep}
              completedSteps={completedSteps}
              stepTimings={stepTimings}
              resetKey={resetKey}
            />
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {loading && !result && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingSkeleton />
              </motion.div>
            )}

            {result && result.error && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorCard
                  message={result.error}
                  onRetry={() => handleGenerate(lastPrompt)}
                />
              </motion.div>
            )}

            {result && result.bestImageUrl && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ResultCard
                  result={result}
                  onImageClick={setLightbox}
                  onRedesign={() => handleGenerate(lastPrompt)}
                  onNewDesign={handleNewDesign}
                  totalTime={
                    startTime ? Math.round((Date.now() - startTime) / 1000) : undefined
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Global Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <ErrorCard
                  message={error}
                  onRetry={() => handleGenerate(lastPrompt)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
