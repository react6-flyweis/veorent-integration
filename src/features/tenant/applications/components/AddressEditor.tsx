import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const addressSchema = z
  .object({
    residenceType: z.enum(["rent", "own", "other"]),
    monthMovedIn: z.string().min(1),
    yearMovedIn: z.string().min(1),
    streetAddress: z.string().min(1),
    unit: z.string().optional(),
    city: z.string().min(1),
    region: z.string().optional(),
    zipCode: z.string().min(1),
    monthlyRent: z.string().min(1),
    reasonForMoving: z.string().optional(),
    landlordName: z.string().min(1),
    landlordEmail: z.string().email().optional(),
    unknownEmail: z.boolean(),
    landlordPhone: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    if (
      !data.unknownEmail &&
      (!data.landlordEmail || data.landlordEmail.trim() === "")
    ) {
      ctx.addIssue({
        path: ["landLordEmail"],
        code: z.ZodIssueCode.custom,
        message: "Landlord email is required if you don't check 'I don't know'",
      });
    }
  });

export type IAddress = z.infer<typeof addressSchema>;

export function AddressEditor({
  data,
  onSubmit,
}: {
  data: IAddress | undefined;
  onSubmit: (data: IAddress) => void;
}) {
  const { t } = useTranslation();
  const form = useForm<IAddress>({
    resolver: zodResolver(addressSchema),
    defaultValues: data
      ? { ...data }
      : {
          residenceType: "rent",
          unknownEmail: false,
        },
  });

  const unknownEmail = form.watch("unknownEmail");

  useEffect(() => {
    if (unknownEmail) form.setValue("landlordEmail", undefined);
  }, [form, unknownEmail]);

  return (
    <Form {...form}>
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="residenceType"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Residence Type</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex space-x-4"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center gap-2">
                    <RadioGroupItem value="rent" /> Rent
                    <FormMessage />
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <RadioGroupItem value="own" /> Own
                    <FormMessage />
                  </FormItem>
                  <FormItem className="flex items-center gap-2">
                    <RadioGroupItem value="other" /> {t("other")}
                    <FormMessage />
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monthMovedIn"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Month Moved In</FormLabel>
                <FormControl>
                  <Input placeholder="MM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearMovedIn"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Year Moved In</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">{t("streetAddress")}</FormLabel>
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
            name="unit"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">{t("unit")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">{t("city")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">{t("region")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">{t("zipCode")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="monthlyRent"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Monthly Rent</FormLabel>
              <div className="relative">
                <div className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2">
                  <CurrencyIcon />
                </div>
                <FormControl>
                  <Input
                    className="pl-8"
                    placeholder="{t('amount')}"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reasonForMoving"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Why are you moving?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="font-semibold text-blue-700">Landlord Contact Info</h3>
        </div>

        <FormField
          control={form.control}
          name="landlordName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">{t("fullName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!unknownEmail && (
          <FormField
            control={form.control}
            name="landlordEmail"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Email Address</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="unknownEmail"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-muted-foreground text-sm">
                I don&apos;t know my landlord&apos;s email
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="landlordPhone"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">{t("phoneNumber")}</FormLabel>
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
            className="mt-3 w-full @lg:w-3/5"
          >
            Add Current Address
          </Button>
        </div>
      </div>
    </Form>
  );
}
