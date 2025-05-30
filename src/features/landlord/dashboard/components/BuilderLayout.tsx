import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/PageTitle";
import { Link } from "react-router";

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
    <div className="flex w-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <PageTitle title={title} withBack className="mb-0" />

        <Link to="/landlord">
          <Button variant="ghost" onClick={onSave}>
            Save &amp; Exit
          </Button>
        </Link>
      </div>
      <p className="mb-5 text-lg">{description}</p>

      <div className="">{children}</div>
    </div>
  );
}
