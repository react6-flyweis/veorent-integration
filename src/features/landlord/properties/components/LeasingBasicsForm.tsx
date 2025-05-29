import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { IconRound } from "@/components/IconRound";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { DateInput } from "@/components/ui/date-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import rentIcon from "../assets/rent.png";
import rentLeaseIcon from "../assets/rent-lease.png";

const leasingBasicsSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  dateAvailable: z.date({
    required_error: "Please select a date",
  }),
  leaseTerm: z.enum(
    ["contact", "oneYear", "monthly", "rentToOwn", "sixMonths"],
    {
      required_error: "Please select a lease term",
    },
  ),
  targetRent: z.string().min(1, { message: "Target rent is required" }),
  targetDeposit: z.string().min(1, { message: "Target deposit is required" }),
});

export type LeasingBasicsFormValues = z.infer<typeof leasingBasicsSchema>;

interface LeasingBasicsFormProps {
  defaultValues?: Partial<LeasingBasicsFormValues>;
  onSuccess?: (data: LeasingBasicsFormValues) => void;
}

export const LeasingBasicsForm = ({
  defaultValues,
  onSuccess,
}: LeasingBasicsFormProps) => {
  const form = useForm<LeasingBasicsFormValues>({
    resolver: zodResolver(leasingBasicsSchema),
    defaultValues: {
      address: "123 Main St",
      leaseTerm: "contact",
      targetRent: "",
      targetDeposit: "",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: LeasingBasicsFormValues) => {
    onSuccess?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-6 flex items-center gap-2">
          <IconRound icon={rentIcon} size="sm" />
          <h2 className="text-xl font-semibold text-gray-800">
            Leasing Basics
          </h2>
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-2 flex items-center gap-2 text-base font-medium">
            <IconRound icon={rentLeaseIcon} size="xs" />
            Leasing Term
          </h3>

          <div className="mb-3">
            <FormField
              control={form.control}
              name="dateAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date Available</FormLabel>
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

        <div className="mb-4">
          <h3 className="mb-2 flex items-center gap-2 text-base font-medium">
            <IconRound icon={rentIcon} size="xs" />
            Rent & Deposit
          </h3>

          <div className="grid grid-cols-2 gap-4">
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
        </div>
      </form>
    </Form>
  );
};
