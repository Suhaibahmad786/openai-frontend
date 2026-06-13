"use client";

import { motion } from "framer-motion";
import { Trophy, RefreshCw, Quote } from "lucide-react";
import type { GenerateResult } from "@/lib/api";
import ScoreBreakdown from "./ScoreBreakdown";
import CandidateGrid from "./CandidateGrid";

interface Props {
  result: GenerateResult;
}

export default function ResultCard({ result }: Props) {
  const hasRefinement = result.iterations && result.iterations > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Winner hero */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-accent-600/20 via-accent-400/10 to-cyan-500/20 rounded-3xl blur-2xl" />
        <div className="relative bg-surface-950/90 border border-surface-700/50 rounded-2xl overflow-hidden glow-accent">
          <div className="aspect-[4/3] sm:aspect-[16/9] relative">
            <img
              src={result.bestImageUrl}
              alt="Best generated image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-accent-500/30">
              <Trophy className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-semibold text-accent-300">
                Best Result — {result.score}/100
              </span>
            </div>
            {hasRefinement && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-cyan-500/30">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs text-cyan-300">
                  Refined {result.iterations - 1} time{result.iterations > 2 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score breakdown */}
        <div className="lg:col-span-1">
          <div className="bg-surface-950/80 border border-surface-700/50 rounded-xl p-5">
            <ScoreBreakdown
              breakdown={result.breakdown}
              total={result.score}
            />
          </div>
        </div>

        {/* Reasoning + prompt info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface-950/80 border border-surface-700/50 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-2">
                  AI Judge&apos;s Reasoning
                </h3>
                <p className="text-surface-400 text-sm leading-relaxed">
                  {result.reasoning}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface-950/80 border border-surface-700/50 rounded-xl p-5">
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
                  Original Prompt
                </h4>
                <p className="text-sm text-surface-300">
                  {result.promptVariations?.length > 0 ? result.promptVariations[0] : "—"}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">
                  Final Optimized Prompt
                </h4>
                <p className="text-sm text-accent-300">
                  {result.promptVariations?.[result.promptVariations.length - 1] || "—"}
                </p>
              </div>
              {result.intent && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.intent.subject && (
                    <span className="text-xs px-2 py-1 rounded-md bg-accent-500/10 text-accent-400 border border-accent-500/20">
                      {result.intent.subject}
                    </span>
                  )}
                  {result.intent.style && (
                    <span className="text-xs px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {result.intent.style}
                    </span>
                  )}
                  {result.intent.mood && (
                    <span className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {result.intent.mood}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate grid */}
      {result.allCandidates && result.allCandidates.length > 1 && (
        <CandidateGrid
          candidates={result.allCandidates}
          bestImageUrl={result.bestImageUrl}
        />
      )}
    </motion.div>
  );
}
