import { BuilderLayout } from "./components/BuilderLayout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/ui/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import parkingIcon from "./assets/parking.png";
import pawsIcon from "./assets/paw.png";
import smokingIcon from "./assets/smoking.png";
import insuranceIcon from "./assets/renter-insurance.png";
import { useNavigate } from "react-router";

// Define Zod validation schema
const formSchema = z.object({
  hasPets: z.boolean(),
  petType: z.string().optional(),
  petBreed: z.string().optional(),
  petWeight: z.string().optional(),
  petAge: z.string().optional(),
  allowsSmoking: z.enum(["yes", "no", "outside"]),
  includesParkingRules: z.boolean(),
  parkingOptions: z
    .object({
      garage: z.boolean(),
      driveway: z.boolean(),
      street: z.boolean(),
      carport: z.boolean(),
      designatedSpace: z.boolean(),
      other: z.boolean(),
    })
    .optional(),
  requiresRentersInsurance: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PetSmoking() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasPets: false,
      petType: "",
      petBreed: "",
      petWeight: "",
      petAge: "",
      allowsSmoking: "no",
      includesParkingRules: false,
      parkingOptions: {
        garage: false,
        driveway: false,
        street: false,
        carport: false,
        designatedSpace: false,
        other: false,
      },
      requiresRentersInsurance: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const hasPets = form.watch("hasPets");
  const includesParkingRules = form.watch("includesParkingRules");

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      // Handle navigation to next page
      navigate("/landlord/lease-agreement/utilities-services");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <BuilderLayout
      title="Pets, Smoking, & Other"
      description="We automatically filled information we had on file. Please double check it since it will go into the legal agreement."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Pets Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={pawsIcon} alt="Pets" className="h-6 w-6" />
              <h2 className="text-lg font-medium">Pets</h2>
            </div>
            <p>Will there be pet(s) on this lease?</p>
            <FormField
              control={form.control}
              name="hasPets"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="pets-yes" value="yes" />
                        <FormLabel htmlFor="pets-yes" className="text-base">
                          Yes
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="pets-no" value="no" />
                        <FormLabel htmlFor="pets-no" className="text-base">
                          No
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Pet Details Section - Only show when hasPets is true */}
            {hasPets && (
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="petType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type (Dog,Cat,ETC.)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petBreed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (LBS)</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" inputMode="numeric" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Smoking Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={smokingIcon} alt="Smoking" className="h-6 w-6" />
              <h2 className="text-lg font-medium">Smoking</h2>
            </div>
            <p>Do you allow smoking at this property?</p>
            <FormField
              control={form.control}
              name="allowsSmoking"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="smoking-yes" value="yes" />
                        <FormLabel htmlFor="smoking-yes" className="text-base">
                          Yes
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="smoking-no" value="no" />
                        <FormLabel htmlFor="smoking-no" className="text-base">
                          No
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="smoking-outside" value="outside" />
                        <FormLabel
                          htmlFor="smoking-outside"
                          className="text-base"
                        >
                          Outside Only
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Parking Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={parkingIcon} alt="Parking" className="h-6 w-6" />
              <h2 className="text-lg font-medium">Parking</h2>
            </div>
            <p>Do you want to include parking rules?</p>
            <FormField
              control={form.control}
              name="includesParkingRules"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="parking-yes" value="yes" />
                        <FormLabel htmlFor="parking-yes" className="text-base">
                          Yes
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="parking-no" value="no" />
                        <FormLabel htmlFor="parking-no" className="text-base">
                          No
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Parking Options - Only displayed if includesParkingRules is true */}
            {includesParkingRules && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="parkingOptions.garage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Garage</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parkingOptions.driveway"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Driveway</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parkingOptions.street"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Street</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parkingOptions.carport"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Carport</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parkingOptions.designatedSpace"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Designated Space
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parkingOptions.other"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Other</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Renters Insurance Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={insuranceIcon} alt="Insurance" className="h-6 w-6" />
              <h2 className="text-lg font-medium">Renters Insurance</h2>
            </div>
            <p>Do you require renter's insurance?</p>
            <FormField
              control={form.control}
              name="requiresRentersInsurance"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="insurance-yes" value="yes" />
                        <FormLabel
                          htmlFor="insurance-yes"
                          className="text-base"
                        >
                          Yes
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="insurance-no" value="no" />
                        <FormLabel htmlFor="insurance-no" className="text-base">
                          No
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <LoadingButton
              isLoading={isSubmitting}
              type="submit"
              size="lg"
              className="w-4/5 @lg:w-3/5"
            >
              Save & Next
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
