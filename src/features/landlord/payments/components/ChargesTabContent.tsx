import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";

import { useGetChargesQuery } from "../api/queries";

export function ChargesTabContent() {
  const { t } = useTranslation();
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
    if (activeTab === "upcoming") return t("upcomingCharges");

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
            {t("sent")}
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            onClick={() => setActiveTab("upcoming")}
            size="sm"
          >
            {t("upcoming")}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{latestDateText}</h2>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm">{t("total")}</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedCharges?.map((charge) => (
            <div key={charge._id} className="border-b pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-muted-foreground text-sm">
                    {activeTab === "upcoming" ? `${t("lastCharge")} ` : ""}
                    {charge.paidDate ? formatDate(charge.paidDate) : "N/A"}
                  </div>
                  <div className="font-semibold">
                    {charge.category}
                    {charge.lateFeePay && (
                      <span className="ml-2 bg-blue-300 text-sm">
                        {t("lateFeeEnabled")}
                      </span>
                    )}
                  </div>
                  <div className="text-sm">{charge.property}</div>
                </div>
                <div className="text-right">
                  {activeTab === "upcoming" && (
                    <div className="text-muted-foreground text-sm">
                      {t("due")}: {formatDate(charge.dueDate)}
                    </div>
                  )}
                  {charge.flatAmount && (
                    <div className="text-muted-foreground text-sm">
                      {t("depositEst")} {charge.flatAmount}
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
                      {charge.status === "Paid" ? t("paid") : t("unpaid")}
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
