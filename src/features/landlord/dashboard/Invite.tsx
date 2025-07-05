import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CurrencyInput } from "@/components/CurrencyInput";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/hooks/useAlertToast";
import { useGoBack } from "@/hooks/useGoBack";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useInviteRenterMutation } from "./api/mutation";
import dealIcon from "./assets/deal.png";
import penApplicationIcon from "./assets/pen-application.png";
import rentHouseIcon from "./assets/rent-house.png";
import { ApplicationTypeCard } from "./components/ApplicationTypeCard";
import { PropertiesSelector } from "./components/PropertiesSelector";

export default function Invite() {
  const { t } = useTranslation();
  const inviteFormSchema = z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    inviteMethod: z.enum(["email", "text", "both"], {
      required_error: t("inviteMethodRequired"),
    }),
    email: z.string().email(t("emailInvalid")).min(1, t("emailRequired")),
    propertyId: z.string({
      required_error: t("propertyIdRequired"),
    }),
    rentAmount: z.string().min(1, t("rentAmountRequired")),
    securityDeposit: z.string().min(1, t("securityDepositRequired")),
    applicationType: z.enum(["premium", "standard"], {
      required_error: t("applicationTypeRequired"),
    }),
  });

  type InviteFormValues = z.infer<typeof inviteFormSchema>;

  const { mutateAsync } = useInviteRenterMutation();
  const goBack = useGoBack();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      inviteMethod: "email",
      email: "",
      propertyId: "",
      rentAmount: "",
      securityDeposit: "",
      applicationType: "premium",
    },
  });

  const onSubmit = async (values: InviteFormValues) => {
    const valueToSend = {
      renterInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        sendBy:
          values.inviteMethod.charAt(0).toUpperCase() +
          values.inviteMethod.slice(1),
        email: values.email,
      },
      rentalProperty: {
        propertyId: values.propertyId,
        rentAmount: values.rentAmount,
        securityDeposit: values.securityDeposit,
        applicationType:
          values.applicationType.charAt(0).toUpperCase() +
          values.applicationType.slice(1),
      },
    };
    try {
      await mutateAsync(valueToSend);
      showToast(t("tenantScreeningRequestSuccess"), "success");
      navigate("/landlord");
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-5">
      <PageTitle title={t("inviteRenterToApply")} withBack />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Renter Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={dealIcon} className="size-10" />
              <span>{t("renterInfo")}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("firstName")}</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("lastName")}</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inviteMethod"
                render={({ field }) => (
                  <FormItem className="col-span-2 space-y-2">
                    <FormLabel>{t("sendInviteBy")}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("email")}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="text" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("text")}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="both" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("emailAndText")}
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("renterEmail")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Rental Property Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={rentHouseIcon} className="size-10" />
              <span>{t("rentalProperty")}</span>
            </div>

            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("propertyApplyingTo")}</FormLabel>
                  <FormControl>
                    <PropertiesSelector
                      placeholder={t("applyingTo")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("rentAmount")}</FormLabel>
                    <FormControl>
                      <CurrencyInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="securityDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("securityDeposit")}</FormLabel>
                    <FormControl>
                      <CurrencyInput type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Application Type Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={penApplicationIcon} className="size-10" />
              <span>{t("applicationType")}</span>
            </div>

            <FormField
              control={form.control}
              name="applicationType"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      <FormItem>
                        <ApplicationTypeCard
                          value="premium"
                          title={t("premiumScreeningReport")}
                          description={t("premiumScreeningReportDesc")}
                          amount={45}
                          isPremium
                        />
                      </FormItem>

                      <FormItem>
                        <ApplicationTypeCard
                          value="standard"
                          title={t("standardScreeningReport")}
                          description={t("standardScreeningReportDesc")}
                          amount={35}
                        />
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root && (
            <div className="flex gap-2 rounded border border-red-500 p-2">
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outlinePrimary"
              size="lg"
              className="w-52 rounded-lg"
              type="button"
              onClick={goBack}
            >
              {t("cancel")}
            </Button>
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              size="lg"
              className="w-52 rounded-lg"
              type="submit"
            >
              {t("sendInvite")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
