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
import { CurrencyIcon } from "@/components/CurrencyIcon";

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
    navigate("/tenant/payment/success");
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
            <span>Pay</span>
            <CurrencyIcon size="sm" />
            <span>55.00</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
