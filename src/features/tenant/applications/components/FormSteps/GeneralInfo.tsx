import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import informationIcon from "@/assets/icons/information.png";
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

const generalInfoFormSchema = z.object({
  haveAnimal: z.boolean(),
  haveVehicle: z.boolean(),
  smoke: z.boolean(),
  requirement: z.boolean(),
});

type GeneralFormValues = z.infer<typeof generalInfoFormSchema>;

export function GeneralInfo({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");

  const { t } = useTranslation();

  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalInfoFormSchema),
    defaultValues: {
      haveAnimal: bookingData?.generalInformation?.animalLiving ?? false,
      haveVehicle:
        bookingData?.generalInformation?.vehicleAtTheProperty ?? false,
      smoke: bookingData?.generalInformation?.smoke === "yes",
      requirement: bookingData?.generalInformation?.specialRequests ?? false,
    },
  });

  async function onSubmit(values: GeneralFormValues) {
    try {
      await mutateAsync({
        generalInformation: {
          animalLiving: values.haveAnimal,
          typeOfanimal: "",
          breed: "",
          age: "",
          weight: "",
          vehicleAtTheProperty: values.haveVehicle,
          make: "",
          model: "",
          color: "",
          year: "",
          licensePlate: "",
          smoke: values.smoke ? "yes" : "no",
          specialRequests: values.requirement,
          specialRequestsExplain: "",
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
        <IconRound icon={informationIcon} size="sm" />
        <h2 className="text-2xl font-bold">{t("generalInfo.title")}</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="haveAnimal"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("generalInfo.haveAnimal")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="haveAnimal-yes" />
                      <Label htmlFor="haveAnimal-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="haveAnimal-no" />
                      <Label htmlFor="haveAnimal-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="haveVehicle"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("generalInfo.haveVehicle")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="haveVehicle-yes" />
                      <Label htmlFor="haveVehicle-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="haveVehicle-no" />
                      <Label htmlFor="haveVehicle-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="smoke"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("generalInfo.smoke")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="smoke-yes" />
                      <Label htmlFor="smoke-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="smoke-no" />
                      <Label htmlFor="smoke-no">{t("no")}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requirement"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  {t("generalInfo.requirement")}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="requirement-yes" />
                      <Label htmlFor="requirement-yes">{t("yes")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="requirement-no" />
                      <Label htmlFor="requirement-no">{t("no")}</Label>
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
