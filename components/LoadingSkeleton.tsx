"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-pulse">
      <div className="aspect-[16/9] bg-surface-900/50 rounded-2xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-surface-800 rounded" />
          <div className="h-2 bg-surface-800 rounded" />
          <div className="h-2 bg-surface-800 rounded w-3/4" />
          <div className="h-2 bg-surface-800 rounded" />
          <div className="h-2 bg-surface-800 rounded w-2/3" />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="h-24 bg-surface-900/50 rounded-xl" />
          <div className="h-20 bg-surface-900/50 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
