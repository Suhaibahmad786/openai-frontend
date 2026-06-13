"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ProgressTimeline from "@/components/ProgressTimeline";
import ResultCard from "@/components/ResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { generateImage, type GenerateResult } from "@/lib/api";

const STEPS = [
  "intent_analyzer",
  "prompt_expander",
  "image_generator",
  "vision_judge",
  "selector",
];

const STEP_DURATION_MS = [3000, 2500, 8000, 5000, 1500];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const simulateProgress = useCallback(async () => {
    setCurrentStep(null);
    setCompletedSteps([]);
    setResult(null);
    setError(null);

    for (let i = 0; i < STEPS.length; i++) {
      setCurrentStep(STEPS[i]);
      await new Promise((r) => setTimeout(r, STEP_DURATION_MS[i]));
      setCompletedSteps((prev) => [...prev, STEPS[i]]);
      setCurrentStep(null);
    }
  }, []);

  const handleGenerate = useCallback(
    async (prompt: string) => {
      setLoading(true);
      setResult(null);
      setError(null);

      const progressPromise = simulateProgress();
      const apiPromise = generateImage(prompt);

      try {
        const data = await apiPromise;
        await progressPromise;

        if (data.iterations && data.iterations > 1) {
          setCompletedSteps((prev) => [...prev, "critique_loop"]);
        }

        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Generation failed");
        setCompletedSteps([]);
        setCurrentStep(null);
      } finally {
        setLoading(false);
      }
    },
    [simulateProgress]
  );

  return (
    <main className="min-h-screen bg-surface-950 bg-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Header />

        <div className="mt-6 sm:mt-10">
          <PromptInput onGenerate={handleGenerate} loading={loading} />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 max-w-3xl mx-auto"
            >
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-5 py-4">
                <p className="text-rose-400 text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <ProgressTimeline
          currentStep={currentStep}
          completedSteps={completedSteps}
          show={loading}
        />

        <AnimatePresence mode="wait">
          {loading && !result && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {result && result.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 max-w-3xl mx-auto"
            >
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl px-5 py-4">
                <p className="text-rose-400 text-sm">{result.error}</p>
              </div>
            </motion.div>
          )}

          {result && result.bestImageUrl && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <ResultCard result={result} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <p className="text-xs text-surface-600">
            Powered by{" "}
            <span className="text-surface-500">LangGraphJS</span>
            {" + "}
            <span className="text-surface-500">Flux</span>
            {" + "}
            <span className="text-surface-500">GPT-4o-mini</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
