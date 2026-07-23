"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorCard({ message, onRetry }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="ui-card p-5 border-rose-500/10">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-rose-500/8 flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-semibold text-rose-300 mb-0.5">
              Something went wrong
            </h3>
            <p className="text-[12px] text-[#6b7094] leading-relaxed">
              {message}
            </p>
            <button
              onClick={onRetry}
              className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Try again
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
