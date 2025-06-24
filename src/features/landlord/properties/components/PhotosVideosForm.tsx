import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUploadImageMutation } from "../../api/mutations";
import { useUpdatePropertyMutation } from "../api/mutation";
import listingTitleIcon from "../assets/listing-title.png";
import mediaIcon from "../assets/media.png";
import propertyDescriptionIcon from "../assets/property-description.png";

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
    photos?: IServerImage[];
    videos?: IServerImage[];
  };
  onSuccess: () => void;
  propertyName?: string;
}

export function PhotosVideosForm({
  defaultValues,
  onSuccess,
  propertyName,
}: PhotosVideosFormProps) {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");
  const { mutateAsync: uploadImage } = useUploadImageMutation();

  const uuid = crypto.randomUUID();

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photos: defaultValues?.photos
        ? defaultValues?.photos?.map(({ img }) => img)
        : [],
      videoUrl: defaultValues?.videos
        ? defaultValues?.videos?.[0]?.img || ""
        : "",
    },
  });

  const onSubmit = async () => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {};
      const currentPhotos = form.getValues("photos");

      if (form.formState.dirtyFields.photos) {
        // Separate files and existing URLs
        const filesToUpload = currentPhotos.filter(
          (photo): photo is File => photo instanceof File,
        );
        const existingUrls = currentPhotos.filter(
          (photo): photo is string => typeof photo === "string",
        );

        // Upload new files
        const uploadedImages: IServerImage[] = [];
        for (const file of filesToUpload) {
          const formData = new FormData();
          formData.append("image", file);

          const uploadResponse = await uploadImage(formData);
          // The API returns an array, so take the first item
          if (uploadResponse.data.data && uploadResponse.data.data.length > 0) {
            uploadedImages.push(uploadResponse.data.data[0]);
          }
        }

        // Combine existing URLs (as IServerImage format) with newly uploaded images
        const existingImages: IServerImage[] = existingUrls.map((url) => ({
          _id: uuid,
          img: url,
        }));

        valuesToSubmit.image = [...existingImages, ...uploadedImages];
      }

      if (form.formState.dirtyFields.videoUrl) {
        valuesToSubmit.video = [
          {
            img: form.getValues("videoUrl") || "",
          },
        ];
      }

      // Only proceed if there's something to submit
      if (Object.keys(valuesToSubmit).length > 0) {
        await mutateAsync(valuesToSubmit);
      }
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
            {form.formState.isSubmitting ? "Uploading..." : t("next")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
