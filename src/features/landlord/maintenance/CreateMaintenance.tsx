import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PageTitle } from "@/components/PageTitle";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateMaintenanceRequestMutation } from "./api/mutation";
import { PropertiesSelector } from "../dashboard/components/PropertiesSelector";

// Define the form schema with Zod
const formSchema = z.object({
  property: z.string({
    required_error: "Property is required",
  }),
  lease: z.string().optional(),
  leaseCategory: z
    .string({
      // required_error: "Lease category is required",
    })
    .optional(),
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
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { mutateAsync } = useCreateMaintenanceRequestMutation();

  const { showToast } = useToast();
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
  const onSubmit = async (values: FormValues) => {
    try {
      const images = values.photos?.map((file) => {
        if (typeof file === "string") {
          return file; // URL from server
        } else if (file instanceof File) {
          return URL.createObjectURL(file);
        }
        return "";
      });
      const valuesToSubmit: IMaintenanceRequestForm = {
        ...values,
        category: "Starred",
        issueDescription: values.description,
        timePeriod:
          values.preferredTime === "anytime"
            ? "Any-Time"
            : "Coordinate-A-Time-First",
        receipts: images ? images.filter((img) => img !== "") : [],
      };
      const result = await mutateAsync(valuesToSubmit);
      showToast("Maintenance request created successfully!", "success");
      setTimeout(() => {
        navigate(`/landlord/maintenance/${result.data.data._id}`);
      }, 200);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
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
                <FormControl>
                  <PropertiesSelector {...field} />
                </FormControl>

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
                    <FormLabel>{t("description")}</FormLabel>
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
                      <ImageInput maxFiles={3} {...field} />
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
              className="w-4/5 @lg:w-3/5"
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
