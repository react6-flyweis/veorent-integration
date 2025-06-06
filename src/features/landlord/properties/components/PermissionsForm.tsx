import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IconRound } from "@/components/IconRound";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import permissionsIcon from "../assets/permissions.png";
import smokingIcon from "../assets/smoking.png";
import petsIcon from "../assets/pets.png";
import occupancyIcon from "../assets/occupancy.png";
import { LoadingButton } from "@/components/ui/loading-button";
import FormErrors from "@/components/FormErrors";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useParams } from "react-router";
import { useUpdatePropertyMutation } from "../api/mutation";

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
});

export type PermissionsFormValues = z.infer<typeof permissionsSchema>;
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
      smoking: Boolean(defaultValues?.smoking || false),
      pets: Boolean(defaultValues?.pets || false),
      occupancyLimit: Boolean(defaultValues?.occupancyLimits || false),
    },
  });

  const handleSubmit = async (data: PermissionsFormValues) => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        permission: {
          smoking: data.smoking ? "Yes" : "No",
          pets: data.pets,
          occupancyLimits: data.occupancyLimit,
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
                      className="mt-2 flex flex-col"
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
                      className="mt-2 flex flex-col"
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
                      onValueChange={(value) => field.onChange(value === "yes")}
                      value={field.value ? "yes" : "no"}
                      className="mt-2 flex flex-col"
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
