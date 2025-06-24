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
          A professional tool built for landlords like you.
        </h3>
        <p className="text-muted-foreground max-w-3xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </p>

        <div className="flex items-center justify-center gap-2">
          <CurrencyIcon size="xl" />
          <span className="text-primary text-5xl font-bold">1,550.00</span>
          <span className="text-muted-foreground">/month</span>
        </div>

        <p className="text-muted-foreground max-w-3xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </p>

        <Button
          className="w-full max-w-md py-6 text-base font-medium"
          size="lg"
        >
          Get Accounting
        </Button>
      </div>
    </div>
  );
}
