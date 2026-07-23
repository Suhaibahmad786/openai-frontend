"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  RefreshCw,
  Download,
  ChevronDown,
  Copy,
  Check as CheckIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import type { GenerateResult } from "@/lib/api";
import ScoreBreakdown from "./ScoreBreakdown";
import CandidateGrid from "./CandidateGrid";
import RetryImage from "./RetryImage";

interface Props {
  result: GenerateResult;
  onImageClick: (url: string) => void;
  onRedesign?: () => void;
  onNewDesign?: () => void;
  totalTime?: number;
}

export default function ResultCard({ result, onImageClick, onRedesign, onNewDesign, totalTime }: Props) {
  const [showAllPrompts, setShowAllPrompts] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);
  const [showPromptFull, setShowPromptFull] = useState(false);
  const [copied, setCopied] = useState(false);
  const hasRefinement = result.iterations && result.iterations > 1;

  const handleDownload = async (url: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `ai-studio-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(url, "_blank");
    }
  };

  const handleCopyPrompt = () => {
    const text = result.promptVariations?.[result.promptVariations.length - 1] || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#3b82f6";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="w-full space-y-4">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onRedesign && (
            <button
              onClick={onRedesign}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/15 text-blue-400/80 text-[11px] font-medium hover:bg-blue-500/15 hover:text-blue-300 transition-all duration-200"
            >
              <RefreshCw className="w-3 h-3" />
              Redesign
            </button>
          )}
          {onNewDesign && (
            <button
              onClick={onNewDesign}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 text-[11px] font-medium hover:bg-white/[0.06] hover:text-slate-300 transition-all duration-200"
            >
              <Zap className="w-3 h-3" />
              New Design
            </button>
          )}
        </div>
        {totalTime && (
          <span className="text-[10px] text-white/20 font-mono tabular-nums">
            {totalTime}s
          </span>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left — Image */}
        <div
          className="lg:col-span-3 relative group cursor-pointer"
          onClick={() => onImageClick(result.bestImageUrl)}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600/8 via-transparent to-cyan-500/8 rounded-[14px] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative result-image-card overflow-hidden">
            <div className="aspect-[4/3] relative">
              <RetryImage
                src={result.bestImageUrl}
                alt="Generated image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Score badge */}
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 backdrop-blur-xl border border-white/[0.06]">
                  <Trophy className="w-3 h-3" style={{ color: getScoreColor(result.score) }} />
                  <span className="text-[11px] font-bold tabular-nums" style={{ color: getScoreColor(result.score) }}>
                    {result.score}
                  </span>
                </div>
              </div>

              {hasRefinement && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/40 backdrop-blur-xl border border-white/[0.06]">
                    <RefreshCw className="w-2.5 h-2.5 text-cyan-400/70" />
                    <span className="text-[9px] text-white/40 font-medium">
                      {result.iterations! - 1}x refined
                    </span>
                  </div>
                </div>
              )}

              {/* Hover actions */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(result.bestImageUrl);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-black/40 backdrop-blur-xl border border-white/[0.06] text-white/80 text-[10px] font-medium hover:bg-black/60 hover:text-white transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Save
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageClick(result.bestImageUrl);
                  }}
                  className="px-2.5 py-1.5 rounded-md bg-white/[0.08] backdrop-blur-xl border border-white/[0.06] text-white/80 text-[10px] font-medium hover:bg-white/[0.12] hover:text-white transition-colors"
                >
                  Expand
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Details */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="ui-card p-4">
            <ScoreBreakdown breakdown={result.breakdown} total={result.score} />
          </div>

          <div className="ui-card p-4 flex-1">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-4 h-4 rounded bg-blue-500/10 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-blue-400/70" />
              </div>
              <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                AI Judge Reasoning
              </h3>
            </div>
            <motion.div
              animate={{ height: showReasoning ? "auto" : "2.8em" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[12px] text-slate-400 leading-relaxed">
                {result.reasoning}
              </p>
            </motion.div>
            {result.reasoning && result.reasoning.length > 120 && (
              <button
                onClick={() => setShowReasoning(!showReasoning)}
                className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-400 transition-colors font-medium mt-1.5"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    showReasoning ? "rotate-180" : ""
                  }`}
                />
                {showReasoning ? "Less" : "Read more"}
              </button>
            )}
          </div>

          <div className="ui-card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Prompt
              </h3>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-400 transition-colors font-medium"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3 h-3 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <motion.div
              animate={{ height: showPromptFull ? "auto" : "2.8em" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[12px] text-blue-300/70 font-medium leading-relaxed">
                {result.promptVariations?.[result.promptVariations.length - 1] || "—"}
              </p>
            </motion.div>
            {result.promptVariations?.[result.promptVariations.length - 1] &&
              result.promptVariations[result.promptVariations.length - 1].length > 80 && (
              <button
                onClick={() => setShowPromptFull(!showPromptFull)}
                className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-400 transition-colors font-medium mt-1.5"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    showPromptFull ? "rotate-180" : ""
                  }`}
                />
                {showPromptFull ? "Less" : "Read more"}
              </button>
            )}

            {result.intent && (
              <div className="flex flex-wrap gap-1 mt-2.5 pt-2.5 border-t border-white/[0.04]">
                {result.intent.subject && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/[0.06] text-blue-400/70 border border-blue-500/10 font-medium">
                    {result.intent.subject}
                  </span>
                )}
                {result.intent.style && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/[0.06] text-cyan-400/70 border border-cyan-500/10 font-medium">
                    {result.intent.style}
                  </span>
                )}
                {result.intent.mood && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/[0.06] text-amber-400/70 border border-amber-500/10 font-medium">
                    {result.intent.mood}
                  </span>
                )}
              </div>
            )}

            {result.promptVariations && result.promptVariations.length > 1 && (
              <div className="mt-2.5 pt-2.5 border-t border-white/[0.04]">
                <button
                  onClick={() => setShowAllPrompts(!showAllPrompts)}
                  className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-400 transition-colors font-medium"
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      showAllPrompts ? "rotate-180" : ""
                    }`}
                  />
                  {showAllPrompts ? "Hide" : "Show"} {result.promptVariations.length - 1} refined
                </button>
                {showAllPrompts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 space-y-2"
                  >
                    {result.promptVariations.slice(0, -1).map((p, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[9px] text-slate-600 font-bold mt-0.5 tabular-nums">
                          {i + 1}
                        </span>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {result.allCandidates && result.allCandidates.length > 1 && (
        <CandidateGrid
          candidates={result.allCandidates}
          bestImageUrl={result.bestImageUrl}
          onImageClick={onImageClick}
        />
      )}
    </div>
  );
}
