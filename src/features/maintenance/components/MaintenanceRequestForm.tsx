import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { MicIcon } from "lucide-react";
import { IconRound } from "@/components/IconRound";

import accessIcon from "@/assets/icons/access.png";
import infoIcon from "@/assets/icons/info.png";
import { LoadingButton } from "@/components/ui/loading-button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  priority: z.string().min(1, "Select a priority"),
  category: z.string().min(1, "Select a category"),
  description: z.string().min(100).max(500),
  accessPermission: z.enum(["yes", "no"]),
  accessInstructions: z.string().max(1000).optional(),
  animals: z.enum(["yes", "no"]),
});

export function MaintenanceRequestForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "",
      category: "",
      description: "",
      accessPermission: "no",
      accessInstructions: "",
      animals: "no",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="pest">Pest Control</SelectItem>
                  <SelectItem value="misc">Miscellaneous</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  className="h-24"
                  placeholder="Describe the issue..."
                  {...field}
                />
              </FormControl>
              <FormDescription
                className={cn(errors.description && "text-destructive")}
              >
                {field.value.length}/500 characters | 100 minimum
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Add Photo */}
        <Card className="p-4 flex justify-center items-center border-dashed border-2 h-20 border-gray-300">
          <p className="text-sm text-gray-500">CLICK OR DRAG TO UPLOAD</p>
        </Card>

        {/* Voice Memo */}
        <Button className="w-40" type="button">
          <div className="rounded-full bg-white size-5 flex justify-center items-center">
            <MicIcon className="text-primary" />
          </div>
          <span className="text-base"> Voice Memo</span>
        </Button>

        {/* Property Access */}
        <div>
          <div className="flex items-center gap-2 my-2">
            <IconRound icon={accessIcon} size="xs" />
            <h3 className="text-lg font-bold">Property Access</h3>
          </div>
          <p className="text-lg text-primary">
            The service team may arrive when you are not home:
          </p>
          <FormField
            control={form.control}
            name="accessPermission"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="text-sm">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="text-sm">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />

          {/* Access Instructions */}
          <FormField
            control={form.control}
            name="accessInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Instructions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide access instructions..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>0/1000 characters</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional Info */}
        <div>
          <div className="flex items-center gap-2 my-2">
            <IconRound icon={infoIcon} size="xs" />
            <h3 className="text-lg font-bold">Additional INFO</h3>
          </div>
          <p className="text-lg text-primary">
            Are there animal(s) in the unit?
          </p>
          <FormField
            control={form.control}
            name="animals"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="text-sm">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="text-sm">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center">
          <LoadingButton type="submit" size="lg" className="w-2/3">
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
