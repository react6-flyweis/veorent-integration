interface IPendingRent {
  _id: string;
  userId: IUser;
  bookingId: IBooking;
  amount: number;
  dueDate: string; // ISO date string
  depositedMoney: number;
  lateFee: number;
  depositedMoneyDueDate: string; // ISO date string
  amountStatus: "Paid" | "Overdue" | "Pending";
  depositedStatus: "Paid" | "Overdue" | "Pending";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  // Additional fields as needed
}
