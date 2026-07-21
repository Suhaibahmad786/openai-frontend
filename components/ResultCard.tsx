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
} from "lucide-react";
import type { GenerateResult } from "@/lib/api";
import ScoreBreakdown from "./ScoreBreakdown";
import CandidateGrid from "./CandidateGrid";
import RetryImage from "./RetryImage";

interface Props {
  result: GenerateResult;
  onImageClick: (url: string) => void;
  totalTime?: number;
}

export default function ResultCard({ result, onImageClick, totalTime }: Props) {
  const [showDetails, setShowDetails] = useState(false);
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
      className="w-full max-w-4xl mx-auto space-y-5"
    >
      {/* Hero image */}
      <div className="relative group cursor-pointer" onClick={() => onImageClick(result.bestImageUrl)}>
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/10 via-indigo-500/5 to-cyan-500/10 rounded-[24px] blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="relative ui-card-glow overflow-hidden">
          <div className="aspect-[4/3] sm:aspect-[16/9] relative">
            <RetryImage
              src={result.bestImageUrl}
              alt="Generated image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/50 backdrop-blur-xl border border-white/[0.06]">
                <Trophy className="w-3.5 h-3.5" style={{ color: getScoreColor(result.score) }} />
                <span className="text-[13px] font-bold" style={{ color: getScoreColor(result.score) }}>
                  {result.score}
                </span>
                <span className="text-[11px] text-white/40 font-medium">/100</span>
              </div>
              {hasRefinement && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/50 backdrop-blur-xl border border-white/[0.06]">
                  <RefreshCw className="w-3 h-3 text-cyan-400" />
                  <span className="text-[11px] text-white/60 font-medium">
                    Refined {result.iterations - 1}x
                  </span>
                </div>
              )}
            </div>

            {/* Bottom action bar */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(result.bestImageUrl);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/50 backdrop-blur-xl border border-white/[0.06] text-white text-[12px] font-medium hover:bg-black/70 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(result.bestImageUrl);
                }}
                className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/[0.08] text-white text-[12px] font-medium hover:bg-white/15 transition-colors"
              >
                Expand
              </button>
            </div>

            {/* Click hint */}
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="text-[11px] text-white/30 font-medium">Click to expand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Scores */}
        <div className="ui-card p-5">
          <ScoreBreakdown breakdown={result.breakdown} total={result.score} />
        </div>

        {/* Reasoning + Prompts */}
        <div className="lg:col-span-2 space-y-4">
          <div className="ui-card p-5">
            <h3 className="text-[11px] font-semibold text-[#4a4e63] uppercase tracking-widest mb-3">
              AI Judge Reasoning
            </h3>
            <p className="text-[13px] text-[#8b8fa3] leading-relaxed">
              {result.reasoning}
            </p>
          </div>

          <div className="ui-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[11px] font-semibold text-[#4a4e63] uppercase tracking-widest">
                Prompts
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

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-left"
            >
              <p className="text-[13px] text-[#c4b5fd] font-medium truncate pr-4">
                {result.promptVariations?.[result.promptVariations.length - 1] || "—"}
              </p>
              <ChevronDown
                className={`w-4 h-4 text-[#4a4e63] flex-shrink-0 transition-transform duration-200 ${
                  showDetails ? "rotate-180" : ""
                }`}
              />
            </button>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 pt-3 border-t border-white/[0.04] space-y-3"
              >
                <div>
                  <h4 className="text-[10px] font-semibold text-[#3d4059] uppercase tracking-widest mb-1">
                    Original
                  </h4>
                  <p className="text-[12px] text-[#6b7094]">
                    {result.promptVariations?.[0] || "—"}
                  </p>
                </div>
                {result.intent && (
                  <div className="flex flex-wrap gap-1.5">
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
              </motion.div>
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
