import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { ImageInput } from "@/components/ui/image-input";
import { useUpdatePropertyMutation } from "../api/mutation";
import { useParams } from "react-router";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormErrors from "@/components/FormErrors";

import listingTitleIcon from "../assets/listing-title.png";
import propertyDescriptionIcon from "../assets/property-description.png";
import mediaIcon from "../assets/media.png";

// Define our form schema with Zod
const formSchema = z.object({
  photos: z.array(z.union([z.instanceof(File), z.string()])),
  videoUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.string().length(0))
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PhotosVideosFormProps {
  defaultValues?: {
    photos?: (File | string)[];
    videoUrl?: string;
  };
  onSuccess: () => void;
  propertyName?: string;
}

export function PhotosVideosForm({
  defaultValues,
  onSuccess,
  propertyName,
}: PhotosVideosFormProps) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photos: defaultValues?.photos || [],
      videoUrl: defaultValues?.videoUrl || "",
    },
  });

  const onSubmit = async () => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        // Note: You might need to handle file uploads separately
        // This is a simplified example - commenting out until proper handling is implemented
        // video: values.videoUrl ? [{ url: values.videoUrl }] : [],
      };
      await mutateAsync(valuesToSubmit);
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="container max-w-3xl py-6">
      <div className="mb-6">
        <div className="mb-6 flex items-center gap-4">
          <IconRound icon={mediaIcon} />
          <h1 className="text-2xl font-bold">Photos & Videos</h1>
        </div>
        {propertyName && (
          <div className="text-primary mb-5 text-xl">{propertyName}</div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="mb-8">
            <div className="mb-4 flex items-center">
              <IconRound icon={listingTitleIcon} size="sm" className="mr-2" />
              <h2 className="text-lg font-semibold">Photos</h2>
            </div>

            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageInput multiple {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center">
              <IconRound
                icon={propertyDescriptionIcon}
                size="sm"
                className="mr-2"
              />
              <h2 className="text-lg font-semibold">Video Tour</h2>
            </div>

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    YouTube, Vimeo, or Matterport URL (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <FormErrors errors={form.formState.errors} />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
            size="lg"
          >
            {form.formState.isSubmitting ? "Uploading..." : "Next"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
