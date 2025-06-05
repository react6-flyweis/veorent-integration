import React, { forwardRef, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(showToggle && "pr-16", className)}
          ref={ref}
          {...props}
        />
        {showToggle && (
          <Button
            type="button"
            variant="link"
            className="text-primary absolute top-0 right-0 h-full px-3 py-2 text-sm font-medium hover:no-underline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </Button>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
