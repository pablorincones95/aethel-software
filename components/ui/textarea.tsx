import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-[4px] border border-[rgba(255,255,255,0.1)] bg-[#090D16] px-3 py-2 text-sm text-[#F8FAFC] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] placeholder:text-[#94A3B8]/50 focus-visible:outline-none focus-visible:border-[#00e5ff] focus-visible:ring-1 focus-visible:ring-[#00e5ff] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
