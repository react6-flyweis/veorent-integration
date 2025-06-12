import type { FieldErrors } from "react-hook-form";

import { cn } from "@/lib/utils";

export default function FormErrors({
  className,
  errors,
}: {
  className?: string;
  errors: FieldErrors;
}) {
  if (!errors) {
    return null;
  }
  return (
    errors.root && (
      <div
        className={cn(
          "flex gap-2 rounded border border-red-500 p-2",
          className,
        )}
      >
        <p className="text-sm text-red-500">{errors.root.message}</p>
      </div>
    )
  );
}
