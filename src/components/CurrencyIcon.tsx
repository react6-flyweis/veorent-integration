import { SwissFrancIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const currencyIconVariants = cva(
  "flex items-center justify-center rounded-full border-2",
  {
    variants: {
      variant: {
        default: "border-gray-600",
        primary: "border-primary",
        secondary: "border-secondary",
        success: "border-green-600",
        warning: "border-yellow-600",
        danger: "border-red-600",
      },
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-12 border-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const iconSizeMap = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4",
  xl: "size-7",
} as const;

interface CurrencyIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof currencyIconVariants> {
  icon?: React.ReactNode;
}

export function CurrencyIcon({
  className,
  variant,
  size,
  icon,
  ...props
}: CurrencyIconProps) {
  const iconSize = size ? iconSizeMap[size] : iconSizeMap.md;

  return (
    <div
      className={cn(currencyIconVariants({ variant, size, className }))}
      {...props}
    >
      {icon || <SwissFrancIcon className={cn(iconSize, "text-gray-600")} />}
    </div>
  );
}
