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
  minAge = 13,
  maxAge = 120,
}: {
  value: Date;
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

  // Default month to show in calendar — 20 years ago if isDob and no value selected
  const defaultMonth = isDob ? value ?? subYears(today, 20) : value ?? today;

  return (
    <Popover open={dateOpen} onOpenChange={setDateOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal border-input",
              !value && "text-muted-foreground",
              className
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
          selected={value}
          defaultMonth={defaultMonth}
          onSelect={(date) => {
            if (date) {
              onChange(date);
              setDateOpen(false);
            }
          }}
          disabled={isDateDisabled}
          captionLayout="dropdown"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
