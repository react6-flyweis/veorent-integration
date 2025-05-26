import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subYears } from "date-fns";
import { useState } from "react";
import { FormControl } from "./form";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DropdownNavProps, DropdownProps } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "./select";

type DateConstraints = {
  allowPastDates?: boolean;
  allowFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isDob?: boolean;
  minAge?: number; // e.g., 13
  maxAge?: number; // e.g., 120
};

export function DateInput({
  value,
  onChange,
  className,
  allowPastDates = true,
  allowFutureDates = true,
  minDate,
  maxDate,
  isDob = false,
  minAge = 1,
  maxAge = 100,
}: {
  value?: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
} & DateConstraints) {
  const [dateOpen, setDateOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dobMinDate = subYears(today, maxAge); // Oldest DOB
  const dobMaxDate = subYears(today, minAge); // Youngest DOB

  const isDateDisabled = (date: Date) => {
    if (isDob) {
      if (date > dobMaxDate) return true;
      if (date < dobMinDate) return true;
      return false;
    }

    if (!allowPastDates && date < today) return true;
    if (!allowFutureDates && date > today) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return false;
  };

  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  // Custom function to determine the year range for the dropdown
  const getYearRange = () => {
    const startYear = isDob
      ? dobMinDate.getFullYear()
      : minDate?.getFullYear() ||
        (allowPastDates ? today.getFullYear() - 10 : today.getFullYear());

    // For future years, add 10 years by default or respect maxDate if provided
    const endYear = isDob
      ? dobMaxDate.getFullYear()
      : maxDate?.getFullYear() ||
        (allowFutureDates ? today.getFullYear() + 10 : today.getFullYear());

    return { fromYear: startYear, toYear: endYear };
  };

  // Default month to show in calendar — 20 years ago if isDob and no value selected
  const defaultMonth = isDob
    ? (value ?? subYears(today, 20))
    : (value ?? today);

  return (
    <Popover open={dateOpen} onOpenChange={setDateOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "border-input w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              className,
            )}
          >
            {value ? format(value, "PPP") : <span>Select date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          disabled={isDateDisabled}
          selected={value}
          onSelect={(date) => {
            if (date) {
              onChange(date);
              setDateOpen(false);
            }
          }}
          className="rounded-md border p-2"
          captionLayout="dropdown"
          defaultMonth={defaultMonth}
          showOutsideDays={false}
          fromYear={getYearRange().fromYear}
          toYear={getYearRange().toYear}
          components={{
            DropdownNav: (props: DropdownNavProps) => {
              return (
                <div className="flex w-full items-center gap-2">
                  {props.children}
                </div>
              );
            },
            Dropdown: (props: DropdownProps) => {
              return (
                <Select
                  value={String(props.value)}
                  onValueChange={(value) => {
                    if (props.onChange) {
                      handleCalendarChange(value, props.onChange);
                    }
                  }}
                >
                  <SelectTrigger className="h-8 w-fit font-medium first:grow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                    {props.options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
