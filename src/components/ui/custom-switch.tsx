import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

type CustomSwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> & {
  variant?: "default" | "colored";
};

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CustomSwitchProps
>(({ className, variant = "default", ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 relative",
      variant === "colored"
        ? props.checked
          ? "bg-green-500"
          : "bg-red-500"
        : props.checked
          ? "bg-primary"
          : "bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <span className="absolute left-1 text-[8px] font-medium text-white opacity-70 select-none">
      ON
    </span>
    <span className="absolute right-1 text-[8px] font-medium text-white opacity-70 select-none">
      OFF
    </span>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[20px] w-[20px] rounded-full bg-white shadow-lg ring-0 transition-transform z-10",
        props.checked ? "translate-x-[24px]" : "translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));

CustomSwitch.displayName = "CustomSwitch";

export { CustomSwitch };
