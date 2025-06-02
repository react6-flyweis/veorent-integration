import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BuilderLayout } from "./components/BuilderLayout";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";

import additionalTermsIcon from "./assets/additional.png";
import attachmentIcon from "./assets/attachment.png";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useCreateOrUpdateLeaseAgreementMutation } from "./api/mutation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormErrors from "@/components/FormErrors";
import { ImageInput } from "@/components/ui/image-input";
import { useUploadImageMutation } from "../api/mutations";

// Define schema for the form
const provisionAttachmentSchema = z.object({
  additionalTerms: z.string(),
  attachment: z.instanceof(File),
});

type ProvisionAttachmentValues = z.infer<typeof provisionAttachmentSchema>;

export default function ProvisionAttachment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync, isSuccess } = useCreateOrUpdateLeaseAgreementMutation();
  const { mutateAsync: uploadAttachment } = useUploadImageMutation();

  const form = useForm<ProvisionAttachmentValues>({
    resolver: zodResolver(provisionAttachmentSchema),
    defaultValues: {
      additionalTerms: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: ProvisionAttachmentValues) => {
    try {
      const valuesToSave: {
        rentalProperty: string;
        ProvisionsAndAttachments: {
          additionalTerm: string;
          attachment?: string;
        };
      } = {
        rentalProperty: state.property,
        ProvisionsAndAttachments: {
          additionalTerm: values.additionalTerms,
        },
      };
      if (values.attachment) {
        // upload the attachment
        const formData = new FormData();
        formData.append("file", values.attachment);
        // response as url
        const response = await uploadAttachment(formData);
        // pass url to valuesToSave
        valuesToSave.ProvisionsAndAttachments.attachment =
          response.data.data[0].img;
      }
      await mutateAsync(valuesToSave);
      setTimeout(() => {
        navigate("/landlord/lease-agreement/create", { state });
      }, 300);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  if (!state || !state.property) {
    // if no property is selected then redirect to select lease
    return <Navigate to="/landlord/lease-agreement" />;
  }

  return (
    <BuilderLayout
      title="Provisions & Attachments"
      description="Add custom clauses, rules or provisions specific to your property and/or local area."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Additional Terms Section */}
          <div>
            <div className="flex items-center gap-2 font-medium">
              <img src={additionalTermsIcon} alt="Keys" className="size-10" />
              <h3 className="text-xl">Additional Terms</h3>
            </div>
            <div className="text-primary mt-2 mb-4 space-y-2 font-semibold">
              <p className="text-black">
                Are there any additional terms you'd like to add to this
                agreement?
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's
              </p>
            </div>

            <FormField
              control={form.control}
              name="additionalTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-xl uppercase">Additional Terms</span>
                    <span className="text-muted-foreground"> (Optional)</span>
                  </FormLabel>
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
                name="attachment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput multiple={false} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
              type="submit"
            >
              {isSuccess ? "Saved!" : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
