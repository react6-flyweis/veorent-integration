import { useState } from "react";
import { useNavigate } from "react-router";

import cardImg from "@/assets/images/card.png";
import mtnImg from "@/assets/images/mtn.png";
import orangeMoneyImg from "@/assets/images/orange-money.png";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";

const paymentOptions = [
  {
    id: "card",
    label: "Card",
    icon: cardImg,
  },
  {
    id: "mtn",
    label: "MTN money",
    icon: mtnImg,
  },
  {
    id: "orange",
    label: "Orange money",
    icon: orangeMoneyImg,
  },
];

export function PaymentModeDialog({ amount }: { amount: number | string }) {
  const [selected, setSelected] = useState("orange");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const navigate = useNavigate();
  const { userType } = useUserPreferenceStore();

  // Format payment URL with user type prefix
  const paymentSuccessUrl = userType
    ? `/${userType}/payment/success`
    : `/payment/success`;

  const handlePayment = async () => {
    setIsPaymentProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate(paymentSuccessUrl, {
        state: {
          amount,
          paymentMethod: paymentOptions.find((p) => p.id === selected)?.label,
          redirectUrl: userType ? `/${userType}` : "/",
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment failure (e.g., show error message)
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="flex h-full max-h-[90vh] flex-col overflow-hidden">
      <DialogTitle className="mb-4 flex-shrink-0 text-left text-xl font-bold">
        Payment Mode
      </DialogTitle>

      <div className="space-y-4">
        {paymentOptions.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded-md"
          >
            <div className="flex items-center gap-3">
              <img
                src={method.icon}
                alt={method.label}
                className="size-9 rounded-full"
              />
              <span className="font-medium">{method.label}</span>
            </div>
            <Button
              size="sm"
              variant={selected === method.id ? "default" : "outline"}
              className={cn(
                "rounded-full text-xs",
                selected === method.id && "bg-green-500",
              )}
              onClick={() => setSelected(method.id)}
            >
              {selected === method.id ? "Selected" : "Select"}
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-6">
        <LoadingButton
          className="h-14 w-full font-bold"
          onClick={handlePayment}
          isLoading={isPaymentProcessing}
        >
          <div className="flex flex-col items-center">
            <span>CONFIRM &rsaquo;</span>
            <span className="text-sm font-normal text-white/90">
              Pay ${amount} using{" "}
              {paymentOptions.find((p) => p.id === selected)?.label}
            </span>
          </div>
        </LoadingButton>
      </div>
    </div>
  );
}
