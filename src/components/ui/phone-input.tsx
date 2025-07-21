"use client";

import React, { useId, type ComponentProps } from "react";
import RPNInput, {
  type Country,
  type FlagProps,
  getCountryCallingCode,
} from "react-phone-number-input";
import { ChevronDownIcon, PhoneIcon } from "lucide-react";
import flags from "react-phone-number-input/flags";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputComponent = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px rounded-s-none shadow-none focus-visible:z-10",
        className,
      )}
      {...props}
    />
  );
};

InputComponent.displayName = "PhoneInput";

type CountrySelectProps = {
  disabled?: boolean;
  value: Country;
  onChange: (value: Country) => void;
  options: { label: string; value: Country | undefined }[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Country);
  };

  return (
    <div className="border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option, i) => (
            <option key={option.value ?? `empty-${i}`} value={option.value}>
              {option.label}{" "}
              {option.value && `+${getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  );
};

const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="w-5 overflow-hidden rounded-sm">
      {Flag ? (
        <Flag title={countryName} />
      ) : (
        <PhoneIcon size={16} aria-hidden="true" />
      )}
    </span>
  );
};

export function PhoneInput({
  id,
  placeholder,
  className,
  value,
  ...restProps
}: ComponentProps<typeof RPNInput>) {
  const idGenerated = useId();
  const idToPass = id || `phone-input-${idGenerated}`;

  return (
    <RPNInput
      className={cn("flex rounded-md shadow-xs", className)}
      international
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      id={idToPass}
      placeholder={placeholder || "Enter phone number"}
      value={value}
      {...restProps}
    />
  );
}
