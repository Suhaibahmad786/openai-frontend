"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

const EXAMPLES = [
  "neon falcon with geometric wings",
  "ethereal forest cathedral at twilight",
  "steampunk owl with brass feathers",
  "cyberpunk samurai in rain-soaked alley",
];

interface Props {
  onGenerate: (prompt: string) => void;
  loading: boolean;
}

export default function PromptInput({ onGenerate, loading }: Props) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !loading) onGenerate(prompt.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-4">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 via-accent-400 to-cyan-500 rounded-2xl opacity-20 group-focus-within:opacity-40 blur transition duration-500" />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          rows={3}
          className="relative w-full bg-surface-950/80 border border-surface-700/50 rounded-xl px-5 py-4 text-lg text-surface-50 placeholder-surface-400 focus:outline-none focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20 transition-all resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              handleSubmit(e);
            }
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setPrompt(ex)}
            className="text-xs px-3 py-1.5 rounded-full border border-surface-700/50 text-surface-400 hover:text-surface-200 hover:border-accent-500/30 hover:bg-accent-500/5 transition-all"
          >
            {ex}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading || !prompt.trim()}
        className="relative w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl opacity-100 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 rounded-xl bg-[linear-gradient(60deg,transparent_30%,rgba(255,255,255,0.1)_50%,transparent_70%)] bg-[length:200%_100%] group-hover:animate-shimmer" />
        <span className="relative flex items-center justify-center gap-2">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Image
            </>
          )}
        </span>
      </button>

      {!loading && (
        <p className="text-center text-xs text-surface-500">
          Press Cmd+Enter to generate
        </p>
      )}
    </form>
  );
}
