import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import type { Control, FieldValues, Path } from "react-hook-form";

const rentalProcessOptions = [
  {
    label: "Trying to find the right tenants to move in",
    description: "Lorem Ipsum is simply dummy text of the printing and",
    key: "find_tenants",
  },
  {
    label: "Have existing or upcoming tenants to set up",
    description: "Lorem Ipsum is simply dummy text of the printing and",
    key: "existing_tenants",
  },
  {
    label: "Just want to explore Veorent",
    description: "Lorem Ipsum is simply dummy text of the printing and",
    key: "explore",
  },
];

interface RentalProcessSelectionProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  title?: string;
  subtitle?: string;
}

export function RentalProcessSelection<T extends FieldValues>({
  control,
  name,
  title = "What part of the rental process are you in for",
  subtitle = "Your address displays here.",
}: RentalProcessSelectionProps<T>) {
  return (
    <div className="space-y-2">
      {title && <h2 className="text-2xl font-bold text-blue-900">{title}</h2>}
      {subtitle && <p className="text-muted-foreground mb-4">{subtitle}</p>}
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Rental Process</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {rentalProcessOptions.map((option) => (
                <label
                  key={option.key}
                  htmlFor={`rental-process-${option.key}`}
                  className="cursor-pointer"
                >
                  <Card
                    className={`relative border py-1 transition-all ${
                      field.value === option.key
                        ? "border-primary bg-blue-50"
                        : "border-input hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="mt-1 flex h-5 w-5 items-center justify-center">
                        <RadioGroupItem
                          value={option.key}
                          id={`rental-process-${option.key}`}
                          className="h-5 w-5"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <p className="text-muted-foreground text-sm">
                          {option.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </label>
              ))}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
