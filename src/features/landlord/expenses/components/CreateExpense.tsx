import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CurrencyInput } from "@/components/CurrencyInput";
import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import { DialogClose } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { PropertiesSelector } from "../../dashboard/components/PropertiesSelector";
import { useCreateExpenseMutation } from "../api/mutation";

const formSchema = z.object({
  date: z.date(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a valid number greater than 0",
  }),
  rental: z.string().min(1, "Rental property is required"),
  description: z.string(),
  notes: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
});

type ExpenseFormValues = z.infer<typeof formSchema>;

export const CreateExpense = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutateAsync } = useCreateExpenseMutation();
  const { t } = useTranslation();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      notes: "",
      files: [],
    },
  });

  const onSubmit = async (values: ExpenseFormValues) => {
    try {
      const valuesToSubmit: ICreateExpenseData = {
        ...values,
        datePaid: values.date.toISOString(),
        amountPaid: Number(values.amount),
        property: values.rental,
      };
      await mutateAsync(valuesToSubmit);
      showToast("Your new expense has been added successfully!", "success");
      setTimeout(() => {
        navigate("/landlord/expenses");
      }, 1000);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base">
                  {t("expenses.datePaid")}
                </FormLabel>
                <FormControl>
                  <DateInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("expenses.amountPaid")}
                </FormLabel>
                <FormControl>
                  <CurrencyInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="rental"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("expenses.property")}
              </FormLabel>
              <FormControl>
                <PropertiesSelector {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("expenses.description")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("expenses.descriptionPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">{t("expenses.notes")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("expenses.notesPlaceholder")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <p className="mb-1 font-medium">{t("expenses.receipts")}</p>
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormControl>
                  <ImageInput variant="small" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outlinePrimary">
              {t("expenses.cancel")}
            </Button>
          </DialogClose>
          <LoadingButton
            isLoading={form.formState.isLoading}
            type="submit"
            className="w-32"
          >
            {t("expenses.addExpense")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
