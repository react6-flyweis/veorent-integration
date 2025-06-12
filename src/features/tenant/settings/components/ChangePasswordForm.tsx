import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
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
import { useToast } from "@/hooks/useAlertToast";
import { useAuthStore } from "@/store/useAuthStore";
import { getErrorMessage } from "@/utils/getErrorMessage";

import {
  useForgetPasswordMutation,
  useChangePasswordMutation,
} from "../api/mutations";

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface ChangePasswordFormProps {
  profile: IUser;
  onClose: () => void;
}

export function ChangePasswordForm({
  profile,
  onClose,
}: ChangePasswordFormProps) {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");

  const user = useAuthStore((state) => state.user);
  const forgetPasswordMutation = useForgetPasswordMutation();
  const changePasswordMutation = useChangePasswordMutation(user?._id || "");
  const { showToast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile.email,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleOtpBoxChange = (
    index: number,
    value: string,
    onChange: (value: string) => void,
  ) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const currentOtp = form.getValues("otp");
      const newOtp = currentOtp.split("");
      while (newOtp.length < 6) newOtp.push("");
      newOtp[index] = value;
      onChange(newOtp.join(""));

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (
      e.key === "Backspace" &&
      !(e.currentTarget as HTMLInputElement).value &&
      index > 0
    ) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (step === "email") {
        // Send forget password request
        await forgetPasswordMutation.mutateAsync({
          email: values.email,
        });
        setStep("otp");
        showToast("OTP sent to your email", "success");
      } else if (step === "otp" && values.otp.length === 6) {
        // Verify OTP and change password
        await changePasswordMutation.mutateAsync({
          otp: values.otp,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });
        showToast("Password changed successfully", "success");
        onClose();
      }
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  const handleSendOTP = async () => {
    const email = form.getValues("email");
    if (email && form.formState.errors.email === undefined) {
      try {
        await forgetPasswordMutation.mutateAsync({ email });
        setStep("otp");
        showToast("OTP sent to your email", "success");
      } catch {
        showToast("Failed to send OTP", "error");
      }
    } else {
      form.trigger("email");
    }
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field - Always visible */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    disabled={step !== "email"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Send OTP Button - Show only in email step */}
          {step === "email" && (
            <Button
              type="button"
              onClick={handleSendOTP}
              disabled={forgetPasswordMutation.isPending}
              className="w-full"
            >
              {forgetPasswordMutation.isPending ? "Sending..." : "Send OTP"}
            </Button>
          )}

          {/* OTP Field - Show only in otp step */}
          {step === "otp" && (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <Input
                          key={index}
                          id={`otp-${index}`}
                          value={field.value[index] || ""}
                          onChange={(e) =>
                            handleOtpBoxChange(
                              index,
                              e.target.value,
                              field.onChange,
                            )
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          maxLength={1}
                          className="w-12 text-center"
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Password Fields - Show only in otp step */}
          {step === "otp" && (
            <>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-enter Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormErrors errors={form.formState.errors} />

          {/* Action Buttons */}
          <div className="flex justify-between pt-2">
            {step === "otp" && (
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-white"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending
                  ? "Changing..."
                  : "Change Password"}
              </Button>
            )}
            <Button type="button" size="lg" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
