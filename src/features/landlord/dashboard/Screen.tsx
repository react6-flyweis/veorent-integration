import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

import { useInviteTenantMutation } from "./api/mutation";
import dealIcon from "./assets/deal.png";
import penApplicationIcon from "./assets/pen-application.png";
import rentHouseIcon from "./assets/rent-house.png";
import screenFeeIcon from "./assets/screen-fee.png";
import { ApplicationTypeCard } from "./components/ApplicationTypeCard";
import { PropertiesSelector } from "./components/PropertiesSelector";

export default function Screen() {
  const { t } = useTranslation();

  const screeningFormSchema = z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    inviteMethod: z.enum(["email", "text", "both"], {
      required_error: t("inviteMethodRequired"),
    }),
    email: z.string().email(t("emailInvalid")).min(1, t("emailRequired")),
    propertyId: z.string({
      required_error: t("propertyIdRequired"),
    }),
    streetAddress: z.string().min(1, t("streetAddressRequired")),
    unit: z.string().optional(),
    city: z.string().min(1, t("cityRequired")),
    region: z.string().min(1, t("regionRequired")),
    zipCode: z.string().min(1, t("zipCodeRequired")),
    phoneNumber: z.string().min(1, t("phoneNumberRequired")),
    screeningReportType: z.enum(["premium", "standard"], {
      required_error: t("screeningReportTypeRequired"),
    }),
    paymentMethod: z.enum(["renter", "me"], {
      required_error: t("paymentMethodRequired"),
    }),
  });

  type ScreeningFormValues = z.infer<typeof screeningFormSchema>;

  const { mutateAsync } = useInviteTenantMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const goBack = useGoBack();

  const form = useForm<ScreeningFormValues>({
    resolver: zodResolver(screeningFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      inviteMethod: "email",
      email: "",
      propertyId: "",
      streetAddress: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
      phoneNumber: "",
      screeningReportType: "premium",
      paymentMethod: "renter",
    },
  });

  const onSubmit = async (values: ScreeningFormValues) => {
    const valuesToSend = {
      renterInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        sendBy:
          values.inviteMethod.charAt(0).toUpperCase() +
          values.inviteMethod.slice(1),
        email: values.email,
      },
      mailingDetails: {
        streetAddress: values.streetAddress,
        unitNumber: values.unit || "",
        city: values.city,
        region: values.region,
        zipCode: values.zipCode,
      },
      rentalProperty: {
        propertyId: values.propertyId,
        applicationType:
          values.screeningReportType.charAt(0).toUpperCase() +
          values.screeningReportType.slice(1),
      },
      whoWillPay:
        values.paymentMethod.charAt(0).toUpperCase() +
        values.paymentMethod.slice(1),
    };
    try {
      await mutateAsync(valuesToSend);
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
      <PageTitle title={t("requestTenantScreening")} withBack />
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
                    <PropertiesSelector {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mailing Address Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={dealIcon} className="size-10" />
              <span>{t("yourMailingAddress")}</span>
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

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("yourPhoneNumber")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Screening Report Type Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={penApplicationIcon} className="size-10" />
              <span>{t("screeningReportType")}</span>
            </div>

            <FormField
              control={form.control}
              name="screeningReportType"
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

          {/* Payment Method Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={screenFeeIcon} className="size-10" />
              <span>{t("whoWillPayScreening")}</span>
            </div>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="renter" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("renterWillPayFee")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="me" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t("iWillPayFee")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {form.formState.errors.root && (
            <div className="flex gap-2 rounded border border-red-500 p-2">
              <span className="text-red-500">
                {form.formState.errors.root.message}
              </span>
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
              {t("requestReport")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
