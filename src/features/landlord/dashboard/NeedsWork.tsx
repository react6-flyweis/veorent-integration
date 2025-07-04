import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGoBack } from "@/hooks/useGoBack";

// Define form schema with zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  category: z.string().min(1, { message: "Please select a category" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NeedsWork() {
  const { t } = useTranslation();
  const goBack = useGoBack();
  const navigate = useNavigate();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      category: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      navigate("/landlord");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <Button
          onClick={goBack}
          variant="outline"
          className="size-9 items-center justify-center rounded-full"
        >
          <XIcon className="text-primary size-5" />
        </Button>
        <h2 className="text-2xl font-semibold">
          {t("needsWork.contactSupportTitle")}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  {t("needsWork.emailLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("needsWork.emailPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  {t("needsWork.categoryLabel")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("needsWork.categoryPlaceholder")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="feedback">
                      {t("needsWork.categoryFeedback")}
                    </SelectItem>
                    <SelectItem value="bug">
                      {t("needsWork.categoryBug")}
                    </SelectItem>
                    <SelectItem value="question">
                      {t("needsWork.categoryQuestion")}
                    </SelectItem>
                    <SelectItem value="other">
                      {t("needsWork.categoryOther")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  {t("needsWork.messageLabel")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("needsWork.messagePlaceholder")}
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-4">
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              className="w-3/5"
              size="lg"
            >
              {t("needsWork.sendMessage")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
