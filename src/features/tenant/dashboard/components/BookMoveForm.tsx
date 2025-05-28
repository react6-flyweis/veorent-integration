"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

// Schema
const schema = z.object({
  currentStreet: z.string().min(1),
  currentUnit: z.string().optional(),
  currentCity: z.string().min(1),
  currentRegion: z.string().min(1),
  currentZip: z.string().min(4),

  leaseType: z.enum(["fixed", "month"]),
  leaseStart: z.date().optional(),
  leaseEnd: z.date().optional(),

  newStreet: z.string().min(1),
  newUnit: z.string().optional(),
  newCity: z.string().min(1),
  newRegion: z.string().min(1),
  newZip: z.string().min(4),

  newLeaseType: z.enum(["fixed", "month"]),
  newLeaseStart: z.date().optional(),
  newLeaseEnd: z.date().optional(),

  moveStart: z.date(),
  moveEnd: z.date(),
  isFlexible: z.enum(["yes", "no"]),
  flexibilityDuration: z.enum(["30m", "1hr", "2hr"]).optional(),
});

type FormData = z.infer<typeof schema>;

export function BookMyMoveForm({
  onNext,
}: {
  onNext?: (data: FormData) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      leaseType: "fixed",
      newLeaseType: "fixed",
      isFlexible: "no",
      flexibilityDuration: "30m",
    },
  });

  const onSubmit = (data: FormData) => {
    if (onNext) onNext(data);
  };

  const DatePicker = ({
    value,
    onChange,
  }: {
    value: Date | undefined;
    onChange: (value: Date | undefined) => void;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? format(value, "PPP") : <span>Select date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Property Address */}
        <h3 className="text-lg font-semibold">🏠 Current Property Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="currentStreet"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currentUnit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="currentCity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currentRegion"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currentZip"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Lease Term */}
        <h3 className="text-lg font-semibold">📃 Lease Term (Optional)</h3>
        <FormField
          name="leaseType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is the term for this lease?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" />
                    <FormLabel>Fixed Term</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="month" />
                    <FormLabel>Month-to-Month</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="leaseStart"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="leaseEnd"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* New Property Address */}
        <h3 className="text-lg font-semibold">🏗 New Property Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="newStreet"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newUnit"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="newCity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newRegion"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newZip"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Lease Term for New Address */}
        <h3 className="text-lg font-semibold">📃 Lease Term</h3>
        <FormField
          name="newLeaseType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is the term for this lease?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" />
                    <FormLabel>Fixed Term</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="month" />
                    <FormLabel>Month-to-Month</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="newLeaseStart"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <DatePicker {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="newLeaseEnd"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <DatePicker {...field} />
              </FormItem>
            )}
          />
        </div>

        {/* Move-In Date */}
        <h3 className="text-lg font-semibold">📦 Move In Date & Time</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="moveStart"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <DatePicker {...field} />
              </FormItem>
            )}
          />
          <FormField
            name="moveEnd"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <DatePicker {...field} />
              </FormItem>
            )}
          />
        </div>

        {/* Flexibility */}
        <FormField
          name="isFlexible"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you flexible with timings?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" />
                    <FormLabel>Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="no" />
                    <FormLabel>No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Flexibility Duration - Only show when isFlexible is "yes" */}
        {form.watch("isFlexible") === "yes" && (
          <FormField
            name="flexibilityDuration"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Flexibility Duration</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormItem className="flex items-center space-x-2">
                      <SelectTrigger>
                        <SelectValue placeholder="Flexible for.." />
                      </SelectTrigger>
                    </FormItem>
                    <SelectContent>
                      <SelectItem value="30m">30 Minutes</SelectItem>
                      <SelectItem value="1hr">1 Hour</SelectItem>
                      <SelectItem value="2hr">2 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <div className="flex items-center justify-center">
          <Button type="submit" className="w-4/5 @xl:w-3/5">
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
