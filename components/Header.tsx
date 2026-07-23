"use client";

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-600/5 flex items-center justify-center border border-blue-500/10">
        <span className="material-symbols-outlined text-blue-400" style={{ fontSize: "20px" }}>
          vaping_rooms
        </span>
      </div>
      <div>
        <h1 className="text-[20px] font-bold text-white tracking-tight leading-none">
          Cyberwing Studio
        </h1>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400/50 font-medium mt-1">
          AI Generation Workspace
        </p>
      </div>
    </div>
  );
}
