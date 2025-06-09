import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdatePropertyMutation } from "../api/mutation";
import occupancyIcon from "../assets/occupancy.png";
import permissionsIcon from "../assets/permissions.png";
import petsIcon from "../assets/pets.png";
import smokingIcon from "../assets/smoking.png";

const permissionsSchema = z.object({
  smoking: z.boolean({
    required_error: "Please select a smoking policy",
  }),
  pets: z.boolean({
    required_error: "Please specify if pets are allowed",
  }),
  occupancyLimit: z.boolean({
    required_error: "Please specify if there is an occupancy limit",
  }),
  occupancyCount: z
    .number()
    .min(1, "Occupancy count must be at least 1")
    .optional(),
});

type PermissionsFormValues = z.infer<typeof permissionsSchema>;
interface PermissionsFormProps {
  defaultValues?: IPermission;
  onSuccess: (data: PermissionsFormValues) => void;
  propertyName?: string;
}

export const PermissionsForm = ({
  defaultValues,
  onSuccess,
  propertyName,
}: PermissionsFormProps) => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<PermissionsFormValues>({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      smoking: defaultValues?.smoking === "Yes",
      pets: Boolean(defaultValues?.pets || false),
      occupancyLimit: Boolean(defaultValues?.occupancyLimits || false),
      occupancyCount: Number(defaultValues?.occupancyLimitsCount) || 0,
    },
  });

  const watchOccupancyLimit = form.watch("occupancyLimit");

  const handleSubmit = async (values: PermissionsFormValues) => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        permission: {
          smoking: values.smoking ? "Yes" : "No",
          pets: values.pets,
          occupancyLimits: values.occupancyLimit,
          occupancyLimitsCount: values.occupancyCount
            ? values.occupancyCount.toString()
            : undefined,
        },
      };
      await mutateAsync(valuesToSubmit);
      onSuccess(values);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-3 flex items-center gap-2">
          <IconRound icon={permissionsIcon} size="sm" />
          <h2 className="text-xl font-semibold text-gray-800">Permissions</h2>
        </div>

        {propertyName && (
          <div className="text-primary mb-5 text-xl">{propertyName}</div>
        )}
        <div className="space-y-8">
          {/* Smoking Section */}
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-base font-medium">
              <IconRound icon={smokingIcon} size="xs" />
              Smoking
            </h3>

            <FormField
              control={form.control}
              name="smoking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Do you allow smoking?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "yes")}
                      value={field.value ? "yes" : "no"}
                      className="mt-2 flex"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Pets Section */}
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-base font-medium">
              <IconRound icon={petsIcon} size="xs" />
              Pets
            </h3>

            <FormField
              control={form.control}
              name="pets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Do you allow any pets?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "yes")}
                      value={field.value ? "yes" : "no"}
                      className="mt-2 flex"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Occupancy Limits Section */}
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-base font-medium">
              <IconRound icon={occupancyIcon} size="xs" />
              Occupancy Limits
            </h3>

            <FormField
              control={form.control}
              name="occupancyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Do you have an occupancy limit?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value === "yes");
                        if (value === "no") {
                          form.setValue("occupancyCount", 0);
                        }
                      }}
                      value={field.value ? "yes" : "no"}
                      className="mt-2 flex"
                    >
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          Yes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          No
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchOccupancyLimit && (
              <FormField
                control={form.control}
                name="occupancyCount"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel className="sr-only text-gray-700">
                      Maximum number of occupants
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full"
                          onClick={() => {
                            const newValue = Math.max(
                              0,
                              (field.value || 0) - 1,
                            );
                            field.onChange(newValue);
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="0"
                          className="w-16 text-center"
                          value={field.value || 0}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full"
                          onClick={() => {
                            const newValue = (field.value || 0) + 1;
                            field.onChange(newValue);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormErrors errors={form.formState.errors} />
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
      </form>
    </Form>
  );
};
