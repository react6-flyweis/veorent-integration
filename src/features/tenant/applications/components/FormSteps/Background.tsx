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
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconRound } from "@/components/IconRound";

import bgCheckIcon from "@/assets/icons/bg-check.png";

const bgInfoFormSchema = z.object({
  evicted: z.boolean(),
  criminalOffense: z.boolean(),
  bankrupted: z.boolean(),
});

type BgFormValues = z.infer<typeof bgInfoFormSchema>;

export function BackgroundInfo({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<BgFormValues>({
    resolver: zodResolver(bgInfoFormSchema),
    defaultValues: {
      evicted: false,
      criminalOffense: false,
      bankrupted: false,
    },
  });

  function onSubmit(values: BgFormValues) {
    console.log("Form submitted", values);
    onSuccess();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={bgCheckIcon} size="sm" />
        <h2 className="text-2xl font-bold">Background</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="evicted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  Have you (or any person you have named on this application)
                  ever been evicted from a tenancy or left owing money?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="evicted-yes" />
                      <Label htmlFor="evicted-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="evicted-no" />
                      <Label htmlFor="evicted-no">No</Label>
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
                  Have you or any member of your household ever been convicted
                  of (or pled guilty or no contest to) any criminal offense(s)
                  other than minor infraction(s) that were disposed of by means
                  other than acquittal or a finding of "not guilty"?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="criminalOffense-yes" />
                      <Label htmlFor="criminalOffense-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="criminalOffense-no" />
                      <Label htmlFor="criminalOffense-no">No</Label>
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
                  Have you (or any person you have named on this application)
                  ever filed for or been involved in a bankruptcy, been
                  foreclosed on, or been a defendant in a civil suit?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="bankrupted-yes" />
                      <Label htmlFor="bankrupted-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="bankrupted-no" />
                      <Label htmlFor="bankrupted-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" size="lg" className="w-4/5 @lg:w-3/5">
              Save & Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
