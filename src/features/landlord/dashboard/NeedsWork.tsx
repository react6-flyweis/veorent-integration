import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";
import { XIcon } from "lucide-react";
import { useNavigate } from "react-router";

// Define form schema with zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  category: z.string().min(1, { message: "Please select a category" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NeedsWork() {
  const goBack = useGoBack();
  const navigate = useNavigate();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      category: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      navigate("/landlord");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5">
        <Button
          onClick={goBack}
          variant="outline"
          className="size-9 items-center justify-center rounded-full"
        >
          <XIcon className="text-primary size-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Contact Support</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  Email on Your Veorent Account
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Provide Feedback" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="feedback">Provide Feedback</SelectItem>
                    <SelectItem value="bug">Report a bug</SelectItem>
                    <SelectItem value="question">
                      Ask a question about Veorent
                    </SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Let us know how we can improve"
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center pt-4">
            <LoadingButton
              type="submit"
              isLoading={form.formState.isSubmitting}
              className="w-3/5"
              size="lg"
            >
              Send Message
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
