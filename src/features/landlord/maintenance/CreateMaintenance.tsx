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

import type { TFunction } from "i18next";

// Define the form schema with Zod
const createFormSchema = (t: TFunction) =>
  z.object({
    property: z.string({
      required_error: t("maintenance.propertyRequired"),
    }),
    lease: z.string().optional(),
    leaseCategory: z
      .string({
        // required_error: t("maintenance.leaseCategoryRequired"),
      })
      .optional(),
    issueTitle: z
      .string({
        required_error: t("maintenance.issueTitleRequired"),
      })
      .min(5, {
        message: t("maintenance.issueTitleMin"),
      })
      .max(50, {
        message: t("maintenance.issueTitleMax"),
      }),
    description: z
      .string({
        required_error: t("maintenance.descriptionRequired"),
      })
      .min(10, {
        message: t("maintenance.descriptionMin"),
      }),
    preferredTime: z.enum(["anytime", "coordinate"], {
      required_error: t("maintenance.preferredTimeRequired"),
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

export function CreateMaintenance() {
  const { t } = useTranslation();
  const formSchema = createFormSchema(t);
  type FormValues = z.infer<typeof formSchema>;
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
        title={t("maintenance.createRequest")}
        description={t("maintenance.createRequestDescription")}
        withBack
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="property"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("maintenance.property")}</FormLabel>
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
                      {t("maintenance.lease")}{" "}
                      <span className="text-muted-foreground">
                        ({t("optional")})
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("maintenance.leasePlaceholder")}
                        {...field}
                      />
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
                    <FormLabel>{t("maintenance.leaseCategory")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("maintenance.leaseCategoryPlaceholder")}
                        {...field}
                      />
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
                    <FormLabel>{t("maintenance.issueTitle")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("maintenance.issueTitlePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value?.length ?? 0} / 50 {t("characters")}
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
                    <FormLabel>{t("maintenance.description")}</FormLabel>
                    <FormDescription>
                      {t("maintenance.descriptionHelper")}
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder={t("maintenance.descriptionPlaceholder")}
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
                    <FormLabel>{t("maintenance.preferredTime")}</FormLabel>
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
                          <FormLabel className="font-normal">
                            {t("maintenance.anytime")}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-y-0 space-x-3">
                          <FormControl>
                            <RadioGroupItem value="coordinate" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t("maintenance.coordinate")}
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
                    <FormLabel>{t("maintenance.photos")}</FormLabel>
                    <FormControl>
                      <ImageInput maxFiles={3} {...field} />
                    </FormControl>
                    <FormDescription>
                      {t("maintenance.photosHelper")}
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
              {t("maintenance.createRequestButton")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateMaintenance;
