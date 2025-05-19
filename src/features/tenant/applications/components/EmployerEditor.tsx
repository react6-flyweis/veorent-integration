import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SwissFrancIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export const employerSchema = z.object({
  employerName: z.string().min(1),
  position: z.string().min(1),
  monthStarted: z.string().min(1),
  yearStarted: z.string().min(1),
  monthlyIncome: z.string().min(1),
  referenceName: z.string().optional(),
  referenceNumber: z.string().optional(),
});

export type IEmployer = z.infer<typeof employerSchema>;

export function EmployerEditor({
  data,
  onSubmit,
}: {
  data: IEmployer | undefined;
  onSubmit: (data: IEmployer) => void;
}) {
  const form = useForm<IEmployer>({
    resolver: zodResolver(employerSchema),
    defaultValues: data ? { ...data } : {},
  });

  return (
    <Form {...form}>
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="employerName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Employer Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                Position / Title / Occupation
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monthStarted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Month Started</FormLabel>
                <FormControl>
                  <Input placeholder="MM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearStarted"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Year Started</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Monthly Income</FormLabel>
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <SwissFrancIcon className="w-4 h-4" />
                  </div>
                  <FormControl>
                    <Input className="pl-8" placeholder="Amount" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h3 className="font-semibold text-blue-700">Employment Reference</h3>
        </div>

        <FormField
          control={form.control}
          name="referenceName"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referenceNumber"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            onClick={form.handleSubmit((values) => {
              onSubmit(values);
            })}
            size="lg"
            className="w-3/5"
          >
            Add Current Address
          </Button>
        </div>
      </div>
    </Form>
  );
}
