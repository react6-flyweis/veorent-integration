import { useTranslation } from "react-i18next";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Loader } from "@/components/Loader";

import { useGetWalletQuery } from "../api/queries";

export function BalanceDisplay() {
  const { t } = useTranslation();
  const { data: balance, isLoading, isError } = useGetWalletQuery();

  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      <span className="mr-2">{t("currentBalanceLabel")}</span>
      <div className="flex items-center gap-1">
        <CurrencyIcon size="sm" />
        {isLoading ? (
          <Loader size="sm" />
        ) : isError ? (
          <span className="text-red-500">{t("errorLoadingBalance")}</span>
        ) : (
          <span>{balance ?? 0}</span>
        )}
      </div>
    </div>
  );
}
