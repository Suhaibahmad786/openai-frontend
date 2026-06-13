"use client";

import { motion } from "framer-motion";

interface Props {
  breakdown?: {
    adherence: number;
    aesthetics: number;
    lighting: number;
    creativity: number;
  } | null;
  total: number;
}

const LABELS: Record<string, string> = {
  adherence: "Prompt Adherence",
  aesthetics: "Aesthetics",
  lighting: "Lighting",
  creativity: "Creativity",
};

const COLORS: Record<string, string> = {
  adherence: "from-violet-500 to-violet-400",
  aesthetics: "from-cyan-500 to-cyan-400",
  lighting: "from-amber-500 to-amber-400",
  creativity: "from-rose-500 to-rose-400",
};

export default function ScoreBreakdown({ breakdown, total }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
          Quality Scores
        </h3>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex items-baseline gap-1"
        >
          <span className="text-3xl font-bold text-accent-400">{total}</span>
          <span className="text-sm text-surface-500">/ 100</span>
        </motion.div>
      </div>

      <div className="space-y-3">
        {breakdown && Object.entries(breakdown).map(([key, value], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-1.5"
          >
            <div className="flex justify-between text-sm">
              <span className="text-surface-400">{LABELS[key] || key}</span>
              <span className="text-surface-300 font-medium">{value}/25</span>
            </div>
            <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(value / 25) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                className={`h-full rounded-full bg-gradient-to-r ${COLORS[key] || "from-accent-500 to-accent-400"}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
