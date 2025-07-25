import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdatePropertyMutation } from "../api/mutation";
import listingDescriptionIcon from "../assets/listing-description.png";
import listingTitleIcon from "../assets/listing-title.png";
import propertyDescriptionIcon from "../assets/property-description.png";

const formSchema = (t: (key: string) => string) =>
  z.object({
    title: z
      .string()
      .min(1, { message: t("formSchema.title_required") })
      .max(100),
    description: z
      .string()
      .min(20, { message: t("formSchema.description_min") })
      .max(1000),
  });

type ListingDescriptionFormProps = {
  defaultValues?: {
    title?: string;
    description?: string;
  };
  onSuccess: () => void;
  propertyName?: string;
};

export function ListingDescriptionForm({
  defaultValues,
  onSuccess,
  propertyName,
}: ListingDescriptionFormProps) {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
    },
  });

  async function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        name: values.title,
        description: values.description,
      };
      await mutateAsync(valuesToSubmit);
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <IconRound icon={listingDescriptionIcon} size="sm" />
          <h2 className="text-2xl font-semibold">{t("listingDescription")}</h2>
        </div>
        {propertyName && (
          <div className="text-primary mb-5 text-xl">{propertyName}</div>
        )}
        <p className="text-muted-foreground">
          {t("provideDetailsAboutProperty")}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <IconRound icon={listingTitleIcon} size="sm" />
                  <FormLabel>{t("propertyTitle")}</FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder={t("exampleCozyDowntownApartment")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/100 {t("charactersUsed")}
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
                <div className="flex items-center gap-2">
                  <IconRound icon={propertyDescriptionIcon} size="sm" />
                  <FormLabel>{t("propertyDescription")}</FormLabel>
                </div>
                <FormControl>
                  <Textarea
                    placeholder={t("describePropertyInDetail")}
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {field.value.length}/1000 {t("charactersUsed")} | 20{" "}
                  {t("minimum")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormErrors errors={form.formState.errors} />

          <div className="flex items-center justify-center">
            <LoadingButton
              type="submit"
              className="w-4/5 @lg:w-3/5"
              isLoading={form.formState.isSubmitting}
              size="lg"
            >
              {t("next")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
