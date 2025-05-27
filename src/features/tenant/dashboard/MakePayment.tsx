import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EuroIcon } from "lucide-react";
import paperMoneyImg from "@/assets/images/paper-money.png";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperStep,
} from "@/components/MultiStepper";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import duesImg from "@/assets/images/charges.png";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { PaymentModeDialog } from "@/components/PaymentModeDialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const dues = [
  {
    _id: "g785g4fgs4",
    date: "August 1, 2004",
    total: 2000,
    status: "Unpaid",
    due: 2000,
    title: "Rent",
    type: "rent",
  },
  {
    _id: "df57ggd5ag",
    type: "deposit",
    date: "August 1, 2024",
    total: 2000,
    status: "Unpaid",
    title: "Security Deposit",
    due: 2000,
  },
];

type FormValues = {
  selectedDues: string[];
  note: string;
};

export default function MakePayment() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {
      selectedDues: [],
      note: "",
    },
  });

  const selectedDues =
    useWatch({ control: form.control, name: "selectedDues" }) || [];

  const selectedItems = dues.filter((due) => selectedDues.includes(due._id));
  const total = selectedItems.reduce((sum, due) => sum + due.total, 0);

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}>
          <MultiStepper>
            <MultiStepperHeader>
              <div className="flex items-center gap-2">
                <MultiStepperBackButton routeBack={() => navigate(-1)} />
                <PageTitle title="Make Payment" />
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
                        <FormLabel className="sr-only">{due.title}</FormLabel>
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
                                    {due.title}
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
                                      <span>Date: </span>
                                      <span>{due.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>Rent: </span>
                                      <EuroIcon className="size-3" />
                                      <span>{due.total}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span>Status: </span>
                                      <span>{due.status}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>Due: </span>
                                      <EuroIcon className="size-3" />
                                      <span>{due.due}</span>
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
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <img src={duesImg} alt="icon" className="h-6 w-6" />
                  <h2 className="text-lg font-semibold">
                    Selected dues you would like to pay:
                  </h2>
                </div>

                <Card>
                  <CardContent className="flex flex-col gap-2">
                    {dues.map((due) => (
                      <div className="flex items-center gap-2" key={due._id}>
                        <Checkbox checked={selectedDues.includes(due._id)} />
                        <div className="flex flex-1 items-center justify-between">
                          <div className="flex-1 space-y-1">
                            <p className="text-muted-foreground text-sm">
                              Due On: {due.date}
                            </p>
                            <p className="text-base font-semibold text-blue-900">
                              {due.title}
                            </p>
                          </div>
                          <div className="text-right font-bold text-blue-900">
                            <span className="flex items-center gap-1">
                              <EuroIcon className="h-4 w-4" />
                              {due.total.toLocaleString(undefined, {
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
                    <EuroIcon className="h-5 w-5" />
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
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
