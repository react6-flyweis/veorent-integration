import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircleIcon, XIcon } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import businessmanIcon from "@/assets/icons/businessman.png";
import { IconRound } from "@/components/IconRound";
import { z } from "zod";
import { EmployerSummaryCard } from "../EmploymentSummaryCard";
import {
  EmployerEditor,
  employerSchema,
  type IEmployer,
} from "../EmployerEditor";

const employerDetailsSchema = z
  .object({
    currentEmployer: employerSchema.optional(),
    noCurrent: z.boolean().optional(),
    pastEmployer: employerSchema.optional(),
    noPast: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.noCurrent && !data.currentEmployer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide Current employment, Or check not applicable.",
        path: ["currentEmployer"],
      });
    }
    if (!data.noPast && !data.pastEmployer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide past employer, Or check not applicable.",
        path: ["pastEmployer"],
      });
    }
  });

type FormSchemaType = z.infer<typeof employerDetailsSchema>;

export function EmploymentDetails({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(employerDetailsSchema),
    defaultValues: {
      noCurrent: false,
      noPast: false,
    },
  });

  const watchNoPast = useWatch({
    control: form.control,
    name: "noPast",
  });

  const watchNoCurrent = useWatch({
    control: form.control,
    name: "noCurrent",
  });

  const [currentOpen, setCurrentOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);

  const submitHandler = (data: FormSchemaType) => {
    console.log(data);
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-5">
        <div className="flex items-center gap-3">
          <IconRound icon={businessmanIcon} size="sm" />
          <h2 className="text-2xl font-bold text-primary">Employment</h2>
        </div>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>

        {/*  Current Employer */}
        <div className="space-y-1">
          <h3 className="text-xl text-primary font-semibold">
            Current Employer
          </h3>

          <FormField
            control={form.control}
            name="noCurrent"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(c === true)}
                  />
                </FormControl>
                <FormLabel>Not Applicable</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentEmployer"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="">
                    {!watchNoCurrent &&
                      (field.value ? (
                        <EmployerSummaryCard
                          data={field.value}
                          onEdit={() => setCurrentOpen(true)}
                          onDelete={() => {
                            field.onChange(undefined);
                          }}
                        />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setCurrentOpen(true)}
                          type="button"
                        >
                          <PlusCircleIcon className="size-5" />
                          <span>Add Current Employer</span>
                        </Button>
                      ))}
                    <EmployerDialog
                      title="Current"
                      open={currentOpen}
                      setOpen={setCurrentOpen}
                      employer={field.value}
                      setEmployer={(address) => field.onChange(address)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Past Employer */}
        <div className="space-y-1">
          <h3 className="text-xl text-primary font-semibold">Past Employer</h3>

          <FormField
            control={form.control}
            name="noPast"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(c === true)}
                  />
                </FormControl>
                <FormLabel>Not Applicable</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pastEmployer"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="">
                    {!watchNoPast &&
                      (field.value ? (
                        <EmployerSummaryCard
                          data={field.value}
                          onEdit={() => setPastOpen(true)}
                          onDelete={() => {
                            field.onChange(undefined);
                          }}
                        />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setPastOpen(true)}
                          type="button"
                        >
                          <PlusCircleIcon className="size-5" />
                          <span>Add Past Address</span>
                        </Button>
                      ))}
                    <EmployerDialog
                      title="Past"
                      open={pastOpen}
                      setOpen={setPastOpen}
                      employer={form.getValues("pastEmployer")}
                      setEmployer={(address) =>
                        form.setValue("pastEmployer", address)
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <EmployerDialog
            title="Past"
            open={pastOpen}
            setOpen={setPastOpen}
            employer={form.getValues("pastEmployer")}
            setEmployer={(address) => form.setValue("pastEmployer", address)}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" size="lg" className="w-3/5">
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

const EmployerDialog = ({
  title,
  open,
  setOpen,
  employer,
  setEmployer,
}: {
  title: "Current" | "Past";
  open: boolean;
  setOpen: (show: boolean) => void;
  employer: IEmployer | undefined;
  setEmployer: (address: IEmployer) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-screen min-w-screen overflow-scroll [&>button:last-child]:hidden">
        <DialogHeader className="flex-row gap-3 items-center">
          <DialogClose className="rounded-full flex justify-center items-center size-9 border">
            <XIcon />
          </DialogClose>
          <DialogTitle className="text-2xl">
            {employer ? "Edit" : "Add"} {title} Employer
          </DialogTitle>
        </DialogHeader>
        <EmployerEditor
          data={employer}
          onSubmit={(add) => {
            setEmployer(add);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
