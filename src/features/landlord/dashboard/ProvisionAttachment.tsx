import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { BuilderLayout } from "./components/BuilderLayout";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";

import additionalTermsIcon from "./assets/additional.png";
import attachmentIcon from "./assets/attachment.png";
import { ImageUpload } from "@/components/ui/image-upload";

// Define schema for the form
const provisionAttachmentSchema = z.object({
  additionalTerms: z.string(),
  attachments: z.array(z.instanceof(File)).optional(),
});

type ProvisionAttachmentValues = z.infer<typeof provisionAttachmentSchema>;

export default function ProvisionAttachment() {
  const form = useForm<ProvisionAttachmentValues>({
    resolver: zodResolver(provisionAttachmentSchema),
    defaultValues: {
      additionalTerms: "",
      attachments: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ProvisionAttachmentValues) => {
    try {
      console.log(values);
      // TODO: Save provisions and attachments and move to next step
    } catch (error) {
      console.error("Error saving information:", error);
    }
  };

  return (
    <BuilderLayout
      title="Provisions & Attachments"
      description="Add custom clauses, rules or provisions specific to your property and/or local area."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Additional Terms Section */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 font-medium">
                <img src={additionalTermsIcon} alt="Keys" className="size-10" />
                <h3 className="text-xl">
                  Additional Terms
                  <span className="text-muted-foreground">(Optional)</span>
                </h3>
              </div>
              <p className="mb-4 text-gray-600">
                Are there any additional terms you'd like to add to this
                agreement?
              </p>
              <FormField
                control={form.control}
                name="additionalTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <Textarea className="min-h-28" {...field} />
                        <div className="mt-1 flex">
                          <span className="text-muted-foreground">
                            {field.value.length}/10000 characters used
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <img src={attachmentIcon} alt="Keys" className="size-10" />
              <h3 className="text-xl">Attachments</h3>
            </div>
            <h2 className="mb-2 text-xl font-medium"></h2>
            <div className="">
              <p className="mb-4 text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only
              </p>

              {/* Property Condition Report */}
              <div className="mb-4 rounded-lg border bg-blue-200 p-4">
                <h3 className="text-lg font-medium">
                  Property Condition Report
                </h3>
                <p className="">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only
                </p>
              </div>

              <FormField
                control={form.control}
                name="attachments"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload value={value || []} onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
