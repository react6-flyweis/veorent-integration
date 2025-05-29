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
import { useNavigate } from "react-router";
import * as z from "zod";

const formSchema = z.object({
  roomName: z.string().min(1, "Room name is required"),
  beds: z.number().min(1, "Number of beds must be at least 1"),
  baths: z.number().min(1, "Number of baths must be at least 1"),
  unitNumber: z.string().optional(),
  targetRent: z.number().min(1, "Target rent must be greater than 0"),
  targetDeposit: z.number().min(1, "Target deposit must be greater than 0"),
});

type FormValues = z.infer<typeof formSchema>;

export function PropertyDetails() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomName: "",
      beds: 1,
      baths: 1,
      unitNumber: "",
      targetRent: 0,
      targetDeposit: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    navigate("/landlord/properties/setup-prompt");
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
                name="roomName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter room name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter unit number (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beds</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="Number of beds"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                      <Input
                        type="number"
                        min="1"
                        placeholder="Number of baths"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                    <FormLabel>Target Rent ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter target rent"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                    <FormLabel>Target Deposit ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter target deposit"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
