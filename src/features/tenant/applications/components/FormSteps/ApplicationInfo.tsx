import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import applicationIcon from "@/assets/icons/application.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { CounterInput } from "@/components/ui/counter-input";
import { DateInput } from "@/components/ui/date-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateBookingMutation } from "../../api/mutation";

const contactFormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  coSigners: z.boolean(),
  isShortPeriod: z.boolean(),
  people: z.number().min(1, "No of people is required."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ApplicationInfo({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      date: bookingData?.applicationInfo?.moveDate
        ? new Date(bookingData.applicationInfo.moveDate)
        : undefined,
      coSigners: bookingData?.applicationInfo?.othersApplyWithYou ?? false,
      isShortPeriod: bookingData?.applicationInfo?.shortTimeOfPeriod ?? false,
      people: bookingData?.applicationInfo?.peopleLivingCount
        ? parseInt(bookingData.applicationInfo.peopleLivingCount)
        : 1,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await mutateAsync({
        applicationInfo: {
          moveDate: values.date.toISOString(),
          othersApplyWithYou: values.coSigners,
          shortTimeOfPeriod: values.isShortPeriod,
          peopleLivingCount: values.people.toString(),
          fromDate: values.date.toISOString(),
          endDate: values.date.toISOString(),
        },
      });
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={applicationIcon} size="sm" />
        <h2 className="text-2xl font-bold text-blue-900">Application Info</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  Desired Move-in Date
                </FormLabel>
                <DateInput allowPastDates={false} className="w-52" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coSigners"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  Are there others applying with you (including co-signers)?
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="coSigners-yes" />
                      <Label htmlFor="coSigners-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="coSigners-no" />
                      <Label htmlFor="coSigners-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isShortPeriod"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  Are you booking this property for a short period of time?
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="isShortPeriod-yes" />
                      <Label htmlFor="isShortPeriod-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="isShortPeriod-no" />
                      <Label htmlFor="isShortPeriod-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="people"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  How many people will be living in the property in total?
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </FormDescription>
                <FormControl>
                  <CounterInput className="w-52" max={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center">
            <LoadingButton
              type="submit"
              size="lg"
              className="w-4/5 @lg:w-3/5"
              isLoading={isPending}
            >
              Save & Next
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
