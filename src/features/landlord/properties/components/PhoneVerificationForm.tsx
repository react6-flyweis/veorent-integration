import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useSendOtpMutation, useVerifyOtpMutation } from "../api/mutation";
import verifyIcon from "../assets/verify.png";

// Zod schemas for form validation
const phoneVerificationSchema = (t: (key: string) => string) =>
  z.object({
    phone: z.string().min(10, t("formSchema.phone_min")),
    verificationMethod: z.enum(["text", "call"], {
      required_error: t("formSchema.verificationMethod_required"),
    }),
  });

const otpVerificationSchema = (t: (key: string) => string) =>
  z.object({
    otp: z
      .array(z.string().length(1, t("formSchema.otp_length")))
      .length(6, t("formSchema.otp_length")),
  });

type PhoneFormValues = z.infer<ReturnType<typeof phoneVerificationSchema>>;
type OtpFormValues = z.infer<ReturnType<typeof otpVerificationSchema>>;

interface PhoneVerificationFormProps {
  defaultValues?: {
    phoneVerified?: boolean;
    phone?: string;
  };
  onSuccess: () => void;
  onSkip?: () => void;
  propertyName?: string;
}

export const PhoneVerificationForm = ({
  defaultValues,
  onSuccess,
  onSkip,
  propertyName,
}: PhoneVerificationFormProps) => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useSendOtpMutation(
    id || "",
  );
  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } =
    useVerifyOtpMutation(id || "");

  const [otpSent, setOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  // Phone verification form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneVerificationSchema(t)),
    defaultValues: {
      phone: defaultValues?.phone || "",
      verificationMethod: "text" as const,
    },
  });

  // OTP verification form
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpVerificationSchema(t)),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const handleSendCode = async () => {
    const isValid = await phoneForm.trigger();
    if (!isValid) return;

    setIsSending(true);
    phoneForm.clearErrors();
    const { phone } = phoneForm.getValues();

    try {
      await sendOtp({ mobileNumber: phone });
      setOtpSent(true);
    } catch (error) {
      phoneForm.setError("root", {
        type: "manual",
        message: getErrorMessage(error),
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async () => {
    const isValid = await otpForm.trigger();
    if (!isValid) return;

    setIsSending(true);
    otpForm.clearErrors();
    const { otp } = otpForm.getValues();
    const otpString = otp.join("");

    try {
      await verifyOtp({ otp: otpString });

      // Update property with phone verification status
      // const valuesToSubmit: IPropertyUpdateData = {
      //   phoneVerified: true,
      //   contactPhone: phoneForm.getValues("phone"),
      // };
      // await mutateAsync(valuesToSubmit);

      onSuccess();
    } catch (error) {
      otpForm.setError("root", {
        type: "manual",
        message: getErrorMessage(error),
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (onSkip) onSkip();
      else onSuccess();
    } finally {
      setIsSkipping(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const currentOtp = otpForm.getValues("otp");
    const newOtp = [...currentOtp];
    newOtp[index] = value;
    otpForm.setValue("otp", newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otpForm.getValues("otp")[index]
    ) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <IconRound icon={verifyIcon} size="sm" />
        <h2 className="ml-2 text-xl font-semibold">
          {t("verifyPhoneToPublishListing")}
        </h2>
      </div>

      <div>
        {propertyName && (
          <p className="text-muted-foreground mb-6">{propertyName}</p>
        )}
        <p className="text-muted-foreground mb-6 text-sm">
          {t("setUpListingPromptDescription")}
        </p>

        {!otpSent ? (
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handleSendCode)}
              className="space-y-6"
            >
              <div>
                <h3 className="mb-4 text-base font-medium">
                  {t("howToReceiveVerificationCode")}
                </h3>
                <FormField
                  control={phoneForm.control}
                  name="verificationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="text" id="text-option" />
                            <Label
                              htmlFor="text-option"
                              className="font-normal"
                            >
                              {t("sendATextMessage")}
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="call" id="call-option" />
                            <Label
                              htmlFor="call-option"
                              className="font-normal"
                            >
                              {t("callMyPhone")}
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      {t("phone")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="(123) 456-7890"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {phoneForm.formState.errors.root && (
                <FormErrors errors={phoneForm.formState.errors} />
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleSkip}
                  disabled={isSending || isSkipping || isSendingOtp}
                >
                  {t("skipMarketingForNow")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSending || isSkipping || isSendingOtp}
                >
                  {t("sendCode")}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleVerify)}
              className="space-y-6"
            >
              <div>
                <h3 className="mb-4 text-base font-medium">{t("enterOtp")}</h3>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => {
                    const otpValue = Array.isArray(field.value)
                      ? field.value
                      : ["", "", "", "", "", ""];

                    return (
                      <FormItem>
                        <FormControl>
                          <div className="flex justify-between gap-2">
                            {otpValue.map((digit, index) => (
                              <Input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                  handleOtpChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className="h-12 w-12 text-center text-lg"
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {otpForm.formState.errors.root && (
                <FormErrors errors={otpForm.formState.errors} />
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={handleSkip}
                  disabled={isSending || isSkipping || isVerifyingOtp}
                >
                  {t("skipMarketingForNow")}
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSending || isSkipping || isVerifyingOtp}
                >
                  {t("pleaseVerify")}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
