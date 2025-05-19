import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionCard } from "./TransactionCard";

export interface ITransaction {
  id: string;
  amount: number;
  currency: string;
  type: string;
  description: string;
  status: string;
  method: string;
}

const transactionsByDate: Record<string, ITransaction[]> = {
  "2025-05-15": [
    {
      id: "txn_1001",
      amount: 49.99,
      currency: "USD",
      type: "Debit",
      description: "Spotify Subscription",
      status: "Completed",
      method: "Credit Card",
    },
  ],
  "2025-05-14": [
    {
      id: "txn_1002",
      amount: 120.0,
      currency: "USD",
      type: "Credit",
      description: "Freelance Payment",
      status: "Completed",
      method: "PayPal",
    },
  ],
  "2025-05-13": [
    {
      id: "txn_1003",
      amount: 15.25,
      currency: "USD",
      type: "Debit",
      description: "Coffee Shop",
      status: "Completed",
      method: "Debit Card",
    },
    {
      id: "txn_1004",
      amount: 200.0,
      currency: "USD",
      type: "Debit",
      description: "Amazon Purchase",
      status: "Completed",
      method: "Credit Card",
    },
  ],
  "2025-05-12": [
    {
      id: "txn_1005",
      amount: 950.0,
      currency: "USD",
      type: "Credit",
      description: "Salary Deposit",
      status: "Completed",
      method: "Bank Transfer",
    },
    {
      id: "txn_1006",
      amount: 7.99,
      currency: "USD",
      type: "Debit",
      description: "Netflix Subscription",
      status: "Completed",
      method: "UPI",
    },
  ],
  "2025-05-11": [
    {
      id: "txn_1007",
      amount: 36.5,
      currency: "USD",
      type: "Debit",
      description: "Grocery Store",
      status: "Completed",
      method: "Debit Card",
    },
  ],
  "2025-05-10": [
    {
      id: "txn_1008",
      amount: 25.0,
      currency: "USD",
      type: "Credit",
      description: "Refund from Amazon",
      status: "Completed",
      method: "Credit Card",
    },
    {
      id: "txn_1009",
      amount: 4.75,
      currency: "USD",
      type: "Debit",
      description: "Coffee",
      status: "Completed",
      method: "Cash",
    },
  ],
  "2025-05-09": [
    {
      id: "txn_1010",
      amount: 150.0,
      currency: "USD",
      type: "Debit",
      description: "Electricity Bill",
      status: "Completed",
      method: "Net Banking",
    },
  ],
};

export function Transactions() {
  return (
    <div className="space-y-6">
      {Object.entries(transactionsByDate).map(([date, transactions]) => (
        <div key={date}>
          <div className="bg-accent px-4 py-2 text-lg font-semibold text-primary flex justify-between">
            <span> {date}</span>
            <span>Amount</span>
          </div>
          <ScrollArea>
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} data={transaction} />
            ))}
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
