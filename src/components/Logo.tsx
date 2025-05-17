import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo-dark.png"
      alt="Veorent Logo"
      className={cn("h-7", className)}
    />
  );
}
