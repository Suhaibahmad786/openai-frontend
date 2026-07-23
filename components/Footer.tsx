"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.03] py-3 px-5 flex-shrink-0 z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-[9px] text-slate-500/60 font-medium">
          <span>Built by Sohaib Ahmad</span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/[0.08]" />
          <span>LangGraphJS + FLUX</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-slate-600/40 font-mono uppercase tracking-widest">
            v1.2.0
          </span>
        </div>
      </div>
    </footer>
  );
}
