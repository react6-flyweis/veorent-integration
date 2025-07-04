import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwissFrancIcon } from "lucide-react";
import { z } from "zod";

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

// Form schema
const formSchema = z.object({
  category: z.enum(["Rent", "Utilities", "Other"], {
    required_error: "Please select a category",
  }),
  description: z.string().max(50),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date().optional(),
  hasEndDate: z.boolean(),
  maxDays: z.coerce.number().min(1, "Must be at least 1 day").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const DailyCharge: React.FC = () => {
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
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const valuesToSubmit: IDailyChargeCreate = {
        ...values,
        chargeType: "Daily",
        bankAccount: "",
        startDate: values.startDate.toISOString(),
        endDate: values.endDate?.toISOString(),
      };
      await mutateAsync(valuesToSubmit);
      showToast("Your daily charge is create successfully.", "success");
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
                <PageTitle title={t("payments.dailyCharge")} className="mb-0" />
              </div>
            </MultiStepperHeader>

            <MultiStepperStep onValidate={() => form.trigger()}>
              <div className="space-y-6">
                <section>
                  <h2 className="mb-4 text-lg font-semibold">{t("details")}</h2>
                  <p className="mb-4 text-gray-600">
                    {t("payments.dailyDetails")}
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
                          <FormLabel>{t("payments.dailyAmount")}</FormLabel>
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
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("startDate")}</FormLabel>
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
                    {t("payments.dailyInfo")}
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="maxDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("maxDaysOptional")}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={t("maxDaysPlaceholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {t("leaveEmptyUnlimited")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("endDateOptional")}</FormLabel>
                          <FormControl>
                            {form.watch("hasEndDate") ? (
                              <DateInput
                                value={field.value}
                                onChange={field.onChange}
                              />
                            ) : (
                              <Input
                                placeholder={t("selectEndDateCheckbox")}
                                disabled
                                className="bg-gray-50"
                              />
                            )}
                          </FormControl>
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
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{t("setEndDate")}</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <div className="text-primary mt-5 rounded-sm bg-blue-200 p-4 text-sm">
                  <p>{t("payments.dailyDisclaimer")}</p>
                </div>
              </div>
            </MultiStepperStep>

            <MultiStepperStep>
              <section>
                <h3 className="text-xl font-semibold">
                  {t("payments.dailyCharge")}
                </h3>
                <p className="text-gray-600">{t("payments.chargedDaily")}</p>

                <div className="mt-4 space-y-3">
                  <h4 className="text-xl font-semibold">{t("chargeInfo")}</h4>
                  <p className="mt-2 text-gray-600">
                    {t("payments.dailyChargeInfo1")}
                  </p>
                  <p className="text-gray-600">
                    {t("payments.dailyChargeInfo2")}
                  </p>
                  <p className="text-gray-600">
                    {t("payments.dailyChargeInfo3")}
                  </p>
                </div>
                <FormErrors errors={form.formState.errors} />
              </section>
            </MultiStepperStep>

            <MultiStepperButton>
              <Button type="submit" size="lg" className="w-3/5">
                {t("payments.createDailyCharge")}
              </Button>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
};

export default DailyCharge;
