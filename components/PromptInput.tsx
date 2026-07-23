"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, ArrowUp } from "lucide-react";

const STEP_KEYS = [
  "intent_analyzer",
  "prompt_expander",
  "image_generator",
  "vision_judge",
  "selector",
];

interface StepTiming {
  node: string;
  startTime: number;
  endTime?: number;
}

interface Props {
  onGenerate: (prompt: string) => void;
  loading: boolean;
  currentStep?: string | null;
  completedSteps?: string[];
  stepTimings?: StepTiming[];
  resetKey?: number;
}

export default function PromptInput({ onGenerate, loading, currentStep, completedSteps, stepTimings, resetKey }: Props) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const max = 500;
  const chars = prompt.length;

  useEffect(() => {
    setPrompt("");
    textareaRef.current?.focus();
  }, [resetKey]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (prompt.trim() && !loading) onGenerate(prompt.trim());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prompt, loading, onGenerate]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (prompt.trim() && !loading) onGenerate(prompt.trim());
  };

  return (
    <>
      <div className="code-input-field">
        {loading && (
          <InlineProgress currentStep={currentStep} completedSteps={completedSteps} stepTimings={stepTimings} />
        )}

        <div className="px-4 py-3">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, max))}
            placeholder="Describe your vision..."
            rows={2}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface text-[14px] placeholder:text-on-surface-variant/25 resize-none h-16 md:h-20 leading-relaxed"
            disabled={loading}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-1 w-16 bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(chars / max) * 100}%`,
                    backgroundColor: chars > 450 ? "#ef4444" : chars > 300 ? "#f59e0b" : "rgba(59,130,246,0.3)",
                  }}
                />
              </div>
              <span
                className={`text-[10px] font-mono tabular-nums ${
                  chars > 450 ? "text-red-400" : chars > 300 ? "text-amber-400/60" : "text-on-surface-variant/30"
                }`}
              >
                {chars}/{max}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-500 active:scale-90"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function InlineProgress({
  currentStep,
  completedSteps,
  stepTimings,
}: {
  currentStep?: string | null;
  completedSteps?: string[];
  stepTimings?: StepTiming[];
}) {
  const doneCount = STEP_KEYS.filter((k) => completedSteps?.includes(k)).length;

  return (
    <div className="px-4 pt-3 pb-2 border-b border-white/[0.04]">
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {STEP_KEYS.map((key, i) => {
          const isDone = completedSteps?.includes(key);
          const isActive = currentStep === key;
          return (
            <div key={key} className="flex items-center gap-1.5 shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500/15 text-emerald-400"
                    : isActive
                    ? "bg-blue-500/15 text-blue-400 animate-pulse"
                    : "bg-white/[0.04] text-white/20"
                }`}
              >
                {isDone ? (
                  <span className="text-[10px]">&#10003;</span>
                ) : (
                  i + 1
                )}
              </div>
              {i < STEP_KEYS.length - 1 && (
                <div
                  className={`w-3 h-px transition-colors duration-300 ${
                    isDone ? "bg-emerald-500/30" : "bg-white/[0.04]"
                  }`}
                />
              )}
            </div>
          );
        })}
        <span className="ml-2 text-[9px] text-on-surface-variant/30 font-mono tabular-nums shrink-0">
          {doneCount}/{STEP_KEYS.length}
        </span>
      </div>
    </div>
  );
}
