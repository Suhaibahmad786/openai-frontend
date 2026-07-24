"use client";

export default function Footer() {
  return (
    <footer className="w-full mt-auto z-10">
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto px-5 md:px-6 py-5 md:py-8">
        {/* Desktop */}
        <div className="hidden md:flex justify-between items-center gap-6">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-600/5 flex items-center justify-center border border-blue-500/10">
              <span className="material-symbols-outlined text-blue-400" style={{ fontSize: "16px" }}>
                vaping_rooms
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[16px] text-white font-bold tracking-tight leading-none">
                Cyberwing Studio
              </span>
              <span className="text-[9px] text-white/50 font-mono font-medium px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                v1.2.0
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[13px] text-white/70 font-semibold uppercase tracking-[0.2em]">
              Powered by
            </span>
            <div className="flex items-center gap-2">
              {[
                { name: "LangGraphJS", icon: "schema", color: "text-blue-400", bg: "bg-blue-500/[0.08]", border: "border-blue-500/15" },
                { name: "FLUX", icon: "auto_awesome", color: "text-cyan-400", bg: "bg-cyan-500/[0.08]", border: "border-cyan-500/15" },
                { name: "Groq", icon: "bolt", color: "text-amber-400", bg: "bg-amber-500/[0.08]", border: "border-amber-500/15" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${tech.bg} border ${tech.border} transition-colors hover:brightness-125`}
                >
                  <span className={`material-symbols-outlined ${tech.color} opacity-70`} style={{ fontSize: "12px" }}>
                    {tech.icon}
                  </span>
                  <span className={`text-[10px] ${tech.color} font-semibold`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[11px] text-white/50 font-semibold uppercase tracking-[0.15em]">
              Designed & built by
            </span>
            <div className="h-3 w-px bg-white/[0.06]" />
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <span className="material-symbols-outlined text-blue-400/60" style={{ fontSize: "12px" }}>
                person
              </span>
              <span className="text-[13px] text-slate-200 font-semibold">
                Sohaib Ahmad
              </span>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden flex-col items-center gap-4">
          {/* Row 1: Brand */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-white font-bold tracking-tight">
              Cyberwing Studio
            </span>
            <span className="text-[8px] text-white/40 font-mono font-medium px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
              v1.2.0
            </span>
          </div>

          {/* Row 2: Divider + Tech chips */}
          <div className="flex items-center gap-2 w-full max-w-[260px]">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <div className="flex items-center gap-1.5">
              {[
                { name: "LangGraphJS", icon: "schema", color: "text-blue-400", bg: "bg-blue-500/[0.08]", border: "border-blue-500/15" },
                { name: "FLUX", icon: "auto_awesome", color: "text-cyan-400", bg: "bg-cyan-500/[0.08]", border: "border-cyan-500/15" },
                { name: "Groq", icon: "bolt", color: "text-amber-400", bg: "bg-amber-500/[0.08]", border: "border-amber-500/15" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md ${tech.bg} border ${tech.border}`}
                >
                  <span className={`material-symbols-outlined ${tech.color} opacity-70`} style={{ fontSize: "10px" }}>
                    {tech.icon}
                  </span>
                  <span className={`text-[9px] ${tech.color} font-semibold`}>
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Row 3: Author */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-white/40 font-medium">
              by
            </span>
            <span className="material-symbols-outlined text-blue-400/50" style={{ fontSize: "11px" }}>
              person
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              Sohaib Ahmad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
