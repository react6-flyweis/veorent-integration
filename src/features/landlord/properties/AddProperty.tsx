import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { HouseIcon } from "lucide-react";
import { z } from "zod";

import { CurrencyInput } from "@/components/CurrencyInput";
import FormErrors from "@/components/FormErrors";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperButton,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { PageTitle } from "@/components/PageTitle";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { PropertyTypeSelector } from "../components/PropertyTypeSelector";
import { useCreatePropertyMutation } from "./api/mutation";
import mapPinIcon from "./assets/map-pin.png";
import { PropertyAddressForm } from "./components/PropertyAddressForm";

const formSchema = (t: (key: string) => string) =>
  z.object({
    propertyName: z.string().min(1, t("formSchema.propertyName_required")),
    description: z
      .string({
        required_error: t("formSchema.description_required"),
      })
      .max(500, t("formSchema.description_max")),
    propertyType: z.string().min(1, t("formSchema.propertyType_required")),
    hasRoomRentals: z.enum(["yes", "no"]),
    streetAddress: z.string().min(1, t("formSchema.streetAddress_required")),
    unit: z.string().min(1, t("formSchema.unit_required")),
    city: z.string().min(1, t("formSchema.city_required")),
    region: z.string().min(1, t("formSchema.region_required")),
    zipCode: z.string().min(1, t("formSchema.zipCode_required")),
    roomName: z.string().min(1, t("formSchema.roomName_required")),
    beds: z.coerce.number().min(1, t("formSchema.beds_min")),
    baths: z.coerce.number().min(1, t("formSchema.baths_min")),
    apartmentUnit: z.coerce.number().optional(),
    studioUnit: z.coerce.number().optional(),
    roomsUnit: z.coerce.number().optional(),
    targetRent: z.coerce.number().min(1, t("formSchema.targetRent_min")),
    targetDeposit: z.coerce.number().min(1, t("formSchema.targetDeposit_min")),
  });

export default function AddProperty() {
  const { t } = useTranslation();

  const stepperRef = useRef<MultiStepperRef>(null);
  const { mutateAsync } = useCreatePropertyMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      hasRoomRentals: "yes",
    },
  });

  const onSubmit = async (values: z.infer<ReturnType<typeof formSchema>>) => {
    try {
      const valuesToSubmit: IPropertyCreateData = {
        name: values.propertyName,
        description: values.description,
        propertyTypeId: values.propertyType,
        isRoomRental: values.hasRoomRentals === "yes",
        addressDetails: {
          houseNumber: "",
          streetAddress: values.streetAddress,
          city: values.city,
          region: values.region,
          zipCode: values.zipCode,
        },
        propertyDetails: {
          streetAddress: values.streetAddress,
          unitNumber: values.unit,
          city: values.city,
          region: values.region,
          zipCode: values.zipCode,
        },
        rentalDetails: {
          beds: values.beds,
          baths: values.baths,
          targetRent: values.targetRent,
          targetDeposite: values.targetDeposit,
          apartmentUnit: values.apartmentUnit || 0,
          studioUnit: values.studioUnit || 0,
          roomsUnit: values.roomsUnit || 0,
        },
        formCompletionStatus: {
          addressDetails: true,
          propertyDetails: true,
          rentalDetails: true,
        },
      };
      const result = await mutateAsync(valuesToSubmit);
      navigate(`/landlord/properties/${result.data.data._id}/setup-prompt`);
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
          <MultiStepper ref={stepperRef}>
            <MultiStepperStep
              onValidate={() =>
                form.trigger([
                  "propertyName",
                  "description",
                  "propertyType",
                  "hasRoomRentals",
                ])
              }
            >
              <div className="space-y-4">
                <PageTitle title={t("whichBestDescribesProperty")} withBack />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        {t("propertyType")}
                      </FormLabel>
                      <PropertyTypeSelector {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("propertyName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("description")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasRoomRentals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        {t("willYouHaveRoomRentals")}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem
                                value="yes"
                                id="room-rentals-yes"
                              />
                            </FormControl>
                            <FormLabel htmlFor="room-rentals-yes">
                              {t("yes")}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="no" id="room-rentals-no" />
                            </FormControl>
                            <FormLabel htmlFor="room-rentals-no">
                              {t("no")}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </MultiStepperStep>
            <MultiStepperStep hideButton>
              <div className="">
                <div className="mb-4 flex items-center gap-5">
                  <MultiStepperBackButton />
                  <PageTitle title={t("addPropertyAddress")} className="m-0" />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <img src={mapPinIcon} alt="" className="max-h-7 max-w-7" />
                    <h2 className="text-2xl font-bold">
                      {t("propertyAddress")}
                    </h2>
                  </div>

                  <PropertyAddressForm
                    onSuccess={(values) => {
                      form.setValue("streetAddress", values.streetAddress);
                      form.setValue("unit", values.unit);
                      form.setValue("city", values.city);
                      form.setValue("region", values.region);
                      form.setValue("zipCode", values.zipCode);
                      stepperRef.current?.goNext();
                    }}
                  />
                </div>
              </div>
            </MultiStepperStep>
            <MultiStepperStep>
              <div>
                <div className="mb-4 flex items-center gap-5">
                  <MultiStepperBackButton />
                  <PageTitle title={t("addPropertyDetails")} className="m-0" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-2">
                    <HouseIcon />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {t("addPropertyDetails")}
                  </h2>
                </div>
                <div className="my-5 grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="roomName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>{t("roomName")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("enterRoomName")} {...field} />
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
                          <Input
                            type="number"
                            min="1"
                            placeholder={t("numberOfBeds")}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="baths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("baths")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder={t("numberOfBaths")}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="apartmentUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("apartmentUnit")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("enterApartmentUnit")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="studioUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("studioUnit")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("enterStudioUnit")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roomsUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("roomsUnit")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("enterRoomsUnit")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetRent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("targetRent")}</FormLabel>
                        <FormControl>
                          <CurrencyInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetDeposit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("targetDeposit")}</FormLabel>
                        <FormControl>
                          <CurrencyInput {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Card className="rounded-none border-0 bg-blue-200 p-4">
                  <p className="text-primary text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Qui harum distinctio, quidem dicta perspiciatis eveniet
                    sapiente mollitia culpa. Iure vero debitis magni iusto
                    obcaecati velit at suscipit libero, voluptas praesentium ut
                    eum reiciendis ullam incidunt vel vitae accusantium
                    doloremque commodi!
                  </p>
                </Card>
              </div>
              <FormErrors errors={form.formState.errors} />
            </MultiStepperStep>

            <MultiStepperButton>
              <div className="flex w-full justify-center">
                <LoadingButton
                  type="submit"
                  className="w-4/5 @lg:w-3/5"
                  isLoading={form.formState.isSubmitting}
                  size="lg"
                >
                  {t("next")}
                </LoadingButton>
              </div>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
