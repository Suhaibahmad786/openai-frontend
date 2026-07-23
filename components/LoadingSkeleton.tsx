"use client";

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-5">
      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Image skeleton */}
        <div className="lg:col-span-3 relative ui-card overflow-hidden">
          <div className="aspect-square relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0b10]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)",
                backgroundSize: "300% 100%",
                animation: "shimmer 2s infinite linear",
              }}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <div className="h-7 w-14 bg-white/[0.04] rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="ui-card p-5 space-y-4">
            <div className="flex justify-between">
              <div className="h-3 w-16 bg-white/[0.03] rounded-md" />
              <div className="h-8 w-12 bg-white/[0.03] rounded-md" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-2.5 w-20 bg-white/[0.03] rounded-md" />
                  <div className="h-2.5 w-8 bg-white/[0.03] rounded-md" />
                </div>
                <div className="h-[3px] bg-white/[0.03] rounded-full" />
              </div>
            ))}
          </div>
          <div className="ui-card p-5 space-y-3 flex-1">
            <div className="h-3 w-28 bg-white/[0.03] rounded-md" />
            <div className="space-y-2">
              <div className="h-2.5 w-full bg-white/[0.03] rounded-md" />
              <div className="h-2.5 w-4/5 bg-white/[0.03] rounded-md" />
              <div className="h-2.5 w-3/5 bg-white/[0.03] rounded-md" />
            </div>
          </div>
          <div className="ui-card p-5 space-y-3">
            <div className="h-3 w-20 bg-white/[0.03] rounded-md" />
            <div className="h-3.5 w-full bg-white/[0.03] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
