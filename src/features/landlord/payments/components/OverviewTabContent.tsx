import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentSummaryCard } from "./PaymentSummaryCard";

type TimeFilter = "Month" | "Year";

interface PaymentSummary {
  pastDue: number;
  unpaid: number;
  charges: number;
  paid: number;
  inTransit: number;
  deposited: number;
  history: number;
}

// Fake data for month and year views
const monthlyPaymentData: PaymentSummary = {
  pastDue: 0,
  unpaid: 700,
  charges: 2450,
  paid: 1750,
  inTransit: 125,
  deposited: 0,
  history: 156,
};

const yearlyPaymentData: PaymentSummary = {
  pastDue: 1200,
  unpaid: 4500,
  charges: 28600,
  paid: 24100,
  inTransit: 750,
  deposited: 3200,
  history: 1890,
};

export function OverviewTabContent() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Month");

  // Select data based on the current timeFilter
  const currentData =
    timeFilter === "Month" ? monthlyPaymentData : yearlyPaymentData;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">This {timeFilter}</h2>

        <div className="border-primary flex rounded-lg border-2 p-2">
          <Button
            variant={timeFilter === "Month" ? "default" : "ghost"}
            onClick={() => setTimeFilter("Month")}
            size="sm"
          >
            Month
          </Button>
          <Button
            variant={timeFilter === "Year" ? "default" : "ghost"}
            onClick={() => setTimeFilter("Year")}
            size="sm"
          >
            Year
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PaymentSummaryCard
          title="PAST DUE"
          amount={currentData.pastDue}
          bgColor="bg-red-400"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="UNPAID"
          amount={currentData.unpaid}
          bgColor="bg-blue-500"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="CHARGES"
          amount={currentData.charges}
          bgColor="bg-blue-800"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="PAID"
          amount={currentData.paid}
          bgColor="bg-green-500"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="IN TRANSIT"
          amount={currentData.inTransit}
          bgColor="bg-slate-500"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="DEPOSITED"
          amount={currentData.deposited}
          bgColor="bg-blue-900"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="HISTORY"
          amount={currentData.history}
          bgColor="bg-blue-400"
          textColor="text-white"
        />
      </div>
    </>
  );
}
