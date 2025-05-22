import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/ui/image-upload";
import { useNavigate } from "react-router";
import { PageTitle } from "@/components/PageTitle";
import { LoadingButton } from "@/components/ui/loading-button";

// Define the form schema with Zod
const formSchema = z.object({
  property: z.string({
    required_error: "Property is required",
  }),
  lease: z.string().optional(),
  leaseCategory: z.string({
    required_error: "Lease category is required",
  }),
  issueTitle: z
    .string({
      required_error: "Issue title is required",
    })
    .min(5, {
      message: "Issue title must be at least 5 characters",
    })
    .max(50, {
      message: "Issue title must be at most 50 characters",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, {
      message: "Description must be at least 10 characters",
    }),
  preferredTime: z.enum(["anytime", "coordinate"], {
    required_error: "Please select a preferred time",
  }),
  photos: z
    .array(
      z.union([
        z.string(), // for URLs from server
        z.instanceof(File), // for new uploads
      ]),
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateMaintenance() {
  const navigate = useNavigate();
  // Set default values for the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredTime: "anytime",
      photos: [],
    },
  });

  const property = useWatch({
    control: form.control,
    name: "property",
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);
    // Add your API call here to submit the form data
    navigate("/landlord/maintenance/_id_");
  };

  return (
    <div className="">
      <PageTitle
        title="Create Maintenance Request"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and "
        withBack
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="property"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="123-st">CO. 123 St.</SelectItem>
                    <SelectItem value="456-ave">CO. 456 Ave.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {property && (
            <>
              <FormField
                control={form.control}
                name="lease"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Lease
                      <span className="text-muted-foreground"> (Optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter lease information" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leaseCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lease Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter lease category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issueTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Leaky Kitchen Faucet"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length ?? 0} / 50 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormDescription>
                      Lorem ipsum dolor, sit amet consectetur adipisicing
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the maintenance issue in detail"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time to Enter</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="anytime" />
                          </FormControl>
                          <FormLabel className="font-normal">Anytime</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="coordinate" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Coordinate a Time First
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
                name="photos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photos (Optional)</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(urls) => field.onChange(urls)}
                        maxFiles={3}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload up to 3 photos of the issue
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting || !property}
              type="submit"
              size="lg"
              className="w-3/5"
            >
              Create Request
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateMaintenance;
