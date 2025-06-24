import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import fastIcon from "../assets/fast.png";
import houseIcon from "../assets/house.png";
import leaseIcon from "../assets/lease.png";
import PropertyIcon from "../assets/property.png";

// Schema
const schema = z.object({
  currentStreet: z.string().min(1),
  currentUnit: z.string().optional(),
  currentCity: z.string().min(1),
  currentRegion: z.string().min(1),
  currentZip: z.string().min(4),

  leaseType: z.enum(["Fixed Term", "Month-to-Month"]),
  leaseStart: z.date().optional(),
  leaseEnd: z.date().optional(),

  newStreet: z.string().min(1),
  newUnit: z.string().optional(),
  newCity: z.string().min(1),
  newRegion: z.string().min(1),
  newZip: z.string().min(4),

  newLeaseType: z.enum(["Fixed Term", "Month-to-Month"]),
  newLeaseStart: z.date().optional(),
  newLeaseEnd: z.date().optional(),

  moveStart: z.date(),
  moveStartTime: z.string().optional(),
  moveEnd: z.date(),
  moveEndTime: z.string().optional(),
  isFlexible: z.enum(["yes", "no"]),
  flexibilityDuration: z.enum(["30m", "1hr", "2hr"]).optional(),
});

type FormData = z.infer<typeof schema>;

export function BookMyMoveForm({
  onNext,
}: {
  onNext?: (data: FormData) => void;
}) {
  const { t } = useTranslation();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      leaseType: "Fixed Term",
      newLeaseType: "Fixed Term",
      isFlexible: "no",
      flexibilityDuration: "30m",
    },
  });

  const onSubmit = (data: FormData) => {
    if (onNext) onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Property Address */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={houseIcon} alt="Property Icon" className="size-6" />
            <h3 className="text-lg font-semibold">Current Property Address</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="currentStreet"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t("streetAddress")}</FormLabel>
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
                  <FormLabel>{t("unit")}</FormLabel>
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
                  <FormLabel>{t("city")}</FormLabel>
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
                  <FormLabel>{t("region")}</FormLabel>
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
                  <FormLabel>{t("zipCode")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Lease Term */}
        <div className="flex items-center gap-2">
          <img src={leaseIcon} alt="Lease Icon" className="max-h-8 max-w-8" />
          <h3 className="text-lg font-semibold">Lease Term (Optional)</h3>
        </div>
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
                    <RadioGroupItem value="Fixed Term" />
                    <FormLabel>Fixed Term</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="Month-to-Month" />
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
                <FormLabel>{t("startDate")}</FormLabel>
                <FormControl>
                  <DateInput allowPastDates={false} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="leaseEnd"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("endDate")}</FormLabel>
                <FormControl>
                  <DateInput allowPastDates={false} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* New Property Address */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              src={PropertyIcon}
              alt="New Property Icon"
              className="max-h-8 max-w-8"
            />
            <h3 className="text-lg font-semibold">New Property Address</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="newStreet"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>{t("streetAddress")}</FormLabel>
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
                  <FormLabel>{t("unit")}</FormLabel>
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
                  <FormLabel>{t("city")}</FormLabel>
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
                  <FormLabel>{t("region")}</FormLabel>
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
                  <FormLabel>{t("zipCode")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Lease Term for New Address */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={leaseIcon} alt="Lease Icon" className="max-h-8 max-w-8" />
            <h3 className="text-lg font-semibold">Lease Term</h3>
          </div>
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
                      <RadioGroupItem value="Fixed Term" />
                      <FormLabel>Fixed Term</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem value="Month-to-Month" />
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
                  <FormLabel>{t("startDate")}</FormLabel>
                  <DateInput allowPastDates={false} {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="newLeaseEnd"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("endDate")}</FormLabel>
                  <DateInput allowPastDates={false} {...field} />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Move-In Date */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={fastIcon} alt="Fast Icon" className="max-h-8 max-w-8" />
            <h3 className="text-lg font-semibold">Move In Date & Time</h3>
          </div>
          <div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-4">
            <FormField
              name="moveStart"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("startDate")}</FormLabel>
                  <DateInput allowPastDates={false} {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="moveStartTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="moveEnd"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("endDate")}</FormLabel>
                  <DateInput allowPastDates={false} {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="moveEndTime"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
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
                      <FormLabel>{t("yes")}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <RadioGroupItem value="no" />
                      <FormLabel>{t("no")}</FormLabel>
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
                  <FormLabel className="sr-only">
                    Flexibility Duration
                  </FormLabel>
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
        </div>

        <div className="flex items-center justify-center">
          <Button type="submit" className="w-4/5 @xl:w-3/5">
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
