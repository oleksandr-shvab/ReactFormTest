import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm outline-none",
        "focus-visible:border-ring aria-invalid:border-destructive ",
        "autofill:[-webkit-text-fill-color:var(--foreground)] autofill:[box-shadow:0_0_0_1000px_var(--background)_inset]",
        "[appearance:textfield] [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" /* remove up-down arrows in fields like number */,
        className,
      )}
      {...props}
    />
  )
}

export { Input }
