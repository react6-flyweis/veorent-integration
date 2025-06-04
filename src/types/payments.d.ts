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

interface IOneTimeChargeCreate {
  category: string; // enum: ['Rent', 'Utilities', 'Other']
  description: string;
  amount: number;
  dueDate: string; // ISO date string
  bankAccount: string; // Masked bank account number
  chargeType: "One-Time"; // enum: ['Monthly', 'One-Time']
  lease?: string;
  property?: string;
}

interface IMonthlyChargeCreate {
  category: string; // enum: ['Rent', 'Utilities', 'Other']
  description: string;
  amount: number;
  dueDate: string; // ISO date string
  month: string; // e.g., "October"
  year: string; // e.g., "2024"
  automaticLateFee?: boolean;
  lateFeePay?: "Flat" | "Percentage"; // enum: ['Flat', 'Percentage']
  flatAmount?: number; // Required if lateFeePay is "Flat"
  applyLateFee?: string; // enum: ['Same-Day', '1 Day After Rent Is Due', '1 week After Rent Is Due']
  bankAccount: string; // Masked bank account number
  chargeType: "Monthly"; // enum: ['Monthly', 'One-Time']
  lease?: string;
  property?: string;
}

interface IDailyChargeCreate {
  category: string; // enum: ['Rent', 'Utilities', 'Other']
  description: string;
  amount: number;
  startDate: string; // ISO date string - when daily charges begin
  endDate?: string; // ISO date string - optional, when daily charges stop
  bankAccount: string; // Masked bank account number
  chargeType: "Daily"; // enum: ['Monthly', 'One-Time', 'Daily']
  lease?: string;
  property?: string;
}
