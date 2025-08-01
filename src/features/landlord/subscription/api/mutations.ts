import { useMutation } from "@tanstack/react-query";

import { axiosLandlord } from "../../api/axios";

// enum: ['credit_card', 'debit_card', 'UPI', 'net_banking', 'wallet', 'orange-money', 'stripe', 'momo'],
type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "UPI"
  | "net_banking"
  | "wallet"
  | "orange-money"
  | "stripe"
  | "momo";

// /partner/purchase
export const usePurchaseSubscriptionMutation = () => {
  return useMutation({
    mutationFn: (data: {
      subscriptionId: string;
      paymentMethod: PaymentMethod;
    }) => axiosLandlord.post<IPurchaseSubscriptionResponse>("/purchase", data),
  });
};
