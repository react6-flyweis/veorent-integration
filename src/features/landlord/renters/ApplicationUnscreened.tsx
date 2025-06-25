import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import calendarIcon from "./assets/calendar.png";
import coinBagIcon from "./assets/coin-bag.png";
import formIcon from "./assets/form.png";
import screeningIcon from "./assets/screening.png";

export default function ApplicationUnscreened() {
  const { t } = useTranslation();

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <PageTitle
          title="William Thorne"
          withBack
          className="mb-0 text-2xl md:text-3xl"
        />
        <Link
          to="#"
          className="text-primary ml-2 cursor-pointer text-base font-medium hover:underline"
        >
          (700 H St.)
        </Link>
      </div>

      <div className="mb-5 flex items-center gap-2">
        <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
          <img
            src={formIcon}
            alt="Rental Application"
            className="max-h-5 max-w-5"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {t("rentalApplication")}
          </h2>
          <p className="text-muted-foreground text-xs">
            {t("completedOn")} 08/19/2024
          </p>
        </div>
      </div>

      {/* Rental Application Card */}
      <Card className="mb-5 shadow-lg">
        <CardContent className="">
          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row">
              {[
                {
                  label: t("desiredMoveIn"),
                  value: "08/17/2024",
                  icon: calendarIcon,
                },
                {
                  label: t("monthlyIncome"),
                  value: "3,000",
                  icon: coinBagIcon,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex h-32 w-44 flex-col items-center justify-center rounded bg-blue-100 p-4 text-gray-500 shadow"
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="mb-2 max-h-12 max-w-12"
                  />
                  <p className="text-xs font-semibold uppercase">
                    {item.label}
                  </p>
                  <p className="text-base font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            {/* View Full Application Button */}
            <div className="mt-4 flex-shrink-0">
              <Button className="w-full font-semibold md:w-auto" asChild>
                <Link to="/landlord/renters/application/_id_">
                  {t("viewFullApplication")}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Screening Report Card */}
      <Card className="gap-4 py-3 shadow-lg">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
            <img
              src={screeningIcon}
              alt="Screening Report"
              className="max-h-5 max-w-5"
            />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            {t("screeningReport")}
          </h2>
        </CardHeader>
        <CardContent className="">
          <h3 className="mb-1 text-base font-semibold text-gray-900">
            {t("waitingOnApplicant")}
          </h3>
          <p className="text-muted-foreground text-sm">
            {t("screeningReportDescription")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
