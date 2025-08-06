import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateOrUpdateLeaseAgreementMutation } from "./api/mutation";
import { useUploadImageMutation } from "../api/mutations";
import additionalTermsIcon from "./assets/additional.png";
import attachmentIcon from "./assets/attachment.png";
import { BuilderLayout } from "./components/BuilderLayout";

// Define schema for the form
const provisionAttachmentSchema = z.object({
  additionalTerms: z.string(),
  attachment: z.instanceof(File),
});

type ProvisionAttachmentValues = z.infer<typeof provisionAttachmentSchema>;

export default function ProvisionAttachment() {
  const { t } = useTranslation();
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
        formData.append("image", values.attachment);
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
      title={t("leases.provisionAttachmentTitle")}
      description={t("leases.provisionAttachmentDescription")}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Additional Terms Section */}
          <div>
            <div className="flex items-center gap-2 font-medium">
              <img src={additionalTermsIcon} alt="Keys" className="size-10" />
              <h3 className="text-xl">{t("leases.additionalTermsTitle")}</h3>
            </div>
            <div className="text-primary mt-2 mb-4 space-y-2 font-semibold">
              <p className="text-black">
                {t("leases.additionalTermsQuestion")}
              </p>
              <p>{t("leases.additionalTermsDesc1")}</p>
              <p>{t("leases.additionalTermsDesc2")}</p>
              <p>{t("leases.additionalTermsDesc3")}</p>
            </div>

            <FormField
              control={form.control}
              name="additionalTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-xl uppercase">
                      {t("leases.additionalTermsLabel")}
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      ({t("optional")})
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Textarea className="min-h-28" {...field} />
                      <div className="mt-1 flex">
                        <span className="text-muted-foreground">
                          {field.value.length}/10000 {t("characters")}{" "}
                          {t("used")}
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
              <h3 className="text-xl">{t("leases.attachmentsTitle")}</h3>
            </div>
            <h2 className="mb-2 text-xl font-medium"></h2>
            <div className="">
              <p className="mb-4 text-gray-600">
                {t("leases.attachmentsDesc1")}
              </p>

              {/* Property Condition Report */}
              <div className="mb-4 rounded-lg border bg-blue-200 p-4">
                <h3 className="text-lg font-medium">
                  {t("leases.propertyConditionReportTitle")}
                </h3>
                <p className="">{t("leases.propertyConditionReportDesc")}</p>
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
              {isSuccess
                ? t("leases.savedSuccessfully")
                : t("leases.saveAndNext")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
