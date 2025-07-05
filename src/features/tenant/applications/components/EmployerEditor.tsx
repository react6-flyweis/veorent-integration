import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwissFrancIcon } from "lucide-react";
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

export const employerSchema = z.object({
  employerName: z.string().min(1),
  position: z.string().min(1),
  monthStarted: z.string().min(1),
  yearStarted: z.string().min(1),
  monthlyIncome: z.string().min(1),
  referenceName: z.string().optional(),
  referenceNumber: z.string().optional(),
});

export type IEmployer = z.infer<typeof employerSchema>;

export function EmployerEditor({
  data,
  onSubmit,
}: {
  data: IEmployer | undefined;
  onSubmit: (data: IEmployer) => void;
}) {
  const { t } = useTranslation();
  const form = useForm<IEmployer>({
    resolver: zodResolver(employerSchema),
    defaultValues: data ? { ...data } : {},
  });

  return (
    <Form {...form}>
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="employerName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("employment.employerName")}
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
          name="position"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("employment.position")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monthStarted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("employment.monthStarted")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("employment.monthPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearStarted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("employment.yearStarted")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("employment.yearPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("employment.monthlyIncome")}
                </FormLabel>
                <div className="relative">
                  <div className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2">
                    <SwissFrancIcon className="h-4 w-4" />
                  </div>
                  <FormControl>
                    <Input
                      className="pl-8"
                      placeholder={t("employment.amountPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="font-semibold text-blue-700">
            {t("employment.referenceTitle")}
          </h3>
        </div>

        <FormField
          control={form.control}
          name="referenceName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("employment.referenceName")}
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
          name="referenceNumber"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                {t("employment.referenceNumber")}
              </FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            onClick={form.handleSubmit((values) => {
              onSubmit(values);
            })}
            size="lg"
            className="w-3/5"
          >
            {t("employment.addCurrent")}
          </Button>
        </div>
      </div>
    </Form>
  );
}
