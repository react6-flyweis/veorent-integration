import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { IconRound } from "@/components/IconRound";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import propertySizeIcon from "../assets/property-size.png";
import { LoadingButton } from "@/components/ui/loading-button";

const propertySizeSchema = z.object({
  beds: z.string().min(1, { message: "Number of beds is required" }),
  baths: z.string().min(1, { message: "Number of baths is required" }),
  squareFeet: z.string().optional(),
  yearBuilt: z.string().optional(),
});

export type PropertySizeFormValues = z.infer<typeof propertySizeSchema>;

interface PropertySizeFormProps {
  defaultValues?: Partial<PropertySizeFormValues>;
  onSuccess: (data: PropertySizeFormValues) => void;
}

export const PropertySizeForm = ({
  defaultValues,
  onSuccess,
}: PropertySizeFormProps) => {
  const form = useForm<PropertySizeFormValues>({
    resolver: zodResolver(propertySizeSchema),
    defaultValues: {
      beds: "",
      baths: "",
      squareFeet: "",
      yearBuilt: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: PropertySizeFormValues) => {
    onSuccess(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <div className="mb-6 flex items-center gap-2">
            <IconRound icon={propertySizeIcon} size="sm" />
            <h2 className="text-xl font-semibold text-gray-800">
              Property Size
            </h2>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="beds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beds</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="squareFeet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Feet (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearBuilt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Built (Optional)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center">
            <LoadingButton
              type="submit"
              className="w-4/5 @lg:w-3/5"
              isLoading={form.formState.isSubmitting}
              size="lg"
            >
              Next
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
};
