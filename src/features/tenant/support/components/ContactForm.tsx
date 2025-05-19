import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ✅ Zod Schema
const formSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// ✅ Type Inference
type ContactFormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Submitted data:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile</FormLabel>
              <FormControl>
                <Input
                  placeholder="+91 1234567890"
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="support@gmail.com"
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write your message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write here"
                  {...field}
                  className="bg-muted border-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <Button type="submit" className="w-44">
            Send
          </Button>
          <Button
            type="button"
            className="bg-green-600 w-44"
            onClick={() => {
              alert("Calling...");
            }}
          >
            Call
          </Button>
        </div>
      </form>
    </Form>
  );
}
