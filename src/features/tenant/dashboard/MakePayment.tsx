import { useForm, Controller, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import duesImg from "@/assets/images/charges.png";
import paperMoneyImg from "@/assets/images/paper-money.png";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Loader } from "@/components/Loader";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperStep,
} from "@/components/MultiStepper";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PaymentModeDialog } from "@/features/shared/payments/components/PaymentModeDialog";

import { useGetPendingRentQuery } from "./api/queries";

type FormValues = {
  selectedDues: string[];
  note: string;
};

export default function MakePayment() {
  const navigate = useNavigate();
  const { data: pendingRent, isLoading, error } = useGetPendingRentQuery();

  const form = useForm<FormValues>({
    defaultValues: {
      selectedDues: [],
      note: "",
    },
  });

  const selectedDues =
    useWatch({ control: form.control, name: "selectedDues" }) || [];

  const dues = pendingRent || [];
  const selectedItems = dues.filter((due) => selectedDues.includes(due._id));
  const total = selectedItems.reduce((sum, due) => sum + due.amount, 0);

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-red-500">
          Error loading pending rent data. Please try again.
        </p>
      </div>
    );
  }

  if (!dues.length) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4">
        <img
          src={paperMoneyImg}
          alt="No pending rent"
          className="size-16 opacity-50"
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">No Pending Rent</h3>
          <p className="text-muted-foreground">
            You don't have any pending rent payments at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            // Handle form submission here
            // TODO: Implement payment submission logic
          })}
        >
          <MultiStepper>
            <MultiStepperHeader>
              <div className="flex items-center gap-2">
                <MultiStepperBackButton routeBack={() => navigate(-1)} />
                <PageTitle title="Make Payment" className="mb-0" />
              </div>
            </MultiStepperHeader>

            {/* Step 1: Select Dues */}
            <MultiStepperStep>
              <FormField
                control={form.control}
                name="selectedDues"
                render={() => (
                  <div className="space-y-2">
                    {dues.map((due) => (
                      <FormItem key={due._id} className="space-y-1">
                        <FormLabel className="sr-only">
                          {`Rent - Due: ${due.dueDate}`}
                        </FormLabel>
                        <FormControl>
                          <label className="cursor-pointer">
                            <Card className="gap-1 py-2">
                              <CardHeader className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                  <img
                                    className="size-8"
                                    src={paperMoneyImg}
                                    alt=""
                                  />
                                  <p className="text-primary text-2xl font-semibold">
                                    Rent
                                  </p>
                                </div>
                                <Controller
                                  control={form.control}
                                  name="selectedDues"
                                  render={({ field }) => (
                                    <Checkbox
                                      checked={field.value?.includes(due._id)}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked
                                          ? [...field.value, due._id]
                                          : field.value.filter(
                                              (id) => id !== due._id,
                                            );
                                        field.onChange(newValue);
                                      }}
                                    />
                                  )}
                                />
                              </CardHeader>
                              <CardContent className="px-2">
                                <div className="flex justify-between">
                                  <div>
                                    <div>
                                      <span>Due Date: </span>
                                      <span>
                                        {new Date(
                                          due.dueDate,
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>Amount: </span>
                                      <CurrencyIcon size="xs" />
                                      <span>{due.amount}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span>Status: </span>
                                      <span>{due.amountStatus}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>Late Fee: </span>
                                      <CurrencyIcon size="xs" />
                                      <span>{due.lateFee}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </label>
                        </FormControl>
                      </FormItem>
                    ))}
                  </div>
                )}
              />
            </MultiStepperStep>

            {/* Step 2: Summary */}
            <MultiStepperStep>
              {selectedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-8">
                  <img
                    src={duesImg}
                    alt="No selection"
                    className="size-16 opacity-50"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">No Dues Selected</h3>
                    <p className="text-muted-foreground">
                      Please go back and select the dues you want to pay.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <img src={duesImg} alt="icon" className="h-6 w-6" />
                    <h2 className="text-lg font-semibold">
                      Selected dues you would like to pay:
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="flex flex-col gap-2">
                      {selectedItems.map((due) => (
                        <div className="flex items-center gap-2" key={due._id}>
                          <Checkbox checked={true} disabled />
                          <div className="flex flex-1 items-center justify-between">
                            <div className="flex-1 space-y-1">
                              <p className="text-muted-foreground text-sm">
                                Due On:{" "}
                                {new Date(due.dueDate).toLocaleDateString()}
                              </p>
                              <p className="text-base font-semibold text-blue-900">
                                Rent
                              </p>
                            </div>
                            <div className="text-right font-bold text-blue-900">
                              <span className="flex items-center gap-1">
                                <CurrencyIcon size="xs" />
                                {due.amount.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <div>
                        <Label htmlFor="note">Payment Note (Optional)</Label>
                        <Textarea
                          id="note"
                          className="mt-1"
                          rows={3}
                          {...field}
                        />
                      </div>
                    )}
                  />

                  <div>
                    <h3 className="">Summary</h3>
                    <p className="text-muted-foreground text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <p className="text-lg font-semibold text-blue-900">
                      Total Payable Amount:
                    </p>
                    <p className="flex items-center gap-1 text-lg font-bold text-blue-900">
                      <CurrencyIcon size="sm" />
                      {total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              )}
            </MultiStepperStep>

            {/* Submit */}
            <MultiStepperButton>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" type="submit" className="w-3/5">
                    Make Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <PaymentModeDialog amount={total.toString()} />
                </DialogContent>
              </Dialog>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
