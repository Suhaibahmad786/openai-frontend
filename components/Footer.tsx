"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest/30 border-t border-white/[0.04] py-3 px-6 flex-shrink-0 z-10">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3 font-label-md text-[10px] text-on-surface-variant opacity-40">
          <span>
            Built by{" "}
            <a className="hover:text-primary transition-colors" href="#">
              Sohaib Ahmad
            </a>
          </span>
          <span className="w-0.5 h-0.5 rounded-full bg-white/10" />
          <span>LangGraphJS + FLUX</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <a
              className="material-symbols-outlined text-[16px] text-on-surface-variant opacity-40 hover:text-primary hover:opacity-100 transition-all"
              href="#"
            >
              terminal
            </a>
            <a
              className="material-symbols-outlined text-[16px] text-on-surface-variant opacity-40 hover:text-primary hover:opacity-100 transition-all"
              href="#"
            >
              schema
            </a>
            <a
              className="material-symbols-outlined text-[16px] text-on-surface-variant opacity-40 hover:text-primary hover:opacity-100 transition-all"
              href="#"
            >
              deployed_code
            </a>
          </div>
          <div className="h-3 w-[1px] bg-white/[0.06]" />
          <span className="font-label-md text-[10px] text-secondary opacity-50 uppercase tracking-widest">
            v1.2.0
          </span>
        </div>
      </div>
    </footer>
  );
}
