import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PageTitle } from "@/components/PageTitle";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define schema for form validation
const formSchema = z.object({
  leaseId: z.string({
    required_error: "Please select a lease to sign",
  }),
});

export default function ESign() {
  const { t } = useTranslation();

  // Set up form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaseId: "",
    },
  });

  // Submit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Selected lease for signing:", data.leaseId);
      // Handle navigation or further steps
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageTitle
        title={t("eSign.title")}
        description={t("eSign.description")}
        withBack
      />

      <div className="space-y-6">
        <h3 className="text-lg font-medium">{t("eSign.setupStepsTitle")}</h3>

        <div className="space-y-4">
          {[t("eSign.step1"), t("eSign.step2"), t("eSign.step3")].map(
            (step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md ${index % 2 === 0 ? "bg-blue-500" : "bg-black"} text-white`}
                >
                  <span className="text-2xl font-extrabold text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
                    {index + 1}
                  </span>
                </div>
                <p className="mt-1">{step}</p>
              </div>
            ),
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("eSign.leasePrompt")}</h3>
              <FormField
                control={form.control}
                name="leaseId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t("eSign.leasePlaceholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lease1">
                            {t("eSign.leaseOption1")}
                          </SelectItem>
                          <SelectItem value="lease2">
                            {t("eSign.leaseOption2")}
                          </SelectItem>
                          <SelectItem value="lease3">
                            {t("eSign.leaseOption3")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center pt-4">
                <LoadingButton
                  isLoading={form.formState.isSubmitting}
                  type="submit"
                  className="w-full py-6 text-lg md:w-2/3"
                  size="lg"
                >
                  {t("eSign.getItSignedFast")}
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
