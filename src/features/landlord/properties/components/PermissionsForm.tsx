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

const permissionsSchema = z.object({
  smoking: z.enum(["yes", "no", "outsideOnly"], {
    required_error: "Please select a smoking policy",
  }),
  pets: z.enum(["yes", "no"], {
    required_error: "Please specify if pets are allowed",
  }),
  occupancyLimit: z.enum(["yes", "no"], {
    required_error: "Please specify if there is an occupancy limit",
  }),
});

export type PermissionsFormValues = z.infer<typeof permissionsSchema>;

interface PermissionsFormProps {
  defaultValues?: Partial<PermissionsFormValues>;
  onSuccess?: (data: PermissionsFormValues) => void;
  address?: string;
}

export const PermissionsForm = ({
  defaultValues,
  onSuccess,
  address,
}: PermissionsFormProps) => {
  const form = useForm<PermissionsFormValues>({
    resolver: zodResolver(permissionsSchema),
    defaultValues: {
      smoking: "no",
      pets: "no",
      occupancyLimit: "no",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: PermissionsFormValues) => {
    onSuccess?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-6 flex items-center gap-2">
          <IconRound icon={permissionsIcon} size="sm" />
          <h2 className="text-xl font-semibold text-gray-800">Permissions</h2>
        </div>

        {address && <div className="mb-6 text-sm text-gray-600">{address}</div>}

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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="mt-2 flex flex-col space-y-2"
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
                      <FormItem className="flex items-center space-y-0 space-x-3">
                        <FormControl>
                          <RadioGroupItem value="outsideOnly" />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          Outside Only
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="mt-2 flex flex-col space-y-2"
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="mt-2 flex flex-col space-y-2"
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
        </div>
      </form>
    </Form>
  );
};
