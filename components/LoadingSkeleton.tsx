"use client";

export default function LoadingSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Action bar placeholder */}
      <div className="flex items-center gap-2">
        <div className="h-7 w-20 bg-white/[0.03] rounded-lg" />
        <div className="h-7 w-24 bg-white/[0.03] rounded-lg" />
      </div>

      {/* Two-column skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Image skeleton */}
        <div className="lg:col-span-3 ui-card overflow-hidden">
          <div className="aspect-[4/3] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#080c18]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(208,188,255,0.03) 50%, transparent 100%)",
                backgroundSize: "300% 100%",
                animation: "shimmer 2s infinite linear",
              }}
            />
            <div className="absolute top-3 left-3">
              <div className="h-6 w-10 bg-white/[0.04] rounded-md" />
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="ui-card p-4 space-y-3">
            <div className="flex justify-between">
              <div className="h-2.5 w-14 bg-white/[0.03] rounded" />
              <div className="h-6 w-10 bg-white/[0.03] rounded" />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <div className="h-2 w-16 bg-white/[0.03] rounded" />
                  <div className="h-2 w-6 bg-white/[0.03] rounded" />
                </div>
                <div className="h-[2px] bg-white/[0.03] rounded-full" />
              </div>
            ))}
          </div>
          <div className="ui-card p-4 space-y-2 flex-1">
            <div className="h-2.5 w-24 bg-white/[0.03] rounded" />
            <div className="space-y-1.5">
              <div className="h-2 w-full bg-white/[0.03] rounded" />
              <div className="h-2 w-4/5 bg-white/[0.03] rounded" />
              <div className="h-2 w-2/3 bg-white/[0.03] rounded" />
            </div>
          </div>
          <div className="ui-card p-4 space-y-2">
            <div className="h-2.5 w-16 bg-white/[0.03] rounded" />
            <div className="h-2.5 w-full bg-white/[0.03] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
