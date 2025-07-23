import { useState, useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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

import {
  useCreatePendingRentPaymentIntentMutation,
  useUpdatePendingRentStatusMutation,
} from "./api/mutations";
import { useGetPendingRentQuery } from "./api/queries";

type FormValues = {
  selectedDues: string[];
  note: string;
};

export default function MakePayment() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: pendingRent, isLoading, error } = useGetPendingRentQuery();
  const { mutateAsync } = useCreatePendingRentPaymentIntentMutation();
  const { mutateAsync: updatePendingRentStatus } =
    useUpdatePendingRentStatusMutation();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      selectedDues: [],
      note: "",
    },
  });

  const selectedDues =
    useWatch({ control: form.control, name: "selectedDues" }) || [];

  const dues = useMemo(() => pendingRent || [], [pendingRent]);
  const selectedItems = dues.filter((due) => selectedDues.includes(due._id));
  const total = selectedItems.reduce((sum, due) => sum + due.amount, 0);

  const handlePaymentMethodSelected = async (
    method: "card" | "mtn" | "orange",
  ) => {
    if (method === "card") {
      const result = await mutateAsync({
        pendingRentIds: selectedItems.map((item) => item._id),
      });
      return { stripeClientSecret: result.data.clientSecret };
    }
    return { stripeClientSecret: "" }; // For MTN and Orange, we don't need to return anything
  };

  const handlePaymentSuccess = async () => {
    toast.success(t("paymentSuccess"));
    setIsPaymentDialogOpen(false);
    await updatePendingRentStatus({
      pendingRentIds: selectedItems.map((item) => item._id),
      updateFields: {
        amountStatus: "Paid",
        depositedStatus: "Paid",
      },
    });
    navigate(`/tenant/payment/success`, {
      state: {
        amount: total,
        redirectUrl: `/tenant/`,
      },
    });
  };

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
        <p className="text-red-500">{t("pendingRentError")}</p>
      </div>
    );
  }

  if (!dues.length) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4">
        <img
          src={paperMoneyImg}
          alt={t("noPendingRentAlt")}
          className="size-16 opacity-50"
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">{t("noPendingRent")}</h3>
          <p className="text-muted-foreground">{t("noPendingRentDesc")}</p>
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
          })}
        >
          <MultiStepper>
            <MultiStepperHeader>
              <div className="flex items-center gap-2">
                <MultiStepperBackButton routeBack={() => navigate(-1)} />
                <PageTitle title={t("makePaymentTitle")} className="mb-0" />
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
                          {`${t("rentLabel")} - ${t("dueLabel")}: ${due.dueDate}`}
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
                                    {t("rentLabel")}
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
                                      <span>{t("dueDateLabel")}: </span>
                                      <span>
                                        {new Date(
                                          due.dueDate,
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>{t("amountLabel")}: </span>
                                      <CurrencyIcon size="xs" />
                                      <span>{due.amount}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <span>{t("statusLabel")}: </span>
                                      <span>{due.amountStatus}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span>{t("lateFeeLabel")}: </span>
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
                    alt={t("noDuesSelectedAlt")}
                    className="size-16 opacity-50"
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">
                      {t("noDuesSelected")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("noDuesSelectedDesc")}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <img src={duesImg} alt="icon" className="h-6 w-6" />
                    <h2 className="text-lg font-semibold">
                      {t("selectedDuesTitle")}
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
                                {t("dueOnLabel")}:{" "}
                                {new Date(due.dueDate).toLocaleDateString()}
                              </p>
                              <p className="text-base font-semibold text-blue-900">
                                {t("rentLabel")}
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
                        <Label htmlFor="note">{t("paymentNoteLabel")}</Label>
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
                    <h3 className="">{t("summaryTitle")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("summaryDesc")}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <p className="text-lg font-semibold text-blue-900">
                      {t("totalPayableLabel")}
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
              <Dialog
                open={isPaymentDialogOpen}
                onOpenChange={setIsPaymentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button size="lg" type="submit" className="w-3/5">
                    {t("makePaymentBtn")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <PaymentModeDialog
                    amount={total > 0 ? total.toString() : "0"}
                    onSuccess={handlePaymentSuccess}
                    onMethodSelected={handlePaymentMethodSelected}
                  />
                </DialogContent>
              </Dialog>
            </MultiStepperButton>
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
