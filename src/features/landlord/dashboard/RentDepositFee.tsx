import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { CurrencyInput } from "@/components/CurrencyInput";
import FormErrors from "@/components/FormErrors";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateOrUpdateLeaseAgreementMutation } from "./api/mutation";
import coinBagIcon from "./assets/coin-bag.png";
import exchangeIcon from "./assets/exchange.png";
import houseIcon from "./assets/house.png";
import moneyDepositIcon from "./assets/money-deposit.png";
import moneyLeaseIcon from "./assets/money-lease.png";
import moneyIcon from "./assets/money.png";
import { availableBanks, BankSelector } from "./components/BankSelector";
import { BuilderLayout } from "./components/BuilderLayout";

const rentDepositFeeSchema = z.object({
  monthlyRent: z.coerce.number().min(1, "Monthly rent is required"),
  chargePetRent: z.boolean(),
  petRentAmount: z.coerce.number().optional(),
  proratedRent: z.boolean(),
  proratedRentAmount: z.coerce.number().optional(),
  securityDeposit: z.coerce.number().min(1, "Security deposit is required"),
  requirePetDeposit: z.boolean(),
  petDepositAmount: z.coerce.number().optional(),
  otherDeposit: z.coerce.number().optional(),
  oneTimeFees: z.boolean(),
  feeName: z.string().optional(),
  feeAmount: z.coerce.number().optional(),
  paymentMethods: z
    .array(z.string())
    .min(1, "At least one payment method is required"),
  bankAccount: z.enum(
    availableBanks.map((bank) => bank._id) as [string, ...string[]],
  ),
});

type RentDepositFeeValues = z.infer<typeof rentDepositFeeSchema>;

export default function RentDepositFee() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync, isSuccess } = useCreateOrUpdateLeaseAgreementMutation();

  const form = useForm<RentDepositFeeValues>({
    resolver: zodResolver(rentDepositFeeSchema),
    defaultValues: {
      chargePetRent: false,
      proratedRent: false,
      requirePetDeposit: false,
      oneTimeFees: false,
      paymentMethods: ["bank"],
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Watch fields to conditionally render additional inputs
  const chargePetRent = watch("chargePetRent");
  const proratedRent = watch("proratedRent");
  const requirePetDeposit = watch("requirePetDeposit");
  const oneTimeFees = watch("oneTimeFees");

  const onSubmit = async (values: RentDepositFeeValues) => {
    try {
      const valuesToSave: {
        rentalProperty: string;
        rentDepositAndFee: IRentDepositAndFee;
      } = {
        rentalProperty: state.property,
        rentDepositAndFee: {
          ...values,
          paymentMethod: values.paymentMethods.join(", "),
        },
      };
      await mutateAsync(valuesToSave);
      setTimeout(() => {
        navigate("/landlord/lease-agreement/people-on-lease", {
          state,
        });
      }, 300);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  if (!state || !state.property) {
    // if no property is selected then redirect to select lease
    return <Navigate to="/landlord/lease-agreement" />;
  }

  return (
    <BuilderLayout
      title="Rent, Deposit & Fees"
      description="Set up your rental payment details, security deposit requirements, and any applicable fees."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Monthly Base Rent Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={moneyDepositIcon} alt="Rent" className="size-10" />
              <span>Monthly Base Rent</span>
            </div>

            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-2">Monthly Base Rent</FormLabel>
                  <FormControl>
                    <CurrencyInput {...field} className="max-w-64" />
                  </FormControl>
                  <FormMessage />
                  <Card className="text-primary mt-2 rounded-sm bg-blue-200 p-3 text-sm">
                    <p>
                      Late Fees: Rent is due in full on the first day of each
                      and every month. If rent is not received on or before the
                      7th day of the month, you may charge your tenant a late
                      fee of $50 or 5% of the balance due of unpaid rent amount,
                      whichever is greater.
                    </p>
                  </Card>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chargePetRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Will you charge pet rent?
                  </FormLabel>
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
                        <FormLabel className="font-normal">
                          {t("yes")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">{t("no")}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {chargePetRent && (
              <FormField
                control={form.control}
                name="petRentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Pet Rent</FormLabel>
                    <FormControl>
                      <CurrencyInput {...field} className="max-w-64" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="text-primary rounded-sm bg-blue-200 p-3 text-sm">
              <p className="font-medium">African Pet Rent Laws</p>
              <p>
                Under Colorado law, the maximum you can charge as additional pet
                rent is $35.00 a month or 1.5% of the rent cost, whichever is
                greater.
              </p>
            </div>
          </div>

          {/* Prorated Rent Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={houseIcon} alt="Prorated Rent" className="size-10" />
              <span>Prorated Rent</span>
            </div>

            <FormField
              control={form.control}
              name="proratedRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Will there be prorated rent due at move-in?
                  </FormLabel>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type.
                  </p>
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
                        <FormLabel className="font-normal">
                          {t("yes")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">{t("no")}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {proratedRent && (
              <FormField
                control={form.control}
                name="proratedRentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prorated Rent Amount</FormLabel>
                    <FormControl>
                      <CurrencyInput {...field} className="max-w-64" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Deposit Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={coinBagIcon} alt="Deposit" className="size-10" />
              <span>Deposit(s)</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="securityDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("securityDeposit")}</FormLabel>
                    <FormControl>
                      <CurrencyInput {...field} />
                    </FormControl>
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
                    <FormControl>
                      <CurrencyInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirePetDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Do you require a pet deposit?
                  </FormLabel>
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
                        <FormLabel className="font-normal">
                          {t("yes")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">{t("no")}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {requirePetDeposit && (
              <FormField
                control={form.control}
                name="petDepositAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Deposit</FormLabel>
                    <FormControl>
                      <CurrencyInput {...field} className="max-w-64" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Card className="text-primary gap-0 rounded-sm bg-blue-200 p-3 text-sm">
              <p className="font-medium">African Security Deposit Law</p>
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
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={moneyLeaseIcon} alt="Fees" className="size-10" />
              <span>One Time Fees</span>
            </div>

            <FormField
              control={form.control}
              name="oneTimeFees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    Do you charge any one time, non-refundable fee due at move
                    in?
                  </FormLabel>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Saepe delectus laboriosam cupiditate ipsum omnis
                    accusantium.
                  </p>
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
                        <FormLabel className="font-normal">
                          {t("yes")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">{t("no")}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {oneTimeFees && (
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="feeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="border-input bg-background w-full rounded-md border px-3 py-2"
                          placeholder="Enter fee name..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="feeAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fee Amount</FormLabel>
                      <FormControl>
                        <CurrencyInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          {/* Payment Accepted Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={exchangeIcon} alt="Payment" className="size-10" />
              <span>Payment Accepted</span>
            </div>

            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Account</FormLabel>
                  <FormControl>
                    <BankSelector {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <img src={moneyIcon} alt="Payment" className="size-10" />
                <span>Other payment method</span>
              </div>
              <FormField
                control={form.control}
                name="paymentMethods"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          form.setValue("paymentMethods", [value])
                        }
                        defaultValue="bank"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="card" id="card" />
                          </FormControl>
                          <FormLabel
                            htmlFor="card"
                            className="text-base font-normal"
                          >
                            Card
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="mtn" id="mtn" />
                          </FormControl>
                          <FormLabel
                            htmlFor="mtn"
                            className="text-base font-normal"
                          >
                            MTN momo Pay
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="orange" id="orange" />
                          </FormControl>
                          <FormLabel
                            htmlFor="orange"
                            className="text-base font-normal"
                          >
                            Orange money pay
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
              type="submit"
            >
              {isSuccess ? "Saved Successfully" : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
