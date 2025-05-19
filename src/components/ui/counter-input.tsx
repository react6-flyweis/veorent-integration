import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";

export function CounterInput({
  min = 1,
  max = 99,
  value,
  step = 1,
  onChange,
  className,
}: {
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  value: number;
  className?: string;
  onChange: (value: number) => void;
}) {
  const handleDecrement = () => {
    if (value > min) onChange(value - step);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + step);
  };

  return (
    <div
      className={cn(
        "flex items-center border rounded-md overflow-hidden",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={value <= min}
        onClick={handleDecrement}
        className="border-r rounded-none"
      >
        <MinusIcon className="" />
      </Button>
      <div className="flex-1 text-center">{value}</div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={value >= max}
        onClick={handleIncrement}
        className="border-l rounded-none"
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
