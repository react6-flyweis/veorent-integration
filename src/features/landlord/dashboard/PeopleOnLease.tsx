import { useState } from "react";
import { BuilderLayout } from "./components/BuilderLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingButton } from "@/components/ui/loading-button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import houseIcon from "./assets/house.png";
import houseOwnerIcon from "./assets/house-owner.png";
import { Form } from "@/components/ui/form";

// Define Zod validation schema
const formSchema = z.object({
  addTenantsLater: z.boolean(),
  tenantSearch: z.string().optional(),
  hasAdditionalOccupants: z.boolean(),
  occupantType: z.enum(["landlord", "company"]),
  landlordFirstName: z.string().min(1, "First name is required"),
  landlordLastName: z.string().min(1, "Last name is required"),
  landlordEmail: z.string().email("Invalid email address"),
  landlordPhone: z.string().min(1, "Phone number is required"),
  addAnotherLandlord: z.boolean(),
  hasDifferentAddress: z.boolean(),
  hasAdditionalAspects: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PeopleOnLease() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addTenantsLater: false,
      hasAdditionalOccupants: false,
      occupantType: "landlord",
      hasDifferentAddress: false,
      hasAdditionalAspects: false,
      addAnotherLandlord: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      // Handle navigation to next page
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BuilderLayout
      title="People on the Lease"
      description="Add all parties to be included on the lease agreement."
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tenants Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={houseOwnerIcon} className="size-10" alt="Tenant" />
              <span>Tenants</span>
            </div>

            <Card className="bg-blue-200 border-0 p-4 gap-2">
              <CardTitle className="text-semibold text-lg">
                Here's what you need to know:
              </CardTitle>
              <CardContent className="p-0">
                <ul className="list-disc space-y-1">
                  {new Array(4)
                    .fill(
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    )
                    .map((t, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="size-3 bg-orange-400"></div>
                        <span>{t}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Search Existing Renters</h3>
              <div className="flex items-center">
                <Controller
                  name="addTenantsLater"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="add-tenants-later"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label htmlFor="add-tenants-later" className="ml-2 text-sm">
                  I'll add my tenants later
                </label>
              </div>
            </div>

            <Input
              placeholder="Search by name or property"
              className="max-w-full"
              {...register("tenantSearch")}
            />
          </div>

          {/* Additional Occupants Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img
                src={houseIcon}
                className="size-10"
                alt="Additional Occupant"
              />
              <span>Additional Occupants</span>
            </div>

            <div>
              <p className="mb-2">Will there be any additional occupants?</p>
              <p className="text-sm text-gray-500 mb-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s. This is additional content that is right
                of the main text.
              </p>
              <Controller
                name="hasAdditionalOccupants"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex space-x-4"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="additional-yes" value="yes" />
                      <label htmlFor="additional-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="additional-no" value="no" />
                      <label htmlFor="additional-no">No</label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {/* Landlord Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 font-medium text-lg">
                <img src={houseOwnerIcon} className="size-10" alt="Landlord" />
                <span>Landlord</span>
              </div>

              <Controller
                name="occupantType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex space-x-4"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="landlord-type" value="landlord" />
                      <label htmlFor="landlord-type">Landlord</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="company-type" value="company" />
                      <label htmlFor="company-type">Company</label>
                    </div>
                  </RadioGroup>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">
                    Legal First Name
                  </label>
                  <Input className="mt-1" {...register("landlordFirstName")} />
                  {errors.landlordFirstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.landlordFirstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input className="mt-1" {...register("landlordLastName")} />
                  {errors.landlordLastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.landlordLastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input className="mt-1" {...register("landlordEmail")} />
                {errors.landlordEmail && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.landlordEmail.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input className="mt-1" {...register("landlordPhone")} />
                {errors.landlordPhone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.landlordPhone.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  name="addAnotherLandlord"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="add-another-landlord"
                      className="mr-2"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label
                  htmlFor="add-another-landlord"
                  className="text-sm font-medium uppercase"
                >
                  Add another landlord
                </label>
              </div>
            </div>
          </div>

          {/* Uncommon Scenarios Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img
                src={houseIcon}
                className="size-10"
                alt="Uncommon Scenarios"
              />
              <span>Uncommon Scenarios</span>
            </div>

            <div>
              <p className="mb-2">
                Will the manager or owner have a mailing address that differs
                from the rental property address:
              </p>
              <Controller
                name="hasDifferentAddress"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex space-x-4"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="different-address-yes" value="yes" />
                      <label htmlFor="different-address-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="different-address-no" value="no" />
                      <label htmlFor="different-address-no">No</label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            <div>
              <p className="mb-2">Are there any additional aspects?</p>
              <Controller
                name="hasAdditionalAspects"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex space-x-4"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="additional-aspects-yes" value="yes" />
                      <label htmlFor="additional-aspects-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="additional-aspects-no" value="no" />
                      <label htmlFor="additional-aspects-no">No</label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
