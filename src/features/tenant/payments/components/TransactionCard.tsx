import { MinusIcon, PlusIcon } from "lucide-react";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TransactionCard({
  data,
  showSymbol,
}: {
  data: ITransaction;
  showSymbol?: boolean;
}) {
  const type = data.cr ? "Credit" : "Debit";
  return (
    <Card key={data._id} className="mt-1 border py-0">
      <CardContent className="flex items-center justify-between p-3!">
        <div>
          <p className="text-primary text-lg font-bold">
            TransactionId #{data._id}
          </p>
          <p className="text-muted-foreground">{data.details}</p>
          <p className="text-muted-foreground">
            {data.paymentMode} - {data.paymentStatus}
          </p>
        </div>
        {!showSymbol && (
          <p
            className={cn(
              type.toLowerCase() === "credit"
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {type}
          </p>
        )}
        <div className="flex items-center">
          {showSymbol &&
            (type.toLowerCase() === "credit" ? (
              <PlusIcon className="text-green-500" />
            ) : (
              <MinusIcon className="text-red-500" />
            ))}

          <div className="flex items-center gap-1">
            <CurrencyIcon />
            <p className="text-2xl font-semibold">{data.amount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
