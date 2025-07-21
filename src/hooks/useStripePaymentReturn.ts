import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { verifyPaymentSession } from "@/utils/stripePayment";

export interface StripePaymentReturn {
  sessionId: string | null;
  isSuccess: boolean;
  isError: boolean;
  isVerifying: boolean;
  paymentDetails: {
    status?: string;
    payment_status?: string;
    amount_total?: number;
    currency?: string;
    customer_email?: string;
  } | null;
  errorMessage?: string;
}

export function useStripePaymentReturn(): StripePaymentReturn {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentDetails, setPaymentDetails] =
    useState<StripePaymentReturn["paymentDetails"]>(null);
  const [verificationError, setVerificationError] = useState<
    string | undefined
  >();

  const sessionId = searchParams.get("session_id");
  const isError = searchParams.get("payment") === "cancelled";

  // Verify payment when session ID is present
  useEffect(() => {
    if (sessionId && !paymentDetails && !isVerifying) {
      setIsVerifying(true);
      verifyPaymentSession(sessionId)
        .then((details) => {
          setPaymentDetails(details);
          setVerificationError(undefined);
        })
        .catch((error) => {
          console.error("Payment verification failed:", error);
          setVerificationError(error.message || "Payment verification failed");
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [sessionId, paymentDetails, isVerifying]);

  const isSuccess =
    Boolean(sessionId) && paymentDetails?.payment_status === "paid";

  useEffect(() => {
    // Clean up URL parameters after handling
    if (sessionId || isError) {
      const url = new URL(window.location.href);
      url.searchParams.delete("session_id");
      url.searchParams.delete("payment");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [sessionId, isError]);

  return {
    sessionId,
    isSuccess,
    isError,
    isVerifying,
    paymentDetails,
    errorMessage:
      verificationError || (isError ? "Payment was cancelled" : undefined),
  };
}

// Utility hook to handle payment return in any component
export function useHandleStripeReturn(
  onSuccess?: (
    sessionId: string,
    paymentDetails: NonNullable<StripePaymentReturn["paymentDetails"]>,
  ) => void,
  onCancel?: () => void,
  onError?: (error: string) => void,
) {
  const paymentReturn = useStripePaymentReturn();

  useEffect(() => {
    if (
      paymentReturn.isSuccess &&
      paymentReturn.sessionId &&
      onSuccess &&
      paymentReturn.paymentDetails
    ) {
      onSuccess(paymentReturn.sessionId, paymentReturn.paymentDetails);
    } else if (paymentReturn.isError) {
      if (onCancel) {
        onCancel();
      } else if (onError && paymentReturn.errorMessage) {
        onError(paymentReturn.errorMessage);
      }
    } else if (
      paymentReturn.errorMessage &&
      onError &&
      !paymentReturn.isVerifying
    ) {
      onError(paymentReturn.errorMessage);
    }
  }, [paymentReturn, onSuccess, onCancel, onError]);

  return paymentReturn;
}
