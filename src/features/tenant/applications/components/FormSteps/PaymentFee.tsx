"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { SwissFrancIcon } from "lucide-react";

import mtnIcon from "@/assets/images/mtn.png";
import orangePayIcon from "@/assets/images/orange-money.png";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SCREENING_AMOUNT } from "@/constants";
import { PaymentModeDialog } from "@/features/shared/payments/components/PaymentModeDialog";
import { StripeElements } from "@/features/shared/payments/components/StripeElements";

import { useUpdateBookingMutation } from "../../api/mutation";

export function PaymentFee() {
  const { t } = useTranslation();

  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "card" | "mtn" | "orange"
  >("orange");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { mutateAsync: updateBooking } = useUpdateBookingMutation(id || "");

  const handlePaymentMethodSelect = (method: "card" | "mtn" | "orange") => {
    setSelectedPaymentMethod(method);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await updateBooking({
        paymentStatus: "Paid",
      });
      navigate("/tenant/payment/success", {
        state: {
          amount: SCREENING_AMOUNT,
          redirectUrl: "/tenant/dashboard",
        },
      });
    } catch (error) {
      // Handle error, maybe show a toast
      console.error("Failed to update payment status:", error);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-blue-50">
          <div className="border-primary flex size-8 items-center justify-center rounded-full border-2">
            <SwissFrancIcon />
          </div>
        </div>
        <h2 className="text-primary text-2xl font-bold">
          {t("paymentFee.title")}
        </h2>
      </div>

      <div>
        <p className="text-muted-foreground font-semibold uppercase">
          {t("paymentFee.amount")}
        </p>
        <div className="flex items-center gap-1">
          <CurrencyIcon />
          <p className="text-2xl font-bold">{SCREENING_AMOUNT}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Dialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              type="button"
              onClick={() => handlePaymentMethodSelect("orange")}
              className="w-full"
            >
              <img
                src={orangePayIcon}
                alt="orange pay"
                className="size-5 rounded-full"
              />
              {t("paymentFee.orangePay")}
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              type="button"
              onClick={() => handlePaymentMethodSelect("mtn")}
              className="w-full"
            >
              <img
                src={mtnIcon}
                alt="mtn money"
                className="size-5 rounded-full"
              />
              {t("paymentFee.mtnPay")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <PaymentModeDialog
              amount={SCREENING_AMOUNT}
              defaultPaymentMethod={selectedPaymentMethod}
              onSuccess={handlePaymentSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative flex items-center justify-center py-5">
        <div className="border-accent w-full border"></div>
        <div className="text-muted-foreground absolute bg-white p-1 px-3 text-center text-sm">
          {t("paymentFee.or")}
        </div>
      </div>

      {/* Stripe Payment Section */}
      <StripeElements handlePaymentSuccess={handlePaymentSuccess} />
    </div>
  );
}
