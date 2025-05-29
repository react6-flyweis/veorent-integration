import { PageTitle } from "@/components/PageTitle";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { HouseIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  roomName: z.string().min(1, "Room name is required"),
  beds: z.string().min(1, "Number of beds is required"),
  baths: z.string().min(1, "Number of baths is required"),
  apartmentUnit: z.string().optional(),
  studioUnit: z.string().optional(),
  roomsUnit: z.string().optional(),
  targetRent: z.string().min(1, "Target rent is required"),
  targetDeposit: z.string().min(1, "Target deposit is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface PropertyDetailsProps {
  onSuccess?: () => void;
}

export function PropertyDetails({ onSuccess }: PropertyDetailsProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beds: "",
      baths: "",
      apartmentUnit: "",
      studioUnit: "",
      roomsUnit: "",
      targetRent: "",
      targetDeposit: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // Handle form submission
    onSuccess?.();
  };

  return (
    <div>
      <PageTitle title="Add Property details" withBack />
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-blue-100 p-2">
            <HouseIcon />
          </div>
          <h2 className="text-2xl font-bold">Add Property details</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2">
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beds</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of beds" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Baths</FormLabel>
                    <FormControl>
                      <Input placeholder="Number of baths" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apartmentUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment unit details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studioUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Studio Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="Studio unit details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomsUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rooms Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="Rooms unit details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetRent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Rent</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter target rent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetDeposit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Deposit</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter target deposit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="border-blue-100 bg-blue-50 p-4">
              <p className="text-primary text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
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
