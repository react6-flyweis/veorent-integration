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

interface ILandlordSubscription {
  user: string;
  subscription: string;
  startDate: string;
  endDate: string;
  paymentStatus: string;
  paymentMethod: PaymentMethod;
  transactionId: string | null;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IPurchaseSubscriptionResponse {
  message: string;
  userSubscription: ILandlordSubscription;
  stripeClientSecret: string;
}

interface IActiveSubscription {
  subscription: ISubscription;
  startDate: string;
  endDate: string;
  paymentStatus: "completed" | "failed" | "pending";
  paymentMethod: PaymentMethod;
  transactionId: string | null;
  isActive: boolean;
}
