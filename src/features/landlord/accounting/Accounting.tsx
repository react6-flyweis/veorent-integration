import { useTranslation } from "react-i18next";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

export default function Accounting() {
  const { t } = useTranslation();

  return (
    <div>
      <PageTitle title={t("accounting")} />

      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <h3 className="text-3xl font-bold">
          {t("professionalToolBuiltForLandlords")}
        </h3>
        <p className="text-muted-foreground max-w-3xl">
          {t("accountingDescription")}
        </p>

        <div className="flex items-center justify-center gap-2">
          <CurrencyIcon size="xl" />
          <span className="text-primary text-5xl font-bold">1,550.00</span>
          <span className="text-muted-foreground">/{t("month")}</span>
        </div>

        <p className="text-muted-foreground max-w-3xl">
          {t("accountingDescriptionLong")}
        </p>

        <Button
          className="w-full max-w-md py-6 text-base font-medium"
          size="lg"
        >
          {t("getAccounting")}
        </Button>
      </div>
    </div>
  );
}
