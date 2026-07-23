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
    gradient: "from-blue-500 to-blue-400",
  },
  {
    key: "aesthetics",
    label: "Aesthetics",
    color: "#22d3ee",
    gradient: "from-cyan-500 to-cyan-400",
  },
  {
    key: "lighting",
    label: "Lighting",
    color: "#f59e0b",
    gradient: "from-amber-500 to-amber-400",
  },
  {
    key: "creativity",
    label: "Creativity",
    color: "#14b8a6",
    gradient: "from-teal-500 to-teal-400",
  },
];

export default function ScoreBreakdown({ breakdown, total }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#3b82f6";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          Quality
        </h3>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="flex items-baseline gap-0.5"
        >
          <span
            className="text-2xl font-bold tabular-nums tracking-tight"
            style={{ color: getScoreColor(total) }}
          >
            {total}
          </span>
          <span className="text-[10px] text-slate-600 font-medium">/100</span>
        </motion.div>
      </div>

      <div className="space-y-2.5">
        {breakdown &&
          SCORES.map((score, i) => {
            const value = (breakdown as Record<string, number>)[score.key] || 0;
            return (
              <motion.div
                key={score.key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                className="space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {score.label}
                  </span>
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: score.color }}
                  >
                    {value}
                    <span className="text-[8px] font-medium opacity-40">
                      /25
                    </span>
                  </span>
                </div>
                <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 25) * 100}%` }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.05 + 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${score.gradient}`}
                  />
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
