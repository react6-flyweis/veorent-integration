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
import { Button } from "@/components/ui/button";
import { IconRound } from "@/components/IconRound";

import otherIncomeIcon from "@/assets/icons/other-income.png";
import { Input } from "@/components/ui/input";

const incomeFormSchema = z.object({
  otherSources: z.boolean(),
  bank: z.string().min(1, "Bank name is required."),
});

type OtherIncomeFormValues = z.infer<typeof incomeFormSchema>;

export function OtherIncome({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<OtherIncomeFormValues>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      bank: "",
      otherSources: false,
    },
  });

  function onSubmit(values: OtherIncomeFormValues) {
    console.log("Form submitted", values);
    onSuccess();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={otherIncomeIcon} size="sm" />
        <h2 className="text-2xl font-bold text-blue-900">Other Income</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otherSources"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  Are there other sources of income you would like to include?
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    className="flex gap-6"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">Yes</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-xl">
                  Current Bank / Financial Institution
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </FormDescription>
                <FormControl>
                  <Input {...field} />
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
