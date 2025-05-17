import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button, Group, Input, NumberField } from "react-aria-components";

export function CounterInput({
  value,
  onChange,
  defaultValue = 0,
  minValue = 0,
  maxValue,
  step = 1,
  formatOptions,
  className,
  ...props
}: {
  value?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
  [key: `aria-${string}`]: string;
}) {
  return (
    <NumberField
      defaultValue={defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      formatOptions={formatOptions}
      {...props}
      onChange={onChange && ((value) => onChange(Number(value)))}
      value={value}
      className={cn(className)}
    >
      <div className="*:not-first:mt-2">
        <Group className="border-input data-focus-within:border-ring data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:ring-destructive/20 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-focus-within:has-aria-invalid:border-destructive relative inline-flex h-9 w-full items-center overflow-hidden rounded-md border text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-disabled:opacity-50 data-focus-within:ring-[3px]">
          <Button
            slot="decrement"
            className="border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground -ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MinusIcon size={16} aria-hidden="true" />
          </Button>
          <Input className="bg-background text-foreground w-full grow px-3 py-2 text-center tabular-nums" />
          <Button
            slot="increment"
            className="border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground -me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-md border text-sm transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon size={16} aria-hidden="true" />
          </Button>
        </Group>
      </div>
    </NumberField>
  );
}
