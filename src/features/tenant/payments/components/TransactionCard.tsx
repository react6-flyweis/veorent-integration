import { useTranslation } from "react-i18next";
import { MinusIcon, PlusIcon } from "lucide-react";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function TransactionCard({
  data,
  showSymbol,
}: {
  data: ITransaction;
  showSymbol?: boolean;
}) {
  const { t } = useTranslation();
  const type = data.cr ? "credit" : "debit";
  return (
    <Card key={data._id} className="mt-1 border py-0">
      <CardContent className="flex items-center justify-between p-3!">
        <div>
          <p className="text-primary text-lg font-bold">
            {t("transaction.id")} #{data._id}
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
            {type === "credit"
              ? t("transaction.credit")
              : t("transaction.debit")}
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

export function TransactionCardSkeleton() {
  return (
    <div className="mt-1 rounded-md border py-0">
      <div className="flex items-center justify-between p-3">
        <div className="flex-1">
          <Skeleton className="mb-2 h-5 w-48" />
          <Skeleton className="mb-1 h-4 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
