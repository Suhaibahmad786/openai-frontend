"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { Candidate } from "@/lib/api";
import RetryImage from "./RetryImage";

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
    <div className="space-y-3">
      <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
        All Candidates ({candidates.length})
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2">
        {candidates.map((candidate, i) => {
          const isWinner = candidate.url === bestImageUrl;
          return (
            <motion.div
              key={`${candidate.url}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              onClick={() => onImageClick(candidate.url)}
              className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                isWinner
                  ? "ring-1 ring-blue-500/25"
                  : "ui-card hover:border-white/[0.08]"
              }`}
            >
              <div className="aspect-square bg-[#080c18]">
                <RetryImage
                  src={candidate.url}
                  alt={`Candidate ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              <div className="absolute top-1.5 right-1.5">
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-md tabular-nums ${
                    isWinner
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/15"
                      : "bg-black/30 text-white/30 border border-white/[0.05]"
                  }`}
                >
                  {candidate.total}
                </span>
              </div>

              {isWinner && (
                <div className="absolute top-1.5 left-1.5">
                  <div className="w-4 h-4 rounded bg-blue-500/20 backdrop-blur-md flex items-center justify-center border border-blue-500/15">
                    <Trophy className="w-2 h-2 text-blue-400" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-1.5 flex items-center justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                <span className="text-[9px] font-bold text-white tabular-nums">
                  {candidate.total}/100
                </span>
                {isWinner && (
                  <span className="text-[8px] font-bold text-blue-300 uppercase tracking-wider">
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
