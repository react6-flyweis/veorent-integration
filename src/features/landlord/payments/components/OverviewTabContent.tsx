import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentSummaryCard } from "./PaymentSummaryCard";

type TimeFilter = "Month" | "Year";

export function OverviewTabContent() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("Month");

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
          amount={0}
          bgColor="bg-red-400"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="UNPAID"
          amount={700}
          bgColor="bg-blue-500"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="CHARGES"
          amount={2450}
          bgColor="bg-blue-800"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="PAID"
          amount={1750}
          bgColor="bg-green-500"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="IN TRANSIT"
          amount={125}
          bgColor="bg-slate-500"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="DEPOSITED"
          amount={0}
          bgColor="bg-blue-900"
          textColor="text-white"
        />
        <PaymentSummaryCard
          title="HISTORY"
          amount={156}
          bgColor="bg-blue-400"
          textColor="text-white"
        />
      </div>
    </>
  );
}
