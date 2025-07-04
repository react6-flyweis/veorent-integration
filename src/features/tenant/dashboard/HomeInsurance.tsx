import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import legacyIconImg from "@/assets/icons/legacy.png";
import { IconRound } from "@/components/IconRound";
import {
  MultiStepper,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
} from "@/components/MultiStepper";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PropertyTypeSelector } from "@/features/landlord/components/PropertyTypeSelector";

const createFormSChema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    email: z.string().email(t("invalidEmail")),
    phone: z.string().min(10, t("phoneMin")).max(15, t("phoneMax")),

    propertyType: z.string().min(1, t("propertyTypeRequired")),

    street: z.string().min(1, t("streetRequired")),
    unit: z.string().optional(),
    city: z.string().min(1, t("cityRequired")),
    region: z.string().min(1, t("regionRequired")),
    zipCode: z.string().min(4, t("zipMin")).max(10, t("zipMax")),

    beds: z.coerce.number().min(0, t("bedsMin")),
    bath: z.coerce.number().min(0, t("bathMin")),
    squareFeet: z.coerce.number().min(0, t("squareFeetMin")),

    year: z
      .string()
      .regex(/^\d{4}$/, t("yearValid"))
      .refine((val) => +val <= new Date().getFullYear(), {
        message: t("yearFuture"),
      }),
  });

export default function HomeInsuranceForm() {
  const { t } = useTranslation();
  const formSchema = createFormSChema(t);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      propertyType: "",
      street: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
      beds: 0,
      bath: 0,
      squareFeet: 0,
      year: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    navigate("/tenant/insurance-plans", {
      state: {
        formData: {
          propertyDetails: {
            streetAddress: data.street,
            unitNumber: data.unit,
            city: data.city,
            region: data.region,
            zipCode: data.zipCode,
            beds: data.beds,
            bath: data.bath,
            squareFeet: data.squareFeet,
            yearBuilt: data.year,
          },
          ...data,
        },
      },
    });
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepper>
            <MultiStepperIndicator
              showCount={false}
              routeBack={() => navigate(-1)}
            />
            <MultiStepperHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IconRound icon={legacyIconImg} size="sm" />
                  <h2 className="text-2xl font-bold text-blue-900">
                    {t("homeInsuranceTitle")}
                  </h2>
                </div>
                <div className="text-muted-foreground">
                  {t("homeInsuranceDescription")}
                </div>
              </div>
            </MultiStepperHeader>
            <MultiStepperStep
              onValidate={() =>
                form.trigger(["firstName", "lastName", "email", "phone"])
              }
            >
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("firstName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input {...field} />
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
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("phoneNumber")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </MultiStepperStep>

            <MultiStepperStep onValidate={() => form.trigger("propertyType")}>
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("propertyType")}</FormLabel>
                    <PropertyTypeSelector {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </MultiStepperStep>

            <MultiStepperStep>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>{t("streetAddress")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("beds")}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("baths")}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="squareFeet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("squareFeet")}</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
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
                      <FormControl>
                        <Input
                          placeholder={t("yearPlaceholder")}
                          type="text"
                          maxLength={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </MultiStepperStep>
            <MultiStepperButton />
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
