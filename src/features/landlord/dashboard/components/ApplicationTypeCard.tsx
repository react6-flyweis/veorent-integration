import { Card, CardContent } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { SwissFrancIcon } from "lucide-react";

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
  return (
    <Card className="relative p-3">
      <CardContent className="p-2 space-y-2">
        <div className="flex items-center gap-8">
          <RadioGroupItem value={value} id={value} className="mt-1" />
          <div className="flex-1">
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-muted-foreground">{description}</div>
            <div className="flex items-center font-medium mt-1 gap-1">
              <div className="size-5 border-primary border-2 rounded-full flex justify-center items-center">
                <SwissFrancIcon className="size-3" />
              </div>
              <span className="font-semibold text-primary">{amount}</span>
              <span className="text-muted-foreground">fee</span>
            </div>
          </div>
        </div>
        {isPremium && (
          <img src={premiumIcon} className="absolute right-5 top-0 h-10" />
        )}
      </CardContent>
    </Card>
  );
}
