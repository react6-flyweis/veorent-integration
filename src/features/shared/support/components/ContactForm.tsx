import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useAlertToast";
import { useAuthStore } from "@/store/useAuthStore";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { contactApi } from "../api/contactApi";

import type { TFunction } from "i18next";

const createFormSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    fullName: z.string().min(
      2,
      t("contactForm.fullNameMin", {
        defaultValue: "Full name must be at least 2 characters",
      }),
    ),
    email: z
      .string()
      .email(
        t("contactForm.invalidEmail", {
          defaultValue: "Invalid email address",
        }),
      ),
    mobileNumber: z
      .string()
      .min(
        10,
        t("contactForm.mobileMin", {
          defaultValue: "Enter a valid mobile number",
        }),
      ),
    message: z
      .string()
      .min(
        5,
        t("contactForm.messageMin", {
          defaultValue: "Message must be at least 5 characters",
        }),
      ),
  });

export function ContactForm() {
  const { t } = useTranslation();

  const formSchema = createFormSchema(t);
  type ContactFormData = z.infer<typeof formSchema>;

  const { showToast } = useToast();
  const user = useAuthStore((state) => state.user);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Determine which API endpoint to use based on user type
      const isPartner = user?.userType === "PARTNER";

      if (isPartner) {
        await contactApi.submitPartnerContact(data);
      } else {
        await contactApi.submitUserContact(data);
      }

      showToast(t("contactForm.success"), "success");
      form.reset(); // Reset form after successful submission
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.fullName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("contactForm.fullNamePlaceholder")}
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number */}
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.mobile")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("contactForm.mobilePlaceholder")}
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.email")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("contactForm.emailPlaceholder")}
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("contactForm.writeYourMessage")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("contactForm.writeHere")}
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex flex-col justify-between gap-2 pt-4 @lg:flex-row">
          <LoadingButton
            type="submit"
            className="w-full @lg:w-44"
            isLoading={form.formState.isSubmitting}
          >
            {t("contactForm.send")}
          </LoadingButton>
          <Button
            type="button"
            className="w-full bg-green-600 @lg:w-44"
            onClick={() => {
              alert(t("contactForm.calling"));
            }}
          >
            {t("contactForm.call")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
