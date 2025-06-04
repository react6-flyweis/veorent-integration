import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGetChargesQuery } from "../api/queries";
import { formatDate } from "@/utils/formatDate";

export function ChargesTabContent() {
  const [activeTab, setActiveTab] = useState<"sent" | "upcoming">("sent");

  const { data: charges } = useGetChargesQuery();

  // Memoize filtered charges to prevent unnecessary recalculations
  const displayedCharges = useMemo(() => {
    if (!charges) return [];

    return activeTab === "sent"
      ? charges.filter((charge) => charge.status === "Paid")
      : charges.filter(
          (charge) =>
            charge.status === "Pending" || charge.status === "Overdue",
        );
  }, [charges, activeTab]);

  // Memoize total amount calculation
  const totalAmount = useMemo(() => {
    return displayedCharges.reduce((sum, charge) => sum + charge.amount, 0);
  }, [displayedCharges]);

  // Memoize the latest date calculation
  const latestDateText = useMemo(() => {
    if (activeTab === "upcoming") return "Upcoming Charges";

    const validDates = displayedCharges
      .map((charge) => charge.dueDate || charge.paidDate)
      .filter((date): date is string => date != null && date !== "N/A")
      .map((date) => new Date(date))
      .filter((date) => !isNaN(date.getTime()));

    if (validDates.length === 0) {
      const now = new Date();
      return now.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    }

    const latestDate = new Date(
      Math.max(...validDates.map((date) => date.getTime())),
    );
    return latestDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [displayedCharges, activeTab]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="border-primary flex rounded-lg border-2 p-2">
          <Button
            variant={activeTab === "sent" ? "default" : "ghost"}
            onClick={() => setActiveTab("sent")}
            size="sm"
          >
            Sent
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            onClick={() => setActiveTab("upcoming")}
            size="sm"
          >
            Upcoming
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{latestDateText}</h2>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm">TOTAL</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedCharges?.map((charge) => (
            <div key={charge._id} className="border-b pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-muted-foreground text-sm">
                    {activeTab === "upcoming" ? "Last Charge " : ""}
                    {charge.paidDate ? formatDate(charge.paidDate) : "N/A"}
                  </div>
                  <div className="font-semibold">
                    {charge.category}
                    {charge.lateFeePay && (
                      <span className="ml-2 bg-blue-300 text-sm">
                        Late Fee Enabled
                      </span>
                    )}
                  </div>
                  <div className="text-sm">{charge.property}</div>
                </div>
                <div className="text-right">
                  {activeTab === "upcoming" && (
                    <div className="text-muted-foreground text-sm">
                      Due: {formatDate(charge.dueDate)}
                    </div>
                  )}
                  {charge.flatAmount && (
                    <div className="text-muted-foreground text-sm">
                      Deposit Est. {charge.flatAmount}
                    </div>
                  )}
                  <div className="font-semibold">
                    ${charge.amount?.toFixed(2)}
                  </div>
                  {activeTab === "sent" && (
                    <Badge
                      className={cn(
                        charge.status === "Paid"
                          ? "bg-green-500"
                          : "bg-blue-400",
                      )}
                    >
                      {charge.status === "Paid" ? "Paid" : "Unpaid"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
