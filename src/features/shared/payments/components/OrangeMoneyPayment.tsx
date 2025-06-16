import { useState, useEffect } from "react";
import { Loader2, Phone, AlertCircle, CheckCircle, Shield } from "lucide-react";

import orangeMoneyImg from "@/assets/images/orange-money.png";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/useAlertToast";
import {
  validateOrangeMoneyPhoneNumber,
  formatOrangeMoneyAmount,
  validateOrangeMoneyAmount,
  ORANGE_MONEY_COUNTRIES,
  formatOrangeMoneyPhoneNumber,
  generateOrangeMoneyOrderId,
} from "@/utils/orangeMoney";

import { orangeMoneyAPI } from "../api/orangeMoney";

interface OrangeMoneyPaymentProps {
  amount: number | string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

export function OrangeMoneyPayment({
  amount,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: OrangeMoneyPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    countryCode: "ML", // Default to Mali
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTransaction, setCurrentTransaction] = useState<string | null>(
    null,
  );
  const { showToast } = useToast();

  const selectedCountry = ORANGE_MONEY_COUNTRIES.find(
    (country) => country.code === formData.countryCode,
  );
  const currency = selectedCountry?.currency || "XAF";

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      !validateOrangeMoneyPhoneNumber(
        formData.phoneNumber,
        formData.countryCode,
      )
    ) {
      newErrors.phoneNumber = "Please enter a valid Orange Money phone number";
    }

    if (!validateOrangeMoneyAmount(amount, currency)) {
      newErrors.amount = `Invalid amount for ${currency}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");

    try {
      const orderId = generateOrangeMoneyOrderId();
      const formattedPhoneNumber = formatOrangeMoneyPhoneNumber(
        formData.phoneNumber,
        formData.countryCode,
      );

      // Process payment
      const paymentResponse = await orangeMoneyAPI.completePayment({
        amount: amount.toString(),
        subscriberMsisdn: formattedPhoneNumber,
        channelUserMsisdn: formattedPhoneNumber, // Using same number for channel user
        orderId,
        description: `Payment for order ${orderId}`,
        notifUrl: `${window.location.origin}/api/notifications/orange-money`, // Notification URL
      });

      const { data: transactionData } = paymentResponse;
      setCurrentTransaction(transactionData.txnid);

      // If payment is immediately successful
      if (transactionData.status === "SUCCESS") {
        setPaymentStatus("success");
        showToast("Payment completed successfully!", "success");
        onPaymentSuccess(transactionData.txnid);
        return;
      }

      // If payment failed immediately
      if (transactionData.status === "FAILED") {
        setPaymentStatus("error");
        const errorMessage =
          transactionData.confirmtxnmessage ||
          transactionData.inittxnmessage ||
          "Payment failed";
        showToast(errorMessage, "error");
        onPaymentError(errorMessage);
        return;
      }

      // If payment is pending, start polling for status
      if (transactionData.status === "PENDING") {
        showToast(
          transactionData.inittxnmessage ||
            "Please confirm the payment on your phone",
          "info",
        );
        await pollPaymentStatus(transactionData.payToken);
      }
    } catch (error) {
      console.error("Orange Money payment error:", error);
      setPaymentStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";
      showToast(errorMessage, "error");
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Poll payment status
  const pollPaymentStatus = async (payToken: string) => {
    try {
      // Get fresh access token for status polling
      const tokenResponse = await orangeMoneyAPI.getAccessToken();
      const { access_token } = tokenResponse;

      const statusResponse = await orangeMoneyAPI.pollPaymentStatus(
        payToken,
        access_token,
        20, // Max attempts
        3000, // 3 seconds interval
      );

      const { data: statusData } = statusResponse;

      if (statusData.status === "SUCCESS") {
        setPaymentStatus("success");
        showToast("Payment completed successfully!", "success");
        onPaymentSuccess(statusData.txnid);
      } else if (statusData.status === "FAILED") {
        setPaymentStatus("error");
        const errorMessage =
          statusData.confirmtxnmessage ||
          statusData.inittxnmessage ||
          "Payment failed";
        showToast(errorMessage, "error");
        onPaymentError(errorMessage);
      } else {
        // Still pending after polling timeout
        setPaymentStatus("error");
        showToast("Payment confirmation timeout. Please try again.", "error");
        onPaymentError("Payment confirmation timeout");
      }
    } catch (error) {
      console.error("Payment status polling error:", error);
      setPaymentStatus("error");
      showToast("Failed to check payment status", "error");
      onPaymentError("Failed to check payment status");
    }
  };

  // Reset form when country changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, phoneNumber: "" }));
    setErrors({});
  }, [formData.countryCode]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "processing":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-orange-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "processing":
        return "Processing your payment...";
      case "success":
        return "Payment completed successfully!";
      case "error":
        return "Payment failed. Please try again.";
      default:
        return "Secure payment with Orange Money";
    }
  };

  return (
    <div className="flex h-full max-h-[90vh] flex-col overflow-hidden">
      <Card className="border-orange-200">
        <CardHeader className="space-y-2 pb-4">
          <div className="flex items-center gap-3">
            <img
              src={orangeMoneyImg}
              alt="Orange Money"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <CardTitle className="text-xl">Orange Money Payment</CardTitle>
              <CardDescription>
                Pay {formatOrangeMoneyAmount(amount, currency)} securely
              </CardDescription>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            {getStatusIcon()}
            <span>{getStatusMessage()}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Country Selection */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.countryCode}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, countryCode: value }))
                }
                disabled={isProcessing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {ORANGE_MONEY_COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="text-muted-foreground">
                          ({country.currency})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Orange Money Phone Number
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Phone className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder={
                    formData.countryCode === "ML"
                      ? "6XXXXXXXX or 7XXXXXXXX"
                      : formData.countryCode === "CM"
                        ? "6XXXXXXXX"
                        : "Phone number"
                  }
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className="pl-10"
                  disabled={isProcessing}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Transaction Info */}
            {currentTransaction && (
              <div className="rounded-md bg-orange-50 p-3">
                <p className="text-sm text-orange-800">
                  <strong>Transaction ID:</strong> {currentTransaction}
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing || paymentStatus === "success"}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ${formatOrangeMoneyAmount(amount, currency)}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
