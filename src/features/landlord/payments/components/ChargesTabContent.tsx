import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ChargeStatus = "paid" | "unpaid";
type ChargeType = "Late Fee" | "Security Deposit" | "Rent" | "Utility Charge";

interface Charge {
  id: string;
  date: string;
  type: ChargeType;
  property: string;
  amount: number;
  status: ChargeStatus;
  estimatedDate?: string;
  lateFeeEnabled?: boolean;
  dueDate?: string;
}

export function ChargesTabContent() {
  const [activeTab, setActiveTab] = useState<"sent" | "upcoming">("sent");

  // Sent charges data
  const sentCharges: Charge[] = [
    {
      id: "1",
      date: "08/19/2024",
      type: "Late Fee",
      property: "123 Main St.",
      amount: 50.0,
      status: "paid",
      estimatedDate: "08/19/2023",
    },
    {
      id: "2",
      date: "08/19/2024",
      type: "Security Deposit",
      property: "Ft. Collins Lease",
      amount: 1200.0,
      status: "unpaid",
    },
    {
      id: "3",
      date: "08/19/2024",
      type: "Security Deposit",
      property: "123 Main St.",
      amount: 1200.0,
      status: "unpaid",
    },
  ];

  // Upcoming charges data based on the image
  const upcomingCharges: Charge[] = [
    {
      id: "4",
      date: "08/19/2024",
      type: "Rent",
      property: "123 Main St.",
      amount: 1200.0,
      status: "unpaid",
      dueDate: "on the 15th",
    },
    {
      id: "5",
      date: "08/19/2024",
      type: "Rent",
      property: "123 Main St.",
      amount: 1200.0,
      status: "unpaid",
      lateFeeEnabled: true,
      dueDate: "on the 1st",
    },
    {
      id: "6",
      date: "N/A",
      type: "Rent",
      property: "Ft. Collins Lease",
      amount: 321.0,
      status: "unpaid",
      dueDate: "on the Sep 04 2024",
    },
    {
      id: "7",
      date: "N/A",
      type: "Utility Charge",
      property: "123 Main St.",
      amount: 555.0,
      status: "unpaid",
      dueDate: "on the 18th",
    },
  ];

  // Choose which data to display based on the active tab
  const displayedCharges =
    activeTab === "sent" ? sentCharges : upcomingCharges;
  const totalAmount = displayedCharges.reduce(
    (sum, charge) => sum + charge.amount,
    0
  );

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
          <h2 className="text-lg font-semibold">
            {activeTab === "sent" ? "September 2023" : "Upcoming Charges"}
          </h2>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-sm">TOTAL</span>
            <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          {displayedCharges.map((charge) => (
            <div key={charge.id} className="border-b pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-muted-foreground text-sm">
                    {activeTab === "upcoming" ? "Last Charge " : ""}
                    {charge.date}
                  </div>
                  <div className="font-semibold">
                    {charge.type}
                    {charge.lateFeeEnabled && (
                      <span className="ml-2 text-sm text-red-500">
                        Late Fee Enabled
                      </span>
                    )}
                  </div>
                  <div className="text-sm">{charge.property}</div>
                </div>
                <div className="text-right">
                  {charge.dueDate && (
                    <div className="text-muted-foreground text-sm">
                      Due: {charge.dueDate}
                    </div>
                  )}
                  {charge.estimatedDate && (
                    <div className="text-muted-foreground text-sm">
                      Deposit Est. {charge.estimatedDate}
                    </div>
                  )}
                  <div className="font-semibold">${charge.amount.toFixed(2)}</div>
                  {activeTab === "sent" && (
                    charge.status === "paid" ? (
                      <Badge className="bg-green-500">Paid</Badge>
                    ) : (
                      <div className="text-sm text-blue-600">Unpaid</div>
                    )
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
