import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { ITransaction } from "./Transactions";
import { CurrencyIcon } from "@/components/CurrencyIcon";

export function TransactionCard({
  data: { amount, description, id, type, status, method },
  showSymbol,
}: {
  data: ITransaction;
  showSymbol?: boolean;
}) {
  return (
    <Card key={id} className="mt-1 border py-0">
      <CardContent className="flex items-center justify-between p-3!">
        <div>
          <p className="text-primary text-lg font-bold">TransactionId #{id}</p>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-muted-foreground">
            {method} - {status}
          </p>
        </div>
        <p
          className={cn(
            type.toLowerCase() === "credit" ? "text-green-500" : "text-red-500",
          )}
        >
          {type}
        </p>
        <div className="flex items-center">
          {showSymbol &&
            (type.toLowerCase() === "credit" ? (
              <PlusIcon className="text-green-500" />
            ) : (
              <MinusIcon className="text-red-500" />
            ))}

          <div className="flex items-center gap-1">
            <CurrencyIcon />
            <p className="text-2xl font-semibold">{amount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
