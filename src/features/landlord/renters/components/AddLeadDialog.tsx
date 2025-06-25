import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { PropertiesSelector } from "../../dashboard/components/PropertiesSelector";
import { useCreateLeadMutation } from "../api/mutations";

const formSchema = z.object({
  property: z.string().min(1, { message: "Property is required" }),
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddLeadDialog({ open, onOpenChange }: AddLeadDialogProps) {
  const { t } = useTranslation();

  const { mutateAsync } = useCreateLeadMutation();
  const { showToast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: "",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const valuesToSubmit: ILeadCreateData = {
        propertyInterested: values.property,
        fullName: values.fullName,
        renterEmail: values.email,
        phoneNumber: values.phone,
      };
      await mutateAsync(valuesToSubmit);
      showToast(t("leadCreatedSuccessfully"), "success");
      setTimeout(() => {
        form.reset();
        onOpenChange(false);
      }, 1000);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (form.formState.isDirty) {
      const confirmClose = window.confirm(t("unsavedChangesConfirm"));
      if (!confirmClose) {
        return;
      }
    }
    form.reset();
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("addNewLead")}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="property"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">
                    {t("propertyInterestedIn")}
                  </FormLabel>
                  <FormControl>
                    <PropertiesSelector {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className="mt-1 text-sm text-blue-400">
                    {t("propertyInterestedDescription")}
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">
                    {t("renterEmail")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">
                    {t("phoneNumber")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <LoadingButton
                type="submit"
                className="w-4/5"
                isLoading={form.formState.isSubmitting}
              >
                {t("submit")}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
