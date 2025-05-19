"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SwissFrancIcon } from "lucide-react";

import orangePayIcon from "@/assets/images/orange-money.png";
import mtnIcon from "@/assets/images/mtn.png";

import amexImg from "@/assets/images/amex.png";
import discoverImg from "@/assets/images/discover.png";
import visaImg from "@/assets/images/visa.png";
import masterImg from "@/assets/images/master.png";
import { useNavigate } from "react-router";

const PaymentSchema = z.object({
  cardHolderName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiration: z.string().regex(/^\d{2}\/\d{2}$/, "Use MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  zipCode: z.string().min(3, "Zip code is required"),
});

type PaymentFormType = z.infer<typeof PaymentSchema>;

export function PaymentFee() {
  const navigate = useNavigate();
  const form = useForm<PaymentFormType>({
    resolver: zodResolver(PaymentSchema),
  });

  const onSubmit = (data: PaymentFormType) => {
    console.log("Payment Data:", data);
  };

  const successPayment = () => {
    navigate("/payment/success");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="size-12 bg-blue-50 flex justify-center items-center rounded-full">
          <div className="flex justify-center items-center size-8 border-primary rounded-full border-2">
            <SwissFrancIcon />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-primary">Pay Screening Fee</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <p className="font-semibold text-muted-foreground uppercase">
              Payment Amount
            </p>
            <p className="text-lg font-bold">₣55.00</p>
          </div>

          <div className="space-y-2">
            <Button type="button" onClick={successPayment} className="w-full">
              <img
                src={orangePayIcon}
                alt="orange pay"
                className="size-5 rounded-full"
              />
              Orange money pay
            </Button>
            <Button type="button" onClick={successPayment} className="w-full">
              <img
                src={mtnIcon}
                alt="mtn money"
                className="size-5 rounded-full"
              />
              MTN money pay
            </Button>
          </div>

          <div className="relative flex justify-center items-center py-5">
            <div className="w-full border border-accent"></div>
            <div className="absolute bg-white p-1 px-3 text-center text-muted-foreground text-sm">
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
                  <Input
                    placeholder="1234 1234 1234 1234"
                    maxLength={16}
                    {...field}
                  />
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
                    <Input placeholder="MM/YY" maxLength={5} {...field} />
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
                    <Input placeholder="CVC" maxLength={4} {...field} />
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

          <Button type="submit" className="w-full">
            Pay ₣55.00
          </Button>
        </form>
      </Form>
    </div>
  );
}
