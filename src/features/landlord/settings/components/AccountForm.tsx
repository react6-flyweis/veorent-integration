import { useState } from "react";
import { useForm } from "react-hook-form";
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

const accountFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  company: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  streetAddress: z.string().min(3, {
    message: "Street address must be at least 3 characters.",
  }),
  unit: z.string().min(1, {
    message: "Unit is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  region: z.string().min(1, {
    message: "Region is required.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm({ data }: { data: IUserFullDetails }) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const { mutateAsync } = useUpdateProfileMutation();
  const { showToast } = useToast();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      firstName: data.firstname || "",
      lastName: data.lastname || "",
      company: "",
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
      <h2 className="mb-4 text-xl font-bold sm:mb-6">My Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">First Name</FormLabel>
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
                  <FormLabel className="font-medium">Last Name</FormLabel>
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
                  Company <span className="text-gray-500">(Optional)</span>
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
                  <FormLabel className="font-medium">Email</FormLabel>
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
                  <FormLabel className="font-medium">Phone</FormLabel>
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
                        Street Address
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
                      <FormLabel className="font-medium">Unit</FormLabel>
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
                    <FormLabel className="font-medium">City</FormLabel>
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
                    <FormLabel className="font-medium">Region</FormLabel>
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
                    <FormLabel className="font-medium">Zip Code</FormLabel>
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
                  <h3 className="mb-2 text-lg font-medium">Password</h3>
                  <Button
                    type="button"
                    variant="outlinePrimary"
                    className="w-full uppercase sm:w-auto sm:min-w-[160px]"
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    Change Password
                  </Button>
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  SAVE CHANGES
                </Button>
              </div>

              {/* Company Logo Section */}
              <CompanyLogoUpload currentLogo={data.image || undefined} />
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
