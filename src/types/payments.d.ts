interface ICharge {
  _id: string;
  category: string;
  description: string;
  amount: number;
  dueDate: string; // ISO date string
  bankAccount: string; // Masked bank account number
  paidDate: string | null; // ISO date string or null
  chargeType: "One-Time" | "Monthly";
  status: "Pending" | "Paid" | "Overdue";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  lease?: string;
  property?: string;
  month?: string;
  year?: string;
  automaticLateFee?: boolean;
  lateFeePay?: "Flat" | "Percentage";
  flatAmount?: number;
  applyLateFee?: string;
}
