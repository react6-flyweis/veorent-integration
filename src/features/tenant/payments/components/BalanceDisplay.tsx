import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Loader } from "@/components/Loader";

import { useGetWalletQuery } from "../api/queries";

export function BalanceDisplay() {
  const { data: balance, isLoading, isError } = useGetWalletQuery();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xl font-bold">
        <span className="mr-2">Your Current Balance is:</span>
        <div className="flex items-center gap-1">
          <Loader size="sm" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 text-xl font-bold">
        <span className="mr-2">Your Current Balance is:</span>
        <div className="flex items-center gap-1">
          <CurrencyIcon size="sm" />
          <span className="text-red-500">Error loading balance</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      <span className="mr-2">Your Current Balance is:</span>
      <div className="flex items-center gap-1">
        <CurrencyIcon size="sm" />
        <span>{balance ?? 0}</span>
      </div>
    </div>
  );
}
