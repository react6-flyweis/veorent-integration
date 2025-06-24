import { useTranslation } from "react-i18next";
import { SwissFrancIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";

import premiumIcon from "../assets/premium.png";

interface ApplicationTypeCardProps {
  title: string;
  description: string;
  amount: number;
  value: string;
  isPremium?: boolean;
}

export function ApplicationTypeCard({
  title,
  description,
  amount,
  value,
  isPremium,
}: ApplicationTypeCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="relative p-3">
      <CardContent className="space-y-2 p-2">
        <div className="flex items-center gap-8">
          <RadioGroupItem value={value} id={value} className="mt-1" />
          <div className="flex-1">
            <div className="font-semibold">{title}</div>
            <div className="text-muted-foreground text-sm">{description}</div>
            <div className="mt-1 flex items-center gap-1 font-medium">
              <div className="border-primary flex size-5 items-center justify-center rounded-full border-2">
                <SwissFrancIcon className="size-3" />
              </div>
              <span className="text-primary font-semibold">{amount}</span>
              <span className="text-muted-foreground">{t("fee")}</span>
            </div>
          </div>
        </div>
        {isPremium && (
          <img src={premiumIcon} className="absolute top-0 right-5 h-10" />
        )}
      </CardContent>
    </Card>
  );
}
