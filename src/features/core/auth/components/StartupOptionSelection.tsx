import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import type { Control, FieldValues, Path } from "react-hook-form";

// Import the icons for each option
import marketingIcon from "../assets/marketing.png";
import applicationIcon from "../assets/application.png";
import screeningIcon from "../assets/screening.png";
import leaseIcon from "../assets/lease.png";
import rentCollectionIcon from "../assets/rent-collection.png";

const startupOptions = [
  {
    label: "Marketing",
    image: marketingIcon,
    key: "marketing",
  },
  {
    label: "Application",
    image: applicationIcon,
    key: "application",
  },
  {
    label: "Screening",
    image: screeningIcon,
    key: "screening",
  },
  {
    label: "Lease",
    image: leaseIcon,
    key: "lease",
  },
  {
    label: "Rent Collection",
    image: rentCollectionIcon,
    key: "rent_collection",
  },
];

interface StartupOptionSelectionProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onContinue?: () => void;
  title?: string;
  subtitle?: string;
}

export function StartupOptionSelection<T extends FieldValues>({
  control,
  name,
  title = "Where would you like to start?",
  subtitle = "Get started in only a few minutes!",
}: StartupOptionSelectionProps<T>) {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold text-blue-900">{title}</h2>}
      {subtitle && <p className="text-muted-foreground mb-4">{subtitle}</p>}
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Starting Point</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
            >
              {startupOptions.map((option) => (
                <Card
                  key={option.key}
                  className={`relative cursor-pointer border py-0 transition-all ${
                    field.value === option.key
                      ? "border-primary bg-blue-50"
                      : "border-input hover:border-primary/50"
                  }`}
                >
                  <div className="absolute top-3 left-3 flex h-5 w-5 items-center justify-center">
                    <div
                      className={`border-input flex h-5 w-5 items-center justify-center rounded-full border ${
                        field.value === option.key
                          ? "bg-primary border-primary"
                          : "bg-background"
                      }`}
                    >
                      {field.value === option.key && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <label
                    htmlFor={`startup-option-${option.key}`}
                    className="cursor-pointer"
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <input
                        type="radio"
                        id={`startup-option-${option.key}`}
                        className="sr-only"
                        {...field}
                        value={option.key}
                        checked={field.value === option.key}
                      />
                      <img
                        src={option.image}
                        alt={option.label}
                        className="mb-3 h-12 w-12 object-contain"
                      />
                      <span className="text-primary font-medium">
                        {option.label}
                      </span>
                    </CardContent>
                  </label>
                </Card>
              ))}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
