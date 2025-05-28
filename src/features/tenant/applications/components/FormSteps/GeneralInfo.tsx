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

import informationIcon from "@/assets/icons/information.png";

const generalInfoFormSchema = z.object({
  haveAnimal: z.boolean(),
  haveVehicle: z.boolean(),
  smoke: z.boolean(),
  requirement: z.boolean(),
});

type GeneralFormValues = z.infer<typeof generalInfoFormSchema>;

export function GeneralInfo({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalInfoFormSchema),
    defaultValues: {
      haveAnimal: false,
      haveVehicle: false,
      smoke: false,
      requirement: false,
    },
  });

  function onSubmit(values: GeneralFormValues) {
    console.log("Form submitted", values);
    onSuccess();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={informationIcon} size="sm" />
        <h2 className="text-2xl font-bold">General Information</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="haveAnimal"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">
                  Will you have an animal living with you at this property?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="haveAnimal-yes" />
                      <Label htmlFor="haveAnimal-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="haveAnimal-no" />
                      <Label htmlFor="haveAnimal-no">No</Label>
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
                  Will you have a vehicle at this property?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="haveVehicle-yes" />
                      <Label htmlFor="haveVehicle-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="haveVehicle-no" />
                      <Label htmlFor="haveVehicle-no">No</Label>
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
                <FormLabel className="text-base">Do you smoke?</FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="smoke-yes" />
                      <Label htmlFor="smoke-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="smoke-no" />
                      <Label htmlFor="smoke-no">No</Label>
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
                  Do you have any special requests or requirements we should be
                  aware of?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex"
                    value={field.value ? "yes" : "no"}
                    onValueChange={(value) => field.onChange(value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="requirement-yes" />
                      <Label htmlFor="requirement-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="requirement-no" />
                      <Label htmlFor="requirement-no">No</Label>
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
