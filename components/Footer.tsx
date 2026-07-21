"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest/40 border-t border-white/5 py-4 px-6 flex-shrink-0 z-10">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Attribution */}
        <div className="flex items-center gap-4 font-label-md text-[11px] text-on-surface-variant opacity-60">
          <span>
            Built by{" "}
            <a className="hover:text-primary transition-colors" href="#">
              Sohaib Ahmad
            </a>
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span>Stack: LangGraphJS + FLUX</span>
        </div>

        {/* Right: Icons + Version */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <a
              className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              terminal
            </a>
            <a
              className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              schema
            </a>
            <a
              className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              deployed_code
            </a>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="font-label-md text-[11px] text-secondary opacity-80 uppercase tracking-widest">
            v1.2.0-stable
          </span>
        </div>
      </div>
    </footer>
  );
}
