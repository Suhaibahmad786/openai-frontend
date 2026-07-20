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
    color: "#a78bfa",
    gradient: "from-violet-500 to-violet-400",
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
    color: "#fbbf24",
    gradient: "from-amber-500 to-amber-400",
  },
  {
    key: "creativity",
    label: "Creativity",
    color: "#fb7185",
    gradient: "from-rose-500 to-rose-400",
  },
];

export default function ScoreBreakdown({ breakdown, total }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#34d399";
    if (score >= 60) return "#a78bfa";
    if (score >= 40) return "#fbbf24";
    return "#fb7185";
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-semibold text-[#4a4e63] uppercase tracking-widest">
          Quality
        </h3>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="flex items-baseline gap-0.5"
        >
          <span
            className="text-4xl font-bold tabular-nums tracking-tight"
            style={{ color: getScoreColor(total) }}
          >
            {total}
          </span>
          <span className="text-[13px] text-[#3d4059] font-medium">/100</span>
        </motion.div>
      </div>

      <div className="space-y-3.5">
        {breakdown &&
          SCORES.map((score, i) => {
            const value = (breakdown as Record<string, number>)[score.key] || 0;
            return (
              <motion.div
                key={score.key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 + 0.1, duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-[#6b7094] font-medium">
                    {score.label}
                  </span>
                  <span
                    className="text-[12px] font-bold tabular-nums"
                    style={{ color: score.color }}
                  >
                    {value}
                    <span className="text-[10px] font-medium opacity-50">
                      /25
                    </span>
                  </span>
                </div>
                <div className="h-[3px] bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 25) * 100}%` }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.06 + 0.2,
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
