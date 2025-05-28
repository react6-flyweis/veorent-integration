import { cn } from "@/lib/utils";
import { BackButton } from "./BackButton";

export function PageTitle({
  title,
  description,
  withBack,
  className,
  ...props
}: {
  title: string;
  description?: string;
  withBack?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-5", className)} {...props}>
      <div className="flex items-center gap-3 @lg:gap-5">
        {withBack && <BackButton />}
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {description && (
        <p className="mt-2 text-sm leading-4 font-semibold text-gray-700 @lg:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
