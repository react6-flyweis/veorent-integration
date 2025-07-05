import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon } from "lucide-react";
import { z } from "zod";

import documentsIcon from "@/assets/icons/documents.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateBookingMutation } from "../../api/mutation";

const UploadSchema = z
  .object({
    photoId: z.any().optional(),
    proofOfIncome: z.any().optional(),
    otherDocs: z.any().optional(),
    uploadLater: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // If uploadLater is checked, skip validation for required files
      if (data.uploadLater) {
        return true;
      }

      // Otherwise, validate required files
      const hasPhotoId =
        data.photoId instanceof File ||
        (data.photoId && data.photoId.length > 0);
      const hasProofOfIncome =
        data.proofOfIncome instanceof File ||
        (data.proofOfIncome && data.proofOfIncome.length > 0);

      return hasPhotoId && hasProofOfIncome;
    },
    {
      message:
        "Photo ID and Proof of Income are required when not uploading later",
      path: ["photoId"], // This will show the error on the photoId field
    },
  );

type UploadFormType = z.infer<typeof UploadSchema>;

export default function UploadDocumentsForm({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");
  const { t } = useTranslation();

  const form = useForm<UploadFormType>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      uploadLater:
        !bookingData?.document?.photo && !bookingData?.document?.incomeProof,
    },
  });

  const onSubmit = async (data: UploadFormType) => {
    try {
      await mutateAsync({
        document: {
          photo: data.uploadLater ? "" : data.photoId || "",
          incomeProof: data.uploadLater ? "" : data.proofOfIncome || "",
          otherDoc: data.otherDocs || "",
          comment: "",
        },
      });
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={documentsIcon} size="sm" />
        <h2 className="text-primary text-2xl font-bold">
          {t("uploadDocuments.title")}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <p className="text-muted-foreground text-sm">
            {t("uploadDocuments.desc")}
          </p>

          {/* Photo ID Upload */}
          <FormField
            control={form.control}
            name="photoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">
                  {t("uploadDocuments.photoId")}
                </FormLabel>
                <FormDescription>
                  {t("uploadDocuments.photoIdDesc")}
                </FormDescription>
                <FormControl>
                  <div>
                    <Input
                      id={field.name}
                      type="file"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    <Label
                      htmlFor={field.name}
                      className="bg-accent flex w-40 cursor-pointer items-center justify-center gap-3 border p-1 shadow hover:bg-white"
                    >
                      <PlusCircleIcon className="size-5" />
                      <span>{t("uploadDocuments.photoId")}</span>
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Proof of Income */}
          <FormField
            control={form.control}
            name="proofOfIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">
                  {t("uploadDocuments.proofOfIncome")}
                </FormLabel>
                <FormDescription>
                  {t("uploadDocuments.proofOfIncomeDesc")}
                </FormDescription>
                <FormControl>
                  <div className="">
                    <Input
                      id={field.name}
                      type="file"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    <Label
                      htmlFor={field.name}
                      className="bg-accent flex w-40 cursor-pointer items-center justify-center gap-3 border p-1 shadow hover:bg-white"
                    >
                      <PlusCircleIcon className="size-5" />
                      <span>{t("uploadDocuments.proofOfIncome")}</span>
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other Docs (Optional) */}
          <FormField
            control={form.control}
            name="otherDocs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">
                  {t("uploadDocuments.otherDocs")}
                </FormLabel>
                <FormDescription>
                  {t("uploadDocuments.otherDocsDesc")}
                </FormDescription>
                <FormControl>
                  <div className="">
                    <Input
                      id={field.name}
                      type="file"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                    <Label
                      htmlFor={field.name}
                      className="bg-accent flex w-40 cursor-pointer items-center justify-center gap-3 border p-1 shadow hover:bg-white"
                    >
                      <PlusCircleIcon className="size-5" />
                      <span>{t("uploadDocuments.otherDocs")}</span>
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Later Checkbox */}
          <FormField
            control={form.control}
            name="uploadLater"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(!!checked);
                      // Clear validation errors when toggling upload later
                      if (checked) {
                        form.clearErrors();
                      }
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("uploadDocuments.uploadLater")}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <p className="text-muted-foreground text-sm">
            {t("uploadDocuments.desc")}
          </p>

          <FormErrors errors={form.formState.errors} />

          <div className="flex items-center justify-center">
            <LoadingButton
              type="submit"
              className="w-4/5 @lg:w-3/5"
              isLoading={isPending}
            >
              {t("actions.saveNext")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
