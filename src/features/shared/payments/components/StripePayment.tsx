import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/loading-button";
import { useStripePaymentReturn } from "@/hooks/useStripePaymentReturn";
import {
  createCheckoutSessionViaBackend,
  redirectToStripeCheckout,
} from "@/utils/stripePayment";

interface StripePaymentProps {
  amount: number | string;
  onPaymentSuccess?: (sessionId: string) => void;
  onPaymentError?: (error: string) => void;
  onCancel?: () => void;
}

export function StripePayment({
  amount,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: StripePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasHandledReturn, setHasHandledReturn] = useState(false);
  const stripeReturn = useStripePaymentReturn();

  // Handle Stripe payment return
  useEffect(() => {
    // Don't process if we've already handled this return
    if (hasHandledReturn) return;

    // Check if we have Stripe return parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");
    const isCancelled = urlParams.get("payment") === "cancelled";

    // Handle successful payment
    if (sessionId && stripeReturn.isSuccess && !stripeReturn.isVerifying) {
      setHasHandledReturn(true);
      if (onPaymentSuccess) {
        onPaymentSuccess(sessionId);
      } else {
        toast.success("Payment successful!");
      }
      return;
    }

    // Handle payment error/cancellation
    if (sessionId && stripeReturn.errorMessage && !stripeReturn.isVerifying) {
      setHasHandledReturn(true);
      if (onPaymentError) {
        onPaymentError(stripeReturn.errorMessage);
      } else {
        toast.error(stripeReturn.errorMessage);
      }
      return;
    }

    // Handle cancelled payment
    if (isCancelled) {
      setHasHandledReturn(true);
      if (onCancel) {
        onCancel();
      } else {
        toast.info("Payment was cancelled");
      }
      return;
    }

    // Handle generic error case
    if (sessionId && stripeReturn.isError && !stripeReturn.isVerifying) {
      setHasHandledReturn(true);
      const errorMsg = "Payment verification failed";
      if (onPaymentError) {
        onPaymentError(errorMsg);
      } else {
        toast.error(errorMsg);
      }
    }
  }, [
    stripeReturn,
    hasHandledReturn,
    onPaymentSuccess,
    onPaymentError,
    onCancel,
  ]);

  const handleStripePayment = async () => {
    setIsProcessing(true);

    try {
      const numericAmount =
        typeof amount === "string" ? parseFloat(amount) : amount;

      // Create success and cancel URLs that return to current page
      const currentUrl = window.location.href.split("?")[0]; // Remove existing query params
      const successUrl = `${currentUrl}?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${currentUrl}?payment=cancelled`;

      // Create Stripe checkout session via backend
      const session = await createCheckoutSessionViaBackend({
        amount: numericAmount,
        currency: "usd",
        description: `Payment of $${numericAmount}`,
        successUrl,
        cancelUrl,
      });

      // Redirect to Stripe checkout using the SDK
      // This will navigate away from the current page
      await redirectToStripeCheckout(session.id);
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
    // Don't set setIsProcessing(false) here because we're redirecting
  };

  return (
    <div className="flex h-full max-h-[90vh] flex-col overflow-hidden">
      <DialogTitle className="mb-4 flex-shrink-0 text-left text-xl font-bold">
        Card Payment
      </DialogTitle>

      <div className="flex-1 space-y-6">
        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="rounded-lg bg-yellow-50 p-2 text-xs">
            <p>
              Debug: Session ID:{" "}
              {new URLSearchParams(window.location.search).get("session_id") ||
                "None"}
            </p>
            <p>
              Debug: Stripe Return Status:{" "}
              {stripeReturn.isSuccess
                ? "Success"
                : stripeReturn.isError
                  ? "Error"
                  : "Pending"}
            </p>
            <p>
              Debug: Is Verifying: {stripeReturn.isVerifying ? "Yes" : "No"}
            </p>
            <p>Debug: Error Message: {stripeReturn.errorMessage || "None"}</p>
            <p>Debug: Has Handled: {hasHandledReturn ? "Yes" : "No"}</p>
          </div>
        )}

        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Amount to pay:</span>
            <span className="text-2xl font-bold text-green-600">${amount}</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Show verification status if we're processing a return */}
          {new URLSearchParams(window.location.search).has("session_id") &&
            stripeReturn.isVerifying && (
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="mb-2 font-medium text-blue-900">
                  Verifying Payment...
                </h3>
                <p className="text-sm text-blue-700">
                  Please wait while we verify your payment with Stripe.
                </p>
              </div>
            )}

          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 font-medium">Secure Payment with Stripe</h3>
            <p className="text-sm text-gray-600">
              You will be redirected to Stripe's secure checkout page to
              complete your payment. All card information is processed securely
              by Stripe.
            </p>
          </div>

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
