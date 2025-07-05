"use client";

import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import infoCircleIcon from "@/assets/icons/info-circle.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateBookingMutation } from "../../api/mutation";

const EmergencySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  additionalComments: z.string().optional(),
  foundThrough: z.string().min(1, "Please select an option"),
});

type EmergencyFormType = z.infer<typeof EmergencySchema>;

export default function EmergencyContactForm({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");
  const { t } = useTranslation();

  const form = useForm<EmergencyFormType>({
    resolver: zodResolver(EmergencySchema),
    defaultValues: {
      firstName: bookingData?.emergencyContact?.fullName || "",
      relationship: bookingData?.emergencyContact?.relationShip || "",
      phoneNumber: bookingData?.emergencyContact?.phoneNumber || "",
      additionalComments: bookingData?.emergencyContact?.comment || "",
      foundThrough: bookingData?.emergencyContact?.findProperty || "",
    },
  });

  async function onSubmit(data: EmergencyFormType) {
    try {
      await mutateAsync({
        emergencyContact: {
          fullName: data.firstName,
          relationShip: data.relationship,
          phoneNumber: data.phoneNumber,
          comment: data.additionalComments || "",
          findProperty: data.foundThrough,
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
        <IconRound icon={infoCircleIcon} size="sm" />
        <h2 className="text-primary text-2xl font-bold">
          {t("emergencyContact.title")}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Emergency Contact Section */}
          <div>
            <h2 className="text-md text-primary mb-1 font-semibold">
              {t("emergencyContact.emergencyTitle")}
            </h2>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("emergencyContact.firstName")}</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emergencyContact.relationship")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Brother, Friend..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emergencyContact.phoneNumber")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Additional Comments */}
          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  {t("emergencyContact.additionalCommentsOptional")}
                </FormLabel>
                <FormDescription>
                  {t("emergencyContact.additionalCommentsDesc")}
                </FormDescription>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropdown Section */}
          <FormField
            control={form.control}
            name="foundThrough"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("emergencyContact.foundThrough")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("emergencyContact.foundThrough")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="website">
                      {t("emergencyContact.website")}
                    </SelectItem>
                    <SelectItem value="agent">
                      {t("emergencyContact.agent")}
                    </SelectItem>
                    <SelectItem value="social">
                      {t("emergencyContact.social")}
                    </SelectItem>
                    <SelectItem value="friend">
                      {t("emergencyContact.friend")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormErrors errors={form.formState.errors} />

          {/* Submit */}
          <div className="flex items-center justify-center">
            <LoadingButton
              type="submit"
              className="mt-2 w-4/5 @lg:w-3/5"
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
