import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import { IconRound } from "@/components/IconRound";
import { useUpdatePropertyMutation } from "../api/mutation";
import { useParams } from "react-router";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormErrors from "@/components/FormErrors";

import listingDescriptionIcon from "../assets/listing-description.png";
import listingTitleIcon from "../assets/listing-title.png";
import propertyDescriptionIcon from "../assets/property-description.png";

const formSchema = z.object({
  title: z.string().min(1, { message: "Property title is required" }).max(100),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(1000),
});

type ListingDescriptionFormProps = {
  defaultValues?: {
    title?: string;
    description?: string;
  };
  onSuccess: () => void;
  propertyName?: string;
};

export function ListingDescriptionForm({
  defaultValues,
  onSuccess,
  propertyName,
}: ListingDescriptionFormProps) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        name: values.title,
        description: values.description,
      };
      await mutateAsync(valuesToSubmit);
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <IconRound icon={listingDescriptionIcon} size="sm" />
          <h2 className="text-2xl font-semibold">Listing Description</h2>
        </div>
        {propertyName && (
          <div className="text-primary mb-5 text-xl">{propertyName}</div>
        )}
        <p className="text-muted-foreground">
          Provide details about your property
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <IconRound icon={listingTitleIcon} size="sm" />
                  <FormLabel>Property Title</FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="e.g. Cozy Downtown Apartment"
                    {...field}
                  />
                </FormControl>
                <FormDescription>0/100 characters used</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <IconRound icon={propertyDescriptionIcon} size="sm" />
                  <FormLabel>Property Description</FormLabel>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Describe your property in detail..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/1000 characters used | 100 minimum
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </div>
  );
}
