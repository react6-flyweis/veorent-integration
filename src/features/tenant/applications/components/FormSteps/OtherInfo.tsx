"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconRound } from "@/components/IconRound";
import infoCircleIcon from "@/assets/icons/info-circle.png";

const EmergencySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  additionalComments: z.string().optional(),
  foundThrough: z.string().min(1, "Please select an option"),
});

type EmergencyFormType = z.infer<typeof EmergencySchema>;

export default function EmergencyContactForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<EmergencyFormType>({
    resolver: zodResolver(EmergencySchema),
    defaultValues: {
      firstName: "",
      relationship: "",
      phoneNumber: "",
      additionalComments: "",
      foundThrough: "",
    },
  });

  function onSubmit(data: EmergencyFormType) {
    console.log("Form submitted:", data);
    onSuccess();
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={infoCircleIcon} size="sm" />
        <h2 className="text-primary text-2xl font-bold">Other Information</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Emergency Contact Section */}
          <div>
            <h2 className="text-md text-primary mb-1 font-semibold">
              Emergency Contact
            </h2>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input placeholder="Brother, Friend..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 123 456 7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Additional Comments */}
          <FormField
            control={form.control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary">
                  Additional Comments{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </FormLabel>
                <FormDescription>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and
                </FormDescription>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropdown Section */}
          <FormField
            control={form.control}
            name="foundThrough"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you find this property?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="friend">Friend / Referral</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex items-center justify-center">
            <Button type="submit" className="mt-2 w-4/5 @lg:w-3/5">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
