import type { FieldErrors } from "react-hook-form";

export default function FormErrors({ errors }: { errors: FieldErrors }) {
  if (!errors) {
    return null;
  }
  return (
    errors.root && (
      <div className="flex gap-2 rounded border border-red-500 p-2">
        <p className="text-sm text-red-500">{errors.root.message}</p>
      </div>
    )
  );
}
