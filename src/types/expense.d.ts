interface IExpense {
  _id: string;
  user: string;
  datePaid?: string;
  amountPaid?: number;
  property?: string;
  description: string;
  notes: string;
  receipts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ICreateExpenseData {
  datePaid: string;
  amountPaid: number;
  property: string;
  description: string;
  notes?: string;
  receipts?: string[];
}
