import { Loader2Icon } from "lucide-react";

import { Button, type ButtonProps } from "./button";

function LoadingButton({
  isLoading,
  children,
  ...props
}: { isLoading?: boolean } & ButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />}
      {children}
    </Button>
  );
}

export { LoadingButton };
