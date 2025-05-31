import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LoadingButton } from "@/components/ui/loading-button";
import { ApplicationTypeCard } from "./components/ApplicationTypeCard";

import { useGoBack } from "@/hooks/useGoBack";

import dealIcon from "./assets/deal.png";
import penApplicationIcon from "./assets/pen-application.png";
import rentHouseIcon from "./assets/rent-house.png";
import screenFeeIcon from "./assets/screen-fee.png";
import { useInviteTenantMutation } from "./api/mutation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useToast } from "@/hooks/useAlertToast";
import { useNavigate } from "react-router";

const screeningFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  inviteMethod: z.enum(["email", "text", "both"], {
    required_error: "Please select an invite method",
  }),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  propertyId: z.string({
    required_error: "Please select a property",
  }),
  streetAddress: z.string().min(1, "Street address is required"),
  unit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  screeningReportType: z.enum(["premium", "standard"], {
    required_error: "Please select a screening report type",
  }),
  paymentMethod: z.enum(["renter", "me"], {
    required_error: "Please select who will pay for the screening report",
  }),
});

type ScreeningFormValues = z.infer<typeof screeningFormSchema>;

// Mock properties data - replace with actual data source
const properties = [
  { id: "prop1", name: "123 Main St" },
  { id: "prop2", name: "456 Oak Ave" },
  { id: "prop3", name: "789 Pine Blvd" },
];

export default function Screen() {
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
      showToast("Tenant screening request sent successfully!", "success");
      navigate("/landlord");
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-semibold">
        <span>Request Tenant Screening</span>
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Renter Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={dealIcon} className="size-10" />
              <span>Renter Info</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                    <FormLabel>Send Invite By</FormLabel>
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
                          <FormLabel className="font-normal">Email</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="text" />
                          </FormControl>
                          <FormLabel className="font-normal">Text</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="both" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Email & Text
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
                    <FormLabel>Renter's Email</FormLabel>
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
              <span>Rental Property</span>
            </div>

            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Applying To</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Applying to" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mailing Address Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={dealIcon} className="size-10" />
              <span>Your Mailing Address</span>
            </div>

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
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
                    <FormLabel>Unit</FormLabel>
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
                    <FormLabel>City</FormLabel>
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
                    <FormLabel>Region</FormLabel>
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
                    <FormLabel>Zip Code</FormLabel>
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
                  <FormLabel>Your Phone Number</FormLabel>
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
              <span>Screening Report Type</span>
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
                          title="PREMIUM SCREENING REPORT"
                          description="Background, Eviction, Credit + Income Insights"
                          amount={45}
                          isPremium
                        />
                      </FormItem>

                      <FormItem>
                        <ApplicationTypeCard
                          value="standard"
                          title="STANDARD SCREENING REPORT"
                          description="Background, Eviction, Credit Only"
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
              <span>Who will pay for the screening report?</span>
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
                          The renter will pay the fee
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="me" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I will pay the fee
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
              Cancel
            </Button>
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              size="lg"
              className="w-52 rounded-lg"
              type="submit"
            >
              Request Report
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
