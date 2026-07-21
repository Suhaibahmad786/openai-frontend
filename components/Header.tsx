"use client";

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: "32px" }}>
        vaping_rooms
      </span>
      <div>
        <h1 className="font-headline-md text-headline-md leading-tight text-on-surface">
          Cyberwing Studio
        </h1>
        <p className="font-label-md text-[11px] uppercase tracking-[0.2em] text-on-surface-variant opacity-50">
          High-Fidelity AI Workspace
        </p>
      </div>
    </div>
  );
}
