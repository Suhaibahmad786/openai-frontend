"use client";

import { Layers } from "lucide-react";

export default function Header() {
  return (
    <header className="relative pt-16 sm:pt-20 pb-8 text-center">
      <div className="inline-flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full scale-150" />
          <div className="relative flex items-center justify-center w-14 h-14 rounded-[14px] bg-gradient-to-br from-violet-500 via-violet-600 to-indigo-700 shadow-xl shadow-violet-500/20">
            <Layers className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-text-hero">
            AI Image Studio
          </h1>
          <p className="text-[#8b8fa3] text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Describe your vision. Our AI pipeline handles the rest.
          </p>
        </div>
      </div>
    </header>
  );
}
