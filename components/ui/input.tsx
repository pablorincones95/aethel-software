import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-[4px] border border-[rgba(255,255,255,0.1)] bg-[#090D16] px-3 py-1 text-sm text-[#F8FAFC] shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#F8FAFC] placeholder:text-[#94A3B8]/50 focus-visible:outline-none focus-visible:border-[#00e5ff] focus-visible:ring-1 focus-visible:ring-[#00e5ff] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
