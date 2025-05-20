import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const iconRoundVariants = cva(
  "rounded-full flex justify-center items-center bg-blue-100",
  {
    variants: {
      size: {
        xs: "size-10",
        sm: "size-12", // container size
        lg: "size-16",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const iconImageVariants = cva("", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8", // image size
      lg: "size-11",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

interface IconRoundProps extends VariantProps<typeof iconRoundVariants> {
  icon: string;
  className?: string;
}

export function IconRound({ icon, size, className }: IconRoundProps) {
  return (
    <div className={cn(iconRoundVariants({ size }), className)}>
      <img src={icon} alt="App" className={cn(iconImageVariants({ size }))} />
    </div>
  );
}
