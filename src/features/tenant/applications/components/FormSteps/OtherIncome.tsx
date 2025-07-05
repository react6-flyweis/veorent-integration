import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import otherIncomeIcon from "@/assets/icons/other-income.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateBookingMutation } from "../../api/mutation";

const incomeFormSchema = z.object({
  otherSources: z.boolean(),
  source: z.string().optional(),
  monthlyIncome: z.string().optional(),
  bank: z.string().min(1, "Bank name is required."),
});

type OtherIncomeFormValues = z.infer<typeof incomeFormSchema>;

export function OtherIncome({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");
  const { t } = useTranslation();

  const form = useForm<OtherIncomeFormValues>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      bank: bookingData?.otherIncome?.bank || "",
      otherSources: bookingData?.otherIncome?.otherSourceOfIncome ?? false,
      source: bookingData?.otherIncome?.source || "",
      monthlyIncome: bookingData?.otherIncome?.monthlyIncome || "",
    },
  });

  async function onSubmit(values: OtherIncomeFormValues) {
    try {
      await mutateAsync({
        otherIncome: {
          otherSourceOfIncome: values.otherSources,
          source: values.source || "",
          monthlyIncome: values.monthlyIncome || "",
          bank: values.bank,
        },
      });
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={otherIncomeIcon} size="sm" />
        <h2 className="text-2xl font-bold text-blue-900">
          {t("otherIncome.title")}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otherSources"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("otherIncome.desc")}
                </FormLabel>
                <FormDescription>{t("otherIncome.descMore")}</FormDescription>
                <FormControl>
                  <RadioGroup
                    className="flex gap-6"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-xl">
                  {t("otherIncome.bankLabel")}
                </FormLabel>
                <FormDescription>{t("otherIncome.bankDesc")}</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center">
            <LoadingButton
              type="submit"
              size="lg"
              className="w-4/5 @lg:w-3/5"
              isLoading={isPending}
            >
              {t("actions.saveNext")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
