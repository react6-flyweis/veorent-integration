import { useState } from "react";
import { format, subYears } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { FormControl } from "./form";

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

  // Calculate the start and end months for the calendar navigation
  const getDateRange = () => {
    const startYear = isDob
      ? dobMinDate.getFullYear()
      : minDate?.getFullYear() ||
        (allowPastDates ? today.getFullYear() - 10 : today.getFullYear());

    const endYear = isDob
      ? dobMaxDate.getFullYear()
      : maxDate?.getFullYear() ||
        (allowFutureDates ? today.getFullYear() + 10 : today.getFullYear());

    return {
      startMonth: new Date(startYear, 0), // January of start year
      endMonth: new Date(endYear, 11), // December of end year
    };
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
              "border-input w-full justify-start pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              className,
            )}
          >
            <CalendarDaysIcon className="mr-5 h-4 w-4 opacity-50" />
            {value ? format(value, "PPP") : <span>Select date</span>}
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
          {...getDateRange()}
        />
      </PopoverContent>
    </Popover>
  );
}
