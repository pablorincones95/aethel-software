export function SectionLabel({
  children,
  variant = "cyan",
}: {
  children: React.ReactNode
  variant?: "cyan" | "gold"
}) {
  const colorClass =
    variant === "gold" ? "text-secondary" : "text-primary-container"

  return (
    <span
      className={`font-[family-name:var(--font-display)] text-[11px] font-semibold leading-4 tracking-[0.18em] uppercase ${colorClass}`}
    >
      {children}
    </span>
  )
}
