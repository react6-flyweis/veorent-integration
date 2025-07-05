import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGoBack } from "@/hooks/useGoBack";

import checkIconAnimated from "./assets/check-celebrate.gif";

interface MarketingExtendedProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const MarketingExtended: React.FC<MarketingExtendedProps> = ({
  title,
  description,
  buttonText,
}) => {
  const { t } = useTranslation();
  const goBack = useGoBack();
  return (
    <Card className="h-full w-full flex-1 flex-col justify-center border-0 shadow-none">
      <CardHeader className="justify-center">
        <img
          src={checkIconAnimated}
          alt="Marketing Extended"
          className="size-52"
        />
        <CardTitle className="text-2xl font-bold">
          {title || t("marketingExtended")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center text-sm">
          {description || t("marketingExtendedDescription")}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          size="lg"
          className="w-4/5 bg-slate-900 text-white hover:bg-slate-800"
          onClick={goBack}
        >
          {buttonText || t("soundsGood")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketingExtended;
