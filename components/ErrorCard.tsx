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
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="w-full"
    >
      <div className="ui-card p-4 border-red-500/10">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-500/[0.08] flex items-center justify-center">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[12px] font-semibold text-red-300/80 mb-0.5">
              Generation failed
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {message}
            </p>
            <button
              onClick={onRetry}
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400/70 hover:text-blue-300 transition-colors"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              Retry
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
