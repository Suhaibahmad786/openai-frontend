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
    if (score >= 80) return "#34d399";
    if (score >= 60) return "#a78bfa";
    if (score >= 40) return "#fbbf24";
    return "#fb7185";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-6xl mx-auto space-y-5"
    >
      {/* Action buttons — top */}
      <div className="flex items-center justify-center gap-3">
        {onRedesign && (
          <button
            onClick={onRedesign}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500/15 border border-violet-500/20 text-violet-300 text-[12px] font-semibold hover:bg-violet-500/25 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Redesign
          </button>
        )}
        {onNewDesign && (
          <button
            onClick={onNewDesign}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/[0.06] text-[#8b8fa3] text-[12px] font-semibold hover:bg-white/10 hover:text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start New Design
          </button>
        )}
      </div>

      {/* Two-column hero */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left — Image (3/5 width) */}
        <div
          className="lg:col-span-3 relative group cursor-pointer"
          onClick={() => onImageClick(result.bestImageUrl)}
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/10 via-indigo-500/5 to-cyan-500/10 rounded-[20px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          <div className="relative ui-card-glow overflow-hidden">
            <div className="aspect-square relative">
              <RetryImage
                src={result.bestImageUrl}
                alt="Generated image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Top badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/50 backdrop-blur-xl border border-white/[0.06]">
                  <Trophy className="w-3 h-3" style={{ color: getScoreColor(result.score) }} />
                  <span className="text-[12px] font-bold tabular-nums" style={{ color: getScoreColor(result.score) }}>
                    {result.score}
                  </span>
                  <span className="text-[10px] text-white/30 font-medium">/100</span>
                </div>
                {hasRefinement && (
                  <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-black/50 backdrop-blur-xl border border-white/[0.06]">
                    <RefreshCw className="w-2.5 h-2.5 text-cyan-400" />
                    <span className="text-[10px] text-white/50 font-medium">
                      Refined {result.iterations! - 1}x
                    </span>
                  </div>
                )}
                {totalTime && (
                  <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-black/50 backdrop-blur-xl border border-white/[0.06]">
                    <span className="text-[10px] text-white/40 font-medium">{totalTime}s</span>
                  </div>
                )}
              </div>

              {/* Hover actions */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(result.bestImageUrl);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-xl border border-white/[0.06] text-white text-[11px] font-medium hover:bg-black/70 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageClick(result.bestImageUrl);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/[0.08] text-white text-[11px] font-medium hover:bg-white/15 transition-colors"
                >
                  Expand
                </button>
              </div>

              {/* Click hint */}
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] text-white/25 font-medium">Click to expand</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Score + Reasoning + Prompts (2/5 width) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Score */}
          <div className="ui-card p-5">
            <ScoreBreakdown breakdown={result.breakdown} total={result.score} />
          </div>

          {/* AI Judge Reasoning */}
          <div className="ui-card p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-md bg-violet-500/10 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-violet-400" />
              </div>
              <h3 className="text-[11px] font-semibold text-[#4a4e63] uppercase tracking-widest">
                AI Judge Reasoning
              </h3>
            </div>
            <motion.div
              animate={{ height: showReasoning ? "auto" : "3em" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[13px] text-[#8b8fa3] leading-relaxed">
                {result.reasoning}
              </p>
            </motion.div>
            {result.reasoning && result.reasoning.length > 120 && (
              <button
                onClick={() => setShowReasoning(!showReasoning)}
                className="flex items-center gap-1.5 text-[11px] text-[#4a4e63] hover:text-[#8b8fa3] transition-colors font-medium mt-2"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    showReasoning ? "rotate-180" : ""
                  }`}
                />
                {showReasoning ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {/* Prompts */}
          <div className="ui-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-semibold text-[#4a4e63] uppercase tracking-widest">
                Prompt
              </h3>
              <button
                onClick={handleCopyPrompt}
                className="flex items-center gap-1 text-[11px] text-[#4a4e63] hover:text-[#8b8fa3] transition-colors font-medium"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3 h-3 text-emerald-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy final
                  </>
                )}
              </button>
            </div>

            <motion.div
              animate={{ height: showPromptFull ? "auto" : "3em" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[13px] text-[#c4b5fd] font-medium leading-relaxed">
                {result.promptVariations?.[result.promptVariations.length - 1] || "—"}
              </p>
            </motion.div>
            {result.promptVariations?.[result.promptVariations.length - 1] &&
              result.promptVariations[result.promptVariations.length - 1].length > 80 && (
              <button
                onClick={() => setShowPromptFull(!showPromptFull)}
                className="flex items-center gap-1.5 text-[11px] text-[#4a4e63] hover:text-[#8b8fa3] transition-colors font-medium mt-2"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    showPromptFull ? "rotate-180" : ""
                  }`}
                />
                {showPromptFull ? "Show less" : "Read more"}
              </button>
            )}

            {/* Intent tags */}
            {result.intent && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
                {result.intent.subject && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-violet-500/8 text-violet-400 border border-violet-500/10 font-medium">
                    {result.intent.subject}
                  </span>
                )}
                {result.intent.style && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/8 text-cyan-400 border border-cyan-500/10 font-medium">
                    {result.intent.style}
                  </span>
                )}
                {result.intent.mood && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/8 text-amber-400 border border-amber-500/10 font-medium">
                    {result.intent.mood}
                  </span>
                )}
              </div>
            )}

            {/* Prompt history toggle */}
            {result.promptVariations && result.promptVariations.length > 1 && (
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <button
                  onClick={() => setShowAllPrompts(!showAllPrompts)}
                  className="flex items-center gap-1.5 text-[11px] text-[#4a4e63] hover:text-[#8b8fa3] transition-colors font-medium"
                >
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      showAllPrompts ? "rotate-180" : ""
                    }`}
                  />
                  {showAllPrompts ? "Hide" : "Show"} {result.promptVariations.length - 1} refined prompts
                </button>
                {showAllPrompts && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 space-y-2"
                  >
                    {result.promptVariations.slice(0, -1).map((p, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[10px] text-[#3d4059] font-bold mt-0.5 tabular-nums">
                          {i + 1}
                        </span>
                        <p className="text-[12px] text-[#6b7094] leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Candidates */}
      {result.allCandidates && result.allCandidates.length > 1 && (
        <CandidateGrid
          candidates={result.allCandidates}
          bestImageUrl={result.bestImageUrl}
          onImageClick={onImageClick}
        />
      )}
    </motion.div>
  );
}
