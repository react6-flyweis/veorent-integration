import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { DateInput } from "@/components/ui/date-input";
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
import rentLeaseIcon from "../assets/rent-lease.png";
import rentIcon from "../assets/rent.png";


const leasingBasicsSchema = z.object({
  dateAvailable: z.date({
    required_error: "Please select a date",
  }),
  leaseTerm: z.enum(
    ["contact", "oneYear", "monthly", "rentToOwn", "sixMonths"],
    {
      required_error: "Please select a lease term",
    },
  ),
  targetRent: z.coerce.number().min(1, { message: "Target rent is required" }),
  targetDeposit: z.coerce
    .number()
    .min(1, { message: "Target deposit is required" }),
});

export type LeasingBasicsFormValues = z.infer<typeof leasingBasicsSchema>;

interface LeasingBasicsFormProps {
  defaultValues?: ILeasingBasics;
  onSuccess: (data: LeasingBasicsFormValues) => void;
  propertyName?: string;
}

export const LeasingBasicsForm = ({
  defaultValues,
  onSuccess,
  propertyName,
}: LeasingBasicsFormProps) => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<LeasingBasicsFormValues>({
    resolver: zodResolver(leasingBasicsSchema),
    defaultValues: {
      leaseTerm: "contact",
      targetRent: defaultValues?.targetRent || 0,
      targetDeposit: defaultValues?.targetDeposit || 0,
      dateAvailable: defaultValues?.Date
        ? new Date(defaultValues.Date)
        : undefined,
    },
  });

  const handleSubmit = async (data: LeasingBasicsFormValues) => {
    try {
      const valuesToSubmit: IPropertyUpdateData = {
        leasingBasics: {
          ...data,
          Date: data.dateAvailable.toISOString(),
          desiredLeaseTerm: data.leaseTerm,
          targetDeposit: data.targetDeposit || 0,
        },
        formCompletionStatus: {
          propertySize: true,
          leasingBasics: true,
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="mb-3 flex items-center gap-2">
          <IconRound icon={rentIcon} size="sm" />
          <h2 className="text-xl font-semibold text-gray-800">
            Leasing Basics
          </h2>
        </div>

        {propertyName && (
          <div className="text-primary mb-5 text-xl">{propertyName}</div>
        )}

        <div className="space-y-4">
          <div className="mb-2 flex gap-2">
            <IconRound icon={rentLeaseIcon} size="xs" />
            <h3 className="flex items-center gap-2 text-xl font-bold">
              Leasing Term
            </h3>
          </div>

          <div className="mb-3">
            <FormField
              control={form.control}
              name="dateAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Date Available</FormLabel>
                  <DateInput allowPastDates={false} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="leaseTerm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your desired lease term?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="contact" />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        Contact For Details
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="oneYear" />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        One Year
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="monthly" />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        Monthly
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="daily" />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        Daily
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="rentToOwn" />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        Rent To Own
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl>
                        <RadioGroupItem value="sixMonths" />
                      </FormControl>
                      <FormLabel className="text-base font-normal">
                        Six Months
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4 space-y-4">
          <h3 className="mb-2 flex items-center gap-2 text-base font-medium">
            <IconRound icon={rentLeaseIcon} size="xs" />
            Rent & Deposit
          </h3>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="targetRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Rent</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute top-1/2 left-2 -translate-y-1/2">
                        <CurrencyIcon size="sm" />
                      </div>
                      <Input className="pl-8" {...field} type="number" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Deposit</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute top-1/2 left-2 -translate-y-1/2">
                        <CurrencyIcon size="sm" />
                      </div>
                      <Input className="pl-8" {...field} type="number" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
      </form>
    </Form>
  );
};
