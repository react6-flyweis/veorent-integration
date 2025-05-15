import { Loader2Icon } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { Slottable } from "@radix-ui/react-slot";

function LoadingButton({
  isLoading,
  children,
  ...props
}: { isLoading?: boolean } & ButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />}
      <Slottable>{children}</Slottable>
    </Button>
  );
}

export { LoadingButton };
