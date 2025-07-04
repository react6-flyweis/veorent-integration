import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FormErrors from "@/components/FormErrors";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateProfileMutation } from "../api/mutation";

import type { TFunction } from "i18next";

// Schema for password change validation
const createPasswordChangeSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, t("changePassword.validation.currentPassword")),
      newPassword: z
        .string()
        .min(8, t("changePassword.validation.newPassword")),
      confirmPassword: z
        .string()
        .min(1, t("changePassword.validation.confirmPassword")),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("changePassword.validation.match"),
      path: ["confirmPassword"],
    });

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const { t } = useTranslation();
  const passwordChangeSchema = createPasswordChangeSchema(t);
  type PasswordChangeValues = z.infer<typeof passwordChangeSchema>;

  const { mutateAsync } = useUpdateProfileMutation();
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
      await mutateAsync({
        password: values.newPassword,
      });
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
          <DialogTitle className="text-xl">
            {t("changePassword.title")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("changePassword.currentPassword")}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <div className="text-sm text-blue-500">
                    <a href="#" className="underline">
                      {t("changePassword.forgot")}
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
                  <FormLabel>{t("changePassword.newPassword")}</FormLabel>
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
                  <FormLabel>{t("changePassword.confirmPassword")}</FormLabel>
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
                {t("changePassword.cancel")}
              </Button>
              <LoadingButton
                isLoading={form.formState.isSubmitting}
                type="submit"
                className="w-36"
              >
                {t("changePassword.change")}
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
