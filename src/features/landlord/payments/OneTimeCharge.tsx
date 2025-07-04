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
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  bankAccount: z.string({
    required_error: "Please select a bank account",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function OneTimeCharge() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const goBack = useGoBack();
  const { mutateAsync } = useCreateChargeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const valuesToSubmit: IOneTimeChargeCreate = {
        ...values,
        dueDate: values.dueDate.toISOString(),
        chargeType: "One-Time",
      };
      await mutateAsync(valuesToSubmit);
      showToast("One-time charge created successfully!", "success");
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
                  title={t("payments.oneTimeCharge")}
                  className="mb-0"
                />
              </div>
            </MultiStepperHeader>

            <MultiStepperStep onValidate={() => form.trigger()}>
              <div className="space-y-6">
                <section>
                  <h2 className="mb-4 text-lg font-semibold">{t("details")}</h2>
                  <p className="mb-4 text-gray-600">
                    {t("payments.oneTimeDetails")}
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
                    {t("payments.oneTimeInfo")}
                  </p>
                </section>

                <section>
                  <h2 className="mb-4 text-lg font-semibold">
                    {t("bankAccount")}
                  </h2>
                  <FormField
                    control={form.control}
                    name="bankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("chooseBankAccount")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={t("chooseBankAccountPlaceholder")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">
                              {t("standardBankGroup")}
                            </SelectItem>
                            <SelectItem value="firstrand">
                              {t("firstRand")}
                            </SelectItem>
                            <SelectItem value="absa">
                              {t("absaGroup")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
                <div className="text-primary mt-5 rounded-sm bg-blue-200 p-4 text-sm">
                  <p>{t("payments.oneTimeDisclaimer")}</p>
                </div>
              </div>
            </MultiStepperStep>

            <MultiStepperStep>
              <section>
                <h3 className="text-xl font-semibold">{t("rent")}</h3>
                <p className="text-gray-600">{t("dueMonthlyOnFirst")}</p>

                <div className="mt-4 space-y-3">
                  <h4 className="text-xl font-semibold">{t("chargeInfo")}</h4>
                  <p className="mt-2 text-gray-600">
                    {t("payments.oneTimeChargeInfo1")}
                  </p>
                  <p className="text-gray-600">
                    {t("payments.oneTimeChargeInfo2")}
                  </p>
                  <p className="text-gray-600">
                    {t("payments.oneTimeChargeInfo3")}
                  </p>
                </div>
                <FormErrors errors={form.formState.errors} />
              </section>
            </MultiStepperStep>

            <MultiStepperButton>
              <Button type="submit" size="lg" className="w-3/5">
                {t("payments.createOneTimeCharge")}
              </Button>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
