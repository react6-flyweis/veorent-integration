import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { DateInput } from "@/components/ui/date-input";
import { ImageUpload } from "@/components/ui/image-upload";
import { DialogClose } from "@/components/ui/dialog";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useToast } from "@/hooks/useAlertToast";
import { LoadingButton } from "@/components/ui/loading-button";

const formSchema = z.object({
  date: z.date(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a valid number greater than 0",
  }),
  rental: z.string().min(1, "Rental property is required"),
  description: z.string().optional(),
  notes: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
});

type ExpenseFormValues = z.infer<typeof formSchema>;

const CreateExpense = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: "",
      notes: "",
      files: [],
    },
  });

  const onSubmit = async (values: ExpenseFormValues) => {
    console.log("Form values:", values);

    // Here you would typically call an API to save the expense
    showToast("Your new expense has been added successfully!", "success");
    setTimeout(() => {
      navigate("/landlord/expenses");
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="text-base">Date Paid</FormLabel>
                <FormControl>
                  <DateInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="text-base">Amount Paid</FormLabel>
                <FormControl>
                  <CurrencyInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="rental"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Property</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="shared">Shared across property</SelectItem>
                  <SelectItem value="123-main">123, Main St</SelectItem>
                  <SelectItem value="456-oak">456, Oak Ave</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">
                Description (Optional)
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter expense description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="text-base">Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about this expense"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <p className="mb-1 font-medium">Receipts & Documents</p>
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormControl>
                  <ImageUpload variant="small" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outlinePrimary">
              CANCEL
            </Button>
          </DialogClose>
          <LoadingButton
            isLoading={form.formState.isLoading}
            type="submit"
            className="w-32"
          >
            ADD EXPENSE
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default CreateExpense;
