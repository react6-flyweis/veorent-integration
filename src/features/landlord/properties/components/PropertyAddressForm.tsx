import type { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdatePropertyMutation } from "../api/mutation";

const formSchema = (t: (key: string) => string) =>
  z.object({
    streetAddress: z.string().min(1, t("formSchema.streetAddress_required")),
    unit: z.string().min(1, t("formSchema.unit_required")),
    city: z.string().min(1, t("formSchema.city_required")),
    region: z.string().min(1, t("formSchema.region_required")),
    zipCode: z.string().min(1, t("formSchema.zipCode_required")),
  });

type FormValues = z.infer<ReturnType<typeof formSchema>>;

export function PropertyAddressForm({
  defaultValues,
  onSuccess,
  standAlone = false,
  propertyName,
}: {
  defaultValues?: IPropertyAddress;
  onSuccess: (values: FormValues) => void;
  standAlone?: boolean;
  propertyName?: string;
}) {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      streetAddress: defaultValues?.streetAddress || "",
      unit: defaultValues?.unit || "",
      city: defaultValues?.city || "",
      region: defaultValues?.region || "",
      zipCode: defaultValues?.zipCode || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (standAlone && id) {
        const valuesToSubmit: IPropertyUpdateData = {
          addressDetails: {
            houseNumber: "",
            streetAddress: data.streetAddress,
            city: data.city,
            region: data.region,
            zipCode: data.zipCode,
          },
        };
        await mutateAsync(valuesToSubmit);
      }
      onSuccess(data);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  const WrapperComponent = ({ children }: PropsWithChildren) =>
    standAlone ? (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    ) : (
      <div className="space-y-4">{children}</div>
    );

  return (
    <Form {...form}>
      <WrapperComponent>
        {propertyName && (
          <div className="text-primary mb-5 text-xl">{propertyName}</div>
        )}

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("streetAddress")}</FormLabel>
              <FormControl>
                <Input placeholder={t("enterStreetAddress")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("unit")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("apartmentSuiteEtcOptional")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("city")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("enterCity")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("region")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("stateProvinceRegion")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("zipCode")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("enterZipCode")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Card className="rounded-none border-0 bg-blue-200 p-4">
          <p className="text-primary text-sm">
            {t("propertyAddressDescription")}
          </p>
        </Card>
        <div className="flex items-center justify-center">
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            type={standAlone ? "submit" : "button"}
            onClick={standAlone ? undefined : form.handleSubmit(onSubmit)}
            size="lg"
            className="w-4/5 @lg:w-3/5"
          >
            {t("continue")}
          </LoadingButton>
        </div>
      </WrapperComponent>
    </Form>
  );
}
