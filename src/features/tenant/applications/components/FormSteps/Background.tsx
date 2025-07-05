import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import bgCheckIcon from "@/assets/icons/bg-check.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateBookingMutation } from "../../api/mutation";

const bgInfoFormSchema = z.object({
  evicted: z.boolean(),
  criminalOffense: z.boolean(),
  bankrupted: z.boolean(),
});

type BgFormValues = z.infer<typeof bgInfoFormSchema>;

export function BackgroundInfo({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");

  const { t } = useTranslation();

  const form = useForm<BgFormValues>({
    resolver: zodResolver(bgInfoFormSchema),
    defaultValues: {
      evicted: false, // This field might need to be added to the backend schema
      criminalOffense:
        bookingData?.background?.criminalOffenseExplain === "Yes",
      bankrupted: bookingData?.background?.civilSuitExplain === "Yes",
    },
  });

  async function onSubmit(values: BgFormValues) {
    try {
      await mutateAsync({
        background: {
          criminalOffenseExplain: values.criminalOffense ? "Yes" : "No",
          civilSuitExplain: values.bankrupted ? "Yes" : "No",
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
        <IconRound icon={bgCheckIcon} size="sm" />
        <h2 className="text-2xl font-bold">{t("background.title")}</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="evicted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("background.evicted")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="evicted-yes" />
                      <Label htmlFor="evicted-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="evicted-no" />
                      <Label htmlFor="evicted-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="criminalOffense"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("background.criminalOffense")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="criminalOffense-yes" />
                      <Label htmlFor="criminalOffense-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="criminalOffense-no" />
                      <Label htmlFor="criminalOffense-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankrupted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("background.bankrupted")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="bankrupted-yes" />
                      <Label htmlFor="bankrupted-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="bankrupted-no" />
                      <Label htmlFor="bankrupted-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
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
              {t("actions.saveNext")}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
