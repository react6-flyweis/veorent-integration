import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DateInput } from "@/components/ui/date-input";
import { Button } from "@/components/ui/button";
import { IconRound } from "@/components/IconRound";

import applicationIcon from "@/assets/icons/application.png";
import { CounterInput } from "@/components/ui/counter-input";

const contactFormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  coSigners: z.boolean(),
  isShortPeriod: z.boolean(),
  people: z.number().min(1, "No of people is required."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ApplicationInfo({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      date: new Date(),
      coSigners: false,
      isShortPeriod: false,
      people: 1,
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log("Form submitted", values);
    // You can integrate email/send logic here or pass data to an API
    onSuccess();
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
                    {...field}
                    value={field.value ? "yes" : "no"}
                  >
                    <RadioGroupItem value="yes" />
                    <Label>Yes</Label>
                    <RadioGroupItem value="no" />
                    <Label>No</Label>
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
                    {...field}
                    value={field.value ? "yes" : "no"}
                  >
                    <RadioGroupItem value="yes" />
                    <Label>Yes</Label>
                    <RadioGroupItem value="no" />
                    <Label>No</Label>
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

          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-3/5">
              Save & Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
