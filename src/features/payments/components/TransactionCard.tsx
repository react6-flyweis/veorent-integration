import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EuroIcon, MinusIcon, PlusIcon } from "lucide-react";
import type { ITransaction } from "./Transactions";

export function TransactionCard({
  data: { amount, description, id, type, status, method },
  showSymbol,
}: {
  data: ITransaction;
  showSymbol?: boolean;
}) {
  return (
    <Card key={id} className="border mt-1 py-0">
      <CardContent className="p-3! flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-primary">TransactionId #{id}</p>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-muted-foreground">
            {method} - {status}
          </p>
        </div>
        <p
          className={cn(
            type.toLowerCase() === "credit" ? "text-green-500" : "text-red-500"
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
          <EuroIcon />
          <p className="text-2xl font-semibold">{amount}</p>
        </div>
      </CardContent>
    </Card>
  );
}
