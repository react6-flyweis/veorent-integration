import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { IconRound } from "@/components/IconRound";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdatePropertyMutation } from "../api/mutation";
import { useParams } from "react-router";
import { getErrorMessage } from "@/utils/getErrorMessage";
import FormErrors from "@/components/FormErrors";

// You may want to replace this with an actual phone icon
import infoIcon from "@/assets/icons/info.png";

// Zod schemas for form validation
const phoneVerificationSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  verificationMethod: z.enum(["text", "call"], {
    required_error: "Please select a verification method",
  }),
});

const otpVerificationSchema = z.object({
  otp: z
    .array(z.string().length(1, "Required"))
    .length(6, "Enter all 6 digits"),
});

type PhoneFormValues = z.infer<typeof phoneVerificationSchema>;
type OtpFormValues = z.infer<typeof otpVerificationSchema>;

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
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const [otpSent, setOtpSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  // Phone verification form
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneVerificationSchema),
    defaultValues: {
      phone: defaultValues?.phone || "",
      verificationMethod: "text" as const,
    },
  });

  // OTP verification form
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const handleSendCode = async () => {
    const isValid = await phoneForm.trigger();
    if (!isValid) return;

    setIsSending(true);
    phoneForm.clearErrors();

    try {
      // Simulate API call to send code
      await new Promise((resolve) => setTimeout(resolve, 1000));
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

    try {
      // Simulate API call to verify OTP and update property
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update property with phone verification status
      const valuesToSubmit: IPropertyUpdateData = {
        // phoneVerified: true, // Commenting out until proper field is available
        // contactPhone: phoneForm.getValues("phone"), // Commenting out until proper field is available
      };
      await mutateAsync(valuesToSubmit);

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
        <IconRound icon={infoIcon} size="sm" />
        <h2 className="ml-2 text-xl font-semibold">
          Verify Your Phone to Publish the Listing
        </h2>
      </div>

      <div>
        {propertyName && (
          <p className="text-muted-foreground mb-6">{propertyName}</p>
        )}
        <p className="text-muted-foreground mb-6 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        {!otpSent ? (
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(handleSendCode)}
              className="space-y-6"
            >
              <div>
                <h3 className="mb-4 text-base font-medium">
                  How would you like to receive the verification code?
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
                              Send a text message
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="call" id="call-option" />
                            <Label
                              htmlFor="call-option"
                              className="font-normal"
                            >
                              Call my phone
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
                      Phone
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
                  disabled={isSending || isSkipping}
                >
                  Skip Marketing For Now
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSending || isSkipping}
                >
                  Send Code
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
                <h3 className="mb-4 text-base font-medium">Enter OTP</h3>
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
                  disabled={isSending || isSkipping}
                >
                  Skip Marketing For Now
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSending || isSkipping}
                >
                  Please Verify
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
