import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useGoBack } from "@/hooks/useGoBack";

export function BackButton() {
  const goBack = useGoBack();

  return (
    <Button
      onClick={goBack}
      variant="outline"
      className="rounded-full size-9 justify-center items-center"
    >
      <ArrowLeftIcon className="size-5 text-primary" />
    </Button>
  );
}
