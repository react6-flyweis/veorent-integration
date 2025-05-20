import { BuilderLayout } from "./components/BuilderLayout";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/ui/loading-button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import parkingIcon from "./assets/parking.png";
import pawsIcon from "./assets/paw.png";
import smokingIcon from "./assets/smoking.png";
import insuranceIcon from "./assets/renter-insurance.png";

// Define Zod validation schema
const formSchema = z.object({
  hasPets: z.boolean(),
  allowsSmoking: z.enum(["yes", "no", "outside"]),
  includesParkingRules: z.boolean(),
  requiresRentersInsurance: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PetSmoking() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasPets: false,
      allowsSmoking: "no",
      includesParkingRules: false,
      requiresRentersInsurance: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      // Handle navigation to next page
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Pets Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={pawsIcon} alt="Pets" className="w-6 h-6" />
            <h2 className="text-lg font-medium">Pets</h2>
          </div>
          <p className="text-sm">Will there be pet(s) on this lease?</p>
          <Controller
            name="hasPets"
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="flex space-x-4"
                value={field.value ? "yes" : "no"}
                onValueChange={(value) => field.onChange(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="pets-yes" value="yes" />
                  <label htmlFor="pets-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="pets-no" value="no" />
                  <label htmlFor="pets-no">No</label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Smoking Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={smokingIcon} alt="Smoking" className="w-6 h-6" />
            <h2 className="text-lg font-medium">Smoking</h2>
          </div>
          <p className="text-sm">Do you allow smoking at this property?</p>
          <Controller
            name="allowsSmoking"
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="flex space-x-4"
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="smoking-yes" value="yes" />
                  <label htmlFor="smoking-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="smoking-no" value="no" />
                  <label htmlFor="smoking-no">No</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="smoking-outside" value="outside" />
                  <label htmlFor="smoking-outside">Outside Only</label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Parking Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={parkingIcon} alt="Parking" className="w-6 h-6" />
            <h2 className="text-lg font-medium">Parking</h2>
          </div>
          <p className="text-sm">Do you want to include parking rules?</p>
          <Controller
            name="includesParkingRules"
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="flex space-x-4"
                value={field.value ? "yes" : "no"}
                onValueChange={(value) => field.onChange(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="parking-yes" value="yes" />
                  <label htmlFor="parking-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="parking-no" value="no" />
                  <label htmlFor="parking-no">No</label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Renters Insurance Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={insuranceIcon} alt="Insurance" className="w-6 h-6" />
            <h2 className="text-lg font-medium">Renters Insurance</h2>
          </div>
          <p className="text-sm">Do you require renter's insurance?</p>
          <Controller
            name="requiresRentersInsurance"
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="flex space-x-4"
                value={field.value ? "yes" : "no"}
                onValueChange={(value) => field.onChange(value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="insurance-yes" value="yes" />
                  <label htmlFor="insurance-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="insurance-no" value="no" />
                  <label htmlFor="insurance-no">No</label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <LoadingButton
            isLoading={isSubmitting}
            type="submit"
            className="w-3/5"
          >
            Save & Next
          </LoadingButton>
        </div>
      </form>
    </BuilderLayout>
  );
}
