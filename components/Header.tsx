"use client";

export default function Header() {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/15">
        <span className="material-symbols-outlined text-blue-400" style={{ fontSize: "16px" }}>
          vaping_rooms
        </span>
      </div>
      <div>
        <h1 className="text-[15px] font-semibold text-on-surface leading-tight">
          Cyberwing Studio
        </h1>
        <p className="text-[9px] uppercase tracking-[0.2em] text-on-surface-variant/40 font-medium">
          AI Generation Workspace
        </p>
      </div>
    </div>
  );
}
