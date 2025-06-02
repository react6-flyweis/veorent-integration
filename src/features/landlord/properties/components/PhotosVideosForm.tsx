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
  onSuccess: () => void;
}

export function PhotosVideosForm({ onSuccess }: PhotosVideosFormProps) {
  // Initialize form with React Hook Form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photos: [],
      videoUrl: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would handle the actual upload to your backend
      console.log("Uploading photos:", values.photos);
      console.log("Video URL:", values.videoUrl);
      // await uploadPhotosAndVideos(values.photos, values.videoUrl);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } catch (error) {
      console.error("Error uploading photos and videos:", error);
    }
  };

  return (
    <div className="container max-w-3xl py-6">
      <div className="mb-6">
        <div className="mb-6 flex items-center gap-4">
          <IconRound icon="pictures" size="lg" />
          <h1 className="text-2xl font-bold">Photos & Videos</h1>
        </div>
        <p className="mb-2 text-gray-500">123 Main St.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className="mb-8">
            <div className="mb-4 flex items-center">
              <IconRound icon="pictures" size="sm" className="mr-2" />
              <h2 className="text-lg font-semibold">Photos</h2>
            </div>

            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="mb-8">
            <div className="mb-4 flex items-center">
              <IconRound icon="pictures" size="sm" className="mr-2" />
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
