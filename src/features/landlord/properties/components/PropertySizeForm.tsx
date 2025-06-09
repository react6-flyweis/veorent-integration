import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdatePropertyMutation } from "../api/mutation";
import propertySizeIcon from "../assets/property-size.png";

const propertySizeSchema = z.object({
  beds: z.coerce.number().min(1, { message: "Number of beds is required" }),
  baths: z.coerce.number().min(1, { message: "Number of baths is required" }),
  squareFeet: z.coerce.number().optional(),
  yearBuilt: z.coerce.number().optional(),
});

type PropertySizeFormValues = z.infer<typeof propertySizeSchema>;

interface PropertySizeFormProps {
  defaultValues?: IPropertySize;
  onSuccess: (data: PropertySizeFormValues) => void;
  propertyName?: string;
}

export const PropertySizeForm = ({
  defaultValues,
  onSuccess,
  propertyName,
}: PropertySizeFormProps) => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<PropertySizeFormValues>({
    resolver: zodResolver(propertySizeSchema),
    defaultValues: {
      beds: defaultValues?.beds || 0,
      baths: defaultValues?.baths || 0,
      squareFeet: defaultValues?.squareFeet || 0,
      yearBuilt: defaultValues?.yearBuilt || 0,
    },
  });

  const handleSubmit = async (data: PropertySizeFormValues) => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        propertySize: {
          ...data,
          squareFeet: data.squareFeet || 0,
          yearBuilt: data.yearBuilt || 0,
        },
      };
      await mutateAsync(valuesToSubmit);
      onSuccess(data);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
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

          {propertyName && (
            <div className="text-primary mb-5 text-xl">{propertyName}</div>
          )}

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

          <FormErrors errors={form.formState.errors} />

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
