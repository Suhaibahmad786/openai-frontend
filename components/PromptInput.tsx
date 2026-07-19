"use client";

import { useState } from "react";
import { Loader2, Sparkles, CornerDownLeft } from "lucide-react";

const EXAMPLES = [
  "neon falcon with geometric wings",
  "ethereal forest cathedral at twilight",
  "steampunk owl with brass feathers",
  "cyberpunk samurai in rain-soaked alley",
  "astronaut riding a whale through nebula",
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

  const chars = prompt.length;
  const max = 500;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="input-area p-1.5">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, max))}
            placeholder="Describe the image you want to create..."
            rows={3}
            className="w-full bg-transparent border-0 px-4 py-3.5 text-[15px] sm:text-base text-[#e8eaf0] placeholder:text-[#4a4e63] focus:outline-none focus:ring-0 resize-none leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(e);
            }}
            disabled={loading}
          />

          <div className="flex items-center justify-between px-4 pb-2.5">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#3d4059] tabular-nums font-medium">
                {chars}/{max}
              </span>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#3d4059]">
                <CornerDownLeft className="w-3 h-3" />
                <span className="font-medium">Ctrl+Enter</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center px-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setPrompt(ex)}
              disabled={loading}
              className="chip"
            >
              {ex}
            </button>
          ))}
        </div>

        <button type="submit" disabled={loading || !prompt.trim()} className="gen-button">
          {loading ? (
            <>
              <Loader2 className="w-[18px] h-[18px] animate-spin" />
              <span>Generating</span>
              <span className="inline-flex gap-0.5">
                <span className="animate-bounce [animation-delay:0ms]">.</span>
                <span className="animate-bounce [animation-delay:150ms]">.</span>
                <span className="animate-bounce [animation-delay:300ms]">.</span>
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-[18px] h-[18px]" />
              <span>Generate Image</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
