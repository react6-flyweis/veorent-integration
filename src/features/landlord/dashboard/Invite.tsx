import { useState } from "react";
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

import dealIcon from "./assets/deal.png";
import penApplicationIcon from "./assets/pen-application.png";
import rentHouseIcon from "./assets/rent-house.png";
import { LoadingButton } from "@/components/ui/loading-button";
import { ApplicationTypeCard } from "./components/ApplicationTypeCard";
import { useGoBack } from "@/hooks/useGoBack";

const inviteFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  inviteMethod: z.enum(["email", "text", "both"], {
    required_error: "Please select an invite method",
  }),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  propertyId: z.string({
    required_error: "Please select a property",
  }),
  rentAmount: z.string().min(1, "Rent amount is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  applicationType: z.enum(["premium", "standard"], {
    required_error: "Please select an application type",
  }),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;

// Mock properties data - replace with actual data source
const properties = [
  { id: "prop1", name: "123 Main St" },
  { id: "prop2", name: "456 Oak Ave" },
  { id: "prop3", name: "789 Pine Blvd" },
];

export default function Invite() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const goBack = useGoBack();

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
    setIsSubmitting(true);
    try {
      console.log(values);
      // TODO: Implement API call to send invite
      alert("Invite sent successfully");
      form.reset();
    } catch (error) {
      console.error("Error sending invite:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <h2 className="font-semibold text-3xl">
        <span>Invite Renter to Apply</span>
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Renter Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
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
                  <FormItem className="space-y-2 col-span-2">
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
            <div className="flex items-center gap-2 font-medium text-lg">
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent Amount</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                    <FormLabel>Security Deposit</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Application Type Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={penApplicationIcon} className="size-10" />
              <span>Application Type</span>
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
              isLoading={isSubmitting}
              size="lg"
              className="w-52 rounded-lg"
              type="submit"
            >
              {isSubmitting ? "Sending..." : "Invite"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
