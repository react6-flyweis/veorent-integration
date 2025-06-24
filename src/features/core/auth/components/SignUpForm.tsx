import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";
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
import { useUserPreferenceStore } from "@/store/useUserPreferenceStore";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useRegisterTenantMutation } from "../api/mutation";

const signUpSchema = z.object({
  fName: z.string().min(2, "First name is required."),
  lName: z.string().min(2, "Last name is required."),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { t } = useTranslation();

  const { userType } = useUserPreferenceStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync } = useRegisterTenantMutation();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      if (userType === "landlord") {
        return navigate("/signup-landlord", {
          state: {
            ...data,
            ...state,
          },
        });
      } else {
        await mutateAsync({
          firstname: data.fName,
          lastname: data.lName,
          email: data.email,
          password: data.password,
          confirmPassword: data.password,
        });
        navigate("/tenant/search");
      }
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="fName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" size="lg" className="w-full">
          Sign up
        </LoadingButton>
        <div className="text-sm">
          <Link to="/login" className="text-muted-foreground hover:underline">
            Already have Account?
          </Link>
        </div>
      </form>
    </Form>
  );
}
