import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";

interface StripeElementsProps {
  handlePaymentSuccess: () => Promise<void>;
}

function StripeElementsDialog({
  handlePaymentSuccess,
  stripeClientSecret,
}: {
  handlePaymentSuccess: () => Promise<void>;
  stripeClientSecret: string;
}) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStripePayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");
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
        toast.error(result.error.message || "Payment failed");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        setIsProcessing(false);
        await handlePaymentSuccess();
      }
    } catch (error) {
      console.error("Stripe payment error:", error);
      const errorMsg =
        error instanceof Error ? error.message : "Payment failed";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-full max-h-[90vh] flex-col overflow-y-auto">
      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}
          <PaymentElement />

          {elements && (
            <Button
              onClick={handleStripePayment}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <span>{t("payNow")}</span>
                  <CurrencyIcon size="sm" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function StripeElements({ handlePaymentSuccess }: StripeElementsProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Get client secret from localStorage
  useState(() => {
    const secret = localStorage.getItem("stripeSecret");
    setClientSecret(secret);
  });

  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!,
  );

  if (!clientSecret) {
    return (
      <div className="py-4 text-center">
        <p className="text-muted-foreground">
          Payment intent not found. Please refresh and try again.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeElementsDialog
        handlePaymentSuccess={handlePaymentSuccess}
        stripeClientSecret={clientSecret}
      />
    </Elements>
  );
}
