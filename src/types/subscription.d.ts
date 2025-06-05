interface ISubscription {
  _id: string;
  name: string;
  price: number;
  billingCycle: "Monthly" | "Yearly";
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
