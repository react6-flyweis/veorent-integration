import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { IconRound } from "@/components/IconRound";
import documentsIcon from "@/assets/icons/documents.png";
import { Label } from "@/components/ui/label";
import { PlusCircleIcon } from "lucide-react";

const UploadSchema = z.object({
  photoId: z.any().refine((file) => file instanceof File || file?.length > 0, {
    message: "Photo ID is required",
  }),
  proofOfIncome: z
    .any()
    .refine((file) => file instanceof File || file?.length > 0, {
      message: "Proof of Income is required",
    }),
  otherDocs: z.any().optional(),
  uploadLater: z.boolean().optional(),
});

type UploadFormType = z.infer<typeof UploadSchema>;

export default function UploadDocumentsForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<UploadFormType>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      uploadLater: false,
    },
  });

  const onSubmit = (data: UploadFormType) => {
    console.log("Uploaded Data:", data);
    onSuccess();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={documentsIcon} size="sm" />
        <h2 className="text-2xl font-bold text-primary">Upload Documents</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>

          {/* Photo ID Upload */}
          <FormField
            control={form.control}
            name="photoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary font-semibold">
                  Photo ID
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing...
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
                      className="border shadow p-1 w-40 bg-accent flex justify-center items-center gap-3  cursor-pointer hover:bg-white"
                    >
                      <PlusCircleIcon className="size-5" />
                      <span>Upload a Photo Id</span>
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
                  Proof of Income
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing...
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
                      className="border shadow p-1 w-40 bg-accent flex justify-center items-center gap-3  cursor-pointer hover:bg-white"
                    >
                      <PlusCircleIcon className="size-5" />
                      <span>Upload a Proof of Income</span>
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
                  Other Docs{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing...
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
                      className="border shadow p-1 w-40 bg-accent flex justify-center items-center gap-3  cursor-pointer hover:bg-white"
                    >
                      <PlusCircleIcon className="size-5" />
                      <span>Upload a other docs</span>
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
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Upload documents later</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <p className="text-sm text-muted-foreground">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...
          </p>

          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
