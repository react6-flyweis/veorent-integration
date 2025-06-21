import { ArrowLeftIcon } from "lucide-react";

import { useGoBack } from "@/hooks/useGoBack";

import { Button } from "./ui/button";

export function BackButton() {
  const goBack = useGoBack();

  return (
    <Button
      onClick={goBack}
      type="button"
      variant="outline"
      className="size-9 items-center justify-center rounded-full"
    >
      <ArrowLeftIcon className="text-primary size-5" />
    </Button>
  );
}
