export function GlassBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex w-fit items-center gap-1 rounded bg-[rgba(36,42,54,0.8)] px-2 py-1 shadow-sm">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5ff] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e5ff]" />
      </span>
      <span className="font-[family-name:var(--font-display)] text-[12px] font-medium leading-[18px] tracking-[0.04em] text-[#9cf0ff] uppercase tracking-[0.18em]">
        {children}
      </span>
    </div>
  )
}
