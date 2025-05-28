import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const iconRoundVariants = cva("rounded-full flex justify-center items-center", {
  variants: {
    size: {
      xs: "size-8 sm:size-9 md:size-10", // fully responsive xs size
      sm: "size-9 sm:size-10 md:size-11 lg:size-12", // fully responsive sm size
      lg: "size-12 sm:size-14 lg:size-16", // fully responsive lg size
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const iconImageVariants = cva("", {
  variants: {
    size: {
      xs: "size-5 sm:size-5.5 md:size-6", // fully responsive image sizes
      sm: "size-5.5 sm:size-6 md:size-7 lg:size-8",
      lg: "size-8 sm:size-9 md:size-10 lg:size-11",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

interface IconRoundProps extends VariantProps<typeof iconRoundVariants> {
  icon: string;
  className?: string;
  alt?: string;
  bgColor?: string;
  imgClassName?: string;
  responsiveSize?: boolean;
}

export function IconRound({
  icon,
  size,
  className,
  alt = "Icon",
  bgColor,
  imgClassName,
  responsiveSize = true,
}: IconRoundProps) {
  // Create responsive classes that scale based on viewport width
  const responsiveClasses = responsiveSize ? "transition-all duration-200" : "";

  return (
    <div
      className={cn(
        iconRoundVariants({ size }),
        bgColor,
        responsiveClasses,
        className,
      )}
    >
      <img
        src={icon}
        alt={alt}
        className={cn(
          iconImageVariants({ size }),
          "object-contain",
          responsiveClasses,
          imgClassName,
        )}
        loading="lazy"
      />
    </div>
  );
}
