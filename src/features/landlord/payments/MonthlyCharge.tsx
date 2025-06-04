import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/PageTitle";
import { DateInput } from "@/components/ui/date-input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SwissFrancIcon } from "lucide-react";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperStep,
} from "@/components/MultiStepper";
import { useGoBack } from "@/hooks/useGoBack";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useToast } from "@/hooks/useAlertToast";
import { useNavigate } from "react-router";
import { useCreateChargeMutation } from "./api/mutation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormErrors from "@/components/FormErrors";

// Form schema
const formSchema = z.object({
  category: z.string({
    required_error: "Please select a category",
  }),
  description: z.string().max(50),
  amount: z.coerce.number().min(0, "Amount must be a positive number"),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  month: z.string({
    required_error: "Please select a month",
  }),
  year: z.string({
    required_error: "Please select a year",
  }),
  hasEndDate: z.boolean(),
  doesRepeat: z.enum(["yes", "no"]),
  lateFeeType: z.enum(["flat", "percentage"]).optional(),
  lateFeeAmount: z.coerce.number().optional(),
  lateFeeFor: z.enum(["sameDay", "oneDay", "oneWeek"]).optional(),
  bankAccount: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const MonthlyCharge: React.FC = () => {
  const { showToast } = useToast();
  const goBack = useGoBack();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateChargeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      hasEndDate: false,
      doesRepeat: "no",
      lateFeeType: "flat",
    },
  });

  // Watch values to conditionally render UI elements
  const lateFeeType = form.watch("lateFeeType");
  const doesRepeat = form.watch("doesRepeat");

  const onSubmit = async (values: FormValues) => {
    try {
      const valuesToSubmit: IMonthlyChargeCreate = {
        ...values,
        dueDate: values.dueDate.toISOString(),
        chargeType: "Monthly",
      };
      await mutateAsync(valuesToSubmit);
      showToast("Your monthly charge is create successfully.", "success");
      setTimeout(() => {
        navigate("/landlord/payments/create-charge");
      }, 1000);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <MultiStepper>
            <MultiStepperHeader>
              <div className="flex items-center gap-5 border-b-3 border-gray-700 pb-3">
                <MultiStepperBackButton routeBack={goBack} />
                <PageTitle title="Monthly Charge" className="mb-0" />
              </div>
            </MultiStepperHeader>

            <MultiStepperStep onValidate={() => form.trigger()}>
              <div className="space-y-6">
                <section>
                  <h2 className="mb-4 text-lg font-semibold">Details</h2>
                  <p className="mb-4 text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="rent">Rent</SelectItem>
                                <SelectItem value="utilities">
                                  Utilities
                                </SelectItem>
                                <SelectItem value="maintenance">
                                  Maintenance
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter description..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {field.value?.length || 0}/50 characters
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section>
                  <h2 className="mb-4 text-lg font-semibold">Charge Info</h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                <div className="flex size-5 items-center justify-center rounded-full border">
                                  <SwissFrancIcon className="size-3 text-gray-500" />
                                </div>
                              </div>
                              <Input
                                type="number"
                                className="pl-8"
                                placeholder="0.00"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <DateInput
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <p className="my-4 text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Month</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ].map((month) => (
                                <SelectItem
                                  key={month}
                                  value={month.toLowerCase()}
                                >
                                  {month}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[2023, 2024, 2025, 2026, 2027].map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="hasEndDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                          <FormControl>
                            <Checkbox
                              checked={!field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(!checked)
                              }
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>No end date</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name="doesRepeat"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no">No</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {doesRepeat === "yes" && (
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <FormField
                          control={form.control}
                          name="lateFeeType"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex space-x-2">
                                  <Button
                                    type="button"
                                    variant={
                                      lateFeeType === "flat"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="w-1/2"
                                    onClick={() => field.onChange("flat")}
                                  >
                                    Flat
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={
                                      lateFeeType === "percentage"
                                        ? "default"
                                        : "outline"
                                    }
                                    className="w-1/2"
                                    onClick={() => field.onChange("percentage")}
                                  >
                                    % Unpaid
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lateFeeAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                {lateFeeType === "percentage" ? (
                                  <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                      <span className="text-gray-500">%</span>
                                    </div>
                                    <Input
                                      type="number"
                                      className="pr-8"
                                      {...field}
                                    />
                                  </div>
                                ) : (
                                  <CurrencyInput {...field} />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="lateFeeFor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apply Late Fee</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Apply Late Fee" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sameDay">
                                  Same day
                                </SelectItem>
                                <SelectItem value="oneDay">
                                  1 day after rent is due
                                </SelectItem>
                                <SelectItem value="oneWeek">
                                  1 week after rent is due
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose your bank account..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">
                                  Standard Bank Group
                                </SelectItem>
                                <SelectItem value="firstrand">
                                  FirstRand
                                </SelectItem>
                                <SelectItem value="absa">Absa Group</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="text-primary mt-5 rounded-sm bg-blue-200 p-4 text-sm">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                </section>
              </div>
            </MultiStepperStep>

            <MultiStepperStep>
              <section>
                <h3 className="text-xl font-semibold">Rent</h3>
                <p className="text-gray-600">Due monthly on the 1st</p>

                <div className="mt-4 space-y-3">
                  <h4 className="text-xl font-semibold">Charge Info</h4>
                  <p className="mt-2 text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s.
                  </p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Explicabo officiis dolores aperiam sint laborum impedit
                    dignissimos dolore nobis voluptate, dolorum voluptas nostrum
                    iusto, quas quos quod praesentium neque dicta. Explicabo.
                  </p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni quod ducimus est dolorum temporibus nemo tempore
                    molestiae, esse ut eligendi.
                  </p>
                </div>
                <FormErrors errors={form.formState.errors} />
              </section>
            </MultiStepperStep>

            <MultiStepperButton>
              <Button type="submit" size="lg" className="w-3/5">
                Create Monthly Charge
              </Button>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
};

export default MonthlyCharge;
