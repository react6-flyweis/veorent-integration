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
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/ui/loading-button";
import { PropertyTypeSelector } from "../components/PropertyTypeSelector";

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <FormField
            control={form.control}
            name="hasRoomRentals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Will you have rooms rentals?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="yes" id="room-rentals-yes" />
                      </FormControl>
                      <FormLabel htmlFor="room-rentals-yes">Yes</FormLabel>
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
