"use client";

import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-3 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
        <Sparkles className="relative w-8 h-8 text-accent-400" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-cyan-400 bg-clip-text text-transparent">
          AI Image Studio
        </span>
      </h1>
    </header>
  );
}
