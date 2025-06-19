import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { MicIcon } from "lucide-react";
import * as z from "zod";

import accessIcon from "@/assets/icons/access.png";
import infoIcon from "@/assets/icons/info.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { ImageInput } from "@/components/ui/image-input";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useAlertToast";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUploadImageMutation } from "../../api/mutations";
import { useCreateMaintenanceRequestMutation } from "../api/mutations";

import type { IMaintenanceRequestCreateData } from "../api/mutations";

const formSchema = z.object({
  priority: z.enum(["Emergency", "High", "Medium", "Low"], {
    required_error: "Please select a priority",
  }),
  category: z.enum(["Appliances", "Electrical", "Pest Control", "Plumbing"], {
    required_error: "Please select a category",
  }),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters")
    .max(500, "Description cannot exceed 500 characters"),
  photos: z.array(z.instanceof(File)).optional(),
  voiceMemo: z.instanceof(File).optional(),
  accessPermission: z.enum(["yes", "no"]),
  accessInstructions: z.string().max(1000).optional(),
  animals: z.enum(["yes", "no"]),
  animalInstructions: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function MaintenanceRequestForm() {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: createMaintenanceRequest } =
    useCreateMaintenanceRequestMutation();
  const { mutateAsync: uploadImage } = useUploadImageMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "Medium",
      category: "Plumbing",
      description: "",
      accessPermission: "no",
      accessInstructions: "",
      animals: "no",
      animalInstructions: "",
      photos: [],
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      // Handle photo uploads
      let imageUrls: string[] = [];
      if (data.photos && data.photos.length > 0) {
        const filesToUpload: File[] = [];
        const existingUrls: string[] = [];

        // Separate files from existing URLs
        data.photos.forEach((photo) => {
          if (photo instanceof File) {
            filesToUpload.push(photo);
          } else if (typeof photo === "string") {
            existingUrls.push(photo);
          }
        });

        // Upload new files
        if (filesToUpload.length > 0) {
          const uploadPromises = filesToUpload.map(async (file) => {
            const formData = new FormData();
            formData.append("image", file);
            const response = await uploadImage(formData);
            return response.data.data[0].img;
          });
          const uploadedImageUrls = await Promise.all(uploadPromises);
          imageUrls = [...existingUrls, ...uploadedImageUrls];
        } else {
          imageUrls = existingUrls;
        }
      }

      const requestData: IMaintenanceRequestCreateData = {
        priority: data.priority,
        category: data.category,
        desc: data.description,
        image: imageUrls,
        voiceMemo: undefined, // TODO: Implement voice memo upload
        permissionToEnter: data.accessPermission === "yes",
        permissionToEnterExplain: data.accessInstructions || "",
        areThereAnimal: data.animals === "yes",
        areThereAnimalExplain: data.animalInstructions || "",
      };

      await createMaintenanceRequest(requestData);
      showToast("Your Request created successfully", "success");
      navigate("/tenant/maintenance");
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error) || "Failed to create request",
      });
    }
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
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
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
                  <SelectItem value="Appliances">Appliances</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="Pest Control">Pest Control</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
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

        {/* Photos */}
        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <ImageInput multiple maxFiles={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Voice Memo */}
        <Button className="w-40" type="button">
          <div className="flex size-5 items-center justify-center rounded-full bg-white">
            <MicIcon className="text-primary" />
          </div>
          <span className="text-base"> Voice Memo</span>
        </Button>

        {/* Property Access */}
        <div>
          <div className="my-2 flex items-center gap-2">
            <IconRound icon={accessIcon} size="xs" />
            <h3 className="text-lg font-bold">Property Access</h3>
          </div>
          <p className="text-primary text-lg">
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Access Instructions */}
          {form.watch("accessPermission") === "yes" && (
            <FormField
              control={form.control}
              name="accessInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide access instructions..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    0/{field.value?.length || 0}/1000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Additional Info */}
        <div>
          <div className="my-2 flex items-center gap-2">
            <IconRound icon={infoIcon} size="xs" />
            <h3 className="text-lg font-bold">Additional INFO</h3>
          </div>
          <p className="text-primary text-lg">
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Animal Instructions */}
          {form.watch("animals") === "yes" && (
            <FormField
              control={form.control}
              name="animalInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Animal Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide details about the animals..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    0/{field.value?.length || 0}/1000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormErrors errors={form.formState.errors} />
        </div>

        <div className="flex justify-center">
          <LoadingButton
            type="submit"
            size="lg"
            className="w-4/5 @lg:w-3/5"
            isLoading={form.formState.isSubmitting}
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
