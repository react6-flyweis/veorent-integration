import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useGoBack } from "@/hooks/useGoBack";
import { cn } from "@/lib/utils";

import dailyChargeIcon from "./assets/daily-charge.png";
import monthlyChargeIcon from "./assets/monthly-charge.png";
import paydayIcon from "./assets/payday.png";
import { LeaseSelector } from "./components/LeaseSelector";

const CreateCharge: React.FC = () => {
  const { t } = useTranslation();
  const goBack = useGoBack();

  const [lease, setLease] = useState<string | null>(null);

  return (
    <div className="">
      <div className="mb-6 flex items-center gap-3 border-b-2 pb-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={goBack}
        >
          <X className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{t("payments.createCharge")}</h1>
      </div>

      <div className="space-y-6">
        <div>
          <LeaseSelector value={lease || ""} onChange={setLease} />
          <p className="mt-2 underline">{t("payments.haventCreatedLease")}</p>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-medium">
            {t("payments.typeOfCharge")}
          </h2>
          <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2 @2xl:grid-cols-3">
            {[
              {
                type: "monthly",
                title: t("payments.monthlyCharge"),
                description: t("payments.monthlyChargeDescription"),
                icon: monthlyChargeIcon,
                path: "/landlord/payments/monthly-charge",
              },
              {
                type: "daily",
                title: t("payments.dailyCharge"),
                description: t("payments.dailyChargeDescription"),
                icon: dailyChargeIcon,
                path: "/landlord/payments/daily-charge",
              },
              {
                type: "one-time",
                title: t("payments.oneTimeCharge"),
                description: t("payments.oneTimeChargeDescription"),
                icon: paydayIcon,
                path: "/landlord/payments/one-time-charge",
              },
            ].map((charge) => (
              <Link
                key={charge.type}
                to={charge.path}
                onClick={(e) => (lease ? undefined : e.preventDefault())}
                className={cn(lease ? "cursor-pointer" : "cursor-not-allowed")}
                state={{ lease }}
              >
                <Card
                  className={cn(
                    "transition-shadow duration-200",
                    lease && "hover:shadow-lg",
                  )}
                >
                  <CardContent className="flex items-center gap-3 p-4">
                    <img
                      src={charge.icon}
                      alt={`${charge.type} icon`}
                      className="max-h-12 max-w-12"
                    />
                    <div>
                      <h3 className="font-medium">{charge.title}</h3>
                      <CardDescription>{charge.description}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharge;
