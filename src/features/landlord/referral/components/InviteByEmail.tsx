import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
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
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useInviteByEmailMutation } from "../api/mutation";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  customMessage: z
    .string()
    .max(500, "Message cannot exceed 500 characters")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function InviteByEmail() {
  const { t } = useTranslation();

  const { mutateAsync } = useInviteByEmailMutation();
  const { showToast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      customMessage: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const valuesToSend = {
        email: data.email,
        desc: data.customMessage || "",
      };
      await mutateAsync(valuesToSend);
      showToast("Invite sent successfully!", "success");
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Invite By Email</h2>
      <p className="mb-4 text-sm text-gray-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Custom Message{" "}
                  <span className="text-gray-500">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your custom message here"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <p className="text-xs text-gray-500">
                  {field.value?.length || 0}/500 characters used
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              type="submit"
              size="lg"
              className="w-3/5"
            >
              Send Invite
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
