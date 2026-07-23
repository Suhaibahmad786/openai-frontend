"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Check } from "lucide-react";



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
      {/* Code Input Field */}
      <div className="code-input-field">
        {/* Inline Pipeline Progress */}
        {loading && (
          <InlineProgress currentStep={currentStep} completedSteps={completedSteps} stepTimings={stepTimings} />
        )}

        {/* Textarea Area */}
        <div className="px-5 py-4">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, max))}
            placeholder="Describe your architectural vision or artistic concept..."
            rows={2}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface font-body-md placeholder:text-on-surface-variant/30 resize-none h-20 md:h-24 leading-relaxed"
            disabled={loading}
          />

          <div className="flex justify-between items-end mt-3">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase opacity-40 mb-1">
                  Tokens
                </span>
                <span
                  className={`font-label-md text-[13px] ${
                    chars > 450 ? "text-error" : "text-on-surface-variant"
                  }`}
                >
                  {chars} / {max}
                </span>
              </div>

            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="material-symbols-outlined text-outline-variant hover:text-primary transition-colors cursor-pointer"
                title="Upload Image Reference"
                style={{ fontSize: "20px" }}
              >
                add_photo_alternate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!loading && !prompt.trim()}
          className="group bg-gradient-to-r from-primary/90 to-primary text-on-primary px-12 py-3.5 rounded-xl font-headline-md text-body-md action-button-glow transition-all active:scale-95 flex items-center gap-3 w-fit disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="text-on-primary animate-spin" style={{ fontSize: "20px" }} />
              Generating...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-on-primary group-hover:rotate-12 transition-transform" style={{ fontSize: "20px" }}>
                bolt
              </span>
              Generate Vision
            </>
          )}
        </button>
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
  const progress = (doneCount / STEP_KEYS.length) * 100;

  return (
    <div className="px-4 pt-3 pb-2 border-b border-white/5">
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {STEP_KEYS.map((key) => {
          const isDone = completedSteps?.includes(key);
          const isActive = currentStep === key;
          return (
            <div key={key} className="flex items-center gap-1.5 shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500/15 text-emerald-400"
                    : isActive
                    ? "bg-violet-500/15 text-violet-400 animate-pulse"
                    : "bg-white/5 text-[#33364a]"
                }`}
              >
                {isDone ? (
                  <Check className="w-3 h-3" strokeWidth={3} />
                ) : (
                  STEP_KEYS.indexOf(key) + 1
                )}
              </div>
              {STEP_KEYS.indexOf(key) < STEP_KEYS.length - 1 && (
                <div
                  className={`w-3 h-px transition-colors duration-300 ${
                    isDone ? "bg-emerald-500/30" : "bg-white/5"
                  }`}
                />
              )}
            </div>
          );
        })}
        <span className="ml-2 text-[10px] text-on-surface-variant/40 font-medium tabular-nums shrink-0">
          {doneCount}/{STEP_KEYS.length}
        </span>
      </div>
    </div>
  );
}
