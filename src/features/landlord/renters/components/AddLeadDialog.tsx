import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  property: z.string().min(1, { message: "Property is required" }),
  fullName: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddLeadDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (values: FormValues) => void;
}

export function AddLeadDialog({
  trigger,
  open,
  onOpenChange,
  onSubmit,
}: AddLeadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      property: "",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit?.(values);
    setIsOpen(false);
    form.reset();
  };

  const controlledOpen = open !== undefined ? open : isOpen;
  const handleOpenChange = onOpenChange || setIsOpen;

  return (
    <Dialog open={controlledOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add a new Lead
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="property"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">
                    Property Interested in
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Property name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property1">
                          123 Main Street
                        </SelectItem>
                        <SelectItem value="property2">
                          456 Oak Avenue
                        </SelectItem>
                        <SelectItem value="property3">789 Pine Lane</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                  <p className="mt-1 text-sm text-blue-400">
                    Lorem ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem ipsum has been the industry's
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem Ipsum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">Renter's Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem Ipsum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="gap-0">
                  <FormLabel className="text-base">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Lorem Ipsum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" className="w-4/5">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
