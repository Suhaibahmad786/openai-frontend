"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

const SUGGESTIONS = [
  "neon falcon with geometric wings",
  "liquid gold obsidian fluid dynamics",
  "cyberpunk kyoto in heavy rain",
  "brutalist architecture floating in void",
];

interface Props {
  onGenerate: (prompt: string) => void;
  loading: boolean;
}

export default function PromptInput({ onGenerate, loading }: Props) {
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const max = 500;
  const chars = prompt.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (prompt.trim() && !loading) onGenerate(prompt.trim());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prompt, loading, onGenerate]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChipClick = (text: string) => {
    setPrompt(text);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleSubmit = () => {
    if (prompt.trim() && !loading) onGenerate(prompt.trim());
  };

  return (
    <>
      {/* Code Input Field */}
      <div className="code-input-field">
        {/* Header Bar */}
        <div className="flex items-center justify-between py-2.5 px-4 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-error/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-secondary/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/30" />
            </div>
            <span className="font-label-md text-[12px] text-on-surface-variant ml-4 opacity-40">
              PROMPT_ENGINE_V4
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="material-symbols-outlined text-on-surface-variant hover:text-primary text-[18px] transition-colors cursor-pointer"
            >
              tune
            </button>
            <button
              type="button"
              className="material-symbols-outlined text-on-surface-variant hover:text-primary text-[18px] transition-colors cursor-pointer"
            >
              history
            </button>
          </div>
        </div>

        {/* Textarea Area */}
        <div className="p-6">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, max))}
            placeholder="Describe your architectural vision or artistic concept..."
            rows={4}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-on-surface font-body-md placeholder:text-on-surface-variant/30 resize-none h-48 md:h-64 leading-relaxed"
            disabled={loading}
          />

          <div className="flex justify-between items-end mt-6">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase opacity-40 mb-1">
                  Tokens
                </span>
                <span
                  className={`font-label-md text-[13px] ${
                    chars > 450 ? "text-error" : "text-on-surface-variant"
                  }`}
                >
                  {chars} / {max}
                </span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase opacity-40 mb-1">
                  Shortcut
                </span>
                <span className="font-label-md text-[11px] text-on-surface-variant/60 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  ⌘ + ENTER
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="material-symbols-outlined text-outline-variant hover:text-primary transition-colors cursor-pointer"
                title="Upload Image Reference"
                style={{ fontSize: "20px" }}
              >
                add_photo_alternate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt Suggestion Chips */}
      <div className="flex flex-wrap gap-2 py-2">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => handleChipClick(s)}
            disabled={loading}
            className={`secondary-chip font-label-md ${
              i === 3 ? "hidden lg:block" : ""
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Primary Action Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!loading && !prompt.trim()}
          className="group bg-gradient-to-r from-primary/90 to-primary text-on-primary px-12 py-3.5 rounded-xl font-headline-md text-body-md action-button-glow transition-all active:scale-95 flex items-center gap-3 w-fit disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="text-on-primary animate-spin" style={{ fontSize: "20px" }} />
              Generating...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-on-primary group-hover:rotate-12 transition-transform" style={{ fontSize: "20px" }}>
                bolt
              </span>
              Generate Vision
            </>
          )}
        </button>
      </div>
    </>
  );
}
