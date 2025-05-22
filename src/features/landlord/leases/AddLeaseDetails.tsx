import { PageTitle } from "@/components/PageTitle";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import * as z from "zod";
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
import { MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router";

// Define Zod validation schema
const formSchema = z.object({
  rentalProperty: z.string(),
  leaseNickname: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isMonthToMonth: z.boolean(),
});

export default function AddLeaseDetails() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      rentalProperty: "",
      leaseNickname: "",
      isMonthToMonth: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Lease details data:", data);
      navigate("/landlord/leases/whats-next");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-4">
      <PageTitle
        title="Add Basic Lease Details"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and"
        withBack
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="rentalProperty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rental Property</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Press to select a property"
                      className="peer ps-9"
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                      <MapPinIcon
                        className="mr-2 size-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leaseNickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lease Nickname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <p className="mt-1 text-sm text-gray-600">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </p>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Start Date (Optional)</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>End Date (Optional)</FormLabel>
                  <FormControl>
                    <DateInput
                      {...field}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isMonthToMonth"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Month-to-Month</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <div className="pt-2">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              type="submit"
              className="w-full"
              size="lg"
            >
              Add Lease
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
