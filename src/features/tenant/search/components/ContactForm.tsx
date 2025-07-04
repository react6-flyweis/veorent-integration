import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";

const getContactFormSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(2, t("firstNameRequired")),
    lastName: z.string().min(2, t("lastNameRequired")),
    phone: z.string().min(10, t("phoneMin")),
    email: z.string().email(t("invalidEmail")),
    message: z.string().min(10, t("contactForm.validation.messageMinLength")),
  });

type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>;

export function ContactForm() {
  const { t } = useTranslation();

  const contactFormSchema = getContactFormSchema(t);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log("Form submitted", values);
    // You can integrate email/send logic here or pass data to an API
    setTimeout(() => {
      toast.success(t("contactForm.success"));
      form.reset();
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("profileForm.firstName")}
              </FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("profileForm.lastName")}
              </FormLabel>
              <FormControl>
                <Input className="bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("profileForm.mobileNumber")}
              </FormLabel>
              <FormControl>
                <Input className="bg-white" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("profileForm.email")}
              </FormLabel>
              <FormControl>
                <Input className="bg-white" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("contactForm.writeYourMessage")}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="bg-white"
                  rows={4}
                  {...field}
                  placeholder={t("contactForm.writeHere")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <LoadingButton
            type="submit"
            size="sm"
            className="w-full rounded-full"
            isLoading={form.formState.isSubmitting}
          >
            {t("contactForm.send")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
