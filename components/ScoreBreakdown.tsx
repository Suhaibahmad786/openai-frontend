"use client";

import { motion } from "framer-motion";

interface ScoreData {
  adherence?: number;
  aesthetics?: number;
  lighting?: number;
  creativity?: number;
}

interface Props {
  breakdown?: ScoreData | null;
  total: number;
}

const SCORES = [
  {
    key: "adherence",
    label: "Adherence",
    color: "#60a5fa",
    bg: "bg-blue-500/[0.06]",
  },
  {
    key: "aesthetics",
    label: "Aesthetics",
    color: "#22d3ee",
    bg: "bg-cyan-500/[0.06]",
  },
  {
    key: "lighting",
    label: "Lighting",
    color: "#f59e0b",
    bg: "bg-amber-500/[0.06]",
  },
  {
    key: "creativity",
    label: "Creativity",
    color: "#14b8a6",
    bg: "bg-teal-500/[0.06]",
  },
];

export default function ScoreBreakdown({ breakdown, total }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#3b82f6";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Poor";
  };

  const circumference = 2 * Math.PI * 32;
  const offset = circumference - (total / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Score hero */}
      <div className="flex items-center gap-4">
        {/* Ring gauge */}
        <div className="relative w-[72px] h-[72px] flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
            <circle
              cx="36"
              cy="36"
              r="32"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="4"
            />
            <motion.circle
              cx="36"
              cy="36"
              r="32"
              fill="none"
              stroke={getScoreColor(total)}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-[18px] font-bold tabular-nums leading-none"
              style={{ color: getScoreColor(total) }}
            >
              {total}
            </span>
          </div>
        </div>

        {/* Score info */}
        <div className="flex flex-col gap-0.5">
          <span
            className="text-[18px] font-semibold"
            style={{ color: getScoreColor(total) }}
          >
            {getScoreLabel(total)}
          </span>
          <span className="text-[13px] text-white font-medium">
            out of 100
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2">
        {breakdown &&
          SCORES.map((score, i) => {
            const value = (breakdown as Record<string, number>)[score.key] || 0;
            return (
              <motion.div
                key={score.key}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.3, duration: 0.3 }}
                className="flex items-center gap-3"
              >
                {/* Dot indicator */}
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: score.color }}
                />

                {/* Label */}
                <span className="text-[10px] text-slate-400/70 font-medium w-16 flex-shrink-0">
                  {score.label}
                </span>

                {/* Bar */}
                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 25) * 100}%` }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.06 + 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: score.color }}
                  />
                </div>

                {/* Value */}
                <span
                  className="text-[10px] font-bold tabular-nums w-6 text-right flex-shrink-0"
                  style={{ color: score.color }}
                >
                  {value}
                </span>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
