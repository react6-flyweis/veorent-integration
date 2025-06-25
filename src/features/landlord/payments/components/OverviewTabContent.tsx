import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { PaymentSummaryCard } from "./PaymentSummaryCard";
import { useGetPendingRentReportQuery } from "../api/queries";

type TimeFilter = "Month" | "Year";

// // Fake data for month and year views
// const monthlyPaymentData = {
//   pastDue: 0,
//   unpaid: 700,
//   charges: 2450,
//   paid: 1750,
//   inTransit: 125,
//   deposited: 0,
//   history: 156,
// };

// const yearlyPaymentData = {
//   pastDue: 1200,
//   unpaid: 4500,
//   charges: 28600,
//   paid: 24100,
//   inTransit: 750,
//   deposited: 3200,
//   history: 1890,
// };

export function OverviewTabContent() {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Month");

  const { data: monthlyPaymentData, isLoading: isMonthlyLoading } =
    useGetPendingRentReportQuery({
      month: new Date().getMonth() + 1, // Months are 0-indexed in JavaScript
    });

  const { data: yearlyPaymentData, isLoading: isYearlyLoading } =
    useGetPendingRentReportQuery({
      year: new Date().getFullYear(),
    });

  // Select data based on the current timeFilter
  const currentData =
    timeFilter === "Month" ? monthlyPaymentData : yearlyPaymentData;
  const isLoading = timeFilter === "Month" ? isMonthlyLoading : isYearlyLoading;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {t("thisTimeFilter", { timeFilter: t(timeFilter.toLowerCase()) })}
        </h2>

        <div className="border-primary flex rounded-lg border-2 p-2">
          <Button
            variant={timeFilter === "Month" ? "default" : "ghost"}
            onClick={() => setTimeFilter("Month")}
            size="sm"
          >
            {t("month")}
          </Button>
          <Button
            variant={timeFilter === "Year" ? "default" : "ghost"}
            onClick={() => setTimeFilter("Year")}
            size="sm"
          >
            {t("year")}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500">
          {t("loadingDataForTimeFilter", {
            timeFilter: t(timeFilter.toLowerCase()),
          })}
        </div>
      ) : currentData ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PaymentSummaryCard
            title={t("pastDue")}
            amount={currentData.pastDue}
            bgColor="bg-red-400"
            textColor="text-white"
          />
          <PaymentSummaryCard
            title={t("unpaid")}
            amount={currentData.unpaid}
            bgColor="bg-blue-500"
            textColor="text-white"
          />
          <PaymentSummaryCard
            title={t("charges")}
            amount={currentData.charges}
            bgColor="bg-blue-800"
            textColor="text-white"
          />
          <PaymentSummaryCard
            title={t("paid")}
            amount={currentData.paid}
            bgColor="bg-green-500"
            textColor="text-white"
          />
          <PaymentSummaryCard
            title={t("deposited")}
            amount={currentData.deposited}
            bgColor="bg-blue-900"
            textColor="text-white"
          />
          <PaymentSummaryCard
            title={t("history")}
            amount={currentData.history}
            bgColor="bg-blue-400"
            textColor="text-white"
          />
        </div>
      ) : (
        <div className="text-center text-gray-500">
          {t("noDataAvailableForTimeFilter", {
            timeFilter: t(timeFilter.toLowerCase()),
          })}
        </div>
      )}
    </>
  );
}
