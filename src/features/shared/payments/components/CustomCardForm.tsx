import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import amexImg from "@/assets/images/amex.png";
import discoverImg from "@/assets/images/discover.png";
import masterImg from "@/assets/images/master.png";
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
import { SCREENING_AMOUNT } from "@/constants";

const PaymentSchema = z.object({
  cardHolderName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string(),
  expiration: z.string(),
  cvc: z.string(),
  // cardNumber: z.string().regex(/^\d{19}$/, "Card number must be 16 digits"),
  // expiration: z.string().regex(/^\d{2} \/\ d{2}$/, "Use MM/YY format"),
  // cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
  zipCode: z.string().min(3, "Zip code is required"),
});

type PaymentFormType = z.infer<typeof PaymentSchema>;

export function CustomCardForm() {
  const { t } = useTranslation();

  const form = useForm<PaymentFormType>({
    resolver: zodResolver(PaymentSchema),
  });

  const onSubmit = async (data: PaymentFormType) => {
    try {
      // Here you would typically call your payment processing function
      console.log("Payment data submitted:", data);
      // For example, you might call confirmPayment with the necessary parameters
      // await confirmPayment(data);
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <div className="flex gap-1">
            <img src={amexImg} alt="" className="h-8" />
            <img src={discoverImg} alt="" className="h-8" />
            <img src={visaImg} alt="" className="h-8" />
            <img src={masterImg} alt="" className="h-8" />
          </div>

          <FormField
            control={form.control}
            name="cardHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("paymentFee.cardHolderName")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("paymentFee.cardHolderName")}
                    {...field}
                  />
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
                <FormLabel>{t("paymentFee.cardNumber")}</FormLabel>
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
                  <FormLabel>{t("paymentFee.expiration")}</FormLabel>
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
                  <FormLabel>{t("paymentFee.cvc")}</FormLabel>
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
                  <FormLabel>{t("paymentFee.zipCode")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("paymentFee.zipCode")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          <span>{t("paymentFee.pay")}</span>
          <CurrencyIcon size="sm" />
          <span>{SCREENING_AMOUNT}</span>
        </Button>
      </form>
    </Form>
  );
}
