"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwissFrancIcon } from "lucide-react";
import { z } from "zod";

import amexImg from "@/assets/images/amex.png";
import discoverImg from "@/assets/images/discover.png";
import masterImg from "@/assets/images/master.png";
import mtnIcon from "@/assets/images/mtn.png";
import orangePayIcon from "@/assets/images/orange-money.png";
import visaImg from "@/assets/images/visa.png";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import {
  CardCvcInput,
  CardExpiryInput,
  CardNumberInput,
} from "@/components/ui/card-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";

import { useUpdateBookingMutation } from "../../api/mutation";

const PaymentSchema = z.object({
  cardHolderName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiration: z.string().regex(/^\d{2}\/\d{2}$/, "Use MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  zipCode: z.string().min(3, "Zip code is required"),
});

type PaymentFormType = z.infer<typeof PaymentSchema>;

const SCREENING_AMOUNT = 55.0; // Example amount, can be dynamic

export function PaymentFee() {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutateAsync: updateBooking } = useUpdateBookingMutation(id || "");

  const form = useForm<PaymentFormType>({
    resolver: zodResolver(PaymentSchema),
  });

  const onSubmit = (data: PaymentFormType) => {
    // Form submission for card payment if needed
    // This would handle the card payment flow
    console.log("Form submitted with data:", data);
  };

  const handlePayment = async () => {
    setIsPaymentProcessing(true);
    try {
      // Simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the booking status and payment status
      await updateBooking({
        paymentStatus: "Paid",
      });

      navigate("/tenant/payment/success", {
        state: { amount: SCREENING_AMOUNT, redirectUrl: "/tenant" },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      // Handle payment failure (e.g., show error message)
    } finally {
      setIsPaymentProcessing(false);
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
        <h2 className="text-primary text-2xl font-bold">Pay Screening Fee</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <p className="text-muted-foreground font-semibold uppercase">
              Payment Amount
            </p>
            <div className="flex items-center gap-1">
              <CurrencyIcon />
              <p className="text-2xl font-bold">{SCREENING_AMOUNT}</p>
            </div>
          </div>

          <div className="space-y-2">
            <LoadingButton
              type="button"
              onClick={handlePayment}
              className="w-full"
              isLoading={isPaymentProcessing}
            >
              <img
                src={orangePayIcon}
                alt="orange pay"
                className="size-5 rounded-full"
              />
              Orange money pay
            </LoadingButton>
            <LoadingButton
              type="button"
              onClick={handlePayment}
              className="w-full"
              isLoading={isPaymentProcessing}
            >
              <img
                src={mtnIcon}
                alt="mtn money"
                className="size-5 rounded-full"
              />
              MTN money pay
            </LoadingButton>
          </div>

          <div className="relative flex items-center justify-center py-5">
            <div className="border-accent w-full border"></div>
            <div className="text-muted-foreground absolute bg-white p-1 px-3 text-center text-sm">
              OR
            </div>
          </div>

          <div className="flex gap-1">
            <img src={amexImg} alt="" className="h-8" />
            <img src={discoverImg} alt="" className="h-8" />
            <img src={visaImg} alt="" className="h-8" />
            <img src={masterImg} alt="" className="h-8" />
          </div>

          {/* Card Fields */}
          <FormField
            control={form.control}
            name="cardHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name on card" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <CardNumberInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration</FormLabel>
                  <FormControl>
                    <CardExpiryInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <CardCvcInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled type="submit" className="w-full">
            <span>Pay</span>
            <CurrencyIcon size="sm" />
            <span>{SCREENING_AMOUNT}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
