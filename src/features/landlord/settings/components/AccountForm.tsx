import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
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
import { useToast } from "@/hooks/useAlertToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { CompanyLogoUpload } from "./CompanyLogoUpload";
import { useUpdateProfileMutation } from "../api/mutation";

import type { TFunction } from "i18next";

const createAccountFormSchema = (t: TFunction) =>
  z.object({
    firstName: z.string().min(2, {
      message: t("accountForm.validation.firstName"),
    }),
    lastName: z.string().min(2, {
      message: t("accountForm.validation.lastName"),
    }),
    company: z.string().optional(),
    email: z.string().email({
      message: t("accountForm.validation.email"),
    }),
    phone: z.string().min(10, {
      message: t("accountForm.validation.phone"),
    }),
    streetAddress: z.string().min(3, {
      message: t("accountForm.validation.streetAddress"),
    }),
    unit: z.string().min(1, {
      message: t("accountForm.validation.unit"),
    }),
    city: z.string().min(1, {
      message: t("accountForm.validation.city"),
    }),
    region: z.string().min(1, {
      message: t("accountForm.validation.region"),
    }),
    zipCode: z.string().min(5, {
      message: t("accountForm.validation.zipCode"),
    }),
  });

export function AccountForm({ data }: { data: IUserFullDetails }) {
  const { t } = useTranslation();
  const accountFormSchema = createAccountFormSchema(t);
  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { mutateAsync } = useUpdateProfileMutation();
  const { showToast } = useToast();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      firstName: data.firstname || "",
      lastName: data.lastname || "",
      company: data.company || "",
      email: data.email || "",
      phone: data.mobileNumber || "",
      streetAddress: data.addressDetails?.streetAddress || "",
      unit: "",
      city: data.addressDetails?.city || "",
      region: data.addressDetails?.region || "",
      zipCode: data.addressDetails?.zipCode || "",
    },
  });

  async function onSubmit(values: AccountFormValues) {
    try {
      const updateData = {
        firstname: values.firstName,
        lastname: values.lastName,
        mobileNumber: values.phone,
        email: values.email,
        addressDetails: {
          houseNumber: values.unit || "",
          streetAddress: values.streetAddress || "",
          city: values.city || "",
          region: values.region || "",
          zipCode: values.zipCode || "",
        },
      };

      await mutateAsync(updateData);
      showToast("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update profile:", error);
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-bold sm:mb-6">
        {t("accountForm.title")}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    {t("accountForm.firstName")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    {t("accountForm.lastName")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company Field */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  {t("accountForm.company")}{" "}
                  <span className="text-gray-500">
                    ({t("accountForm.optional")})
                  </span>
                </FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Fields */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    {t("accountForm.email")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    {t("accountForm.phone")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-5">
            {/* Street Address and Unit */}
            <div className="grid flex-1 grid-cols-1 gap-2 gap-y-0 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {t("accountForm.streetAddress")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        {t("accountForm.unit")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* City, Region, Zip */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      {t("accountForm.city")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      {t("accountForm.region")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      {t("accountForm.zipCode")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password and Logo Section */}
            <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:gap-8">
              {/* Password Section */}
              <div className="flex h-full flex-col justify-between space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium">
                    {t("accountForm.password")}
                  </h3>
                  <Button
                    type="button"
                    variant="outlinePrimary"
                    className="w-full uppercase sm:w-auto sm:min-w-[160px]"
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    {t("accountForm.changePassword")}
                  </Button>
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  {t("accountForm.save")}
                </Button>
              </div>

              {/* Company Logo Section */}
              <CompanyLogoUpload currentLogo={data.companyLogo || undefined} />
            </div>
          </div>
          <FormErrors errors={form.formState.errors} />
        </form>
      </Form>

      <ChangePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      />
    </div>
  );
}
