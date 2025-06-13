import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { useToast } from "@/hooks/useAlertToast";
import { getFullName } from "@/utils/name";

import { useEditProfileMutation } from "../api/mutations";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobileNumber: z.string().min(10, "Mobile number is too short"),
  email: z.string().email("Invalid email"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile?: IUser;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { mutateAsync } = useEditProfileMutation();
  const { showToast } = useToast();

  const [firstName, lastName] = profile?.fullName?.split(" ") || [];

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      mobileNumber: profile?.mobileNumber || "",
      email: profile?.email || "",
    },
  });

  // Update form values when profile changes
  useEffect(() => {
    if (profile) {
      const [firstName, lastName] = profile.fullName?.split(" ") || [];
      form.reset({
        firstName: firstName || "",
        lastName: lastName || "",
        mobileNumber: profile.mobileNumber || "",
        email: profile.email || "",
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Combine first and last name for the API
      const apiData = {
        fullName: getFullName(data.firstName, data.lastName),
        mobileNumber: data.mobileNumber,
        email: data.email,
      };
      await mutateAsync(apiData);
      showToast("Profile updated successfully", "success");
    } catch {
      showToast("Failed to update profile", "error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number */}
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          size="lg"
          className="w-full"
          isLoading={form.formState.isSubmitting}
        >
          Save Changes
        </LoadingButton>
      </form>
    </Form>
  );
}
