import { forwardRef } from "react";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  icon: string;
  label: string;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, label, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className="group text-foreground hover:text-accent w-full justify-between rounded-lg bg-blue-100 py-6"
        {...props}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="flex size-8 items-center justify-center rounded-full shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_3px_4px_rgba(0,0,0,0.4)] transition-all duration-200 group-hover:shadow-white">
              <img
                src={icon}
                className="relative z-10 max-h-4 max-w-4 brightness-200 filter transition-all duration-200 group-hover:invert"
              />
            </div>
          </div>
          <span className="text-lg"> {label}</span>
        </div>
        <ChevronLeftIcon className="rotate-180" />
      </Button>
    );
  },
);

ActionButton.displayName = "ActionButton";
