import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/ui/loading-button";
import { BuilderLayout } from "./components/BuilderLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import houseIcon from "./assets/house.png";
import coinBagIcon from "./assets/coin-bag.png";
import moneyIcon from "./assets/money.png";
import moneyLeaseIcon from "./assets/money-lease.png";
import moneyDepositIcon from "./assets/money-deposit.png";
import exchangeIcon from "./assets/exchange.png";

const rentDepositFeeSchema = z.object({
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  chargePerRoom: z.boolean(),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  requirePetDeposit: z.boolean(),
  otherDeposit: z.string().optional(),
  oneTimeFees: z.boolean(),
  paymentMethods: z
    .array(z.string())
    .min(1, "At least one payment method is required"),
  bankAccount: z.string().optional(),
});

type RentDepositFeeValues = z.infer<typeof rentDepositFeeSchema>;

export default function RentDepositFee() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RentDepositFeeValues>({
    resolver: zodResolver(rentDepositFeeSchema),
    defaultValues: {
      monthlyRent: "",
      chargePerRoom: false,
      securityDeposit: "",
      requirePetDeposit: false,
      otherDeposit: "",
      oneTimeFees: false,
      paymentMethods: ["bank"],
      bankAccount: "",
    },
  });

  const onSubmit = async (values: RentDepositFeeValues) => {
    setIsSubmitting(true);
    try {
      console.log(values);
      // TODO: Save rent, deposit, and fee information and move to next step
    } catch (error) {
      console.error("Error saving information:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BuilderLayout
      title="Rent, Deposit & Fees"
      description="Set up your rental payment details, security deposit requirements, and any applicable fees."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Monthly Base Rent Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={moneyDepositIcon} alt="Rent" className="size-10" />
              <span>Monthly Base Rent</span>
            </div>

            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center mb-1">
                    <FormLabel className="mr-2">$</FormLabel>
                    <FormControl>
                      <Input {...field} className="max-w-64" />
                    </FormControl>
                    {/* <InfoCircledIcon className="ml-2 text-gray-400 size-5" /> */}
                  </div>
                  <FormMessage />
                  <Card className="bg-blue-50 p-3 mt-2 text-sm text-blue-800">
                    <p>
                      Late Fee: Late is 5% of the Base rent, and every month if
                      rent is not received on or before the 5th day of each
                      month. The landlord may also charge a late fee of $50.00
                      if rent is not paid by the due date more than one time in
                      a 6-month period.
                    </p>
                  </Card>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chargePerRoom"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "yes")}
                      defaultValue={field.value ? "yes" : "no"}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormLabel className="font-normal">
                    Will you charge per room?
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="bg-blue-50 p-3 text-sm text-blue-800 rounded">
              <p className="font-medium">Move-In Rent Date</p>
              <p>
                If the "move-in date" is any day other than the first day of
                month, and every month thereafter rent is due on the 1st, we
                will calculate a prorated rent for the days of the first month.
              </p>
            </div>
          </div>

          {/* Prorated Rent Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={houseIcon} alt="Prorated Rent" className="size-10" />
              <span>Prorated Rent</span>
            </div>

            <Card className="bg-blue-50 p-3 text-sm text-blue-800">
              <p className="font-medium">
                Will there be prorated rent due on move-in?
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </Card>
          </div>

          {/* Deposit Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={coinBagIcon} alt="Deposit" className="size-10" />
              <span>Deposit(s)</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="securityDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Security Deposit</FormLabel>
                    <div className="flex items-center">
                      <FormLabel className="mr-2">$</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {/* <InfoCircledIcon className="ml-2 text-gray-400 size-5" /> */}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Deposit</FormLabel>
                    <div className="flex items-center">
                      <FormLabel className="mr-2">$</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      {/* <InfoCircledIcon className="ml-2 text-gray-400 size-5" /> */}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirePetDeposit"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "yes")}
                      defaultValue={field.value ? "yes" : "no"}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormLabel className="font-normal">
                    Do you require a pet deposit?
                  </FormLabel>
                </FormItem>
              )}
            />

            <Card className="bg-blue-50 p-3 text-sm text-blue-800">
              <p className="font-medium">Known Security Deposit Laws</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </Card>
          </div>

          {/* One Time Fees Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={moneyLeaseIcon} alt="Fees" className="size-10" />
              <span>One Time Fees</span>
            </div>

            <FormField
              control={form.control}
              name="oneTimeFees"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "yes")}
                      defaultValue={field.value ? "yes" : "no"}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormLabel className="font-normal">
                    Do you charge any one time, non-refundable fee due at move
                    in?
                  </FormLabel>
                </FormItem>
              )}
            />

            <Card className="bg-blue-50 p-3 text-sm text-blue-800">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </Card>
          </div>

          {/* Payment Accepted Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img src={exchangeIcon} alt="Payment" className="size-10" />
              <span>Payment Accepted</span>
            </div>

            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose your bank account..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="chase">Chase Bank Account</SelectItem>
                      <SelectItem value="wellsfargo">
                        Wells Fargo Account
                      </SelectItem>
                      <SelectItem value="bankofamerica">
                        Bank of America Account
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center gap-2 font-medium text-lg">
                <img src={moneyIcon} alt="Payment" className="size-10" />
                <span>Other payment method</span>
              </div>
              <FormField
                control={form.control}
                name="paymentMethods"
                render={() => (
                  <FormItem>
                    <FormLabel>Other Payment methods</FormLabel>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="cash" value="cash" />
                        <label htmlFor="cash" className="text-sm font-medium">
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ach" value="ach" />
                        <label htmlFor="ach" className="text-sm font-medium">
                          ACH / mobile pay
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="venmo" value="venmo" />
                        <label htmlFor="venmo" className="text-sm font-medium">
                          Venmo / money pay
                        </label>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
