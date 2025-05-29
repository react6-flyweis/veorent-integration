import { PageTitle } from "@/components/PageTitle";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

// Import images for property types
import marketingImg from "@/assets/images/marketing.png";
import sofaImg from "@/assets/images/sofa.png";
import apartmentImg from "@/assets/images/apartment.png";
import townhouseImg from "@/assets/images/townhouse.png";
import villaImg from "@/assets/images/villa.png";
import skyscraperImg from "@/assets/images/skyscraper.png";
import factoryImg from "@/assets/images/factory.png";
import requestImg from "@/assets/images/request.png";
import { LoadingButton } from "@/components/ui/loading-button";

const propertyTypes = [
  { label: "Marketing", image: marketingImg, key: "marketing" },
  { label: "Furnished Home", image: sofaImg, key: "furnished-home" },
  { label: "Apartment", image: apartmentImg, key: "apartment" },
  { label: "Townhouse", image: townhouseImg, key: "townhouse" },
  { label: "Condo", image: villaImg, key: "condo" },
  { label: "Multi-Family", image: skyscraperImg, key: "multi-family" },
  { label: "Manufactured", image: factoryImg, key: "manufactured" },
  { label: "Other", image: requestImg, key: "other" },
];

const formSchema = z.object({
  propertyType: z.string().min(1, "Please select a property type"),
  hasRoomRentals: z.enum(["yes", "no"]),
});

type AddPropertyFormValues = z.infer<typeof formSchema>;

export function PropertyType({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<AddPropertyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      hasRoomRentals: "yes",
    },
  });

  const onSubmit = (values: AddPropertyFormValues) => {
    console.log("Form submitted:", values);
    // Handle form submission - typically navigate to next step or save data
    // navigate("/landlord/properties/add/details");
    onSuccess();
  };

  return (
    <div className="">
      <PageTitle title="Which best describes your property?" withBack />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Property Type</FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
                >
                  {propertyTypes.map((type) => (
                    <Card
                      key={type.key}
                      className={`relative cursor-pointer border py-0 transition-all ${
                        field.value === type.key
                          ? "border-primary bg-blue-50"
                          : "border-input hover:border-primary/50"
                      }`}
                    >
                      <div className="absolute top-3 left-3 flex h-5 w-5 items-center justify-center">
                        <div
                          className={`border-input flex h-5 w-5 items-center justify-center rounded-full border ${
                            field.value === type.key
                              ? "bg-primary border-primary"
                              : "bg-background"
                          }`}
                        >
                          {field.value === type.key && (
                            <div className="h-2.5 w-2.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                      <label
                        htmlFor={`property-type-${type.key}`}
                        className="cursor-pointer"
                      >
                        <CardContent className="flex flex-col items-center justify-center p-3 py-6 text-center">
                          <input
                            type="radio"
                            id={`property-type-${type.key}`}
                            className="sr-only"
                            {...field}
                            value={type.key}
                            checked={field.value === type.key}
                          />
                          <img
                            src={type.image}
                            alt={type.label}
                            className="mb-3 h-12 w-12 object-contain"
                          />
                          <span className="text-primary font-medium">
                            {type.label}
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

          <div>
            <h3 className="mb-4 text-lg font-medium">
              Will you have rooms rentals?
            </h3>
            <FormField
              control={form.control}
              name="hasRoomRentals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Room Rentals</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`border-input flex h-5 w-5 items-center justify-center rounded-full border ${
                          field.value === "yes"
                            ? "bg-primary border-primary"
                            : "bg-background"
                        }`}
                      >
                        {field.value === "yes" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <label
                        htmlFor="room-rentals-yes"
                        className="cursor-pointer"
                      >
                        <input
                          type="radio"
                          id="room-rentals-yes"
                          className="sr-only"
                          {...field}
                          value="yes"
                          checked={field.value === "yes"}
                        />
                        <span>Yes</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`border-input flex h-5 w-5 items-center justify-center rounded-full border ${
                          field.value === "no"
                            ? "bg-primary border-primary"
                            : "bg-background"
                        }`}
                      >
                        {field.value === "no" && (
                          <div className="h-2.5 w-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <label
                        htmlFor="room-rentals-no"
                        className="cursor-pointer"
                      >
                        <input
                          type="radio"
                          id="room-rentals-no"
                          className="sr-only"
                          {...field}
                          value="no"
                          checked={field.value === "no"}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center">
            <LoadingButton
              type="submit"
              className="w-4/5 @lg:w-3/5"
              isLoading={form.formState.isSubmitting}
              size="lg"
            >
              Next
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
