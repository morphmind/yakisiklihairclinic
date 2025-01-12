import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils" // <-- Eğer utils dosyanız bu konumda ise

export interface SwitchProps 
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {}

/**
 * Radix UI Switch bileşenini proje tasarımına uyacak şekilde sarmalayan 
 * örnek bir React bileşeni.
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "relative inline-flex h-[24px] w-[44px] items-center rounded-full p-0",
        "bg-gray-200 aria-checked:bg-primary transition-colors",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "block h-5 w-5 rounded-full bg-white shadow transition-transform",
          "translate-x-0.5 aria-checked:translate-x-[calc(100%-1.375rem)]"
        )}
      />
    </SwitchPrimitives.Root>
  )
})

Switch.displayName = "Switch"
