import { useRef } from "react";
import { useForm } from "react-hook-form";
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




const formSchema = z.object({
  // propertyName: z.string().min(1, "Property name is required"),
  // description: z
  //   .string({
  //     required_error: "Description is required",
  //   })
  //   .max(500, "Description cannot exceed 500 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
  hasRoomRentals: z.enum(["yes", "no"]),
  streetAddress: z.string().min(1, "Street address is required"),
  unit: z.string().min(1, "Unit is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  roomName: z.string().min(1, "Room name is required"),
  beds: z.coerce.number().min(1, "Number of beds must be at least 1"),
  baths: z.coerce.number().min(1, "Number of baths must be at least 1"),
  apartmentUnit: z.coerce.number().optional(),
  studioUnit: z.coerce.number().optional(),
  roomsUnit: z.coerce.number().optional(),
  targetRent: z.coerce.number().min(1, "Target rent must be greater than 0"),
  targetDeposit: z.coerce
    .number()
    .min(1, "Target deposit must be greater than 0"),
});

export default function AddProperty() {
  const stepperRef = useRef<MultiStepperRef>(null);
  const { mutateAsync } = useCreatePropertyMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasRoomRentals: "yes",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const valuesToSubmit: IPropertyCreateData = {
        // name: values.propertyName,
        // description: values.description,
        propertyTypeId: values.propertyType,
        isRoomRental: values.hasRoomRentals === "yes",
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
                  // "propertyName",
                  // "description",
                  "propertyType",
                  "hasRoomRentals",
                ])
              }
            >
              <div className="space-y-4">
                <PageTitle
                  title="Which best describes your property?"
                  withBack
                />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Property Type</FormLabel>
                      <PropertyTypeSelector {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Name</FormLabel>
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="hasRoomRentals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">
                        Will you have rooms rentals?
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
                              Yes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="no" id="room-rentals-no" />
                            </FormControl>
                            <FormLabel htmlFor="room-rentals-no">No</FormLabel>
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
                  <PageTitle title="Add Property Address" className="m-0" />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <img src={mapPinIcon} alt="" className="max-h-7 max-w-7" />
                    <h2 className="text-2xl font-bold">Property Address</h2>
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
                  <PageTitle title="Add Property details" className="m-0" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-blue-100 p-2">
                    <HouseIcon />
                  </div>
                  <h2 className="text-2xl font-bold">Add Property details</h2>
                </div>
                <div className="my-5 grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="roomName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Room Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter room name" {...field} />
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
                        <FormLabel>Beds</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Number of beds"
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
                        <FormLabel>Baths</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Number of baths"
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
                        <FormLabel>Apartment Unit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter apartment unit"
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
                        <FormLabel>Studio Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter studio unit" {...field} />
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
                        <FormLabel>Rooms Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter rooms unit" {...field} />
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
                        <FormLabel>Target Rent</FormLabel>
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
                        <FormLabel>Target Deposit</FormLabel>
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
                  Next
                </LoadingButton>
              </div>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
