import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { PageTitle } from "@/components/PageTitle";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
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
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateLeaseMutation } from "./api/mutation";
import { PropertiesSelector } from "../dashboard/components/PropertiesSelector";

// Define Zod validation schema
function createFormSchema(t: (key: string) => string) {
  return z.object({
    rentalProperty: z.string().min(1, t("leases.rentalPropertyRequired")),
    leaseNickname: z.string().min(1, t("leases.leaseNicknameRequired")),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    isMonthToMonth: z.boolean(),
  });
}

export default function AddLeaseDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync } = useCreateLeaseMutation();

  const formSchema = createFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      rentalProperty: "",
      leaseNickname: "",
      isMonthToMonth: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const valuesToSubmit: ILeaseCreateData = {
        ...values,
        startDate: values.startDate ? values.startDate.toISOString() : "",
        endDate: values.endDate ? values.endDate.toISOString() : "",
        monthToMonth: values.isMonthToMonth,
      };
      await mutateAsync(valuesToSubmit);
      navigate("/landlord/leases/whats-next", {
        state: { property: values.rentalProperty },
      });
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-4">
      <PageTitle
        title={t("leases.addLeaseDetails")}
        description={t("leases.addLeaseDetailsDescription")}
        withBack
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rentalProperty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("leases.rentalProperty")}</FormLabel>
                <FormControl>
                  {/* <div className="relative">
                    <Input
                      {...field}
                      placeholder="Press to select a property"
                      className="peer ps-9"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <MapPinIcon
                        className="mr-2 size-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div> */}
                  <PropertiesSelector
                    placeholder={t("leases.selectProperty")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leaseNickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("leases.leaseNickname")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <p className="mt-1 text-sm text-gray-600">
                  {t("leases.leaseNicknameHelper")}
                </p>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("leases.startDateOptional")}</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t("leases.endDateOptional")}</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isMonthToMonth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("leases.monthToMonth")}</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center pt-2">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              type="submit"
              className="w-4/5 @lg:w-3/5"
              size="lg"
            >
              {t("leases.addLease")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
