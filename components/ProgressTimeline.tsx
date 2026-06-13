"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Circle } from "lucide-react";

const STEPS = [
  { key: "intent_analyzer", label: "Analyzing Intent" },
  { key: "prompt_expander", label: "Expanding Prompts" },
  { key: "image_generator", label: "Generating Images" },
  { key: "vision_judge", label: "AI Judging" },
  { key: "selector", label: "Selecting Best" },
  { key: "critique_loop", label: "Refining (if needed)" },
];

interface Props {
  currentStep: string | null;
  completedSteps: string[];
  show: boolean;
}

export default function ProgressTimeline({ currentStep, completedSteps, show }: Props) {
  if (!show) return null;

  const isCritiquing = currentStep === "critique_loop" || completedSteps.includes("critique_loop");

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="relative">
        <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-surface-800" />
        <div
          className="absolute left-[19px] top-3 w-0.5 bg-gradient-to-b from-accent-500 to-cyan-500 transition-all duration-700"
          style={{
            height: `${(completedSteps.length / (isCritiquing ? STEPS.length : STEPS.length - 1)) * 100}%`,
          }}
        />

        <div className="space-y-0">
          {STEPS.map((step, i) => {
            const isActive = currentStep === step.key;
            const isDone = completedSteps.includes(step.key);
            const isPending = !isActive && !isDone;

            if (step.key === "critique_loop" && !isCritiquing && !isActive && !isDone) {
              return null;
            }

            let lineHeight = "0%";
            if (isDone) lineHeight = "100%";
            else if (isActive) lineHeight = "50%";

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 py-3"
              >
                <div className="relative flex-shrink-0">
                  {isDone ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-9 h-9 text-accent-400" />
                    </motion.div>
                  ) : isActive ? (
                    <div className="w-9 h-9 rounded-full bg-accent-500/20 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-accent-400 animate-spin" />
                    </div>
                  ) : (
                    <Circle className="w-9 h-9 text-surface-700" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      isDone
                        ? "text-surface-200"
                        : isActive
                        ? "text-accent-300"
                        : "text-surface-600"
                    }`}
                  >
                    {step.label}
                  </p>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-surface-500 mt-0.5"
                    >
                      Processing...
                    </motion.p>
                  )}
                </div>

                {isDone && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-accent-500 font-medium"
                  >
                    Done
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
