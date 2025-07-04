import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CurrencyInput } from "@/components/CurrencyInput";
import { PageTitle } from "@/components/PageTitle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateLeaseAddendumMutation } from "./api/mutation";
import amendmentIcon from "./assets/amendment.png";
import calendarIcon from "./assets/calendar.png";
import coinBagIcon from "./assets/coin-bag.png";
import dateIcon from "./assets/date.png";
import monthIcon from "./assets/month.png";
import penApplication from "./assets/pen-application.png";

// Define Zod validation schema
const formSchema = z.object({
  effectiveDate: z.date(),
  monthlyRentChange: z.string(),
  depositChange: z.string(),
  otherAmendments: z.string(),
  originalLeaseDate: z.date(),
  endDateChange: z.string(),
  newEndDate: z.date().optional(),
  newMonthlyRent: z.string().optional(),
  securityDeposit: z.boolean().optional(),
  securityDepositAmount: z.string().optional(),
  petDeposit: z.boolean().optional(),
  petDepositAmount: z.string().optional(),
  otherDeposit: z.boolean().optional(),
  otherDepositAmount: z.string().optional(),
  otherAmendmentsText: z.string().optional(),
});

export default function CreateLeaseAddendum() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync } = useCreateLeaseAddendumMutation();
  const { showToast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyRentChange: "no",
      depositChange: "no",
      otherAmendments: "no",
      endDateChange: "no",
      effectiveDate: new Date(),
      originalLeaseDate: new Date(),
      newEndDate: undefined,
      newMonthlyRent: "",
      securityDeposit: false,
      securityDepositAmount: "",
      petDeposit: false,
      petDepositAmount: "",
      otherDeposit: false,
      otherDepositAmount: "",
      otherAmendmentsText: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const valuesToSubmit: ILeaseAddendumCreateData = {
        property: state.property,
        startDate: values.newEndDate ? values.newEndDate.toISOString() : "",
        endDate: values.newEndDate ? values.newEndDate.toISOString() : "",
        monthlyRent: values.monthlyRentChange === "yes",
        monthlyRentPrice: values.newMonthlyRent || "",
        deposits: values.depositChange === "yes",
        securityDeposite: values.securityDepositAmount || "",
        petDeposit: values.petDepositAmount || "",
        otherDeposit: values.otherDepositAmount || "",
        otherAmendments: values.otherAmendments === "yes",
        otherAmendmentsText: values.otherAmendmentsText || "",
        effectiveDate: values.effectiveDate.toISOString(),
      };
      await mutateAsync(valuesToSubmit);
      showToast("Lease addendum created successfully!", "success");
      setTimeout(() => {
        navigate("/landlord");
      }, 500);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-5">
      <PageTitle
        title={t("leases.createLeaseAddendumTitle")}
        description={t("leases.createLeaseAddendumDescription")}
        withBack
      />

      <Card className="gap-0 rounded-lg bg-blue-200 py-2">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            {t("leases.addendumReasonsTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          <ul className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <li key={item} className="flex items-center">
                <div className="mt-1 mr-2 h-4 w-4 rounded-sm bg-orange-400"></div>
                <p className="text-sm">{t(`leases.addendumReason${item}`)}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Lease History Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={penApplication} alt="Lease Icon" className="size-10" />
              <h3 className="text-2xl font-semibold">
                {t("leases.leaseHistory")}
              </h3>
            </div>

            {/* Tenants Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-black">{t("tenants")}</h3>
              <div className="rounded-md border p-4 text-center shadow">
                <p className="text-lg font-bold">{t("leases.noTenants")}</p>
                <p className="text-sm">{t("leases.noTenantsDescription")}</p>
                <Button className="mt-3 w-52" variant="outlinePrimary">
                  {t("leases.goToMyLease")}
                </Button>
              </div>
            </div>

            {/* Landlord Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black">
                {t("landlord")}
              </h3>
              <div className="flex items-start gap-4">
                <Avatar className="size-10">
                  <AvatarImage src="#" alt="Landlord" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Aheyenne Dias</p>
                  <p className="text-sm text-gray-500">
                    aheyennedias123@gmail.com
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="originalLeaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("leases.originalLeaseDateQuestion")}
                      </FormLabel>
                      <p className="text-primary">
                        {t("leases.originalLeaseDateDescription")}
                      </p>
                      <FormControl>
                        <DateInput className="@md:w-1/2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* End Date Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src={dateIcon} alt="Date Icon" className="size-8" />
                <h3 className="text-2xl font-semibold">{t("endDate")}</h3>
              </div>
              <FormField
                control={form.control}
                name="endDateChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("leases.endDateChangeQuestion")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex space-x-4"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="end-date-yes" value="yes" />
                          <label htmlFor="end-date-yes">{t("yes")}</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="end-date-no" value="no" />
                          <label htmlFor="end-date-no">{t("no")}</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Conditional New End Date Field */}
              {form.watch("endDateChange") === "yes" && (
                <FormField
                  control={form.control}
                  name="newEndDate"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>{t("leases.newEndDate")}</FormLabel>
                      <FormControl>
                        <DateInput className="@md:w-1/2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                <p>{t("leases.endDateChangeDescription")}</p>
              </div>
            </div>
          </div>

          {/* Monthly Rent Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={monthIcon} alt="Month Icon" className="size-8" />
              <h3 className="text-2xl font-semibold">
                {t("leases.monthlyRent")}
              </h3>
            </div>
            <FormField
              control={form.control}
              name="monthlyRentChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("leases.monthlyRentChangeQuestion")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="rent-yes" value="yes" />
                        <label htmlFor="rent-yes">{t("yes")}</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="rent-no" value="no" />
                        <label htmlFor="rent-no">{t("no")}</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional New Monthly Rent Field */}
            {form.watch("monthlyRentChange") === "yes" && (
              <FormField
                control={form.control}
                name="newMonthlyRent"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>{t("leases.newMonthlyRent")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="@md:w-1/2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
              <p>{t("leases.monthlyRentChangeDescription")}</p>
            </div>
          </div>

          {/* Deposits Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={coinBagIcon} alt="Coin Bag Icon" className="size-8" />
              <h3 className="text-2xl font-semibold">{t("leases.deposits")}</h3>
            </div>
            <FormField
              control={form.control}
              name="depositChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("leases.depositChangeQuestion")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="deposit-yes" value="yes" />
                        <label htmlFor="deposit-yes">{t("yes")}</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="deposit-no" value="no" />
                        <label htmlFor="deposit-no">{t("no")}</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Deposit Fields */}
            {form.watch("depositChange") === "yes" && (
              <div className="mt-4 max-w-2xl space-y-4">
                {/* Security Deposit */}
                <div className="flex w-full items-center justify-between space-x-4">
                  <FormField
                    control={form.control}
                    name="securityDeposit"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {t("leases.securityDeposit")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  {form.watch("securityDeposit") && (
                    <FormField
                      control={form.control}
                      name="securityDepositAmount"
                      render={({ field }) => (
                        <FormItem className="@md:w-1/2">
                          <FormControl>
                            <CurrencyInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Pet Deposit */}
                <div className="flex w-full items-center justify-between space-x-4">
                  <FormField
                    control={form.control}
                    name="petDeposit"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {t("leases.petDeposit")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  {form.watch("petDeposit") && (
                    <FormField
                      control={form.control}
                      name="petDepositAmount"
                      render={({ field }) => (
                        <FormItem className="@md:w-1/2">
                          <FormControl>
                            <CurrencyInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Other Deposit */}
                <div className="flex w-full items-center justify-between space-x-4">
                  <FormField
                    control={form.control}
                    name="otherDeposit"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {t("leases.otherDeposit")}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  {form.watch("otherDeposit") && (
                    <FormField
                      control={form.control}
                      name="otherDepositAmount"
                      render={({ field }) => (
                        <FormItem className="@md:w-1/2">
                          <FormControl>
                            <CurrencyInput {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
              <p>{t("leases.depositChangeDescription")}</p>
            </div>
          </div>

          {/* Other Amendments Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={amendmentIcon}
                alt="Amendment Icon"
                className="size-8"
              />
              <h3 className="text-2xl font-semibold">
                {t("leases.otherAmendments")}
              </h3>
            </div>
            <FormField
              control={form.control}
              name="otherAmendments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("leases.otherAmendmentsQuestion")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="amendments-yes" value="yes" />
                        <label htmlFor="amendments-yes">{t("yes")}</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="amendments-no" value="no" />
                        <label htmlFor="amendments-no">{t("no")}</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional Other Amendments Text Field */}
            {form.watch("otherAmendments") === "yes" && (
              <FormField
                control={form.control}
                name="otherAmendmentsText"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Textarea
                        placeholder={t("leases.otherAmendmentsPlaceholder")}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-sm text-gray-500">
                      {field.value?.length || 0}/10000 characters used
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
              <p>{t("leases.otherAmendmentsDescription")}</p>
            </div>
          </div>

          {/* Effective Date Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={calendarIcon} alt="Calendar Icon" className="size-8" />
              <h3 className="text-2xl font-semibold">
                {t("leases.effectiveDate")}
              </h3>
            </div>
            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("leases.effectiveDateQuestion")}</FormLabel>
                  <FormControl>
                    <DateInput className="@lg:w-1/2" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                    <p>{t("leases.effectiveDateDescription")}</p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              type="submit"
              size="lg"
              className="w-3/5"
            >
              {t("leases.saveAndFinishLater")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
