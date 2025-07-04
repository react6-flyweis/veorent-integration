import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwissFrancIcon } from "lucide-react";
import { z } from "zod";

import { CurrencyInput } from "@/components/CurrencyInput";
import FormErrors from "@/components/FormErrors";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperStep,
} from "@/components/MultiStepper";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useAlertToast";
import { useGoBack } from "@/hooks/useGoBack";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateChargeMutation } from "./api/mutation";
import { BankSelector } from "../dashboard/components/BankSelector";

// Form schema
const formSchema = z.object({
  category: z.enum(["Rent", "Utilities", "Other"], {
    required_error: "Please select a category",
  }),
  description: z.string().max(50),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  month: z.string({
    required_error: "Please select a month",
  }),
  year: z.string({
    required_error: "Please select a year",
  }),
  hasEndDate: z.boolean(),
  hasLateFee: z.enum(["yes", "no"]),
  lateFeeType: z.enum(["flat", "percentage"]).optional(),
  lateFeeAmount: z.coerce.number().optional(),
  lateFeeFor: z.enum(["sameDay", "oneDay", "oneWeek"]).optional(),
  bankAccount: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const MonthlyCharge: React.FC = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateChargeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      hasEndDate: false,
      hasLateFee: "no",
      lateFeeType: "flat",
    },
  });

  // Watch values to conditionally render UI elements
  const lateFeeType = form.watch("lateFeeType");
  const hasLateFee = form.watch("hasLateFee");

  const onSubmit = async (values: FormValues) => {
    try {
      const valuesToSubmit: IMonthlyChargeCreate = {
        ...values,
        dueDate: values.dueDate.toISOString(),
        chargeType: "Monthly",
      };
      await mutateAsync(valuesToSubmit);
      showToast("Your monthly charge is create successfully.", "success");
      setTimeout(() => {
        navigate("/landlord/payments/create-charge");
      }, 1000);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <MultiStepper>
            <MultiStepperHeader>
              <div className="flex items-center gap-5 border-b-3 border-gray-700 pb-3">
                <MultiStepperBackButton routeBack={goBack} />
                <PageTitle
                  title={t("payments.monthlyCharge")}
                  className="mb-0"
                />
              </div>
            </MultiStepperHeader>

            <MultiStepperStep onValidate={() => form.trigger()}>
              <div className="space-y-6">
                <section>
                  <h2 className="mb-4 text-lg font-semibold">{t("details")}</h2>
                  <p className="mb-4 text-gray-600">
                    {t("payments.monthlyDetails")}
                  </p>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("category")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={t("selectCategory")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Rent">
                                  {t("rent")}
                                </SelectItem>
                                <SelectItem value="Utilities">
                                  {t("utilities")}
                                </SelectItem>
                                <SelectItem value="Other">
                                  {t("other")}
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("descriptionOptional")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("enterDescription")}
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value?.length || 0}/50 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section>
                  <h2 className="mb-4 text-lg font-semibold">
                    {t("chargeInfo")}
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("amount")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <div className="flex size-5 items-center justify-center rounded-full border">
                                  <SwissFrancIcon className="size-3 text-gray-500" />
                                </div>
                              </div>
                              <Input
                                type="number"
                                className="pl-8"
                                placeholder={t("zeroAmount")}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("dueDate")}</FormLabel>
                          <FormControl>
                            <DateInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <p className="my-4 text-gray-600">
                    {t("payments.monthlyInfo")}
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("month")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("selectMonth")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month) => (
                                <SelectItem
                                  key={month}
                                  value={month.toLowerCase()}
                                >
                                  {t(`months.${month.toLowerCase()}`)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("year")}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t("selectYear")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[2023, 2024, 2025, 2026, 2027].map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="hasEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={!field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(!checked)
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{t("noEndDate")}</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="hasLateFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("hasLateFee")}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">{t("yes")}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no">{t("no")}</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {hasLateFee === "yes" && (
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <FormField
                          control={form.control}
                          name="lateFeeType"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex space-x-2">
                                  <Button
                                    type="button"
                                    variant={
                                      lateFeeType === "flat"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="w-1/2"
                                    onClick={() => field.onChange("flat")}
                                  >
                                    {t("flat")}
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={
                                      lateFeeType === "percentage"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="w-1/2"
                                    onClick={() => field.onChange("percentage")}
                                  >
                                    % {t("unpaid")}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lateFeeAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("amount")}</FormLabel>
                              <FormControl>
                                {lateFeeType === "percentage" ? (
                                  <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                      <span className="text-gray-500">%</span>
                                    </div>
                                    <Input
                                      type="number"
                                      className="pr-8"
                                      {...field}
                                    />
                                  </div>
                                ) : (
                                  <CurrencyInput {...field} />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="lateFeeFor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("applyLateFee")}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={t("applyLateFee")}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sameDay">
                                  {t("sameDay")}
                                </SelectItem>
                                <SelectItem value="oneDay">
                                  {t("oneDayAfter")}
                                </SelectItem>
                                <SelectItem value="oneWeek">
                                  {t("oneWeekAfter")}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>{t("bankAccount")}</FormLabel>
                        <FormControl>
                          <BankSelector {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-primary mt-5 rounded-sm bg-blue-200 p-4 text-sm">
                    <p>{t("payments.monthlyDisclaimer")}</p>
                  </div>
                </section>
              </div>
            </MultiStepperStep>

            <MultiStepperStep>
              <section>
                <h3 className="text-xl font-semibold">{t("rent")}</h3>
                <p className="text-gray-600">{t("dueMonthlyOnFirst")}</p>

                <div className="mt-4 space-y-3">
                  <h4 className="text-xl font-semibold">{t("chargeInfo")}</h4>
                  <p className="mt-2 text-gray-600">
                    {t("payments.monthlyChargeInfo1")}
                  </p>
                  <p className="text-gray-600">
                    {t("payments.monthlyChargeInfo2")}
                  </p>
                  <p className="text-gray-600">
                    {t("payments.monthlyChargeInfo3")}
                  </p>
                </div>
                <FormErrors errors={form.formState.errors} />
              </section>
            </MultiStepperStep>

            <MultiStepperButton>
              <Button type="submit" size="lg" className="w-3/5">
                {t("payments.createMonthlyCharge")}
              </Button>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
};

export default MonthlyCharge;
