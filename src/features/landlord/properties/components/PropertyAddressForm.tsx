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
import type { PropsWithChildren } from "react";

const formSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function PropertyAddressForm({
  onSuccess,
  standAlone = false,
}: {
  onSuccess: (values: FormValues) => void;
  standAlone?: boolean;
}) {
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
    onSuccess(values);
  };

  const WrapperComponent = ({ children }: PropsWithChildren) =>
    standAlone ? (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    ) : (
      <div className="space-y-4">{children}</div>
    );

  return (
    <Form {...form}>
      <WrapperComponent>
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

        <Card className="rounded-none border-0 bg-blue-200 p-4">
          <p className="text-primary text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui harum
            distinctio, quidem dicta perspiciatis eveniet sapiente mollitia
            culpa. Iure vero debitis magni iusto obcaecati velit at suscipit
            libero, voluptas praesentium ut eum reiciendis ullam incidunt vel
            vitae accusantium doloremque commodi!
          </p>
        </Card>
        <div className="flex items-center justify-center">
          <LoadingButton
            isLoading={form.formState.isSubmitting}
            type={standAlone ? "submit" : "button"}
            onClick={form.handleSubmit(onSubmit)}
            size="lg"
            className="w-4/5 @lg:w-3/5"
          >
            Continue
          </LoadingButton>
        </div>
      </WrapperComponent>
    </Form>
  );
}
