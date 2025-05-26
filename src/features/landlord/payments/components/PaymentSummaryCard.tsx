import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SwissFrancIcon } from "lucide-react";

interface PaymentSummaryCardProps {
  title: string;
  amount: number;
  bgColor: string;
  textColor: string;
}

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  title,
  amount,
  bgColor,
  textColor,
}) => {
  return (
    <Card
      className={`${bgColor} ${textColor} gap-0 border-none py-5 shadow-md`}
    >
      <CardHeader className="px-3">
        <CardTitle className="text-xl font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full border-2 border-white p-1">
            <SwissFrancIcon className="h-5 w-5" />
          </div>
          <span className="text-3xl font-bold">{amount.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
