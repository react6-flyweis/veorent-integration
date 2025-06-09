import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FormErrors from "@/components/FormErrors";
import {
  MultiStepper,
  MultiStepperHeader,
  MultiStepperStep,
  MultiStepperButton,
} from "@/components/MultiStepper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PropertyTypeSelector } from "@/features/landlord/components/PropertyTypeSelector";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useRegisterLandlordMutation } from "./api/mutation";
import { useGetBusinessQuery, useGetRentalProcessQuery } from "./api/queries";

const formSchema = z.object({
  startupOption: z.string().min(1, "Please select where you'd like to start"),
  propertyType: z.string().min(1, "Please select a property type"),
  rentalProcess: z.string().min(1, "Please select your rental process stage"),
});

type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUpLandlord() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync } = useRegisterLandlordMutation();
  const { data: businessData } = useGetBusinessQuery();
  const { data: rentalProcessData } = useGetRentalProcessQuery();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startupOption: "",
      propertyType: "",
      rentalProcess: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      const valuesToSubmit: INewLandlordUser = {
        ...values,
        email: state.email,
        firstname: state.fName,
        lastname: state.lName,
        password: state.password,
        confirmPassword: state.password,
        goals: state.landlordData.goals || [],
        propertyCount: state.landlordData.propertiesCount || 0,
        businessId: values.startupOption || "",
        propertyTypeId: values.propertyType || "",
        rentalProcessId: values.rentalProcess || "",
        // referralCode: state.landlordData.referralSource || "",
      };
      await mutateAsync(valuesToSubmit);
      navigate("/landlord");
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepper>
            <MultiStepperHeader>
              <div className="mb-6 flex items-center justify-between">
                <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
                <div className="border-primary flex items-center justify-center rounded border px-3 py-2">
                  <span className="text-2xl font-semibold">Landlord Login</span>
                </div>
              </div>
            </MultiStepperHeader>

            {/* Step 1: Startup Option Selection */}
            <MultiStepperStep onValidate={() => form.trigger("startupOption")}>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-900">
                  Where would you like to start?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Get started in only a few minutes!
                </p>
                <FormField
                  control={form.control}
                  name="startupOption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Starting Point</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4 md:grid-cols-3"
                      >
                        {businessData?.map((option) => (
                          <Card
                            key={option._id}
                            className={`relative cursor-pointer border py-0 transition-all ${
                              field.value === option._id
                                ? "border-primary bg-blue-50"
                                : "border-input hover:border-primary/50"
                            }`}
                          >
                            <div className="absolute top-3 left-3 flex h-5 w-5 items-center justify-center">
                              <div
                                className={`border-input flex h-5 w-5 items-center justify-center rounded-full border ${
                                  field.value === option._id
                                    ? "bg-primary border-primary"
                                    : "bg-background"
                                }`}
                              >
                                {field.value === option._id && (
                                  <div className="h-2.5 w-2.5 rounded-full bg-white" />
                                )}
                              </div>
                            </div>
                            <label
                              htmlFor={`startup-option-${option._id}`}
                              className="cursor-pointer"
                            >
                              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                <input
                                  type="radio"
                                  id={`startup-option-${option._id}`}
                                  className="sr-only"
                                  {...field}
                                  value={option._id}
                                  checked={field.value === option._id}
                                />
                                <img
                                  src={option.image}
                                  alt={option.name}
                                  className="mb-3 h-12 w-12 object-contain"
                                />
                                <span className="text-primary font-medium">
                                  {option.name}
                                </span>
                              </CardContent>
                            </label>
                          </Card>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </MultiStepperStep>

            {/* Step 2: Property Type Selection */}
            <MultiStepperStep onValidate={() => form.trigger("propertyType")}>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-900">
                  Which best describes your property?
                </h2>

                <p className="text-muted-foreground mb-4">
                  This allows us to better tailor your experience.
                </p>

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Property Type</FormLabel>
                      <FormControl>
                        <PropertyTypeSelector {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </MultiStepperStep>

            {/* Step 3: Rental Process Selection */}
            <MultiStepperStep onValidate={() => form.trigger("rentalProcess")}>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-blue-900">
                  What part of the rental process are you in for ?
                </h2>

                <p className="text-muted-foreground mb-4">
                  Your address displays here.
                </p>

                <FormField
                  control={form.control}
                  name="rentalProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Rental Process</FormLabel>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {rentalProcessData?.map((option) => (
                          <label
                            key={option._id}
                            htmlFor={`rental-process-${option._id}`}
                            className="cursor-pointer"
                          >
                            <Card
                              className={`relative border py-1 transition-all ${
                                field.value === option._id
                                  ? "border-primary bg-blue-50"
                                  : "border-input hover:border-primary/50"
                              }`}
                            >
                              <CardContent className="flex items-start gap-4 p-4">
                                <div className="mt-1 flex h-5 w-5 items-center justify-center">
                                  <RadioGroupItem
                                    value={option._id}
                                    id={`rental-process-${option._id}`}
                                    className="h-5 w-5"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {option.name}
                                  </span>
                                  <p className="text-muted-foreground text-sm">
                                    {option.desc}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </label>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormErrors errors={form.formState.errors} />
              </div>
            </MultiStepperStep>
            <MultiStepperButton>
              <LoadingButton
                size="lg"
                isLoading={form.formState.isSubmitting}
                className="@lg:3/5 w-4/5"
                type="submit"
              >
                Continue
              </LoadingButton>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
