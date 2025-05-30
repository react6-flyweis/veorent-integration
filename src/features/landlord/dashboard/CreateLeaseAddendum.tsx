import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateInput } from "@/components/ui/date-input";
import { PageTitle } from "@/components/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import penApplication from "./assets/pen-application.png";
import coinBagIcon from "./assets/coin-bag.png";
import amendmentIcon from "./assets/amendment.png";
import calendarIcon from "./assets/calendar.png";
import monthIcon from "./assets/month.png";
import dateIcon from "./assets/date.png";
import { useNavigate } from "react-router";

// Define Zod validation schema
const formSchema = z.object({
  effectiveDate: z.date(),
  monthlyRentChange: z.string(),
  depositChange: z.string(),
  otherAmendments: z.string(),
  originalLeaseDate: z.date(),
  endDateChange: z.string(),
});

export default function CreateLeaseAddendum() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyRentChange: "no",
      depositChange: "no",
      otherAmendments: "no",
      endDateChange: "no",
      effectiveDate: new Date(),
      originalLeaseDate: new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Lease Addendum data:", data);
      // Handle navigation or success
      navigate("/landlord");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-5">
      <PageTitle
        title="Create Lease Addendum"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
        withBack
      />

      <Card className="gap-0 rounded-lg bg-blue-200 py-2">
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            The most common reasons for using an addendum are:
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          <ul className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <li key={item} className="flex items-center">
                <div className="mt-1 mr-2 h-4 w-4 rounded-sm bg-orange-400"></div>
                <p className="text-sm">
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Lease History Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={penApplication} alt="Lease Icon" className="size-10" />
              <h3 className="text-2xl font-semibold">Lease History</h3>
            </div>

            {/* Tenants Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-black">Tenants</h3>
              <div className="rounded-md border p-4 text-center shadow">
                <p className="text-lg font-bold">You Don't Have Any Tenants!</p>
                <p className="text-sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <Button className="mt-3 w-52" variant="outlinePrimary">
                  Go To My Lease
                </Button>
              </div>
            </div>

            {/* Landlord Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black">Landlord</h3>
              <div className="flex items-start gap-4">
                <Avatar className="size-10">
                  <AvatarImage src="#" alt="Landlord" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Aheyenne Dias</p>
                  <p className="text-sm text-gray-500">
                    aheyennedias123@gmail.com
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="originalLeaseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        When was the original lease agreement dated?
                      </FormLabel>
                      <p className="text-primary">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown
                      </p>
                      <FormControl>
                        <DateInput className="@md:w-1/2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* End Date Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src={dateIcon} alt="Date Icon" className="size-8" />
                <h3 className="text-2xl font-semibold">End Date</h3>
              </div>
              <FormField
                control={form.control}
                name="endDateChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Will there be a change to the lease agreement end date?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex space-x-4"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="end-date-yes" value="yes" />
                          <label htmlFor="end-date-yes">Yes</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="end-date-no" value="no" />
                          <label htmlFor="end-date-no">No</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Monthly Rent Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={monthIcon} alt="Month Icon" className="size-8" />
              <h3 className="text-2xl font-semibold">Monthly Rent</h3>
            </div>
            <FormField
              control={form.control}
              name="monthlyRentChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will there be a change to the monthly rent amount?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="rent-yes" value="yes" />
                        <label htmlFor="rent-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="rent-no" value="no" />
                        <label htmlFor="rent-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                  <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Deposits Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={coinBagIcon} alt="Coin Bag Icon" className="size-8" />
              <h3 className="text-2xl font-semibold">Deposits</h3>
            </div>
            <FormField
              control={form.control}
              name="depositChange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will there be a change to any deposit amount?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="deposit-yes" value="yes" />
                        <label htmlFor="deposit-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="deposit-no" value="no" />
                        <label htmlFor="deposit-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                  <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Other Amendments Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src={amendmentIcon}
                alt="Amendment Icon"
                className="size-8"
              />
              <h3 className="text-2xl font-semibold">Other Amendments</h3>
            </div>
            <FormField
              control={form.control}
              name="otherAmendments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Will there be other amendments to the original lease
                    agreement terms?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="amendments-yes" value="yes" />
                        <label htmlFor="amendments-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="amendments-no" value="no" />
                        <label htmlFor="amendments-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                  <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Effective Date Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img src={calendarIcon} alt="Calendar Icon" className="size-8" />
              <h3 className="text-2xl font-semibold">Effective Date</h3>
            </div>
            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When does this addendum take effect?</FormLabel>
                  <FormControl>
                    <DateInput className="@lg:w-1/2" {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className="text-primary mt-2 rounded-md bg-blue-100 p-3 text-sm">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              type="submit"
              size="lg"
              className="w-3/5"
            >
              Save & Finish Later
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
