"use client";

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 flex items-center justify-center border border-violet-500/10">
        <span className="material-symbols-outlined text-violet-400" style={{ fontSize: "18px" }}>
          vaping_rooms
        </span>
      </div>
      <div>
        <h1 className="font-headline-md text-headline-md leading-tight text-on-surface">
          Cyberwing Studio
        </h1>
        <p className="font-label-md text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
          High-Fidelity AI Workspace
        </p>
      </div>
    </div>
  );
}
