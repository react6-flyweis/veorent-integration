import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useChangePasswordMutation } from "../api/mutation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useToast } from "@/hooks/useAlertToast";
import { LoadingButton } from "@/components/ui/loading-button";
import FormErrors from "@/components/FormErrors";

// Schema for password change validation
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  user,
}: ChangePasswordDialogProps) {
  const { mutateAsync } = useChangePasswordMutation();
  const { showToast } = useToast();
  const form = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordChangeValues) => {
    try {
      const valuesToSubmit = {
        otp: user.otp,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      await mutateAsync(valuesToSubmit);
      // show success message
      showToast("Password changed successfully", "success");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
        type: "manual",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Change Your Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <div className="text-sm text-blue-500">
                    <a href="#" className="underline">
                      Forgot your password?
                    </a>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
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
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormErrors errors={form.formState.errors} />

            <DialogFooter className="gap-2 sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
                className="w-36"
              >
                CANCEL
              </Button>
              <LoadingButton
                isLoading={form.formState.isSubmitting}
                type="submit"
                className="w-36"
              >
                CHANGE
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
