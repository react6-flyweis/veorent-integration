import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useGetGoalsQuery } from "../api/queries";

const formSchema = z.object({
  propertiesCount: z.number().min(0, "Properties count must be 0 or greater"),
  referralSource: z.string().optional(),
  goals: z.array(
    z.object({
      goalId: z.string().min(1, "Goal ID is required"),
      selectedOptionId: z.string().min(1, "Selected option ID is required"),
    }),
  ),
});

export type LandlordFormData = z.infer<typeof formSchema>;

interface LandlordPersonalizeFormProps {
  onSubmit: (data: LandlordFormData) => void;
  defaultData?: LandlordFormData;
  submitButtonHidden?: boolean;
}

export function LandlordPersonalizeForm({
  onSubmit,
  defaultData,
  submitButtonHidden = false,
}: LandlordPersonalizeFormProps) {
  const { t } = useTranslation();

  const form = useForm<LandlordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultData,
  });

  const { data } = useGetGoalsQuery();

  // Update form data when props change
  useEffect(() => {
    if (defaultData) {
      form.reset(defaultData);
    }
  }, [defaultData, form]);

  // Submit form data when it changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value) {
        onSubmit(value as LandlordFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  const handlePropertiesCountChange = (delta: number) => {
    const currentValue = form.getValues("propertiesCount");
    const newValue = Math.max(0, currentValue + delta);
    form.setValue("propertiesCount", newValue);
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 py-4">
        {data?.length &&
          data.map((goal) => (
            <FormField
              key={goal._id}
              control={form.control}
              name="goals"
              render={({ field }) => {
                const currentGoals = field.value || [];
                const currentGoal = currentGoals.find(
                  (g) => g.goalId === goal._id,
                );

                return (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      {goal.questionText}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(selectedOptionId) => {
                          const updatedGoals = currentGoals.filter(
                            (g) => g.goalId !== goal._id,
                          );
                          updatedGoals.push({
                            goalId: goal._id,
                            selectedOptionId,
                          });
                          field.onChange(updatedGoals);
                        }}
                        value={currentGoal?.selectedOptionId || ""}
                        className="space-y-1"
                      >
                        {goal.options.map((option) => (
                          <div
                            key={option._id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option._id}
                              id={option._id}
                            />
                            <label htmlFor={option._id}>{option.text}</label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}

        <FormField
          control={form.control}
          name="propertiesCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-medium">
                How many properties do you own/manage?
              </FormLabel>
              <FormControl>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="size-8 rounded-full"
                    onClick={() => handlePropertiesCountChange(-1)}
                    disabled={field.value <= 0}
                  >
                    <MinusIcon className="h-5 w-5" />
                  </Button>
                  <div className="border-primary flex h-10 items-center justify-center rounded-2xl border px-2">
                    <span className="w-8 text-center">{field.value}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    type="button"
                    className="size-8 rounded-full"
                    onClick={() => handlePropertiesCountChange(1)}
                  >
                    <PlusIcon className="h-5 w-5" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referralSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                How did you hear about Veorent? (Optional)
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!submitButtonHidden && (
          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg">
              {t("continue")}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
