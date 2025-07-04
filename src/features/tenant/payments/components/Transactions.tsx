import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Skeleton } from "@/components/ui/skeleton";

import { TransactionCard, TransactionCardSkeleton } from "./TransactionCard";
import { useGetTransactionsQuery } from "../api/queries";

export function Transactions() {
  const { t } = useTranslation();

  const { data, isLoading } = useGetTransactionsQuery();

  const groupedTransactions = useMemo(() => {
    if (!data) return [];

    // Group API data by date
    const groupedByDate = data.reduce(
      (acc, transaction) => {
        // Use createdAt as the date field from the transaction
        const dateValue = transaction.createdAt;

        const date = new Date(dateValue).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
      },
      {} as Record<string, ITransaction[]>,
    );

    return Object.entries(groupedByDate)
      .map(
        ([date, transactions]) =>
          [
            date,
            transactions.sort((a, b) => {
              // Sort by createdAt in descending order (newest first)
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }),
          ] as [string, ITransaction[]],
      )
      .sort(([dateA], [dateB]) => {
        const parseDate = (dateStr: string) =>
          new Date(dateStr.split(" ").reverse().join(" "));
        return parseDate(dateB).getTime() - parseDate(dateA).getTime();
      });
  }, [data]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Skeleton for multiple date groups */}
        {Array.from({ length: 3 }).map((_, groupIndex) => (
          <div key={groupIndex}>
            {/* Skeleton for date header */}
            <div className="bg-accent text-primary flex justify-between px-4 py-2 text-lg font-semibold">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
            {/* Skeleton for transaction cards */}
            {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
              (_, cardIndex) => (
                <TransactionCardSkeleton key={cardIndex} />
              ),
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedTransactions.map(([date, transactions]) => (
        <div key={date}>
          <div className="bg-accent text-primary flex justify-between px-4 py-2 text-lg font-semibold">
            <span>{date}</span>
            <span>{t("amount")}</span>
          </div>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} data={transaction} />
          ))}
        </div>
      ))}
    </div>
  );
}
