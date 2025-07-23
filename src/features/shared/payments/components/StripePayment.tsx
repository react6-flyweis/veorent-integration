import { useState } from "react";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";

interface StripePaymentProps {
  amount: number | string;
  stripeClientSecret: string;
  onPaymentSuccess?: (sessionId: string) => void;
  onPaymentError?: (error: string) => void;
  onCancel?: () => void;
}

function StripePaymentDialog({
  amount,
  stripeClientSecret,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: StripePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");

  const handleStripePayment = async () => {
    setIsProcessing(true);

    try {
      if (!stripe || !elements) {
        setErrorMessage("Stripe is not initialized");
        setIsProcessing(false);
        return;
      }

      elements.submit();

      const result = await stripe.confirmPayment({
        elements,
        clientSecret: stripeClientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/tenant/payment/success`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setErrorMessage(result.error.message || "Payment failed");
        setIsProcessing(false);
        if (onPaymentError) {
          onPaymentError(result.error.message || "Payment failed");
        } else {
          toast.error(result.error.message || "Payment failed");
        }
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        setIsProcessing(false);
        onPaymentSuccess?.(result.paymentIntent.id);
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";

      if (onPaymentError) {
        onPaymentError(errorMessage);
      } else {
        toast.error(errorMessage);
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-full max-h-[90vh] flex-col overflow-y-auto">
      <DialogTitle className="mb-4 flex-shrink-0 text-left text-xl font-bold">
        Card Payment
      </DialogTitle>

      <div className="flex-1 space-y-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Amount to pay:</span>
            <span className="text-2xl font-bold text-green-600">${amount}</span>
          </div>
        </div>

        <div className="space-y-4">
          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <PaymentElement />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <LoadingButton
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleStripePayment}
              isLoading={isProcessing}
              disabled={isProcessing}
            >
              Pay with Stripe
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StripePayment({
  amount,
  stripeClientSecret,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: StripePaymentProps) {
  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!,
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: stripeClientSecret }}
    >
      <StripePaymentDialog
        amount={amount}
        stripeClientSecret={stripeClientSecret}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        onCancel={onCancel}
      />
    </Elements>
  );
}
