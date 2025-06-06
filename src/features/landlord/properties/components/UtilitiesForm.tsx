import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IconRound } from "@/components/IconRound";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import utilitiesIcon from "../assets/utilities.png";
import utilitiesCoveredIcon from "../assets/utilities-covered.png";
import { LoadingButton } from "@/components/ui/loading-button";
import { useUpdatePropertyMutation } from "../api/mutation";
import { useParams } from "react-router";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormErrors from "@/components/FormErrors";

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
}

export const UtilitiesForm = ({
  defaultValues,
  onSuccess,
  propertyName,
}: UtilitiesFormProps) => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");
  const form = useForm<UtilitiesFormValues>({
    resolver: zodResolver(utilitiesSchema),
    defaultValues: {
      cable: defaultValues?.cable || false,
      internet: defaultValues?.internet || false,
      electricity: defaultValues?.electricty || false,
      satelliteTV: defaultValues?.sateliteTv || false,
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
          sateliteTv: data.satelliteTV,
          garbage: data.garbage,
          sewage: data.sewage,
          gas: data.gas,
          water: data.water,
        } as IAmenities,
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
              Utilities & Amenities
            </h2>
          </div>

          {propertyName && (
            <div className="text-primary mb-5 text-xl">{propertyName}</div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-base font-medium">
                <IconRound icon={utilitiesCoveredIcon} size="xs" />
                Utilities Paid by Landlord
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
                        Cable
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
                        Internet
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
                        Electricity
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
                        Satellite TV
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
                        Garbage
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
                        Sewage
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
                        Gas
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
                        Water
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
                Next
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
