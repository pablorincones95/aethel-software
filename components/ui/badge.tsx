import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-display)] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "border-[rgba(0,229,255,0.3)] bg-[rgba(0,229,255,0.08)] text-[#c3f5ff]",
        secondary:
          "border-[rgba(226,201,116,0.3)] bg-[rgba(226,201,116,0.08)] text-[#dec571]",
        tertiary:
          "border-[rgba(96,225,255,0.3)] bg-[rgba(96,225,255,0.08)] text-[#cdf3ff]",
        error:
          "border-[rgba(255,180,171,0.3)] bg-[rgba(255,180,171,0.08)] text-[#ffb4ab]",
        outline:
          "border-[rgba(255,255,255,0.1)] bg-transparent text-[#F8FAFC]",
        success:
          "border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.08)] text-[#22c55e]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
