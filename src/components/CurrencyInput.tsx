import type { ComponentProps } from "react";
import { CurrencyIcon } from "./CurrencyIcon";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export function CurrencyInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <CurrencyIcon className="absolute top-1/2 left-3 -translate-y-1/2" />
      <Input
        type="number"
        step="0.01"
        placeholder="0.00"
        className="pl-9"
        {...props}
      />
    </div>
  );
}
