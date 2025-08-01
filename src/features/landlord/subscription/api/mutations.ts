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

// /update-payment-status
export const useUpdatePaymentStatusMutation = () => {
  return useMutation({
    mutationFn: (data: {
      subscriptionId: string;
      transactionId: string;
      paymentStatus: "completed" | "failed" | "pending";
    }) => axiosLandlord.put<IResponse<"">>("/update-payment-status", data),
  });
};

// /cancel
export const useCancelSubscriptionMutation = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) =>
      axiosLandlord.post<IResponse<"">>("/cancel", { subscriptionId }),
  });
};
