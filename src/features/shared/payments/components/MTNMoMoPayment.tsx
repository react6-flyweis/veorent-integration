import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import mtnImg from "@/assets/images/mtn.png";
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
  validateMTNMoMoPhoneNumber,
  formatMTNMoMoAmount,
  validateMTNMoMoAmount,
  getSupportedCurrencies,
} from "@/utils/mtnMomo";

import { mtnMomoAPI } from "../api/mtnMomo";

interface MTNMoMoPaymentProps {
  amount: number | string;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

const SUPPORTED_COUNTRIES = [
  { code: "UG", name: "Uganda", flag: "🇺🇬" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "CM", name: "Cameroon", flag: "🇨🇲" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "ZM", name: "Zambia", flag: "🇿🇲" },
];

export function MTNMoMoPayment({
  amount,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: MTNMoMoPaymentProps) {
  const { t } = useTranslation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [transactionId, setTransactionId] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState("UG");
  const [selectedCurrency, setSelectedCurrency] = useState("UGX");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Validate phone number in real-time
  const phoneValidation = phoneNumber
    ? validateMTNMoMoPhoneNumber(phoneNumber, selectedCountry)
    : null;

  // Validate amount
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  const amountValidation = validateMTNMoMoAmount(
    numericAmount,
    selectedCurrency,
  );

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const currencies = getSupportedCurrencies(countryCode);
    setSelectedCurrency(currencies[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneValidation?.isValid) {
      onPaymentError("Please enter a valid MTN phone number");
      return;
    }

    if (!amountValidation.isValid) {
      onPaymentError(amountValidation.message || "Invalid amount");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");
    setStatusMessage("Initiating payment...");

    try {
      const paymentData: IMTNMoMoPaymentRequest = {
        amount: numericAmount.toString(),
        currency: selectedCurrency,
        payer: {
          partyIdType: "MSISDN",
          partyId: phoneValidation.formattedNumber,
        },
        externalId: `veorent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        payerMessage: `VeoRent payment of ${formatMTNMoMoAmount(numericAmount, selectedCurrency)}`,
        payeeNote: `Payment from ${phoneNumber}`,
      };

      const response = await mtnMomoAPI.requestToPay(paymentData);

      if (response) {
        setTransactionId(response.transaction.referenceId);
        setStatusMessage(
          "Payment initiated. Please check your phone for the payment prompt.",
        );

        // Poll for payment status
        pollPaymentStatus(response.transaction.referenceId);
      } else {
        throw new Error("Payment initiation failed");
      }
    } catch (error) {
      console.error("MTN MoMo payment error:", error);
      setPaymentStatus("error");
      setStatusMessage("Payment failed. Please try again.");
      onPaymentError(error instanceof Error ? error.message : "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const pollPaymentStatus = async (txnId: string) => {
    const maxAttempts = 30; // 30 attempts with 2-second intervals = 1 minute
    let attempts = 0;

    const checkStatus = async () => {
      try {
        attempts++;
        const statusResponse = await mtnMomoAPI.getPaymentStatus(txnId);

        if (statusResponse.status === 200) {
          const { Status } = statusResponse.transaction;
          const status = Status.toLowerCase();

          if (status === "successful") {
            setPaymentStatus("success");
            setStatusMessage("Payment completed successfully!");
            toast.success("Payment successful!");
            onPaymentSuccess(txnId);
            return;
          } else if (status === "failed") {
            setPaymentStatus("error");
            setStatusMessage("Payment failed. Please try again.");
            onPaymentError("Payment failed");
            return;
          } else if (status === "pending" && attempts < maxAttempts) {
            setStatusMessage(
              `Waiting for payment confirmation... (${attempts}/${maxAttempts})`,
            );
            setTimeout(checkStatus, 2000); // Check again in 2 seconds
          } else {
            // Timeout
            setPaymentStatus("error");
            setStatusMessage(
              "Payment timeout. Please check your transaction history.",
            );
            onPaymentError("Payment timeout");
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 2000);
        } else {
          setPaymentStatus("error");
          setStatusMessage(
            "Unable to verify payment status. Please check your transaction history.",
          );
          onPaymentError("Payment verification failed");
        }
      }
    };

    checkStatus();
  };

  if (paymentStatus === "success") {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your MTN MoMo payment has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Transaction ID:</p>
            <p className="font-mono text-sm">{transactionId}</p>
          </div>
          <Button
            onClick={() => onPaymentSuccess(transactionId)}
            className="w-full"
          >
            {t("continue")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src={mtnImg} alt="MTN" className="h-6 w-6" />
          MTN Mobile Money
        </CardTitle>
        <CardDescription>
          Pay {formatMTNMoMoAmount(numericAmount, selectedCurrency)} using MTN
          MoMo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country Selection */}
          <div className="space-y-2">
            <Label htmlFor="country">{t("country")}</Label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {SUPPORTED_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {getSupportedCurrencies(selectedCountry).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">MTN Phone Number</Label>
            <div className="relative">
              <Phone className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your MTN number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
              />
            </div>
            {phoneValidation && !phoneValidation.isValid && phoneNumber && (
              <p className="text-sm text-red-600">
                Please enter a valid MTN number
              </p>
            )}
            {phoneValidation && phoneValidation.isValid && (
              <p className="text-sm text-green-600">
                ✓ {phoneValidation.countryCode}
                {phoneValidation.formattedNumber.replace(
                  phoneValidation.countryCode.replace("+", ""),
                  "",
                )}
              </p>
            )}
          </div>

          {/* Amount Validation */}
          {!amountValidation.isValid && (
            <div className="flex items-center gap-2 rounded-md border border-red-300 bg-red-50 p-3">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-600">{amountValidation.message}</p>
            </div>
          )}

          {/* Status Message */}
          {paymentStatus !== "idle" && (
            <div
              className={`flex items-center gap-2 rounded-md border p-3 ${
                paymentStatus === "error"
                  ? "border-red-300 bg-red-50"
                  : "border-blue-300 bg-blue-50"
              }`}
            >
              {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
              {paymentStatus === "error" && (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <p
                className={`text-sm ${paymentStatus === "error" ? "text-red-600" : "text-blue-600"}`}
              >
                {statusMessage}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                isProcessing ||
                !amountValidation.isValid ||
                !phoneValidation?.isValid
              }
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                t("payNow")
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
