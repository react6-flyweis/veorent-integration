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

const formSchema = z.object({
  title: z.string().min(1, { message: "Property title is required" }).max(100),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(1000),
});

type ListingDescriptionFormProps = {
  onSuccess: () => void;
};

export function ListingDescriptionForm({
  onSuccess,
}: ListingDescriptionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically save the form data
    console.log("Form values:", values);
    // Simulate API call
    setTimeout(() => {
      onSuccess();
    }, 500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Listing Description</h2>
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
                <FormLabel>Property Title</FormLabel>
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
                <FormLabel>Property Description</FormLabel>
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
