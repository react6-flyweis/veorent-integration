import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import checkIconAnimated from "./assets/check-celebrate.gif";
import { useGoBack } from "@/hooks/useGoBack";

interface MarketingExtendedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const MarketingExtended: React.FC<MarketingExtendedProps> = ({
  title = "Marketing Extended",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  buttonText = "Sounds Good",
}) => {
  const goBack = useGoBack();
  return (
    <Card className="h-full w-full flex-1 flex-col justify-center border-0 shadow-none">
      <CardHeader className="justify-center">
        <img
          src={checkIconAnimated}
          alt="Marketing Extended"
          className="size-52"
        />
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center text-sm">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          size="lg"
          className="w-4/5 bg-slate-900 text-white hover:bg-slate-800"
          onClick={goBack}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketingExtended;
