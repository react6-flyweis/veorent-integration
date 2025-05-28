import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";

import marketingImg from "@/assets/images/marketing.png";
import sofaImg from "@/assets/images/sofa.png";
import apartmentImg from "@/assets/images/apartment.png";
import townhouseImg from "@/assets/images/townhouse.png";
import villaImg from "@/assets/images/villa.png";
import skyscraperImg from "@/assets/images/skyscraper.png";
import factoryImg from "@/assets/images/factory.png";
import requestImg from "@/assets/images/request.png";

const propertyTypes = [
  {
    label: "Marketing",
    image: marketingImg,
    key: "marketing",
  },
  {
    label: "Furnished Home",
    image: sofaImg,
    key: "furnished-home",
  },
  {
    label: "Apartment",
    image: apartmentImg,
    key: "apartment",
  },
  {
    label: "Townhouse",
    image: townhouseImg,
    key: "townhouse",
  },
  {
    label: "Condo",
    image: villaImg,
    key: "condo",
  },
  {
    label: "Multi-Family",
    image: skyscraperImg,
    key: "multi-family",
  },
  {
    label: "Manufactured",
    image: factoryImg,
    key: "manufactured",
  },
  {
    label: "Other",
    image: requestImg,
    key: "other",
  },
];

interface PropertyTypeSelectionProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onContinue?: () => void;
  title?: string;
  subtitle?: string;
}

export function PropertyTypeSelection<T extends FieldValues>({
  control,
  name,
  onContinue,
  title = "Which best describes your property?",
  subtitle = "This allows us to better tailor your experience.",
}: PropertyTypeSelectionProps<T>) {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold text-blue-900">{title}</h2>}
      {subtitle && (
        <p className="text-muted-foreground mb-4">{subtitle}</p>
      )}{" "}
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Property Type</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            >
              {propertyTypes.map((type) => (
                <Card
                  key={type.key}
                  className={`relative cursor-pointer border transition-all ${
                    field.value === type.key
                      ? "border-primary bg-blue-50"
                      : "border-input hover:border-primary/50"
                  }`}
                >
                  <div className="absolute top-3 left-3 flex h-5 w-5 items-center justify-center">
                    <div
                      className={`border-input flex h-5 w-5 items-center justify-center rounded-full border ${
                        field.value === type.key
                          ? "bg-primary border-primary"
                          : "bg-background"
                      }`}
                    >
                      {field.value === type.key && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <label
                    htmlFor={`property-type-${type.key}`}
                    className="cursor-pointer"
                  >
                    <CardContent className="flex flex-col items-center justify-center p-3 py-0 text-center">
                      <input
                        type="radio"
                        id={`property-type-${type.key}`}
                        className="sr-only"
                        {...field}
                        value={type.key}
                        checked={field.value === type.key}
                      />
                      <img
                        src={type.image}
                        alt={type.label}
                        className="mb-3 h-12 w-12 object-contain"
                      />
                      <span className="text-primary font-medium">
                        {type.label}
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
      {onContinue && (
        <Button
          onClick={onContinue}
          className="bg-primary mt-6 w-full text-white"
          size="lg"
        >
          Continue
        </Button>
      )}
    </div>
  );
}
