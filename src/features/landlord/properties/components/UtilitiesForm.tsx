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
  defaultValues?: Partial<UtilitiesFormValues>;
  onSuccess?: (data: UtilitiesFormValues) => void;
  address?: string;
}

export const UtilitiesForm = ({
  defaultValues,
  onSuccess,
  address,
}: UtilitiesFormProps) => {
  const form = useForm<UtilitiesFormValues>({
    resolver: zodResolver(utilitiesSchema),
    defaultValues: {
      cable: false,
      internet: false,
      electricity: false,
      satelliteTV: false,
      garbage: false,
      sewage: false,
      gas: false,
      water: false,
      ...defaultValues,
    },
  });

  const handleSubmit = (data: UtilitiesFormValues) => {
    onSuccess?.(data);
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

          {address && (
            <div className="mb-6 text-sm text-gray-600">{address}</div>
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
