import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";

const emailSchema = z.object({
  email: z.string().email("Invalid email"),
});

const otpSchema = z.object({
  otp: z.array(z.string().min(1, "Required")).length(6, "Enter all 6 digits"),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

export function ForgotPasswordPage() {
  const [showOtp, setShowOtp] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: Array(6).fill(""),
    },
  });

  const handleEmailSubmit = (data: EmailFormValues) => {
    console.log("Email:", data.email);
    setShowOtp(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otpForm.getValues("otp")];
    newOtp[index] = value.slice(-1);
    otpForm.setValue("otp", newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSubmit = (data: OtpFormValues) => {
    console.log("OTP:", data.otp.join(""));
    // Submit both OTP and Email if needed
  };
  return (
    <div className="">
      <img src="/logo-dark.png" alt="Veorent Logo" className="mb-6 h-8" />

      <h2 className="mb-6 text-2xl font-semibold">Forgot Password</h2>

      <div className="space-y-6">
        {/* Step 1: Email */}
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
            className="space-y-6"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <p className="text-muted-foreground mt-1 text-center text-sm">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!showOtp && (
              <LoadingButton type="submit" className="w-full">
                Send OTP
              </LoadingButton>
            )}
          </form>
        </Form>

        {/* Step 2: OTP */}
        {showOtp && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
              className="space-y-6"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={() => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <div className="flex space-x-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <Controller
                          key={index}
                          name={`otp.${index}` as const}
                          control={otpForm.control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              ref={(el) => {
                                otpRefs.current[index] = el;
                              }}
                              maxLength={1}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              className="w-10 text-center font-bold"
                            />
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton type="submit" className="w-full">
                Verify
              </LoadingButton>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
