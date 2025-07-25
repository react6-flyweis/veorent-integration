import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ResetPasswordPage() {
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Password form data:", data);
    // Handle password change
  };

  return (
    <div className="">
      <img src="/logo-dark.png" alt="Veorent Logo" className="mb-6 h-8" />
      <h2 className="mb-6 text-2xl font-semibold">Reset Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter Password</FormLabel>

                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>

                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
