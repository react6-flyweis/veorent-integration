"use client";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  CardCvcInput,
  CardExpiryInput,
  CardNumberInput,
} from "@/components/ui/card-input";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateCardMutation } from "../api/mutations";

import type { TFunction } from "i18next";

const createFormSchema = (t: TFunction) =>
  z.object({
    cardHolderName: z
      .string()
      .min(1, t("cardDetailsForm.cardHolderNameRequired")),
    cardNumber: z
      .string()
      .regex(/^\d{16}$/, t("cardDetailsForm.cardNumberInvalid")),
    expiryDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/, t("cardDetailsForm.expiryDateInvalid")),
    cvv: z.string().regex(/^\d{3,4}$/, t("cardDetailsForm.cvvInvalid")),
    country: z.string().min(1, t("cardDetailsForm.countryRequired")),
    isDefault: z.boolean(),
    isCarSaved: z.boolean(),
  });

export function CardDetailsForm() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutateAsync, isPending } = useCreateCardMutation();

  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      country: "",
      isDefault: false,
      isCarSaved: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateAsync(values);
      showToast(t("cardDetailsForm.success"), "success");
      navigate(-1); // Go back to the previous page
    } catch (error) {
      showToast(getErrorMessage(error), "error");
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="cardHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cardDetailsForm.cardHolderName")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
              <FormLabel>{t("cardDetailsForm.cardNumber")}</FormLabel>
              <FormControl>
                <CardNumberInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cardDetailsForm.expiryDate")}</FormLabel>
                  <FormControl>
                    <CardExpiryInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cardDetailsForm.cvv")}</FormLabel>
                  <FormControl>
                    <CardCvcInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cardDetailsForm.country")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("cardDetailsForm.countryPlaceholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USA">
                        {t("cardDetailsForm.usa")}
                      </SelectItem>
                      <SelectItem value="Canada">
                        {t("cardDetailsForm.canada")}
                      </SelectItem>
                      <SelectItem value="UK">
                        {t("cardDetailsForm.uk")}
                      </SelectItem>
                      <SelectItem value="France">
                        {t("cardDetailsForm.france")}
                      </SelectItem>
                      <SelectItem value="Germany">
                        {t("cardDetailsForm.germany")}
                      </SelectItem>
                      <SelectItem value="Other">
                        {t("cardDetailsForm.other")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("cardDetailsForm.setAsDefault")}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isCarSaved"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t("cardDetailsForm.saveCardForFuture")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-center">
          <LoadingButton
            size="lg"
            className="w-3/5"
            isLoading={isPending}
            type="submit"
          >
            {t("submit")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
