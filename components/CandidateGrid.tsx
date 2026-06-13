"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { Candidate } from "@/lib/api";

interface Props {
  candidates: Candidate[];
  bestImageUrl: string;
}

export default function CandidateGrid({ candidates, bestImageUrl }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
        All Candidates
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {candidates.map((candidate, i) => {
          const isWinner = candidate.url === bestImageUrl;
          return (
            <motion.div
              key={candidate.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`relative group rounded-lg overflow-hidden border ${
                isWinner
                  ? "border-accent-500/50 ring-1 ring-accent-500/30"
                  : "border-surface-700/50"
              }`}
            >
              <div className="aspect-square bg-surface-900">
                <img
                  src={candidate.url}
                  alt={`Candidate ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between transform translate-y-full group-hover:translate-y-0 transition-transform">
                <span className="text-xs font-medium text-white">{candidate.total}/100</span>
                {isWinner && (
                  <span className="flex items-center gap-1 text-xs text-accent-300">
                    <Trophy className="w-3 h-3" /> Winner
                  </span>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    isWinner
                      ? "bg-accent-500/20 text-accent-300 border border-accent-500/30"
                      : "bg-surface-800/80 text-surface-400 border border-surface-700/50"
                  }`}
                >
                  {candidate.total}
                </span>
              </div>
              {isWinner && (
                <div className="absolute top-2 left-2">
                  <Trophy className="w-4 h-4 text-accent-400" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
