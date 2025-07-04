import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";

function createFormSchema(t: (key: string) => string) {
  return z.object({
    document: z.array(
      z.instanceof(File).refine((file) => file.size <= 5 * 1024 * 1024, {
        message: t("leases.fileSize"),
      }),
    ),
  });
}

export default function UploadLeaseDocument() {
  const { t } = useTranslation();
  const formSchema = createFormSchema(t);
  type FormValues = z.infer<typeof formSchema>;
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    // Handle form submission with the document file
    console.log(data);
    // Here you would typically upload the file to a server
    navigate("/landlord/leases/whats-next");
  };

  if (!state || !state.property) {
    // if no property is selected then redirect to select lease
    return <Navigate to="/landlord/lease-agreement" />;
  }

  return (
    <div className="space-y-5">
      <PageTitle title={t("leases.uploadDocumentTitle")} withBack />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-full md:w-3/5">
              {t("leases.upload")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
