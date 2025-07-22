"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import { SCREENING_AMOUNT } from "@/constants";
import { confirmPayment, createPaymentElement } from "@/utils/stripePayment";

import type { Stripe, StripeElements } from "@stripe/stripe-js";

export function StripeElements({
  handlePaymentSuccess,
}: {
  handlePaymentSuccess: () => Promise<void>;
}) {
  const { t } = useTranslation();

  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!stripe || !elements) {
      setStripeError("Stripe is not initialized");
      return;
    }

    try {
      setIsStripeLoading(true);
      setStripeError(null);

      await confirmPayment(stripe, elements);

      // If payment is successful, update booking and navigate
      await handlePaymentSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
      setStripeError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsStripeLoading(false);
    }
  };

  // Initialize Stripe Elements using the client secret from localStorage
  const initializeStripe = async () => {
    try {
      setIsStripeLoading(true);
      setStripeError(null);

      const clientSecret = localStorage.getItem("stripeSecret");
      if (!clientSecret) {
        throw new Error(
          "Payment intent not found. Please refresh and try again.",
        );
      }

      setClientSecret(clientSecret);

      // Initialize Stripe Elements with the client secret
      const { stripe, elements } = await createPaymentElement(
        "stripe-container",
        clientSecret,
      );

      setStripe(stripe);
      setElements(elements);
    } catch (error) {
      console.error("Failed to initialize Stripe:", error);
      setStripeError(
        error instanceof Error ? error.message : "Failed to initialize payment",
      );
    } finally {
      setIsStripeLoading(false);
    }
  };

  useEffect(() => {
    // Initialize Stripe Elements with the client secret from localStorage
    initializeStripe();
  }, []);

  return (
    <div className="">
      {/* Stripe Payment Section */}
      <div className="space-y-4">
        {stripeError && (
          <div className="text-destructive rounded-md bg-red-50 p-3 text-sm">
            {stripeError}
          </div>
        )}

        {/* Show loading state while initializing */}
        {isStripeLoading && !elements && (
          <div className="py-4 text-center">
            <p className="text-muted-foreground">Initializing payment...</p>
          </div>
        )}

        {/* Stripe Elements container */}
        <div
          id="stripe-container"
          className={elements ? "rounded-md border p-4" : "hidden"}
        ></div>

        {/* Elements payment button - show when properly initialized */}
        {elements && stripe && clientSecret && (
          <Button
            onClick={onSubmit}
            disabled={isStripeLoading}
            className="w-full"
          >
            {isStripeLoading ? (
              "Processing payment..."
            ) : (
              <>
                <span>{t("paymentFee.pay")}</span>
                <CurrencyIcon size="sm" />
                <span>{SCREENING_AMOUNT}</span>
              </>
            )}
          </Button>
        )}

        {/* Fallback: Stripe Checkout option */}
        {!elements && !isStripeLoading && (
          <Button
            onClick={onSubmit}
            disabled={isStripeLoading}
            className="w-full"
            variant="outline"
          >
            {isStripeLoading ? (
              "Processing..."
            ) : (
              <>
                <span>{t("paymentFee.payWithCard") || "Pay with Card"}</span>
                <CurrencyIcon size="sm" />
                <span>{SCREENING_AMOUNT}</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
