import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
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
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateOrUpdateLeaseAgreementMutation } from "./api/mutation";
import leaseIcon from "./assets/deal.png";
import houseIcon from "./assets/house.png";
import { BuilderLayout } from "./components/BuilderLayout";

const leaseSpecificSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  leaseTerm: z.enum(["fixed", "month-to-month"], {
    required_error: "Please select a lease term",
  }),
  startDate: z.date({
    required_error: "Start date is required",
  }),
});

type LeaseSpecificFormValues = z.infer<typeof leaseSpecificSchema>;

export default function LeaseSpecific() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { state } = useLocation();

  const { mutateAsync, isSuccess } = useCreateOrUpdateLeaseAgreementMutation();

  const form = useForm<LeaseSpecificFormValues>({
    resolver: zodResolver(leaseSpecificSchema),
    defaultValues: {
      streetAddress: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
      leaseTerm: "fixed",
      startDate: new Date(),
    },
  });

  const onSubmit = async (values: LeaseSpecificFormValues) => {
    try {
      const valuesToSave: {
        rentalProperty: string;
        propertyAddress: IPropertyAddress;
        leaseTerm: ILeaseTerm;
      } = {
        rentalProperty: state.property,
        propertyAddress: {
          streetAddress: values.streetAddress,
          unit: values.unit,
          city: values.city,
          region: values.region,
          zipCode: values.zipCode,
        },
        leaseTerm: {
          termType:
            values.leaseTerm === "fixed" ? "Fixed Term" : "Month-to-Month",
          startDate: values.startDate.toISOString(),
        },
      };

      await mutateAsync(valuesToSave);
      setTimeout(() => {
        navigate("/landlord/lease-agreement/rent-deposit-fee", {
          state,
        });
      }, 300);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  if (!state || !state.property) {
    // if no property is selected then redirect to select lease
    return <Navigate to="/landlord/lease-agreement" />;
  }

  return (
    <BuilderLayout
      title={t("leases.leaseSpecificTitle")}
      description={t("leases.leaseSpecificDescription")}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Rental Property Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={houseIcon} className="size-10" />
              <span>{t("leases.rentalProperty")}</span>
            </div>

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("streetAddress")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("unit")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("city")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("region")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>{t("zipCode")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Lease Term Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={leaseIcon} className="size-10" />
              <span>{t("leases.leaseTermLabel")}</span>
            </div>

            <FormField
              control={form.control}
              name="leaseTerm"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>{t("leases.leaseTermQuestion")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="fixed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("leases.fixedTerm")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="month-to-month" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("leases.monthToMonth")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                    <DateInput className="w-52" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              size="lg"
              className="w-4/5 rounded-lg @lg:w-3/5"
              type="submit"
            >
              {isSuccess
                ? t("leases.savedSuccessfully")
                : t("leases.saveAndNext")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
