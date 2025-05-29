import { PageTitle } from "@/components/PageTitle";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoadingButton } from "@/components/ui/loading-button";

import mapPinIcon from "./assets/map-pin.png";

const formSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function PropertyAddress({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      streetAddress: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Handle form submission
    onSuccess();
  };

  return (
    <div className="">
      <PageTitle title="Add Property Address" withBack />
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <img src={mapPinIcon} alt="" className="max-h-7 max-w-7" />
          <h2 className="text-2xl font-bold">Property Address</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apartment, suite, etc. (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="State/Province/Region" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zip code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="border-blue-100 bg-blue-50 p-4">
              <p className="text-sm text-blue-700">
                The property address is used to identify the exact location of
                your property and will be shown to potential tenants.
              </p>
            </Card>
            <div className="flex items-center justify-center">
              <LoadingButton
                isLoading={form.formState.isSubmitting}
                type="submit"
                size="lg"
                className="w-4/5 @lg:w-3/5"
              >
                Continue
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
