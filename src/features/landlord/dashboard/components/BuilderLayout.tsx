import type { ReactNode } from "react";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";

interface BuilderLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSave?: () => void;
}

export function BuilderLayout({
  title,
  description,
  children,
  onSave,
}: BuilderLayoutProps) {
  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <BackButton />
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>

        <Button variant="ghost" onClick={onSave}>
          Save &amp; Exit
        </Button>
      </div>
      <p className="text-lg mb-5">{description}</p>

      <div className="">{children}</div>
    </div>
  );
}
