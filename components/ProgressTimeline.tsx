"use client";

import { motion } from "framer-motion";
import { Check, Loader2, Bot, Wand2, Image, Eye, Trophy, RefreshCw } from "lucide-react";

const STEPS = [
  { key: "intent_analyzer", label: "Analyzing Intent", icon: Bot },
  { key: "prompt_expander", label: "Expanding Prompts", icon: Wand2 },
  { key: "image_generator", label: "Generating Images", icon: Image },
  { key: "vision_judge", label: "AI Judging", icon: Eye },
  { key: "selector", label: "Selecting Best", icon: Trophy },
  { key: "critique_loop", label: "Refining", icon: RefreshCw },
];

interface StepTiming {
  node: string;
  startTime: number;
  endTime?: number;
}

interface Props {
  currentStep: string | null;
  completedSteps: string[];
  show: boolean;
  stepTimings?: StepTiming[];
}

export default function ProgressTimeline({
  currentStep,
  completedSteps,
  show,
  stepTimings,
}: Props) {
  if (!show) return null;

  const isCritiquing =
    currentStep === "critique_loop" || completedSteps.includes("critique_loop");

  const visibleSteps = STEPS.filter(
    (s) =>
      s.key !== "critique_loop" ||
      isCritiquing ||
      currentStep === "critique_loop"
  );

  const doneCount = visibleSteps.filter((s) =>
    completedSteps.includes(s.key)
  ).length;
  const progress = (doneCount / visibleSteps.length) * 100;

  const getDuration = (nodeKey: string) => {
    const timing = stepTimings?.find((t) => t.node === nodeKey);
    if (!timing) return null;
    const end = timing.endTime || Date.now();
    const ms = end - timing.startTime;
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="ui-card p-5">
        <div className="progress-bar-track mb-5">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="space-y-1">
          {visibleSteps.map((step, i) => {
            const isActive = currentStep === step.key;
            const isDone = completedSteps.includes(step.key);
            const Icon = step.icon;
            const duration = getDuration(step.key);

            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors duration-300"
                style={{
                  background: isActive
                    ? "rgba(139, 92, 246, 0.04)"
                    : "transparent",
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300">
                  {isDone ? (
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"
                    >
                      <Check
                        className="w-4 h-4 text-emerald-400"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                  ) : isActive ? (
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#33364a]" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <p
                    className={`text-[13px] font-medium transition-colors duration-300 ${
                      isDone
                        ? "text-[#8b8fa3]"
                        : isActive
                        ? "text-[#c4b5fd]"
                        : "text-[#33364a]"
                    }`}
                  >
                    {step.label}
                  </p>

                  <div className="flex items-center gap-2">
                    {duration && (
                      <span className="text-[11px] text-[#3d4059] tabular-nums font-medium">
                        {duration}
                      </span>
                    )}
                    {isDone && (
                      <span className="text-[10px] text-emerald-500/70 font-semibold uppercase tracking-wider">
                        done
                      </span>
                    )}
                    {isActive && (
                      <span className="text-[10px] text-violet-400/70 font-semibold uppercase tracking-wider">
                        running
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
