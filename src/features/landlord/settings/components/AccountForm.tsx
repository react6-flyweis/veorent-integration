import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMemo, useState } from "react";
import { PlusIcon } from "lucide-react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

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
  unit: z.string().optional(),
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

  const [firstName, lastName] = useMemo(() => {
    // if data has fullName split it into firstName and lastName
    if (data.firstname && data.lastname) {
      return [data.firstname, data.lastname];
    }
    if (data.fullName) {
      const [first, last] = data.fullName.split(" ");
      return [first, last];
    }
    return ["", ""];
  }, [data]);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
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

  function onSubmit(values: AccountFormValues) {
    // Handle form submission logic here
    console.log("Form submitted with values:", values);
    // You can also send the data to your API or perform any other actions
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
              <div className="flex-1">
                <FormLabel className="mb-2 block text-lg font-medium">
                  Company Logo
                </FormLabel>
                <div className="flex h-32 flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 sm:p-6">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300">
                    <PlusIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500">ADD LOGO</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <ChangePasswordDialog
        user={data}
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
      />
    </div>
  );
}
