"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { Candidate } from "@/lib/api";

interface Props {
  candidates: Candidate[];
  bestImageUrl: string;
  onImageClick: (url: string) => void;
}

export default function CandidateGrid({
  candidates,
  bestImageUrl,
  onImageClick,
}: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-[11px] font-semibold text-[#4a4e63] uppercase tracking-widest">
        All Candidates ({candidates.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {candidates.map((candidate, i) => {
          const isWinner = candidate.url === bestImageUrl;
          return (
            <motion.div
              key={`${candidate.url}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              onClick={() => onImageClick(candidate.url)}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                isWinner
                  ? "ring-2 ring-violet-500/30"
                  : "ui-card hover:border-white/[0.08]"
              }`}
            >
              <div className="aspect-square bg-[#0a0b10]">
                <img
                  src={candidate.url}
                  alt={`Candidate ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Score badge */}
              <div className="absolute top-2 right-2">
                <span
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg backdrop-blur-md tabular-nums ${
                    isWinner
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/20"
                      : "bg-black/40 text-white/50 border border-white/[0.06]"
                  }`}
                >
                  {candidate.total}
                </span>
              </div>

              {/* Winner crown */}
              {isWinner && (
                <div className="absolute top-2 left-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-500/20 backdrop-blur-md flex items-center justify-center border border-violet-500/20">
                    <Trophy className="w-3 h-3 text-violet-400" />
                  </div>
                </div>
              )}

              {/* Bottom info on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-2.5 flex items-center justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] font-bold text-white tabular-nums">
                  {candidate.total}/100
                </span>
                {isWinner && (
                  <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">
                    Best
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
