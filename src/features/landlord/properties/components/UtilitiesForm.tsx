import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdatePropertyMutation } from "../api/mutation";
import utilitiesCoveredIcon from "../assets/utilities-covered.png";
import utilitiesIcon from "../assets/utilities.png";

const utilitiesSchema = z.object({
  cable: z.boolean(),
  internet: z.boolean(),
  electricity: z.boolean(),
  satelliteTV: z.boolean(),
  garbage: z.boolean(),
  sewage: z.boolean(),
  gas: z.boolean(),
  water: z.boolean(),
});

export type UtilitiesFormValues = z.infer<typeof utilitiesSchema>;

interface UtilitiesFormProps {
  defaultValues?: IAmenities;
  onSuccess: (data: UtilitiesFormValues) => void;
  propertyName?: string;
  completionStatus?: IFormCompletionStatus;
}

export const UtilitiesForm = ({
  defaultValues,
  onSuccess,
  propertyName,
  completionStatus,
}: UtilitiesFormProps) => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");
  const form = useForm<UtilitiesFormValues>({
    resolver: zodResolver(utilitiesSchema),
    defaultValues: {
      cable: defaultValues?.cable || false,
      internet: defaultValues?.internet || false,
      electricity: defaultValues?.electricty || false,
      satelliteTV: defaultValues?.satelliteTv || false,
      garbage: defaultValues?.garbage || false,
      sewage: defaultValues?.sewage || false,
      gas: defaultValues?.gas || false,
      water: defaultValues?.water || false,
    },
  });

  const handleSubmit = async (data: UtilitiesFormValues) => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        amenities: {
          ...defaultValues,
          cable: data.cable,
          internet: data.internet,
          electricty: data.electricity,
          satelliteTv: data.satelliteTV,
          garbage: data.garbage,
          sewage: data.sewage,
          gas: data.gas,
          water: data.water,
        } as IAmenities,
        formCompletionStatus: {
          ...completionStatus,
          amenities: true,
        },
      };
      await mutateAsync(valuesToSubmit);
      onSuccess(data);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <div className="mb-6 flex items-center gap-2">
            <IconRound icon={utilitiesIcon} size="sm" />
            <h2 className="text-xl font-semibold text-gray-800">
              {t("utilitiesAndAmenities")}
            </h2>
          </div>

          {propertyName && (
            <div className="text-primary mb-5 text-xl">{propertyName}</div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-medium">
                <IconRound icon={utilitiesCoveredIcon} size="xs" />
                {t("utilitiesPaidByLandlord")}
              </h3>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <FormField
                  control={form.control}
                  name="cable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("cable")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="internet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("internet")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="electricity"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("electricity")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="satelliteTV"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("satelliteTV")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="garbage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("garbage")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sewage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("sewage")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gas"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("gas")}
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="water"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        {t("water")}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
          </div>
        </div>
      </form>
    </Form>
  );
};
