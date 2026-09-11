import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#00e5ff] text-[#030712] font-semibold shadow-[0_0_16px_rgba(0,229,255,0.25)] hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:bg-[#c3f5ff] active:bg-[#00daf3]",
        secondary:
          "border border-[rgba(226,201,116,0.4)] bg-transparent text-[#dec571] hover:bg-[rgba(226,201,116,0.08)] hover:border-[rgba(226,201,116,0.6)]",
        ghost:
          "border border-[rgba(255,255,255,0.1)] bg-transparent text-[#F8FAFC] hover:border-[rgba(255,255,255,0.25)] hover:text-[#00e5ff]",
        destructive:
          "bg-[#93000a] text-[#ffdad6] hover:bg-[#690005] border border-[rgba(255,180,171,0.3)]",
        outline:
          "border border-[rgba(255,255,255,0.1)] bg-transparent text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.2)]",
        link: "text-[#00e5ff] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-[4px] px-3 text-xs",
        lg: "h-10 rounded-[4px] px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
